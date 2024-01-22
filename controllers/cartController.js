const { request, response } = require("express")
const cartModel = require("../model/cartModel")
const { v4 } = require("uuid");



const createController = async (request,response) => {
  try {
    const uuid = v4();
    console.log("id generated");
    const { productId, productName, storeId,price,quantity, productDescription} = request.body;
console.log("fetched body");
    const product = await cartModel.create({
      productId:uuid,
       productName: productName,
       storeId: storeId,
       price:price,
       quantity:quantity,
       productDescription: productDescription
   });
console.log("product entered");
   if (product && product._id) {
       response.status(201).json({ message: "Product entered successfully" });
     } else {
       response.status(404).json({ message: "Product not entered" });
     }
} catch (error) {
  console.error(error); // Log the actual error
  response.status(500).json({ message: "Internal Server Error" });
}
}

// const createController = async (request,response) => {
//   try {
//     const uuid = v4();
//     const { productId, productName, storeId,price,quantity, productDescription} = request.body;

//     const product = await cartModel.create({
//       productId:uuid,
//        productName: productName,
//        storeId: storeId,
//        price:price,
//        quantity:quantity,
//        productDescription: productDescription
//    });
//    if (product && product._id) {
//        response.status(201).json({ message: "Product entered successfully" });
//      } else {
//        response.status(404).json({ message: "Product not entered" });
//      }
// } catch (error) {
//    response.status(500).json({ message: "Internal Server Error" });
// }
// }

// const getController= async (request, response) => {
//   try {
//     const storeId = request.params.storeId;
//     console.log(storeId);
//     const product = await cartModel.findOne({ storeId: storeId })

//     if (product) {
//       response.status(201).json({ message: "product found!" })
//     } else {
//       response.status(404).json({ message: "product Not found " })
//     }
//   } catch (error) {
//     response.status(500).json({ message: "Internal Server error" })
//   }
// }


const getController = async (request, response) => {
  try {
    const storeId = request.params.storeId;
    console.log(storeId);

    const products = await cartModel.aggregate([{ $match: { storeId: storeId } }]);

    if (products.length > 0) {
      const totalPrice = products.reduce((acc, product) => acc + (product.price * product.quantity), 0);
      const productDetails = products.map(({ productName, price, quantity }) => ({ productName, price, quantity }));
      response.status(200).json({ message: "Products found!", totalPrice, products: productDetails });
    } else {
      response.status(404).json({ message: "Products not found for the given storeId" });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal Server Error" });
  }
}


const getAllProductsController = async (request, response) => {
  try {
    const products = await cartModel.find();

    if (products.length > 0) {
      // Calculate total price by summing up the prices multiplied by quantities of all products
      const totalPrice = products.reduce((acc, product) => acc + (product.price * product.quantity), 0);
      
      response.status(200).json({
        message: "All products displayed",
        products: products,
        totalPrice: totalPrice
      });
    } else {
      response.status(404).json({ message: "Products not found" });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal Server Error" });
  }
};


const deleteController = async (request, response) => {
  try {
    const productName = request.params.productName;
    
    // Assuming cartModel is a model for your products
    const product = await cartModel.findOneAndDelete({ name: productName });

    if (product) {
      response.status(201).json({ message: "Product deleted successfully" });
    } else {
      response.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal Server error" });
  }
};


// const updateController = async (request, response) => {
//     try {
//       const product = await cartModel.findByIdAndUpdate({productId},{productName:productName,storeId:storeId})
//       console.log(product);

//       if (product && product._id) {
//         response.status(201).json({ message: "product updated Successfully" })
//       } else {
//         response.status(404).json({ message: "product Not updated " })
//       }
//     } catch (error) {
//       response.status(500).json({ message: "Internal Server error" })
//     }
// }
 

const updateIncController = async (request, response) => {
  try {
    const productName = request.params.productName;
    
    // Update the product's quantity using findOneAndUpdate and $inc operator
    const product = await cartModel.findOneAndUpdate(
      { productName: productName },
      { $inc: { quantity: 1 } }
    );

    if (product) {
      response.status(200).json({ message: "Product quantity incremented successfully", product: product });
    } else {
      response.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal Server Error" });
  }
};


const updateDecController = async (request, response) => {
  try {
    const productName = request.params.productName;
    
    // Update the product's quantity by decrementing it by 1
    const product = await cartModel.findOneAndUpdate(
      { productName: productName },
      { $inc: { quantity: -1 } }
    );

    if (product) {
      response.status(200).json({ message: "Product quantity decremented successfully", product: product });
    } else {
      response.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal Server Error" });
  }
};

// const updateController = async (request, response) => {
//   try {
//     const productName = request.params.productName;
//     const { action } = request.params.action; // Extract the action (increment or decrement) from the request body
    
//     // Define the update operation based on the action
//     const updateOperation = action === 'increment' ? { $inc: { quantity: 1 } } : { $inc: { quantity: -1 } };
    
//     // Update the product's quantity using findOneAndUpdate and appropriate update operation
//     const product = await cartModel.findOneAndUpdate(
//       { productName: productName },
//       updateOperation,
//       { new: true }
//     );

//     if (product) {
//       response.status(200).json({ message: `Product quantity ${action}ed successfully`, product: product });
//     } else {
//       response.status(404).json({ message: "Product not found" });
//     }
//   } catch (error) {
//     console.error(error);
//     response.status(500).json({ message: "Internal Server Error" });
//   }
// };


module.exports = {createController,getController,deleteController,updateIncController,updateDecController,getAllProductsController}