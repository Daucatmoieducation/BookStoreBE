import categoryModel from '../model/category.schema.js';

const categoryController = {
    getAllCategories: async (req, res) => {
        try {
            const categories = await categoryModel.find();
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching categories', error: error.message });
        }
    },
    getCategoryById: async (req, res) => {
        try {
            const { id } = req.params; // Get category ID from request parameters
            const category = await categoryModel.findById(id);

            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }

            res.status(200).json(category);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching category', error: error.message });
        }
    },
    createCategory: async (req, res) => {
        try {
            const newCategory = new categoryModel(req.body); // Create a new category instance with request body data
            const savedCategory = await newCategory.save(); // Save the category to the database

            res.status(201).json({ message: 'Category created successfully', category: savedCategory });
        } catch (error) {
            res.status(500).json({ message: 'Error creating category', error: error.message });
        }
    },
    updateCategory: async (req, res) => {
        try {
            const { id } = req.params; // Get category ID from request parameters
            const updatedData = req.body; // Get updated data from request body

            const updatedCategory = await categoryModel.findByIdAndUpdate(id, updatedData, { new: true });

            if (!updatedCategory) {
                return res.status(404).json({ message: 'Category not found' });
            }

            res.status(200).json({ message: 'Category updated successfully', category: updatedCategory });
        } catch (error) {
            res.status(500).json({ message: 'Error updating category', error: error.message });
        }
    },
    deleteCategory: async (req, res) => {
        try {
            const { id } = req.params;

            const deletedCategory = await categoryModel.findByIdAndDelete(id);

            if (!deletedCategory) {
                return res.status(404).json({ message: 'Category not found' });
            }

            res.status(200).json({ message: 'Category deleted successfully', category: deletedCategory });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting category', error: error.message });
        }
    }
};

export default categoryController;