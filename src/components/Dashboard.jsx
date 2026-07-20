import { Link } from 'react-router-dom'
import { modules } from '../data/modules'
import { useProgress } from '../hooks/useProgress'
import ProgressRing from './ProgressRing'
import {
  TrendingUp, AlertTriangle, ShieldCheck, Users,
  ChevronRight, Award, Target, Zap
} from 'lucide-react'

const threatStats = [
  { label: 'Attacks Blocked Today', value: '24,891', icon: ShieldCheck, color: '#10b981', bg: '#ecfdf5' },
  { label: 'Active Threat Level', value: 'MEDIUM', icon: AlertTriangle, color: '#f59e0b', bg: '#fffbeb' },
  { label: 'Employees Trained', value: '1,247', icon: Users, color: '#3b82f6', bg: '#eff6ff' },
  { label: 'Phishing Attempts', value: '156', icon: Target, color: '#ef4444', bg: '#fef2f2' },
]

export default function Dashboard() {
  const { getOverallProgress, getCompletedCount, getModuleProgress } = useProgress()
  const overall = getOverallProgress()
  const completed = getCompletedCount()

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="animate-fade-in mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Cyber Awareness Dashboard</h1>
        <p className="text-gray-500">Stay informed, stay protected. Complete your training modules below.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {threatStats.map((stat, i) => (
          <div
            key={stat.label}
            className={`animate-fade-in stagger-${i + 1} card-hover bg-white rounded-2xl p-5 shadow-sm border border-gray-100`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: stat.bg }}>
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">{stat.label}</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="animate-fade-in stagger-5 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Overall Progress</h3>
          <ProgressRing percentage={overall} size={140} strokeWidth={10} color="#6366f1" />
          <p className="mt-4 text-sm text-gray-500">
            <span className="font-bold text-gray-800">{completed}</span> of <span className="font-bold text-gray-800">8</span> modules completed
          </p>
        </div>

        <div className="animate-fade-in stagger-6 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 shadow-lg text-white col-span-1 lg:col-span-2">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold mb-1">Threat Landscape Overview</h3>
              <p className="text-indigo-200 text-sm">Real-time cyber threat awareness</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center animate-float">
              <Zap className="w-6 h-6" />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <p className="text-2xl font-bold">91%</p>
              <p className="text-xs text-indigo-200 mt-1">of breaches start with phishing</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <p className="text-2xl font-bold">$4.45M</p>
              <p className="text-xs text-indigo-200 mt-1">avg. cost of a data breach</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <p className="text-2xl font-bold">300%</p>
              <p className="text-xs text-indigo-200 mt-1">increase in cyber attacks since 2020</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6 animate-fade-in stagger-7">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">Training Modules</h2>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Award className="w-4 h-4" />
            <span>Complete all modules to earn your certificate</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {modules.map((mod, i) => {
          const prog = getModuleProgress(mod.id)
          return (
            <Link
              key={mod.id}
              to={mod.path}
              className={`animate-fade-in stagger-${(i % 8) + 1} card-hover bg-white rounded-2xl p-5 shadow-sm border border-gray-100 group block no-underline`}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: mod.bgColor }}
                >
                  <mod.icon className="w-6 h-6" style={{ color: mod.color }} />
                </div>
                {prog ? (
                  <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                    prog.percentage >= 80 ? 'bg-green-100 text-green-700' :
                    prog.percentage >= 60 ? 'bg-amber-100 text-amber-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {prog.percentage}%
                  </span>
                ) : (
                  <span className="text-xs px-2.5 py-1 rounded-full font-semibold bg-gray-100 text-gray-500">New</span>
                )}
              </div>

              <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">
                {mod.title}
              </h3>
              <p className="text-sm text-gray-500 mb-4 line-clamp-2">{mod.description}</p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {mod.threats.map(t => (
                  <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">{t}</span>
                ))}
              </div>

              <div className="flex items-center text-indigo-600 text-sm font-medium group-hover:gap-2 transition-all">
                {prog ? 'Review Module' : 'Start Module'}
                <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
