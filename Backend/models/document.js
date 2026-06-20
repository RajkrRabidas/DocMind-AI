const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },

    title: {
      type: String,
      require: true,
    },

    originalFileName: {
      type: String,
    },

    fileUrl: {
      type: String,
    },
    extractedText: {
      type: String,
      default: "",
    },
    summary: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["uploaded", "processing", "completed", "failed"],
      default: "uploaded",
    },
  },
  {
    timestamps: true,
  },
);


module.exports = mongoose.model("document", documentSchema)
