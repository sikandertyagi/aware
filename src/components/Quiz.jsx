import { useState } from 'react'
import { CheckCircle, XCircle, ArrowRight, RotateCcw, Trophy } from 'lucide-react'

export default function Quiz({ questions, moduleId, onComplete }) {
  const [currentQ, setCurrentQ] = useState(0)
  const [selected, setSelected] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [answers, setAnswers] = useState([])

  const question = questions[currentQ]

  function handleSelect(index) {
    if (showResult) return
    setSelected(index)
    setShowResult(true)
    const isCorrect = index === question.correct
    if (isCorrect) setScore(s => s + 1)
    setAnswers(prev => [...prev, { selected: index, correct: question.correct, isCorrect }])
  }

  function handleNext() {
    if (currentQ + 1 >= questions.length) {
      const finalScore = score
      setFinished(true)
      onComplete(finalScore, questions.length)
    } else {
      setCurrentQ(q => q + 1)
      setSelected(null)
      setShowResult(false)
    }
  }

  function handleRetry() {
    setCurrentQ(0)
    setSelected(null)
    setShowResult(false)
    setScore(0)
    setFinished(false)
    setAnswers([])
  }

  if (finished) {
    const percentage = Math.round((score / questions.length) * 100)
    const passed = percentage >= 60

    return (
      <div className="animate-fade-in bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center max-w-lg mx-auto">
        <div className={`w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center ${passed ? 'bg-green-100' : 'bg-amber-100'}`}>
          <Trophy className={`w-10 h-10 ${passed ? 'text-green-600' : 'text-amber-600'}`} />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          {passed ? 'Great Job!' : 'Keep Learning!'}
        </h3>
        <p className="text-gray-600 mb-6">
          You scored <span className="font-bold text-gray-800">{score}/{questions.length}</span> ({percentage}%)
        </p>

        <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
          <div
            className={`h-4 rounded-full transition-all duration-1000 ${passed ? 'bg-green-500' : 'bg-amber-500'}`}
            style={{ width: `${percentage}%` }}
          />
        </div>

        <div className="space-y-3 mb-6 text-left">
          {answers.map((a, i) => (
            <div key={i} className={`flex items-start gap-3 p-3 rounded-lg ${a.isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
              {a.isCorrect
                ? <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                : <XCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />}
              <span className="text-sm text-gray-700">Q{i + 1}: {a.isCorrect ? 'Correct' : `Incorrect — correct answer: "${questions[i].options[questions[i].correct]}"`}</span>
            </div>
          ))}
        </div>

        {!passed && (
          <button
            onClick={handleRetry}
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-medium"
          >
            <RotateCcw className="w-4 h-4" /> Try Again
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm font-medium text-gray-500">
          Question {currentQ + 1} of {questions.length}
        </span>
        <span className="text-sm font-medium text-indigo-600">
          Score: {score}/{currentQ + (showResult ? 1 : 0)}
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
        <div
          className="h-2 rounded-full bg-indigo-500 transition-all duration-500"
          style={{ width: `${((currentQ + (showResult ? 1 : 0)) / questions.length) * 100}%` }}
        />
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-6 leading-relaxed">
          {question.question}
        </h3>

        <div className="space-y-3">
          {question.options.map((option, i) => {
            let classes = 'w-full text-left p-4 rounded-xl border-2 transition-all duration-300 flex items-start gap-3 '
            if (!showResult) {
              classes += 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 cursor-pointer'
            } else if (i === question.correct) {
              classes += 'border-green-500 bg-green-50'
            } else if (i === selected) {
              classes += 'border-red-500 bg-red-50'
            } else {
              classes += 'border-gray-200 opacity-50'
            }

            return (
              <button key={i} onClick={() => handleSelect(i)} className={classes} disabled={showResult}>
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                  showResult && i === question.correct ? 'bg-green-500 text-white' :
                  showResult && i === selected ? 'bg-red-500 text-white' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="text-gray-700 pt-1">{option}</span>
              </button>
            )
          })}
        </div>

        {showResult && (
          <div className="mt-6 animate-fade-in">
            <div className={`p-4 rounded-xl ${selected === question.correct ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'}`}>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">{selected === question.correct ? 'Correct!' : 'Not quite.'}</span>{' '}
                {question.explanation}
              </p>
            </div>

            <button
              onClick={handleNext}
              className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-medium"
            >
              {currentQ + 1 >= questions.length ? 'See Results' : 'Next Question'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
