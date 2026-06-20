import React from "react";

const MyDocuments = () => {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <FileText size={20} className="text-slate-700" />
        <h2 className="text-lg font-semibold tracking-tight">
          Recent Documents
        </h2>
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200">
        {documents.map((doc, index) => (
          <div
            key={doc.name}
            className={`grid gap-3 p-4 sm:grid-cols-[1fr_auto_auto] sm:items-center ${
              index !== documents.length - 1 ? "border-b border-slate-200" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                <FileText size={18} />
              </div>
              <p className="font-medium text-slate-800">{doc.name}</p>
            </div>

            <span
              className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                doc.status === "Completed"
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-amber-50 text-amber-700"
              }`}
            >
              {doc.status}
            </span>

            <div className="flex gap-2">
              <div className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700">
                Open
              </div>
              {doc.canDelete && (
                <div className="flex items-center gap-1 rounded-lg border border-red-100 px-3 py-2 text-xs font-semibold text-red-600">
                  <Trash2 size={14} />
                  Delete
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyDocuments;
