const documentModel = require("../models/document");
const { extractPdfText } = require("../services/pdfService");
const {generateSummary} = require("../services/geminiService")

const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "PDF file is required",
      });
    }

    const document = await documentModel.create({
      userId: req.user._id,
      title: req.file.originalname,
      originalFileName: req.file.originalname,
      fileUrl: req.file.path,
      status: "processing",
    });

    const extractedText = await extractPdfText(req.file.path);
    const summary = await generateSummary(extractedText);

    
    document.extractedText = extractedText;
    document.status = "uploaded";
    document.summary = summary;
    document.status = "completed";

    await document.save();

    res.status(201).json({
      success: true,
      document,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getDocuments = async (req, res) => {
  try {
    const documents = await documentModel.find({
      userId: req.user._id,
    });

    res.json(documents);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getDocumentById = async (req, res) => {
  try {
    const document = await documentModel.findById(req.params.id);

    if (!document) {
      return res.status(404).json({
        message: "Document not found",
      });
    }

    res.json(document);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteDocument = async (req, res) => {
  try {
    const document = await documentModel.findById(req.params.id);

    if (!document) {
      return res.status(404).json({
        message: "Document not found",
      });
    }

    await document.deleteOne();

    res.json({
      message: "Document deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  uploadDocument,
  getDocuments,
  getDocumentById,
  deleteDocument,
};
