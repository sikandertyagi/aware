import { useState, useEffect } from 'react'
import { Phone, Mail, AlertTriangle, Shield, Clock, DollarSign, UserCheck, Building2 } from 'lucide-react'

const stages = [
  {
    type: 'email',
    from: 'David Chen, CFO',
    fromEmail: 'david.chen@techcorp-mail.com',
    subject: 'URGENT: Vendor Payment - Confidential',
    body: `Hi,

I'm reaching out directly because this requires immediate attention. We have an overdue payment to a critical vendor that needs to be processed TODAY.

The vendor is threatening to halt services which would impact our Q4 deliverables. I've already approved this with the board.

Amount: $89,750.00
Vendor: Nexus Digital Solutions
Priority: IMMEDIATE

I'll send the wire details shortly. Please keep this between us until the payment clears — we don't want to cause unnecessary alarm with the team.

Thanks for handling this quickly.

David Chen
Chief Financial Officer
TechCorp Industries`,
    prompt: 'You receive this email from your CFO. What do you do?',
    choices: [
      {
        text: 'Reply asking for wire transfer details to process immediately',
        safe: false,
        risk: 30,
        feedback: 'You\'re complying with an unverified urgent financial request — the #1 red flag of CEO/CFO fraud.',
      },
      {
        text: 'Call David Chen directly on his known phone number to verify',
        safe: true,
        risk: 0,
        feedback: 'Excellent! Always verify urgent financial requests through a separate, trusted communication channel.',
      },
    ],
  },
  {
    type: 'phone',
    callerName: 'David Chen (CFO)',
    callerId: '+1 (555) 0142',
    transcript: [
      { speaker: 'caller', text: '"Hi, it\'s David. Did you get my email about the vendor payment?"' },
      { speaker: 'you', text: '"Yes, I was just reviewing it..."' },
      { speaker: 'caller', text: '"Great. Look, I know it\'s unusual but the board approved this last night. The vendor account details have changed — I\'ll email them to you now. Can you process it within the hour? I\'m about to board a flight and won\'t be reachable."' },
      { speaker: 'you', text: '"..." ' },
    ],
    prompt: 'You receive a phone call that sounds like your CFO, adding pressure. How do you proceed?',
    choices: [
      {
        text: 'Process the payment — the CFO confirmed it personally by phone',
        safe: false,
        risk: 35,
        feedback: 'Voice deepfakes can impersonate anyone. A phone call alone is not sufficient verification for financial transactions.',
      },
      {
        text: 'Explain you need to follow the standard payment approval process regardless',
        safe: true,
        risk: 0,
        feedback: 'Perfect. Standard processes exist for exactly this reason — no legitimate executive should pressure you to bypass them.',
      },
    ],
  },
  {
    type: 'email',
    from: 'David Chen, CFO',
    fromEmail: 'david.chen@techcorp-mail.com',
    subject: 'RE: URGENT: Vendor Payment - Wire Details',
    body: `Here are the updated wire details:

Bank: First Federal Credit Union
Account Name: Nexus Digital Solutions LLC
Account Number: 7829104563
Routing Number: 071923485
Reference: TechCorp-Q4-URGENT

Please process immediately and send me confirmation. I need this done before my 3PM flight.

Note: Our usual payment portal is down for maintenance, so please process this manually through the bank directly.

David`,
    prompt: 'The "CFO" sends wire details and asks you to bypass the normal payment portal. Your move?',
    choices: [
      {
        text: 'Process the manual wire transfer — the portal is down and this is urgent',
        safe: false,
        risk: 25,
        feedback: 'Bypassing standard payment systems is exactly what fraudsters want. Always use established channels.',
      },
      {
        text: 'Contact the IT team to verify if the payment portal is really down, and alert your manager',
        safe: true,
        risk: 0,
        feedback: 'Smart move! Verifying the claimed system outage and involving your chain of command are both correct steps.',
      },
    ],
  },
  {
    type: 'escalation',
    from: 'David Chen, CFO',
    content: '"I\'m extremely disappointed in the delay. This is going to cost us the vendor relationship and potentially millions in Q4 revenue. I\'m noting this for your performance review. Process the payment NOW or I\'ll have to escalate to the CEO."',
    prompt: 'The pressure intensifies with threats to your job performance. Final decision?',
    choices: [
      {
        text: 'Give in to the pressure and process the payment to avoid consequences',
        safe: false,
        risk: 10,
        feedback: 'Threats and intimidation are hallmarks of fraud. A real executive would support proper procedures.',
      },
      {
        text: 'Report the entire interaction to security and your direct manager immediately',
        safe: true,
        risk: 0,
        feedback: 'Absolutely right. Threats for following protocol confirm this is fraudulent. You just prevented a $89,750 loss.',
      },
    ],
  },
]

export default function CyberFraudSim() {
  const [currentStage, setCurrentStage] = useState(0)
  const [riskLevel, setRiskLevel] = useState(0)
  const [results, setResults] = useState([])
  const [finished, setFinished] = useState(false)
  const [showStage, setShowStage] = useState(false)
  const [callProgress, setCallProgress] = useState(0)
  const [showingCall, setShowingCall] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowStage(true), 500)
    return () => clearTimeout(timer)
  }, [currentStage])

  useEffect(() => {
    if (!showingCall) return
    const stage = stages[currentStage]
    if (stage.type !== 'phone') return
    if (callProgress >= stage.transcript.length) {
      setShowingCall(false)
      return
    }
    const timer = setTimeout(() => setCallProgress(c => c + 1), 2000)
    return () => clearTimeout(timer)
  }, [showingCall, callProgress, currentStage])

  function handleChoice(choice) {
    setRiskLevel(r => Math.min(100, r + choice.risk))
    setResults(prev => [...prev, {
      stage: currentStage,
      safe: choice.safe,
      feedback: choice.feedback,
      choice: choice.text,
    }])

    if (currentStage + 1 >= stages.length) {
      setTimeout(() => setFinished(true), 1000)
    } else {
      setShowStage(false)
      setTimeout(() => {
        setCurrentStage(c => c + 1)
        if (stages[currentStage + 1]?.type === 'phone') {
          setShowingCall(true)
          setCallProgress(0)
        }
      }, 500)
    }
  }

  const safeCount = results.filter(r => r.safe).length

  if (finished) {
    const score = Math.round((safeCount / stages.length) * 100)
    return (
      <div className="animate-fade-in">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white mb-6">
          <h3 className="text-2xl font-bold mb-2">Fraud Simulation Complete</h3>
          <p className="text-slate-300 mb-6">
            {riskLevel === 0
              ? 'Outstanding! You successfully identified and blocked a CEO fraud attempt worth $89,750.'
              : `The attacker exploited ${stages.length - safeCount} weak point(s) in your defenses. In a real attack, your organization could have lost $89,750.`}
          </p>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-1">
                <span>Financial Risk Exposure</span>
                <span className="font-bold">{riskLevel}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-4">
                <div
                  className={`h-4 rounded-full transition-all duration-1000 ${riskLevel > 50 ? 'bg-red-500' : riskLevel > 20 ? 'bg-amber-500' : 'bg-green-500'}`}
                  style={{ width: `${riskLevel}%` }}
                />
              </div>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">{safeCount}/{stages.length}</p>
              <p className="text-xs text-slate-400">correct decisions</p>
            </div>
          </div>

          <div className="space-y-3">
            {results.map((r, i) => (
              <div key={i} className={`flex items-start gap-3 p-3 rounded-xl ${r.safe ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                {r.safe
                  ? <Shield className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
                  : <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />}
                <div>
                  <p className="text-sm font-medium">{r.choice}</p>
                  <p className="text-xs text-slate-300 mt-1">{r.feedback}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-4">
          <h4 className="font-bold text-red-800 mb-2">How This Attack Works (BEC Fraud)</h4>
          <p className="text-sm text-red-700 mb-3">Business Email Compromise (BEC) costs organizations $2.7 billion annually. Attackers impersonate executives using spoofed emails and even AI-generated voice calls.</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-red-600">$2.7B</p>
              <p className="text-xs text-gray-500">annual BEC losses</p>
            </div>
            <div className="bg-white rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-red-600">65%</p>
              <p className="text-xs text-gray-500">of orgs targeted</p>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
          <h4 className="font-bold text-amber-800 mb-3">Key Takeaways</h4>
          <ul className="space-y-2 text-sm text-amber-900">
            <li>- Always verify financial requests through a separate, trusted channel</li>
            <li>- Never bypass standard payment approval processes, regardless of urgency</li>
            <li>- Pressure and threats are manipulation tactics — real executives support proper procedures</li>
            <li>- AI-generated voice deepfakes can now mimic anyone's voice convincingly</li>
            <li>- When something feels wrong, trust your instincts and report it</li>
          </ul>
        </div>
      </div>
    )
  }

  const stage = stages[currentStage]

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800">CEO Fraud Simulation</h3>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-500">RISK</span>
          <div className="w-32 bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-700 ${riskLevel > 50 ? 'bg-red-500' : riskLevel > 20 ? 'bg-amber-500' : 'bg-green-500'}`}
              style={{ width: `${riskLevel}%` }}
            />
          </div>
          <DollarSign className={`w-4 h-4 ${riskLevel > 50 ? 'text-red-500' : riskLevel > 20 ? 'text-amber-500' : 'text-green-500'}`} />
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        {stages.map((_, i) => (
          <div key={i} className={`flex-1 h-1.5 rounded-full transition-all ${
            i < currentStage ? 'bg-blue-500' : i === currentStage ? 'bg-blue-300' : 'bg-gray-200'
          }`} />
        ))}
      </div>

      {showStage && (
        <div className="animate-fade-in">
          {stage.type === 'email' && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-4">
              <div className="bg-gray-50 border-b px-4 py-3 flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-800">{stage.subject}</p>
                  <p className="text-xs text-gray-400">From: {stage.from} &lt;{stage.fromEmail}&gt;</p>
                </div>
                <span className="ml-auto text-xs text-red-500 font-medium">URGENT</span>
              </div>
              <div className="p-5 text-sm text-gray-700 whitespace-pre-line font-mono leading-relaxed">
                {stage.body}
              </div>
            </div>
          )}

          {stage.type === 'phone' && (
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 mb-4 text-white">
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto bg-green-500 rounded-full flex items-center justify-center mb-3 animate-pulse">
                  <Phone className="w-8 h-8" />
                </div>
                <p className="font-medium">{stage.callerName}</p>
                <p className="text-sm text-gray-400">{stage.callerId}</p>
                <p className="text-xs text-green-400 mt-1">Incoming Call</p>
              </div>
              <div className="space-y-3">
                {stage.transcript.slice(0, callProgress).map((line, i) => (
                  <div key={i} className={`p-3 rounded-xl text-sm animate-fade-in ${
                    line.speaker === 'caller' ? 'bg-gray-700 mr-8' : 'bg-blue-600/30 ml-8'
                  }`}>
                    <span className="text-xs text-gray-400 block mb-1">
                      {line.speaker === 'caller' ? stage.callerName : 'You'}
                    </span>
                    {line.text}
                  </div>
                ))}
              </div>
            </div>
          )}

          {stage.type === 'escalation' && (
            <div className="bg-gradient-to-br from-red-900 to-red-800 rounded-2xl p-6 mb-4 text-white">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-yellow-400" />
                <p className="font-bold">Escalation — Pressure Tactics</p>
              </div>
              <div className="bg-black/30 rounded-xl p-4 text-sm italic">
                {stage.content}
              </div>
              <p className="text-xs text-red-300 mt-3">From: {stage.from}</p>
            </div>
          )}

          <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
            <p className="text-sm text-gray-600 mb-3 font-medium">{stage.prompt}</p>
            <div className="space-y-2">
              {stage.choices.map((choice, i) => (
                <button
                  key={i}
                  onClick={() => handleChoice(choice)}
                  disabled={showingCall && callProgress < (stage.transcript?.length || 0)}
                  className={`w-full text-left p-3 rounded-xl text-sm transition-all duration-200 border ${
                    choice.safe
                      ? 'border-green-200 bg-green-50 text-green-800 hover:bg-green-100'
                      : 'border-red-200 bg-red-50 text-red-800 hover:bg-red-100'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {choice.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
