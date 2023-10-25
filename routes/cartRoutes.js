const { Router, request, response } = require("express");
const {
  getController,
  createController,
  deleteController,
  updateIncController,
  updateDecController,
  getAllProductsController,
} = require("../controllers/cartController");

const cartRoutes = Router();

cartRoutes.get("/get/:storeId", (request, response) => {
  getController(request, response);
});
cartRoutes.get("/getAll", (request, response) => {
  getAllProductsController(request, response);
});
cartRoutes.post("/create", (request, response) => {
  createController(request, response);
});
cartRoutes.delete("/delete/:productName", (request, response) => {
  deleteController(request, response);
});
cartRoutes.put("/increment/:productName", (request, response) => {
  updateIncController(request, response);
});
cartRoutes.put("/decrement/:productName", (request, response) => {
  updateDecController(request, response);
});

module.exports = cartRoutes;
