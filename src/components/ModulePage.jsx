import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle, XCircle, AlertTriangle, BookOpen } from 'lucide-react'
import { modules } from '../data/modules'
import { quizzes } from '../data/quizzes'
import { useProgress } from '../hooks/useProgress'
import Quiz from './Quiz'
import { useState } from 'react'
import { moduleContent } from '../data/content'

export default function ModulePage() {
  const { moduleId } = useParams()
  const mod = modules.find(m => m.id === moduleId)
  const questions = quizzes[moduleId]
  const content = moduleContent[moduleId]
  const { updateModuleProgress, getModuleProgress } = useProgress()
  const [showQuiz, setShowQuiz] = useState(false)
  const progress = getModuleProgress(moduleId)

  if (!mod || !content) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">Module not found.</p>
        <Link to="/" className="text-indigo-600 hover:underline mt-4 inline-block">Back to Dashboard</Link>
      </div>
    )
  }

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors mb-6 text-sm font-medium">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </Link>

      <div className="animate-fade-in">
        <div className="flex items-start gap-4 mb-8">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: mod.bgColor }}>
            <mod.icon className="w-8 h-8" style={{ color: mod.color }} />
          </div>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">{mod.title}</h1>
            <p className="text-gray-500">{mod.description}</p>
            {progress && (
              <div className="mt-2 inline-flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-700 font-medium">
                  Completed — Score: {progress.score}/{progress.total} ({progress.percentage}%)
                </span>
              </div>
            )}
          </div>
        </div>

        {!showQuiz ? (
          <>
            <div className="space-y-6 mb-8">
              {content.sections.map((section, i) => (
                <div key={i} className={`animate-fade-in stagger-${i + 1} bg-white rounded-2xl p-6 shadow-sm border border-gray-100`}>
                  <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white" style={{ backgroundColor: mod.color }}>
                      {i + 1}
                    </span>
                    {section.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-4">{section.description}</p>

                  {section.tips && (
                    <div className="space-y-2">
                      {section.tips.map((tip, j) => (
                        <div key={j} className="flex items-start gap-3 p-3 rounded-xl bg-green-50 border border-green-100">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                          <span className="text-sm text-gray-700">{tip}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {section.warnings && (
                    <div className="space-y-2 mt-3">
                      {section.warnings.map((warn, j) => (
                        <div key={j} className="flex items-start gap-3 p-3 rounded-xl bg-red-50 border border-red-100">
                          <XCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
                          <span className="text-sm text-gray-700">{warn}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {section.alerts && (
                    <div className="space-y-2 mt-3">
                      {section.alerts.map((alert, j) => (
                        <div key={j} className="flex items-start gap-3 p-3 rounded-xl bg-amber-50 border border-amber-100">
                          <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                          <span className="text-sm text-gray-700">{alert}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {content.scenario && (
                <div className="animate-fade-in bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white">
                  <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-400" />
                    Real-World Scenario
                  </h3>
                  <p className="text-slate-300 leading-relaxed mb-4">{content.scenario.description}</p>
                  <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                    <p className="text-sm font-semibold text-amber-400 mb-1">What happened:</p>
                    <p className="text-sm text-slate-300">{content.scenario.outcome}</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm mt-3">
                    <p className="text-sm font-semibold text-green-400 mb-1">How to prevent it:</p>
                    <p className="text-sm text-slate-300">{content.scenario.prevention}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="text-center">
              <button
                onClick={() => setShowQuiz(true)}
                className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-colors font-semibold text-lg shadow-lg shadow-indigo-200 hover:shadow-indigo-300"
              >
                <BookOpen className="w-5 h-5" />
                {progress ? 'Retake Quiz' : 'Take the Quiz'}
              </button>
            </div>
          </>
        ) : (
          <Quiz
            questions={questions}
            moduleId={moduleId}
            onComplete={(score, total) => updateModuleProgress(moduleId, score, total)}
          />
        )}
      </div>
    </div>
  )
}
