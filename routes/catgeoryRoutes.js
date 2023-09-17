import express from "express";

import {
  createCategoryController,
  updateCategoryController,
  deleteCategoryCOntroller,
  categoryControlller,
  singleCategoryController,
} from "../Controller/catgeoryController.js";
const router = express.Router();

router.post("/create", createCategoryController);
router.get("/get", categoryControlller);
router.put("/update/:id", updateCategoryController);
router.delete("/delete/:id", deleteCategoryCOntroller);
router.get("/get/:slug", singleCategoryController);

export default router;
