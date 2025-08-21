const Book = require("../models/Book");

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book); 
  } catch (error) {
    res.status(400).json({ message: "Invalid ID format" });
  }
};

exports.addBook = async (req, res) => {
  try {
    const { title, author, publishedYear } = req.body;
    if (!title || !author) {
      return res.status(400).json({ message: "Title and Author are required" });
    }

    const newBook = new Book({ title, author, publishedYear });
    const savedBook = await newBook.save();
    res.status(201).json(savedBook); 
  } catch (error) {
    res.status(500).json({ message: error.message }); 
  }
};

exports.updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(updatedBook); 
  } catch (error) {
    res.status(400).json({ message: error.message }); 
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" }); 
    }

    res
      .status(200)
      .json({ message: "Book deleted successfully", deletedBook }); 
  } catch (error) {
    res.status(400).json({ message: "Invalid ID format" }); 
  }
};
