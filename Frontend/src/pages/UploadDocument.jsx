import React from "react";

import {
  Bell,
  Bot,
  Brain,
  CircleHelp,
  FileText,
  KeyRound,
  LayoutDashboard,
  LogOut,
  MessageCircleQuestion,
  NotebookTabs,
  Plus,
  Search,
  Settings,
  Sparkles,
  Target,
  Trash2,
  Upload,
  User,
} from "lucide-react";
import api from "../apiIntersepters";
import { useState } from "react";
import axios from "axios";

const UploadDocument = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a PDF");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("document", file);

      const res = await api.post(
        "/api/documents/upload",
        formData,
        {
          withCredentials: true,
        },
      );

      console.log(res.data);

      alert("Upload Success");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          <Upload size={20} />
        </div>
        <div>
          <h2 className="text-lg font-semibold tracking-tight">
            Upload New Document
          </h2>
          <p className="text-sm text-slate-500">
            Add a PDF to analyze with DocMind AI.
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 px-5 py-10 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-white text-slate-700 shadow-sm">
          <Upload size={24} />
        </div>
        <p className="font-medium text-slate-800">Drag & Drop PDF here</p>
        <p className="my-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
          Or
        </p>
        <form
          className="flex flex-col justify-center gap-3 sm:flex-row"
          encType="multipart/form-data"
        >
          <input
            name="document"
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm"
          ></input>
          <button
            type="button"
            onClick={handleUpload}
            className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default UploadDocument;
