const {default:mongoose} = require('mongoose');

const cartSchema = new mongoose.Schema({
    productId: {type: String, required: true, unique: true },
    productName: {type: String, required: true},
    storeId: {type: String, required: true},
    price:{type: Number, required: true},
    quantity:{type: Number, required: true},
    productDescription: {type: String, required: true}
});

const cartModel = mongoose.model("cartDatas", cartSchema);

module.exports = cartModel;