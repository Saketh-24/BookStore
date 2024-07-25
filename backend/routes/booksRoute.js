import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// post route

router.post("/addBook", async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;
    if (!title || !author || !publishYear) {
      return res.status(401).send({ message: "add all the fields" });
    }
    const newBook = await Book.create({ title, author, publishYear });
    return res.status(201).send(newBook);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

// get route

router.get("/getBooks", async (req, res) => {
  try {
    const bookDetails = await Book.find({});
    return res.status(200).json({
      count: bookDetails.length,
      data: bookDetails,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

// get by id route
router.get("/getBook/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

// put route

router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { title, author, publishYear } = req.body;
    if (!title || !author || !publishYear) {
      return res.status(401).send({ message: "add all the fields" });
    }
    const result = await Book.findByIdAndUpdate(id, req.body);
    if (!result) return res.status(400).send({ message: "Book not found" });
    return res.status(200).send({ message: "Book updated Successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

// delete route

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Book.findByIdAndDelete(id);
    if (!result) return res.status(400).send({ message: "Book not found" });
    return res.status(201).send({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

export default router;
