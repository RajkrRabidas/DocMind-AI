/*
  myProfile.jsx - DocMind AI dashboard
  - Single-file React + Tailwind UI demo (glassmorphism, gradients, responsive)
  - Dependencies: react, react-dom, lucide-react, framer-motion, react-toastify
  - Tailwind must be configured in the project for classes to apply.
*/

import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Home,
  FileText,
  PlusCircle,
  Cpu,
  Settings,
  LogOut,
  User,
  Bell,
  Search,
  UploadCloud,
  FileText as FileIcon,
  Trash2,
  Loader2,
  CheckCircle,
  Menu,
  X
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// NOTE: Ensure your project has Tailwind CSS configured and install packages:
// npm install lucide-react framer-motion react-toastify

// Small utility: animated counter hook
function useAnimatedCount(target, duration = 900) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start = 0;
    const stepTime = Math.max(10, Math.floor(duration / Math.max(1, target)));
    const id = setInterval(() => {
      start += 1;
      setValue(start);
      if (start >= target) clearInterval(id);
    }, stepTime);
    return () => clearInterval(id);
  }, [target, duration]);
  return value;
}

const Sidebar = ({ collapsed, setCollapsed, onLogout = () => {} }) => {
  const menu = [
    { name: 'Dashboard', icon: Home },
    { name: 'My Documents', icon: FileText },
    { name: 'Upload', icon: PlusCircle },
    { name: 'AI Tools', icon: Cpu },
    { name: 'Settings', icon: Settings }
  ];
  return (
    <aside className={`bg-gradient-to-b from-white/5 to-white/2 backdrop-blur-lg border-r border-white/5 p-4 w-${collapsed ? '20' : '64'} transition-all duration-300 fixed left-0 top-0 h-screen hidden md:block`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">DM</div>
          {!collapsed && (
            <div>
              <div className="text-white font-semibold">DocMind AI</div>
              <div className="text-sm text-white/60">Document Intelligence</div>
            </div>
          )}
        </div>
        {!collapsed && (
          <button onClick={() => setCollapsed(true)} className="text-white/80 hover:text-white p-2 rounded-md">
            <Menu size={18} />
          </button>
        )}
        {collapsed && (
          <button onClick={() => setCollapsed(false)} className="text-white/80 hover:text-white p-2 rounded-md">
            <X size={18} />
          </button>
        )}
      </div>

      <nav className="flex flex-col gap-1">
        {menu.map((m) => (
          <motion.button
            key={m.name}
            whileHover={{ x: 6 }}
            className="flex items-center gap-3 w-full text-left p-3 rounded-xl text-white/80 hover:bg-white/5 hover:text-white transition"
          >
            {/* Using dynamic icon component render */}
            <m.icon className="w-5 h-5" />
            {!collapsed && <span>{m.name}</span>}
          </motion.button>
        ))}
      </nav>

      <div className="absolute bottom-6 left-4 right-4">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/3">
          <div className="bg-indigo-500 w-10 h-10 rounded-full flex items-center justify-center text-white">R</div>
          <div className="flex-1 text-white/90">
            <div className="font-medium">Raj</div>
            <div className="text-xs text-white/60">Premium</div>
          </div>
          <button onClick={onLogout} className="text-white/80 hover:text-white p-2 rounded-md">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
};

// Because dynamic component rendering above with m.icon caused linting oddness, reimplement a safe Sidebar rendering below
const SafeSidebar = ({ collapsed, setCollapsed, onLogout = () => {} }) => {
  const menu = [
    { name: 'Dashboard', Icon: Home },
    { name: 'My Documents', Icon: FileText },
    { name: 'Upload', Icon: PlusCircle },
    { name: 'AI Tools', Icon: Cpu },
    { name: 'Settings', Icon: Settings }
  ];
  return (
    <aside className={`bg-white/3 dark:bg-black/30 backdrop-blur-lg border-r border-white/5 p-4 ${collapsed ? 'w-20' : 'w-64'} transition-all duration-300 fixed left-0 top-0 h-screen hidden md:flex flex-col`}> 
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">DM</div>
          {!collapsed && (
            <div>
              <div className="text-white font-semibold">DocMind AI</div>
              <div className="text-sm text-white/60">Document Intelligence</div>
            </div>
          )}
        </div>
        <button onClick={() => setCollapsed((c) => !c)} className="text-white/80 hover:text-white p-2 rounded-md">
          {collapsed ? <Menu size={18} /> : <X size={18} />}
        </button>
      </div>

      <nav className="flex-1 flex flex-col gap-2">
        {menu.map(({ name, Icon }) => (
          <motion.button
            key={name}
            whileHover={{ x: 6 }}
            className="flex items-center gap-3 w-full text-left p-3 rounded-xl text-white/80 hover:bg-white/5 hover:text-white transition"
          >
            <Icon className="w-5 h-5" />
            {!collapsed && <span>{name}</span>}
          </motion.button>
        ))}
      </nav>

      <div className="mt-4">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/3">
          <div className="bg-indigo-500 w-10 h-10 rounded-full flex items-center justify-center text-white">R</div>
          {!collapsed && (
            <div className="flex-1 text-white/90">
              <div className="font-medium">Raj</div>
              <div className="text-xs text-white/60">Premium</div>
            </div>
          )}
          <button onClick={onLogout} className="text-white/80 hover:text-white p-2 rounded-md">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
};

const Topbar = ({ onToggleMobile }) => {
  return (
    <header className="sticky top-0 z-30 bg-gradient-to-b from-white/2 to-transparent backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="md:hidden p-2 text-white/80 bg-white/5 rounded-md" onClick={onToggleMobile}><Menu size={18} /></button>
          <div className="flex items-center gap-3 bg-white/3 rounded-lg px-3 py-2 w-full md:w-96">
            <Search className="w-4 h-4 text-white/70" />
            <input className="bg-transparent outline-none text-white placeholder-white/60 w-full" placeholder="Search Documents..." />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 rounded-md text-white/80 hover:text-white"><Bell /></button>
          <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/3 transition cursor-pointer">
            <div className="w-8 h-8 bg-indigo-500 rounded-full text-white flex items-center justify-center">R</div>
            <div className="hidden sm:flex flex-col text-white/90 text-sm">
              <span className="font-medium">Raj</span>
              <span className="text-xs text-white/60">Owner</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const StatsCards = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((s) => (
        <motion.div key={s.title} whileHover={{ y: -6 }} className="p-4 rounded-2xl text-white shadow-lg" style={{ background: s.gradient }}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-white/80">{s.title}</div>
              <div className="text-2xl font-semibold mt-2">{s.value}</div>
            </div>
            <div className="opacity-80">{s.icon}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const UploadSection = ({ onUploadComplete }) => {
  const [drag, setDrag] = useState(false);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef();

  useEffect(() => {
    if (progress === 100 && file) {
      toast.success(`${file.name} uploaded`);
      onUploadComplete && onUploadComplete({ name: file.name, status: 'Completed' });
    }
  }, [progress]);

  function startUpload(selected) {
    setFile(selected);
    setProgress(0);
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(id); return 100; }
        return p + Math.floor(Math.random() * 10) + 5;
      });
    }, 300);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDrag(false);
    const f = e.dataTransfer.files?.[0];
    if (f) startUpload(f);
  }

  return (
    <div className="p-4 bg-white/3 rounded-2xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold">📤 Upload New Document</h3>
      </div>

      <div
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={handleDrop}
        className={`border-2 ${drag ? 'border-indigo-400 bg-white/5' : 'border-dashed border-white/10'} rounded-xl p-6 flex flex-col items-center justify-center gap-3`}
      >
        <UploadCloud className="w-10 h-10 text-white/80" />
        <div className="text-white/80">Drag & drop a file here</div>
        <div className="text-sm text-white/60">Supported: PDF, DOCX, TXT</div>

        <div className="flex gap-2 mt-3">
          <label className="bg-white/5 text-white px-3 py-2 rounded-md cursor-pointer">
            Choose File
            <input type="file" ref={inputRef} className="hidden" onChange={(e) => e.target.files?.[0] && startUpload(e.target.files[0])} />
          </label>
          <button className="bg-indigo-600 px-3 py-2 rounded-md" onClick={() => inputRef.current?.click()}>Upload Document</button>
        </div>

        {file && (
          <div className="w-full mt-4">
            <div className="flex items-center justify-between text-white/90">
              <div>{file.name}</div>
              <div className="text-sm">{progress}%</div>
            </div>
            <div className="w-full h-2 bg-white/5 rounded-full mt-2">
              <div className="h-2 bg-indigo-500 rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const RecentDocuments = ({ docs, onDelete }) => {
  if (!docs.length) {
    return (
      <div className="p-6 rounded-2xl bg-white/3 text-white/80">
        <div className="text-center">No documents yet. Upload one to get started.</div>
      </div>
    );
  }
  return (
    <div className="p-4 bg-white/3 rounded-2xl">
      <h3 className="text-white font-semibold mb-4">📄 Recent Documents</h3>
      <div className="divide-y divide-white/5">
        {docs.map((d) => (
          <div key={d.name} className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <FileIcon className="w-6 h-6 text-white/80" />
              <div>
                <div className="text-white/90">{d.name}</div>
                <div className="text-xs text-white/60">{d.size || '120 KB'}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className={`px-3 py-1 rounded-full text-xs ${d.status === 'Completed' ? 'bg-emerald-600 text-white' : 'bg-yellow-500 text-black'}`}>{d.status}</div>
              <button className="text-white/80 hover:text-white" onClick={() => toast.info(`Opening ${d.name}`)}>Open</button>
              {d.status === 'Completed' && <button className="text-red-400 hover:text-red-300" onClick={() => onDelete(d.name)}><Trash2 /></button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AITools = ({ tools }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {tools.map((t) => (
        <motion.div key={t.title} whileHover={{ scale: 1.03 }} onClick={() => toast(t.title)} className="p-4 rounded-2xl text-white cursor-pointer" style={{ background: t.gradient }}>
          <div className="flex flex-col items-center gap-3">
            <div className="bg-white/10 p-3 rounded-xl"><t.Icon className="w-6 h-6" /></div>
            <div className="font-medium">{t.title}</div>
            <div className="text-sm text-white/80 text-center">{t.desc}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default function MyProfile() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [docs, setDocs] = useState([
    { name: 'Doc1.pdf', status: 'Completed' },
    { name: 'Doc2.pdf', status: 'Processing' },
    { name: 'Doc3.pdf', status: 'Completed' }
  ]);

  // Call hooks at the top level of the component, not inside useMemo
  const docsCount = useAnimatedCount(12);
  const queriesCount = useAnimatedCount(48);

  const stats = useMemo(() => [
    { title: 'Total Documents', value: docsCount, gradient: 'linear-gradient(90deg,#6366f1,#7c3aed)', icon: <FileIcon /> },
    { title: 'AI Queries', value: queriesCount, gradient: 'linear-gradient(90deg,#06b6d4,#3b82f6)', icon: <Cpu /> },
    { title: 'AI Usage', value: '75%', gradient: 'linear-gradient(90deg,#8b5cf6,#06b6d4)', icon: <CheckCircle /> }
  ], [docsCount, queriesCount]);

  const tools = [
    { title: 'Ask Questions', Icon: Cpu, desc: 'Ask your document anything', gradient: 'linear-gradient(180deg,#7c3aed,#06b6d4)' },
    { title: 'Generate Summary', Icon: FileText, desc: 'Short summary of documents', gradient: 'linear-gradient(180deg,#6366f1,#7c3aed)' },
    { title: 'Key Points', Icon: FileText, desc: 'Extract key points', gradient: 'linear-gradient(180deg,#06b6d4,#3b82f6)' },
    { title: 'Flashcards', Icon: FileText, desc: 'Create learning cards', gradient: 'linear-gradient(180deg,#8b5cf6,#06b6d4)' },
    { title: 'Quiz Generator', Icon: FileText, desc: 'Auto-generate quizzes', gradient: 'linear-gradient(180deg,#6366f1,#7c3aed)' }
  ];

  function handleUploadComplete(newDoc) {
    setDocs((d) => [{ name: newDoc.name, status: newDoc.status }, ...d]);
  }

  function handleDelete(name) {
    setDocs((d) => d.filter((x) => x.name !== name));
    toast.success('Deleted ' + name);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#07070a] via-[#060615] to-[#021020] text-white">
      <ToastContainer />

      <SafeSidebar collapsed={collapsed} setCollapsed={setCollapsed} onLogout={() => toast('Logged out')} />

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setMobileOpen(false)}>
          <div className="bg-white/3 p-4 w-72 h-full" onClick={(e) => e.stopPropagation()}>
            <SafeSidebar collapsed={false} setCollapsed={() => {}} onLogout={() => toast('Logged out')} />
          </div>
        </div>
      )}

      <div style={{ marginLeft: collapsed ? '80px' : '256px' }} className="transition-all duration-300">
        <Topbar onToggleMobile={() => setMobileOpen(true)} />

        <main className="max-w-7xl mx-auto p-4 space-y-6">
          <section>
            <StatsCards stats={stats} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <UploadSection onUploadComplete={handleUploadComplete} />
              <RecentDocuments docs={docs} onDelete={handleDelete} />
            </div>

            <div className="pt-2">
              <h3 className="text-white font-semibold mb-3">🤖 AI Tools</h3>
              <AITools tools={tools} />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
