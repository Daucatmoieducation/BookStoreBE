const multer = require('multer');
const cloudinary = require('../config/cloudinaryConfig')
const { CloudinaryStorage } = require('multer-storage-cloudinary')

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'Courses',
    allowedFormats: ['jpg', 'png', 'jpeg'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }],
})

const upload = multer({
    storage: storage,
});

module.exports=upload
