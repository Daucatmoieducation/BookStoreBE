import mongoose from 'mongoose';

const authorsSchema = new mongoose.Schema({
    name: String,
    slug: String,
});

const categoriesSchema = new mongoose.Schema({
    name: String,
    is_leaf: Boolean,
});

const bookSchema = new mongoose.Schema({
    authors: [authorsSchema],
    book_cover: { type: String, default: null },
    categories: categoriesSchema,
    current_seller: {
        id: Number,
        sku: String,
        name: String,
        link: String,
        logo: String,
        price: Number,
        product_id: String,
        store_id: Number,
        is_best_store: Boolean,
        is_offline_installment_supported: { type: Boolean, default: null },
    },
    description: String,
    images: [
        {
            base_url: String,
            is_gallery: Boolean,
            label: { type: String, default: null },
            large_url: String,
            medium_url: String,
            position: { type: Number, default: null },
            small_url: String,
            thumbnail_url: String,
        },
    ],
    list_price: Number,
    name: String,
    original_price: Number,
    quantity_sold: {
        text: String,
        value: Number,
    },
    rating_average: Number,
    short_description: String,
    specifications: [
        {
            name: String,
            attributes: [
                {
                    code: String,
                    name: String,
                    value: String,
                },
            ],
        },
    ],
    id: String,
});

const bookModel = mongoose.model('book', bookSchema);

export default bookModel;