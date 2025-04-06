
const multer  = require('multer');
const ApiError = require('../utils/apiError');

exports.uploadSingleImage = (fieldName)=>{
    //1-)memory storage engine
    const multerStorage = multer.memoryStorage()
    const multerFilter = function (req, file, cb) {
    if(file.mimetype.startsWith('image'))
        cb(null, true);
    else cb(new ApiError('only image allowed',400), false)
    };
    const upload = multer({ storage: multerStorage ,fileFilter:multerFilter});
    return upload.single(fieldName);
}

exports.uploadMixOfImages=(...arrOfFeildes)=>{
    
    const multerStorage = multer.memoryStorage()

    const multerFilter = function (req, file, cb) {
    if(file.mimetype.startsWith('image'))
        cb(null, true);
    else cb(new ApiError('only image allowed',400), false)
};

    const upload = multer({ storage: multerStorage ,fileFilter:multerFilter});
    return upload.fields(arrOfFeildes);
}

//2-)disk storage engine
// const multerStorage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/categories')
//     },
//     filename: function (req, file, cb) {
//         const ext = file.mimetype.split('/')[1];
//         const fileName = `category-${uuidv4()}-${Date.now()}.${ext}`
//         cb(null, fileName)
//     }
// })