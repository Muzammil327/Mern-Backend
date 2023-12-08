import mongoose from "mongoose";

// Create a schema for BOOK
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Create Author and Book models from the schemas
const Userauthentication = mongoose.model("Userauthentication", UserSchema);
export default Userauthentication;
