import express from "express";
import upload from "../utils/multer.js";
import Product from "../model/productModel.js";
import cloudinary from "../utils/cloudinary.js";
import {
  createProductController,
  updateProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
} from "../Controller/productController.js";
const router = express.Router();
import slugify from "slugify";


router.post('/upload', async (req, res) => {
  
  try {
  

    const result = await cloudinary.uploader.upload(req.body.img, {
      folder: 'avatars',
    });
console.log(result)
const newImage = new Product({
  title: req.body.title,
  img: req.body.img,
  
});
console.log(newImage)

    await newImage.save();

    res.status(200).json(newImage);
  } catch (error) {
    console.error('Error uploading image', error);
    res.status(500).json({ error: 'Image upload failed' });
  }
});




router.post("/create", upload.single("photo"), async (req, res) => {
  const { name, slug } = req.body;
  const photoPath = req.file.path;

  const products = new Product({
    name,
    slug: slugify(name),
    photo: photoPath,
  });

  await products.save();
  console.log(products);
  // const { name, description, price, category, quantity, shipping } =
  //     req.body;
  // const product = new Product({
  // name,
  // description,
  // price,
  // slug: slugify(name),
  // category,
  // quantity,
  // shipping,
  //   photo: req.file.filename
  // });
  // await product.save();
});
router.get("/get", getProductController);
router.put("/update/:id", updateProductController);
router.delete("/delete/:id", deleteProductController);
router.get("/get/:id", getSingleProductController);
router.get("/", productPhotoController);

export default router;
