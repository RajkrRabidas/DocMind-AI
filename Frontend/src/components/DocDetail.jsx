import { X, FileText, Sparkles } from "lucide-react";
import { useState } from "react";

const DocumentInsightsModal = ({
  document,
  onClose,
}) => {
  const [activeTab, setActiveTab] =
    useState("summary");

  const stripMarkdownListMarker = (line) =>
    line.replace(/^[\*\-\+]\s*/, "");

  const getSummaryLines = (summary) =>
    summary
      .split(/\r?\n/)
      .map((line) => stripMarkdownListMarker(line.trim()))
      .filter(Boolean);

  const getSummaryPairs = (summary) =>
    getSummaryLines(summary)
      .map((line) => {
        const match = line.match(/^\*\*(.+?)\*\*:\s*(.+)$/);
        return match
          ? { label: match[1], value: match[2] }
          : null;
      })
      .filter(Boolean);

  const renderMarkdownInline = (text = "") => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, index) => {
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

  const summaryPairs =
    document?.summary
      ? getSummaryPairs(document.summary)
      : [];

  const summaryBullets =
    document?.summary
      ? getSummaryLines(document.summary).filter(
          (line) => !/^\*\*(.+?)\*\*:\s*(.+)$/.test(line),
        )
      : [];

  const cleanedSummaryText =
    document?.summary
      ? getSummaryLines(document.summary).join("\n")
      : "";

  const renderSummaryCard = () => {
    if (!document?.summary) {
      return (
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-slate-600">
          Summary not generated yet.
        </div>
      );
    }

    return (
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <div className="flex items-center gap-3 text-slate-700">
              <Sparkles size={18} className="text-blue-600" />
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                  AI generated summary
                </p>
                <h3 className="mt-2 text-lg font-semibold text-slate-900">
                  Document overview
                </h3>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {summaryPairs.length > 0 && (
                <div className="space-y-3">
                  {summaryPairs.map((pair, index) => (
                    <div key={index} className="rounded-2xl border border-slate-200 bg-white p-4">
                      <p className="text-sm font-semibold text-slate-800">
                        {pair.label}
                      </p>
                      <div className="mt-1 text-sm text-slate-600">
                        {renderMarkdownInline(pair.value)}
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
                    {summaryBullets.map((bullet, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="mt-1 h-2 w-2 rounded-full bg-blue-600" />
                        <span className="text-sm leading-6 text-slate-700">
                          {renderMarkdownInline(bullet)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
            Summary details
          </p>
          <div className="mt-4 space-y-3">
            {renderMarkdownText(cleanedSummaryText)}
          </div>
        </div>
      </div>
    );
  };

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
            <div>{renderSummaryCard()}</div>
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