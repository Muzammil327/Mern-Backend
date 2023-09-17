import express from "express";

import hj from "../Controller/order/.js";

const router = express.Router();

router.post("/create", createProductController);
router.get("/get", getProductController);
router.put("/update/:id", updateProductController);
router.delete("/delete/:id", deleteProductController);
router.get("/get/:id", getSingleProductController);

export default router;
