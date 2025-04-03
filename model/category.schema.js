import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: String,
    is_leaf: 
    {type:Boolean,
    default:false},
});

const categoryModel = mongoose.model('category', categorySchema);

export default categoryModel;