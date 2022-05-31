const mongoose = require("mongoose");

const Product = require("./models/product");

const url =
  "mongodb+srv://<username>:<password>@myfirstcluster.mj6hp.mongodb.net/products_test?retryWrites=true&w=majority";
mongoose
  .connect(url)
  .then(console.log("Connected to database!"))
  .catch(() => {
    console.log("Connection failed.");
  });

const createProduct = async (req, res, next) => {
  const createdProduct = new Product({
    name: req.body.name,
    price: req.body.price,
  });
  const result = await createdProduct.save();

  res.json(result);
};

const getProducts = async (req, res, next) => {
  const products = await Product.find().exec();
  res.json(products);
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
<<<<<<< HEAD

// really important comment down here! super important!
=======
>>>>>>> cec5608e00a1658caa4acd21a3b146c4e6b3b2e9
