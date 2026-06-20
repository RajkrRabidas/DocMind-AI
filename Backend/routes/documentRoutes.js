const express = require("express");
const { uploadDocument, getDocuments, getDocumentById, deleteDocument} = require("../controllers/document.Controller.js");
const {authMiddleware} = require("../middleware/auth.middleware.js");
const upload = require("../middleware/uploadMiddleware.js");

const router = express.Router();

router.post("/upload", authMiddleware, upload.single("document"), uploadDocument);
router.get("/", authMiddleware, getDocuments);
router.get("/:id", authMiddleware, getDocumentById);
router.delete("/delete/:id", authMiddleware, deleteDocument);

module.exports = router;