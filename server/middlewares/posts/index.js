const multer = require("multer");
const uuid = require("uuid");

class InvalidFileError extends Error {}

const storage = multer.diskStorage({
  destination: "./public/upload",
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + uuid.v4());
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const fileIsValid =
      file.mimetype.startsWith("/text") ||
      ["application/javascript", "application/json"].includes(file.mimetype);
    if (!fileIsValid) {
      console.log(`Unsupported file type uploaded ${file.mimetype}`);
      cb(new InvalidFileError("Upload file must be a text file"));
    } else cb(null, true);
  },
});

module.exports = {
  upload,
};
