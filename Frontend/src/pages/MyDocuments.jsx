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
  X,
} from "lucide-react";
import api from "../apiIntersepters";
import { AppData } from "../context/AppContext";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const MyDocuments = () => {
  const { documents, docsLoading, fetchDocuments } = AppData();
  const [openModal, setOpenModal] = useState(false);

  // const pdfUrl = `http://localhost:5000/uploads/${doc.fileUrl}`;
  const params = useParams()

  const deleteDocument = async (docId) => {
    try {
      const { data } = await api.delete(`/api/documents/delete/${docId}`);

      toast.success(data.message || "Document deleted successfully");
      fetchDocuments(); // Refresh the documents list after deletion
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete document");
      console.error("Error deleting document:", error);
    }
  };

  const [selectedDoc, setSelectedDoc] = useState(null);
  const [activeTab, setActiveTab] = useState("Summary");

  const stripMarkdownListMarker = (line) =>
    line.replace(/^[\*\-\+]\s*/, "");

  const renderMarkdownInline = (text = "") => {
    return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
      const boldMatch = part.match(/^\*\*(.+)\*\*$/);
      if (boldMatch) {
        return (
          <strong key={index} className="font-semibold">
            {boldMatch[1]}
          </strong>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  const renderMarkdownText = (text = "") =>
    text.split(/\r?\n/).map((line, index) => (
      <p key={index} className="text-sm leading-7 text-slate-700">
        {renderMarkdownInline(line)}
      </p>
    ));

  const parseSummary = (summaryText) => {
    return summaryText
      ? summaryText
          .split(/\r?\n/)
          .map((line) => stripMarkdownListMarker(line.trim()))
          .filter(Boolean)
          .map((line) => {
            const fieldMatch = line.match(/^\*\*(.+?)\*\*:\s*(.+)$/);
            if (fieldMatch) {
              return {
                type: "field",
                label: fieldMatch[1].trim(),
                value: fieldMatch[2].trim(),
              };
            }

            return { type: "bullet", text: line };
          })
      : [];
  };

  const selectedDocSummary = selectedDoc?.summary || "";
  const summaryItems = parseSummary(selectedDocSummary);
  const summaryFields = summaryItems.filter((item) => item.type === "field");
  const summaryBullets = summaryItems.filter((item) => item.type === "bullet");

  const handleViewSummary = (doc) => {
    setSelectedDoc(doc);
    setActiveTab("Summary");
    setOpenModal(true);
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const loading = docsLoading;

  return (
    <section className="h-[400px] rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <FileText size={20} className="text-slate-700" />
        <h2 className="text-lg font-semibold tracking-tight">
          Recent Documents
        </h2>
      </div>

      {openModal && selectedDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => { setOpenModal(false); setSelectedDoc(null); }}>
          <div className="w-[720px] max-w-full rounded-lg bg-white shadow-lg" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b px-4 py-3">
              <div className="flex items-center gap-3">
                <FileText size={18} />
                <h3 className="font-semibold">{selectedDoc.title}</h3>
              </div>
              <button className="p-2" onClick={() => { setOpenModal(false); setSelectedDoc(null); }}>
                <X />
              </button>
            </div>

            <div className="border-b px-4">
              <nav className="flex gap-4">
                {["Summary", "Key Points", "Flashcards", "Quiz"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-3 px-4 ${activeTab === tab ? "border-b-2 border-slate-900 font-semibold" : "text-slate-600"}`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6 max-h-[480px] overflow-auto">
              {activeTab === "Summary" && (
              <div className=" space-y-4 ">
                <div className="space-y-4">
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                    <div className="flex items-center gap-3 text-slate-700">
                      <Sparkles size={18} className="text-blue-600" />
                      <div>
                        <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                          Document summary
                        </p>
                        <h3 className="mt-2 text-lg font-semibold text-slate-900">
                          {selectedDoc?.title || "Summary overview"}
                        </h3>
                      </div>
                    </div>

                    <div className="mt-6 space-y-4">
                      {summaryFields.length > 0 && (
                        <div className="grid gap-4 md:grid-cols-2">
                          {summaryFields.map((item, index) => (
                            <div
                              key={index}
                              className="rounded-2xl border border-slate-200 bg-white p-4"
                            >
                              <p className="text-sm font-semibold text-slate-800">
                                {renderMarkdownInline(item.label)}
                              </p>
                              <div className="mt-1 text-sm text-slate-600">
                                {renderMarkdownInline(item.value)}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {summaryBullets.length > 0 && (
                        <div className="rounded-2xl border border-slate-200 bg-white p-5">
                          <p className="text-sm font-semibold text-slate-900">
                            Key points
                          </p>
                          <ul className="mt-4 space-y-3">
                            {summaryBullets.map((item, index) => (
                              <li key={index} className="flex gap-3">
                                <span className="mt-1 h-2 w-2 rounded-full bg-blue-600" />
                                <span className="text-sm leading-6 text-slate-700">
                                  {renderMarkdownInline(item.text)}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {summaryFields.length === 0 && summaryBullets.length === 0 && (
                        <div className="rounded-3xl border border-slate-200 bg-white p-6 text-slate-600">
                          Summary not generated yet.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

              {activeTab === "Key Points" && (
                <div>
                  <p className="text-slate-700">Key points will appear here.</p>
                </div>
              )}

              {activeTab === "Flashcards" && (
                <div>
                  <p className="text-slate-700">Flashcards will appear here.</p>
                </div>
              )}

              {activeTab === "Quiz" && (
                <div>
                  <p className="text-slate-700">Quiz will appear here.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

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
                <span
                  className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                    doc.status === "completed"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {doc.status}
                </span>
              </div>

              <button
                onClick={() => handleViewSummary(doc)}
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300 cursor-pointer"
              >
                <Bot size={14} />
                View Summary
              </button>

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
