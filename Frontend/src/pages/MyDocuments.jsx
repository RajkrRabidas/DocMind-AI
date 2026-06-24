import React, { useState, useEffect } from "react";
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
import { AppData } from "../context/AppContext";
import { useParams } from "react-router-dom";

const MyDocuments = () => {
  const { documents, docsLoading, fetchDocuments } = AppData();

  // const pdfUrl = `http://localhost:5000/uploads/${doc.fileUrl}`;
  const params = useParams()

  const deleteDocument = async (docId) => {
    try {
      const { data } = await api.delete(`/api/documents/delete/${docId}`);

      fetchDocuments(); // Refresh the documents list after deletion
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const loading = docsLoading;

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <FileText size={20} className="text-slate-700" />
        <h2 className="text-lg font-semibold tracking-tight">
          Recent Documents
        </h2>
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200">
        {loading ? (
          <p className="p-4">Loading...</p>
        ) : documents.length === 0 ? (
          <p className="p-4">No documents found.</p>
        ) : (
          documents.map((doc, index) => (
            <div
              key={doc._id}
              className={`grid gap-3 p-4 sm:grid-cols-[1fr_auto_auto] sm:items-center ${
                index !== documents.length - 1
                  ? "border-b border-slate-200"
                  : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                  <FileText size={18} />
                </div>
                <p className="font-medium text-slate-800">{doc.title}</p>
              </div>

              <span
                className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                  doc.status === "completed"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-amber-50 text-amber-700"
                }`}
              >
                {doc.status}
              </span>

              <div className="flex gap-2">
                <div
                  onClick={() =>
                    window.open(
                      `http://localhost:3000/${doc.fileUrl}`,
                      "_blank",
                    )
                  }
                  className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  Open
                </div>
                  <div onClick={() => deleteDocument(doc._id)} className="flex items-center gap-1 rounded-lg border border-red-100 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-100 cursor-pointer">
                    <Trash2 size={14} />
                  </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default MyDocuments;
