const multer = require("multer")
const path = require("path")
const crypto = require("crypto")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads")
    },
    
    filename: (req, file, cb) => {
        crypto.randomBytes(12, (err, bytes) => {
            const uniqueName = bytes.toString("hex") + path.extname(file.originalname)
            cb(null, uniqueName)
        })
    }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(
      new Error("Only PDF files allowed"),
      false
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },
});

module.exports = upload;