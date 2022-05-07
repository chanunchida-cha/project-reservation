const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads/");
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + file.originalname);
  },
});

const filerFilter = (req, file, callback) => {
  callback(null, true);
};

let upload = multer({
  storage: storage,
  fileFilter: filerFilter,
});

module.exports = upload.single("image");
