import mongoose from "mongoose";

// Create a schema for BOOK
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create Author and Book models from the schemas
const Category = mongoose.model("Category", categorySchema);
export default Category;
