// Create Book
import Book from "../model/bookModel";
import asyncHandler from "express-async-handler";

export const createBookController = asyncHandler(async (req, res) => {
  const { title, author, publishYear } = req.body;
  //   validation
  if (!title) {
    return res.json({
      status: 400,
      success: false,
      error: "Title is required.",
    });
  }
  if (!author) {
    return res.json({
      status: 400,
      success: false,
      error: "Author Name is Required.",
    });
  }
  if (!publishYear) {
    return res.json({
      status: 400,
      success: false,
      error: "Publish Year is Required.",
    });
  }

  //   existing email
  const existingBook = await Crud.find({ title });
  if (!existingBook) {
    return res.status(400).res.json({
      status: 400,
      success: false,
      error: "Your Book is already exists.",
    });
  }

  try {
    const newUser = new Book({ title, author, publishYear });
    const user = await newUser.save();

    return res.json({
      status: 200,
      success: true,
      message: "Book Successfully Created.",
      user,
    });
  } catch (error) {
    return res.json({
      status: 401,
      success: false,
      error: "I am not creating the Book.",
      error,
    });
  }
});

export const deleteBookController = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Book.findByIdAndDelete(id);
    return res.json({
      status: 200,
      success: true,
      message: "Your Book is deleting.",
      user,
    });
  } catch (error) {
    return res.json({
      status: 400,
      success: false,
      error: "Your Book is not deleting.",
      error,
    });
  }
};

export const getSBookController = async (req, res) => {
    const { id } = req.params;
  try {
    const user = await Book.findById(id);
    return res.status(201).send(user);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};
export const getBookController = async (req, res) => {
  try {
    const user = await Book.find();
    return res.status(201).send(user);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};

export const updateBookController = asyncHandler(async (req, res) => {
  const { title, author, publishYear } = req.body;
  const { id } = req.params;

  if (!title) {
    return res.json({
      status: 400,
      success: false,
      error: "Title is required.",
    });
  }
  if (!author) {
    return res.json({
      status: 400,
      success: false,
      error: "Author Name is Required.",
    });
  }
  if (!publishYear) {
    return res.json({
      status: 400,
      success: false,
      error: "Publish Year is Required.",
    });
  }
  try {
    const user = await Book.findByIdAndUpdate(
      id,
      { title, author, publishYear },
      { new: true }
    );
    return res.json({
      status: 200,
      success: true,
      message: "Your Book is updating.",
      user,
    });
  } catch (error) {
    return res.json({
      status: 400,
      success: false,
      error: "Your Book is not updating.",
      error,
    });
  }
});
