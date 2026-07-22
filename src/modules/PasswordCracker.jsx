import { useState, useEffect, useRef } from 'react'
import { Lock, Unlock, Zap, Shield, Clock, AlertTriangle, Eye, EyeOff } from 'lucide-react'

const commonPasswords = [
  'password', '123456', 'qwerty', 'admin', 'letmein',
  'welcome', 'monkey', 'dragon', 'master', 'abc123',
]

function estimateCrackTime(password) {
  if (!password) return { time: '-', score: 0, label: 'Enter a password', color: 'gray' }

  let poolSize = 0
  if (/[a-z]/.test(password)) poolSize += 26
  if (/[A-Z]/.test(password)) poolSize += 26
  if (/[0-9]/.test(password)) poolSize += 10
  if (/[^a-zA-Z0-9]/.test(password)) poolSize += 33

  const combinations = Math.pow(poolSize, password.length)
  const attemptsPerSecond = 10_000_000_000

  if (commonPasswords.includes(password.toLowerCase())) {
    return { time: 'Instant (dictionary attack)', score: 0, label: 'Common password!', color: 'red', seconds: 0 }
  }

  const seconds = combinations / attemptsPerSecond / 2

  if (seconds < 1) return { time: 'Less than 1 second', score: 5, label: 'Extremely Weak', color: 'red', seconds }
  if (seconds < 60) return { time: `${Math.round(seconds)} seconds`, score: 10, label: 'Very Weak', color: 'red', seconds }
  if (seconds < 3600) return { time: `${Math.round(seconds / 60)} minutes`, score: 20, label: 'Weak', color: 'orange', seconds }
  if (seconds < 86400) return { time: `${Math.round(seconds / 3600)} hours`, score: 30, label: 'Poor', color: 'orange', seconds }
  if (seconds < 86400 * 30) return { time: `${Math.round(seconds / 86400)} days`, score: 40, label: 'Fair', color: 'yellow', seconds }
  if (seconds < 86400 * 365) return { time: `${Math.round(seconds / 86400 / 30)} months`, score: 55, label: 'Moderate', color: 'yellow', seconds }
  if (seconds < 86400 * 365 * 100) return { time: `${Math.round(seconds / 86400 / 365)} years`, score: 70, label: 'Good', color: 'lime', seconds }
  if (seconds < 86400 * 365 * 1000000) return { time: `${Math.round(seconds / 86400 / 365 / 1000).toLocaleString()}K years`, score: 85, label: 'Strong', color: 'green', seconds }
  return { time: 'Millions of years', score: 100, label: 'Excellent', color: 'green', seconds }
}

function getPasswordIssues(password) {
  const issues = []
  if (!password) return issues
  if (password.length < 8) issues.push('Too short — use at least 12 characters')
  if (!/[A-Z]/.test(password)) issues.push('No uppercase letters')
  if (!/[a-z]/.test(password)) issues.push('No lowercase letters')
  if (!/[0-9]/.test(password)) issues.push('No numbers')
  if (!/[^a-zA-Z0-9]/.test(password)) issues.push('No special characters (!@#$%^&*)')
  if (commonPasswords.includes(password.toLowerCase())) issues.push('This is in the top 10 most common passwords')
  if (/(.)\1{2,}/.test(password)) issues.push('Repeated characters detected')
  if (/^(123|abc|qwerty|pass)/i.test(password)) issues.push('Starts with a common pattern')
  return issues
}

const presetPasswords = [
  { label: 'password', value: 'password' },
  { label: 'P@ssw0rd', value: 'P@ssw0rd' },
  { label: 'Tr0ub4dor&3', value: 'Tr0ub4dor&3' },
  { label: 'correct horse battery staple', value: 'correct horse battery staple' },
]

export default function PasswordCracker() {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(true)
  const [cracking, setCracking] = useState(false)
  const [crackDisplay, setCrackDisplay] = useState('')
  const [crackProgress, setCrackProgress] = useState(0)
  const intervalRef = useRef(null)

  const result = estimateCrackTime(password)
  const issues = getPasswordIssues(password)

  function startCrackAnimation() {
    if (!password) return
    setCracking(true)
    setCrackProgress(0)
    setCrackDisplay('')

    let progress = 0
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'
    const target = password
    let revealed = 0

    intervalRef.current = setInterval(() => {
      progress += result.score < 30 ? 8 : result.score < 60 ? 3 : 0.5
      if (progress >= 100) progress = 100
      setCrackProgress(progress)

      if (result.score < 30 && progress > (revealed + 1) * (100 / target.length)) {
        revealed = Math.min(revealed + 1, target.length)
      }

      let display = ''
      for (let i = 0; i < target.length; i++) {
        if (i < revealed) {
          display += target[i]
        } else {
          display += chars[Math.floor(Math.random() * chars.length)]
        }
      }
      setCrackDisplay(display)

      if (progress >= 100) {
        clearInterval(intervalRef.current)
        setCrackDisplay(result.score < 50 ? target : display)
        setTimeout(() => setCracking(false), 1000)
      }
    }, 50)
  }

  useEffect(() => {
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [])

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      setCracking(false)
      setCrackProgress(0)
    }
  }, [password])

  const colorMap = {
    red: { bg: 'bg-red-500', text: 'text-red-600', light: 'bg-red-50', border: 'border-red-200' },
    orange: { bg: 'bg-orange-500', text: 'text-orange-600', light: 'bg-orange-50', border: 'border-orange-200' },
    yellow: { bg: 'bg-yellow-500', text: 'text-yellow-600', light: 'bg-yellow-50', border: 'border-yellow-200' },
    lime: { bg: 'bg-lime-500', text: 'text-lime-600', light: 'bg-lime-50', border: 'border-lime-200' },
    green: { bg: 'bg-green-500', text: 'text-green-600', light: 'bg-green-50', border: 'border-green-200' },
    gray: { bg: 'bg-gray-300', text: 'text-gray-500', light: 'bg-gray-50', border: 'border-gray-200' },
  }

  const colors = colorMap[result.color] || colorMap.gray

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800">Password Strength Analyzer</h3>
        <span className="text-xs px-3 py-1 bg-purple-100 text-purple-600 rounded-full font-medium">Interactive</span>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Enter a password to test:</label>
        <div className="relative mb-3">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-mono text-lg focus:outline-none focus:border-blue-500 transition-colors pr-12"
            placeholder="Type any password..."
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        <div className="flex gap-2 mb-4">
          <span className="text-xs text-gray-400 mt-1">Try:</span>
          {presetPasswords.map(p => (
            <button
              key={p.label}
              onClick={() => setPassword(p.value)}
              className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors font-mono"
            >
              {p.label}
            </button>
          ))}
        </div>

        {password && (
          <div className="animate-fade-in">
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className={`font-bold ${colors.text}`}>{result.label}</span>
                <span className="text-gray-500">{result.score}/100</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-500 ${colors.bg}`}
                  style={{ width: `${result.score}%` }}
                />
              </div>
            </div>

            <div className={`${colors.light} ${colors.border} border rounded-xl p-4 mb-4`}>
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">Time to crack:</span>
              </div>
              <p className={`text-2xl font-bold ${colors.text}`}>{result.time}</p>
              <p className="text-xs text-gray-500 mt-1">at 10 billion attempts/second (modern GPU cluster)</p>
            </div>

            {issues.length > 0 && (
              <div className="space-y-1 mb-4">
                {issues.map((issue, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-red-600">
                    <AlertTriangle className="w-3 h-3 shrink-0" /> {issue}
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={startCrackAnimation}
              disabled={cracking}
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl font-medium hover:from-purple-600 hover:to-indigo-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4" />
              {cracking ? 'Cracking...' : 'Simulate Brute Force Attack'}
            </button>

            {cracking && (
              <div className="mt-4 bg-gray-900 rounded-xl p-4 font-mono text-sm animate-fade-in">
                <div className="flex items-center gap-2 text-green-400 mb-2">
                  <Zap className="w-4 h-4" />
                  <span>Brute force attack in progress...</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
                  <div
                    className="h-2 rounded-full bg-green-500 transition-all duration-100"
                    style={{ width: `${crackProgress}%` }}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">Trying:</span>
                  <span className="text-yellow-400 tracking-widest">{crackDisplay}</span>
                </div>
                {crackProgress >= 100 && result.score < 50 && (
                  <div className="mt-2 text-red-400 flex items-center gap-2">
                    <Unlock className="w-4 h-4" /> PASSWORD CRACKED
                  </div>
                )}
                {crackProgress >= 100 && result.score >= 50 && (
                  <div className="mt-2 text-green-400 flex items-center gap-2">
                    <Lock className="w-4 h-4" /> Attack failed — password too strong
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
        <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2">
          <Shield className="w-5 h-5" /> Strong Password Tips
        </h4>
        <ul className="space-y-2 text-sm text-green-900">
          <li>- Use 14+ characters — length beats complexity every time</li>
          <li>- Try passphrases: "purple-elephant-drives-spacecraft" is strong AND memorable</li>
          <li>- Use a password manager to generate and store unique passwords</li>
          <li>- Enable multi-factor authentication (MFA) everywhere possible</li>
          <li>- Never reuse passwords across different accounts</li>
          <li>- Avoid personal info (names, birthdays, pet names) in passwords</li>
        </ul>
      </div>
    </div>
  )
}
