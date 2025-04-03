import express from 'express';
import categoryController from '../controller/categoryController.js';

const categoryRouter = express.Router();

categoryRouter.get('/', categoryController.getAllCategories); // Get all categories
categoryRouter.put('/:id', categoryController.updateCategory); // Update a category by ID
categoryRouter.delete('/:id', categoryController.deleteCategory); // Delete a category by ID
categoryRouter.post('/', categoryController.createCategory); // Create a new category
categoryRouter.get('/:id', categoryController.getCategoryById); // Get a category by ID

export default categoryRouter;