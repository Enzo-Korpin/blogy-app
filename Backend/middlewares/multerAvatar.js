const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // cb(null, "../../Images/avatars"); 
    cb(null, path.join(__dirname, "../../Images/avatars"));
  },

  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname); 
    cb(null, uniqueSuffix + ext); 
  }
});

const uploadAvatar = multer({
  storage,
});

module.exports = uploadAvatar;
