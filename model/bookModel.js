import mongoose from "mongoose";

// Create a schema for BOOK
const BookSchema = new mongoose.Schema({
    
        title: {
          type: String,
          required: true,
        },
        author: {
          type: String,
          required: true,
        },
        publishYear: {
          type: Number,
          required: true,
        },
      },
      {
        timestamps: true,
      
});

// Create Author and Book models from the schemas
const Book = mongoose.model("Book", BookSchema);
export default Book;
