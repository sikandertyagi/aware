import { useState, useEffect, useRef } from 'react'
import { Shield, AlertTriangle, Eye, Send } from 'lucide-react'

const chatScript = [
  {
    sender: 'attacker',
    message: "Hey! I came across your profile and I'm really impressed by your work at TechCorp. Mind if we connect? 😊",
    delay: 1000,
  },
  {
    sender: 'system',
    message: 'A stranger has initiated contact. How do you respond?',
    choices: [
      { text: "Thanks! Sure, always happy to connect with fellow professionals.", safe: false, risk: 5, reveal: "You've accepted contact from an unverified stranger." },
      { text: "Thanks. How did you find my profile? Do we have mutual connections?", safe: true, risk: 0, reveal: "Good instinct — verifying how they found you." },
    ]
  },
  {
    sender: 'attacker',
    message: "I'm a talent scout for a Fortune 500 company. Your skills are exactly what we need. The role pays $250K+ 💰 Can I tell you more?",
    delay: 2000,
  },
  {
    sender: 'system',
    message: 'They\'re dangling an attractive offer. What do you do?',
    choices: [
      { text: "Wow, that sounds amazing! Tell me everything!", safe: false, risk: 10, reveal: "Excitement overrides caution. The attacker knows you're hooked." },
      { text: "Interesting. Can you share the company name and job posting link?", safe: true, risk: 0, reveal: "Asking for verifiable details is the right move." },
    ]
  },
  {
    sender: 'attacker',
    message: "It's confidential for now 🤫 But I'd love to learn more about what you're working on currently. What projects are you leading? Any cutting-edge stuff?",
    delay: 2500,
  },
  {
    sender: 'system',
    message: 'They\'re asking about your current projects while keeping their side vague.',
    choices: [
      { text: "Well, I'm leading our new AI platform launch. It's going to disrupt the market!", safe: false, risk: 25, reveal: "🚨 You just disclosed an unannounced product to an unverified contact." },
      { text: "I appreciate the interest but I can't discuss work projects with external contacts. Can you send details to our HR?", safe: true, risk: 0, reveal: "Perfect response — redirecting to official channels." },
    ]
  },
  {
    sender: 'attacker',
    message: "You seem so passionate about your work! I love that 😍 Hey, I'll be in your city next week. Maybe we could grab dinner and discuss the opportunity? Just us.",
    delay: 2000,
  },
  {
    sender: 'system',
    message: 'The conversation is shifting from professional to personal. Red flag?',
    choices: [
      { text: "Sure, that sounds nice! Send me the restaurant details.", safe: false, risk: 20, reveal: "Meeting an unverified contact alone — classic honeytrap escalation." },
      { text: "I'd prefer to keep things professional. Let's schedule a video call with your company's HR team.", safe: true, risk: 0, reveal: "Maintaining professional boundaries is key." },
    ]
  },
  {
    sender: 'attacker',
    message: "I totally understand! By the way, I noticed your badge in that office photo you posted. Your building looks so modern! Which floor is your team on?",
    delay: 2000,
  },
  {
    sender: 'system',
    message: 'They\'re now asking about physical security details of your workplace.',
    choices: [
      { text: "Oh that photo! Yeah we're on the 14th floor, the secure R&D wing.", safe: false, risk: 30, reveal: "🚨 CRITICAL: You disclosed your secure facility location to a potential threat actor." },
      { text: "I need to end this conversation. I'm reporting this to my security team.", safe: true, risk: 0, reveal: "Exactly right. This conversation has multiple red flags of a honeytrap operation." },
    ]
  },
]

export default function HoneytrapChat() {
  const [messages, setMessages] = useState([])
  const [scriptIndex, setScriptIndex] = useState(0)
  const [riskLevel, setRiskLevel] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [finished, setFinished] = useState(false)
  const [reveals, setReveals] = useState([])
  const [choicesMade, setChoicesMade] = useState(0)
  const [safeChoices, setSafeChoices] = useState(0)
  const chatRef = useRef(null)

  useEffect(() => {
    if (scriptIndex < chatScript.length) {
      const item = chatScript[scriptIndex]
      if (item.sender === 'attacker') {
        setIsTyping(true)
        const timer = setTimeout(() => {
          setIsTyping(false)
          setMessages(prev => [...prev, { sender: 'attacker', text: item.message }])
          setScriptIndex(i => i + 1)
        }, item.delay)
        return () => clearTimeout(timer)
      }
    }
  }, [scriptIndex])

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages, isTyping])

  function handleChoice(choice, item) {
    setMessages(prev => [...prev, { sender: 'user', text: choice.text }])
    setRiskLevel(r => Math.min(100, r + choice.risk))
    setReveals(prev => [...prev, { text: choice.reveal, safe: choice.safe }])
    setChoicesMade(c => c + 1)
    if (choice.safe) setSafeChoices(s => s + 1)

    if (scriptIndex + 1 >= chatScript.length) {
      setTimeout(() => setFinished(true), 1000)
    } else {
      setScriptIndex(i => i + 1)
    }
  }

  const currentItem = scriptIndex < chatScript.length ? chatScript[scriptIndex] : null
  const isChoiceTime = currentItem && currentItem.sender === 'system'

  if (finished) {
    const score = Math.round((safeChoices / choicesMade) * 100)
    return (
      <div className="animate-fade-in">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white mb-6">
          <h3 className="text-2xl font-bold mb-2">Simulation Complete</h3>
          <p className="text-slate-300 mb-6">Here's what the attacker learned from this conversation:</p>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-1">
                <span>Your Risk Exposure</span>
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
              <p className="text-3xl font-bold">{safeChoices}/{choicesMade}</p>
              <p className="text-xs text-slate-400">safe choices</p>
            </div>
          </div>

          <div className="space-y-3">
            {reveals.map((r, i) => (
              <div key={i} className={`flex items-start gap-3 p-3 rounded-xl ${r.safe ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                {r.safe
                  ? <Shield className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
                  : <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />}
                <span className="text-sm">{r.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
          <h4 className="font-bold text-amber-800 mb-3 flex items-center gap-2">
            <Eye className="w-5 h-5" /> Key Takeaways
          </h4>
          <ul className="space-y-2 text-sm text-amber-900">
            <li>- Honeytraps build trust slowly before extracting information</li>
            <li>- "Confidential" opportunities that avoid official channels are red flags</li>
            <li>- Never discuss projects, office locations, or security details with unverified contacts</li>
            <li>- If something feels off, report it to your security team immediately</li>
            <li>- Flattery and romantic interest are manipulation tactics, not genuine connection</li>
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800">Live Honeytrap Simulation</h3>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-500">DANGER LEVEL</span>
          <div className="w-32 bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-700 ${riskLevel > 50 ? 'bg-red-500' : riskLevel > 20 ? 'bg-amber-500' : 'bg-green-500'}`}
              style={{ width: `${riskLevel}%` }}
            />
          </div>
          <span className={`text-sm font-bold ${riskLevel > 50 ? 'text-red-600' : riskLevel > 20 ? 'text-amber-600' : 'text-green-600'}`}>
            {riskLevel}%
          </span>
        </div>
      </div>

      <div className="bg-gradient-to-b from-[#0b141a] to-[#0b141a] rounded-2xl overflow-hidden shadow-2xl border border-gray-700">
        {/* Chat header */}
        <div className="bg-[#202c33] px-4 py-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
            AS
          </div>
          <div>
            <p className="text-white text-sm font-medium">Alexandra Sterling</p>
            <p className="text-[#8696a0] text-xs">{isTyping ? 'typing...' : 'online'}</p>
          </div>
          <div className="ml-auto">
            <span className="text-xs px-2 py-1 bg-red-500/20 text-red-400 rounded-full font-medium">SIMULATED</span>
          </div>
        </div>

        {/* Chat messages */}
        <div ref={chatRef} className="h-96 overflow-y-auto p-4 space-y-3" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}>
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
              <div className={`max-w-[75%] px-3 py-2 rounded-lg text-sm ${
                msg.sender === 'user'
                  ? 'bg-[#005c4b] text-white rounded-tr-none'
                  : 'bg-[#202c33] text-[#e9edef] rounded-tl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start animate-fade-in">
              <div className="bg-[#202c33] px-4 py-3 rounded-lg rounded-tl-none">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-[#8696a0] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-[#8696a0] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-[#8696a0] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Choice area */}
        {isChoiceTime && (
          <div className="bg-[#1a2329] border-t border-[#2a3942] p-4">
            <p className="text-[#8696a0] text-xs mb-3 font-medium uppercase tracking-wide">
              {currentItem.message}
            </p>
            <div className="space-y-2">
              {currentItem.choices.map((choice, i) => (
                <button
                  key={i}
                  onClick={() => handleChoice(choice, currentItem)}
                  className={`w-full text-left p-3 rounded-xl text-sm transition-all duration-200 border ${
                    choice.safe
                      ? 'border-green-500/30 bg-green-500/10 text-green-300 hover:bg-green-500/20'
                      : 'border-red-500/30 bg-red-500/10 text-red-300 hover:bg-red-500/20'
                  }`}
                >
                  {choice.text}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
