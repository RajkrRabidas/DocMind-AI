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
} from 'lucide-react'

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, active: true },
  { label: 'My Documents', icon: FileText },
  { label: 'Upload', icon: Plus },
  { label: 'AI Tools', icon: Bot },
  { label: 'Settings', icon: Settings },
]

const stats = [
  { label: 'Total Docs', value: '12', icon: FileText, accent: 'bg-blue-50 text-blue-600' },
  { label: 'Queries', value: '48', icon: Sparkles, accent: 'bg-amber-50 text-amber-600' },
  { label: 'AI Usage', value: '75%', icon: Brain, accent: 'bg-emerald-50 text-emerald-600' },
]

const documents = [
  { name: 'Doc 1.pdf', status: 'Completed', canDelete: true },
  { name: 'Doc 2.pdf', status: 'Processing', canDelete: false },
  { name: 'Doc 3.pdf', status: 'Completed', canDelete: true },
]

const tools = [
  { label: 'Ask Questions', icon: MessageCircleQuestion },
  { label: 'Generate Summary', icon: NotebookTabs },
  { label: 'Key Points', icon: Target },
  { label: 'Flashcards', icon: KeyRound },
  { label: 'Quiz', icon: CircleHelp },
]
import { AppData } from '../context/AppContext';

const MyProfile = () => {
  const { user, logoutUser } = AppData();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 shrink-0 border-r border-slate-200 bg-white px-5 py-6 lg:flex lg:flex-col">
          <div className="mb-8 flex items-center gap-3 px-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-900 text-white">
              <Brain size={22} />
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight">DocMind AI</h1>
              <p className="text-xs text-slate-500">Document workspace</p>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon

              return (
                <div
                  key={item.label}
                  className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium ${
                    item.active
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </div>
              )
            })}
          </nav>

          <div className="mt-auto border-t border-slate-200 pt-5">
            <div className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-slate-600 hover:bg-slate-100">
              <User size={18} />
              <span>Profile</span>
            </div>
            <div onClick={logoutUser} className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-slate-600 cursor-pointer hover:bg-slate-100">
              <LogOut size={18} />
              <span>Logout</span>
            </div>
          </div>
        </aside>

        <main className="flex-1 px-4 py-4 sm:px-6 lg:px-8">
          <section className="mx-auto flex max-w-7xl flex-col gap-6">
            <header className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3 lg:hidden">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-white">
                  <Brain size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold">DocMind AI</p>
                  <p className="text-xs text-slate-500">Dashboard</p>
                </div>
              </div>

              <div className="flex min-h-11 flex-1 items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 text-slate-500 sm:max-w-xl">
                <Search size={18} />
                <input type="text" placeholder="Search Documents..." className="bg-transparent placeholder:text-slate-500 focus:outline-none" />
              </div>

              <div className="flex items-center justify-between gap-4 sm:justify-end">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600">
                  <Bell size={18} />
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                    <User size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{user.name}</p>
                  </div>
                </div>
              </div>
            </header>

            <section className="grid gap-4 md:grid-cols-3">
              {stats.map((stat) => {
                const Icon = stat.icon

                return (
                  <div key={stat.label} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                        <p className="mt-3 text-3xl font-semibold tracking-tight">{stat.value}</p>
                      </div>
                      <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${stat.accent}`}>
                        <Icon size={22} />
                      </div>
                    </div>
                  </div>
                )
              })}
            </section>

            <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Upload size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold tracking-tight">Upload New Document</h2>
                  <p className="text-sm text-slate-500">Add a PDF to analyze with DocMind AI.</p>
                </div>
              </div>

              <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 px-5 py-10 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-white text-slate-700 shadow-sm">
                  <Upload size={24} />
                </div>
                <p className="font-medium text-slate-800">Drag & Drop PDF here</p>
                <p className="my-4 text-xs font-semibold uppercase tracking-wide text-slate-400">Or</p>
                <div className="flex flex-col justify-center gap-3 sm:flex-row">
                  <button type='file' className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm">
                  </button>
                  <button className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm">
                    Upload Button
                  </button>
                </div>
              </div>
            </section>

            <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
              <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center gap-3">
                  <FileText size={20} className="text-slate-700" />
                  <h2 className="text-lg font-semibold tracking-tight">Recent Documents</h2>
                </div>

                <div className="overflow-hidden rounded-lg border border-slate-200">
                  {documents.map((doc, index) => (
                    <div
                      key={doc.name}
                      className={`grid gap-3 p-4 sm:grid-cols-[1fr_auto_auto] sm:items-center ${
                        index !== documents.length - 1 ? 'border-b border-slate-200' : ''
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
                          doc.status === 'Completed'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-amber-50 text-amber-700'
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

              <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center gap-3">
                  <Bot size={20} className="text-slate-700" />
                  <h2 className="text-lg font-semibold tracking-tight">AI Tools</h2>
                </div>

                <div className="grid gap-3">
                  {tools.map((tool) => {
                    const Icon = tool.icon

                    return (
                      <div
                        key={tool.label}
                        className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700"
                      >
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-slate-700 shadow-sm">
                          <Icon size={17} />
                        </div>
                        <span>{tool.label}</span>
                      </div>
                    )
                  })}
                </div>
              </section>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default MyProfile
