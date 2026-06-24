import { X, FileText, Sparkles } from "lucide-react";
import { useState } from "react";

const DocumentInsightsModal = ({
  document,
  onClose,
}) => {
  const [activeTab, setActiveTab] =
    useState("summary");

  const tabs = [
    "summary",
    "keyPoints",
    "flashcards",
    "quiz",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="flex h-[80vh] w-[90vw] max-w-5xl flex-col rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div className="flex items-center gap-3">
            <FileText
              className="text-blue-600"
              size={22}
            />
            <div>
              <h2 className="font-semibold text-slate-800">
                {document.title}
              </h2>

              <p className="text-sm text-slate-500">
                AI Document Insights
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() =>
                setActiveTab(tab)
              }
              className={`px-5 py-3 text-sm font-medium capitalize transition-all
              ${
                activeTab === tab
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-slate-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">

          {activeTab === "summary" && (
            <div>
              <div className="mb-4 flex items-center gap-2">
                <Sparkles
                  size={18}
                  className="text-yellow-500"
                />
                <h3 className="font-semibold">
                  AI Summary
                </h3>
              </div>

              <p className="leading-7 text-slate-700 whitespace-pre-wrap">
                {document.summary ||
                  "Summary not generated yet"}
              </p>
            </div>
          )}

          {activeTab === "keyPoints" && (
            <div>
              <h3 className="mb-4 font-semibold">
                Key Points
              </h3>

              <div className="rounded-lg border border-dashed p-8 text-center text-slate-400">
                Coming Soon
              </div>
            </div>
          )}

          {activeTab === "flashcards" && (
            <div>
              <h3 className="mb-4 font-semibold">
                Flashcards
              </h3>

              <div className="rounded-lg border border-dashed p-8 text-center text-slate-400">
                Coming Soon
              </div>
            </div>
          )}

          {activeTab === "quiz" && (
            <div>
              <h3 className="mb-4 font-semibold">
                Quiz
              </h3>

              <div className="rounded-lg border border-dashed p-8 text-center text-slate-400">
                Coming Soon
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentInsightsModal;