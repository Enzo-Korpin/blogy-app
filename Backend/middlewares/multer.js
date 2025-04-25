const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file , cb ) =>{
        // cb(null , "../../Images/imgPosts")
        cb(null, path.join(__dirname, "../../Images/imgPosts"));

    },

    filename: (req, file , cb ) =>{
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const ext = path.extname(file.originalname)
        cb(null , uniqueSuffix + ext)
    }
});
const upload = multer({ storage: storage })

module.exports = upload;