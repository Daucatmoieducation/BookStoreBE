const cloudinary=require('cloudinary').v2

cloudinary.config({ 
    cloud_name: 'dm5ev1isi', 
    api_key: '645444323547834', 
    api_secret: 'scZZMEES8g18VB8zDuR3BZcvoXI' // Click 'View API Keys' above to copy your API secret
});

module.exports=cloudinary