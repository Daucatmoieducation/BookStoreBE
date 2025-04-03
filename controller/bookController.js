import bookModel from '../model/book.schema.js'; 

const bookController = {
    getBooks: async (req, res) => {
        try {
            const books = await bookModel.find();
            res.status(200).json(books);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching books', error: error.message });
        }
    },
    updateBook: async (req, res) => {
        try {
            const { id } = req.params; // Get book ID from request parameters
            const updatedData = req.body; // Get updated data from request body

            const updatedBook = await bookModel.findByIdAndUpdate(id, updatedData, { new: true });

            if (!updatedBook) {
                return res.status(404).json({ message: 'Book not found' });
            }

            res.status(200).json({ message: 'Book updated successfully', book: updatedBook });
        } catch (error) {
            res.status(500).json({ message: 'Error updating book', error: error.message });
        }
    },
    deleteBook: async (req, res) => {
        try {
            const { id } = req.params; // Get book ID from request parameters

            const deletedBook = await bookModel.findByIdAndDelete(id);

            if (!deletedBook) {
                return res.status(404).json({ message: 'Book not found' });
            }

            res.status(200).json({ message: 'Book deleted successfully', book: deletedBook });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting book', error: error.message });
        }
    },
    createBook: async (req, res) => {
        try {
            const newBook = new bookModel(req.body); // Create a new book instance with request body data
            const savedBook = await newBook.save(); // Save the book to the database

            res.status(201).json({ message: 'Book created successfully', book: savedBook });
        } catch (error) {
            res.status(500).json({ message: 'Error creating book', error: error.message });
        }
    },
    getBookById: async (req, res) => {
        try {
            const { id } = req.params; // Get book ID from request parameters
            const book = await bookModel.findById(id);

            if (!book) {
                return res.status(404).json({ message: 'Book not found' });
            }

            res.status(200).json(book);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching book', error: error.message });
        }
    }
};

export default bookController;

