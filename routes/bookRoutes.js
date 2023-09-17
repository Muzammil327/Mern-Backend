import express from "express";

import {
  createBookController,
  updateBookController,
  getBookController,
  deleteBookController,
  getSBookController
} from "../Controller/bookController.js";
const router = express.Router();

router.post("/create", createBookController);
router.get("/get", getBookController);
router.put("/update/:id", updateBookController);
router.delete("/delete/:id", deleteBookController);
router.get("/get/:id", getSBookController);

export default router;
