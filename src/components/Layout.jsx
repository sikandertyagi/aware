import { NavLink, Outlet } from 'react-router-dom'
import { Shield, Menu, X, BarChart3 } from 'lucide-react'
import { useState } from 'react'
import { modules } from '../data/modules'
import { useProgress } from '../hooks/useProgress'

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { getModuleProgress } = useProgress()

  return (
    <div className="min-h-screen bg-gray-50">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-xl shadow-lg border border-gray-200"
      >
        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      <aside className={`fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-slate-900 via-slate-800 to-indigo-950 text-white z-40 transform transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 overflow-y-auto`}>
        <div className="p-6">
          <NavLink to="/" className="flex items-center gap-3 mb-8" onClick={() => setSidebarOpen(false)}>
            <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center animate-pulse-ring">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">CyberAware</h1>
              <p className="text-xs text-slate-400">Employee Security Platform</p>
            </div>
          </NavLink>

          <NavLink
            to="/"
            end
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all duration-200 ${
                isActive ? 'bg-indigo-600/30 text-white' : 'text-slate-300 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            <BarChart3 className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </NavLink>

          <div className="mt-6 mb-3">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-4">Training Modules</p>
          </div>

          <nav className="space-y-1">
            {modules.map((mod) => {
              const prog = getModuleProgress(mod.id)
              return (
                <NavLink
                  key={mod.id}
                  to={mod.path}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                      isActive ? 'bg-white/15 text-white' : 'text-slate-300 hover:bg-white/10 hover:text-white'
                    }`
                  }
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: mod.color + '33' }}>
                    <mod.icon className="w-4 h-4" style={{ color: mod.color }} />
                  </div>
                  <span className="text-sm font-medium flex-1">{mod.title}</span>
                  {prog && (
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      prog.percentage >= 80 ? 'bg-green-500/20 text-green-400' :
                      prog.percentage >= 60 ? 'bg-amber-500/20 text-amber-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {prog.percentage}%
                    </span>
                  )}
                </NavLink>
              )
            })}
          </nav>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <main className="lg:ml-72 min-h-screen">
        <Outlet />
      </main>
    </div>
  )
}
