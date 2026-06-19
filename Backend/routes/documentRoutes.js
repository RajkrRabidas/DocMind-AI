const express = require("express");
const { createDocument, getDocuments, getDocumentById, deleteDocument} = require("../controllers/document.Controller.js");
const {authMiddleware} = require("../middleware/auth.middleware.js");

const router = express.Router();

router.post("/create", authMiddleware, createDocument);
router.get("/", authMiddleware, getDocuments);
router.get("/:id", authMiddleware, getDocumentById);
router.delete("/:id", authMiddleware, deleteDocument);

module.exports = router;