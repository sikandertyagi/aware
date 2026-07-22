import { useState, useEffect } from 'react'
import { Search, MapPin, Building2, Users, Calendar, Camera, Shield, AlertTriangle, Eye, ChevronRight, Crosshair } from 'lucide-react'

const socialPosts = [
  {
    id: 1,
    platform: 'LinkedIn',
    content: 'Thrilled to join TechCorp as Senior Security Engineer! 🎉 Starting next Monday in the downtown HQ. #NewJob #CyberSecurity',
    timestamp: '2 weeks ago',
    dataExtracted: ['Employer: TechCorp', 'Role: Senior Security Engineer', 'Start date: identifiable', 'Location: Downtown HQ'],
    riskLevel: 'high',
  },
  {
    id: 2,
    platform: 'Instagram',
    content: '📸 New badge, new me! Love the view from the 22nd floor. #OfficeLife #WorkView',
    timestamp: '1 week ago',
    hasImage: true,
    imageDescription: 'Photo shows employee badge (partially visible: name + photo) with city skyline through office windows',
    dataExtracted: ['Badge design visible (can be cloned)', 'Floor number: 22nd', 'Window view reveals approximate building location', 'Badge access level potentially visible'],
    riskLevel: 'critical',
  },
  {
    id: 3,
    platform: 'Twitter/X',
    content: 'Working late again on Project Titan. The Q4 deadline is killing us 😩 At least the team dinner at Mario\'s Italian on 5th made up for it!',
    timestamp: '5 days ago',
    dataExtracted: ['Project name: Titan', 'Timeline: Q4 deadline', 'Team morale: stressed/overworked', 'Frequent restaurant: Mario\'s Italian on 5th St'],
    riskLevel: 'high',
  },
  {
    id: 4,
    platform: 'Facebook',
    content: 'Happy 3rd birthday to my little princess Emma! 🎂 Can\'t believe it was just yesterday we brought you home from St. Mary\'s Hospital. Daddy loves you! 💕',
    timestamp: '3 days ago',
    dataExtracted: ['Child\'s name: Emma', 'Child\'s age: 3', 'Birth hospital: St. Mary\'s', 'Family structure: has daughter'],
    riskLevel: 'medium',
  },
  {
    id: 5,
    platform: 'Instagram',
    content: 'Morning run with Buddy 🐕 through Riverside Park. Same route every day but never gets old! 6AM club ☀️ #FitnessGoals',
    timestamp: '1 day ago',
    dataExtracted: ['Pet\'s name: Buddy', 'Daily routine: runs at 6AM', 'Location: Riverside Park', 'Predictable schedule/route'],
    riskLevel: 'medium',
  },
]

const attackProfile = [
  { category: 'Identity', icon: Users, items: [] },
  { category: 'Workplace', icon: Building2, items: [] },
  { category: 'Location', icon: MapPin, items: [] },
  { category: 'Personal', icon: Calendar, items: [] },
  { category: 'Security Vuln.', icon: Crosshair, items: [] },
]

function buildProfile(scannedPosts) {
  const profile = attackProfile.map(c => ({ ...c, items: [] }))
  const postData = socialPosts.filter(p => scannedPosts.includes(p.id))

  postData.forEach(post => {
    post.dataExtracted.forEach(item => {
      const lower = item.toLowerCase()
      if (lower.includes('employer') || lower.includes('role') || lower.includes('project') || lower.includes('team') || lower.includes('badge') || lower.includes('floor'))
        profile.find(c => c.category === 'Workplace').items.push(item)
      else if (lower.includes('location') || lower.includes('building') || lower.includes('park') || lower.includes('restaurant') || lower.includes('route') || lower.includes('downtown'))
        profile.find(c => c.category === 'Location').items.push(item)
      else if (lower.includes('child') || lower.includes('pet') || lower.includes('family') || lower.includes('hospital') || lower.includes('name:') || lower.includes('age'))
        profile.find(c => c.category === 'Personal').items.push(item)
      else if (lower.includes('access') || lower.includes('schedule') || lower.includes('predictable') || lower.includes('morale') || lower.includes('deadline') || lower.includes('window') || lower.includes('clone') || lower.includes('start date'))
        profile.find(c => c.category === 'Security Vuln.').items.push(item)
      else
        profile.find(c => c.category === 'Identity').items.push(item)
    })
  })

  return profile.filter(c => c.items.length > 0)
}

export default function SocialMediaOSINT() {
  const [phase, setPhase] = useState('intro')
  const [scanning, setScanning] = useState(false)
  const [scannedPosts, setScannedPosts] = useState([])
  const [currentScan, setCurrentScan] = useState(0)
  const [showAttack, setShowAttack] = useState(false)

  function startScan() {
    setPhase('scanning')
    setScanning(true)
    setCurrentScan(0)
    setScannedPosts([])
  }

  useEffect(() => {
    if (!scanning) return
    if (currentScan >= socialPosts.length) {
      setScanning(false)
      setTimeout(() => setPhase('profile'), 1000)
      return
    }
    const timer = setTimeout(() => {
      setScannedPosts(prev => [...prev, socialPosts[currentScan].id])
      setCurrentScan(c => c + 1)
    }, 1800)
    return () => clearTimeout(timer)
  }, [scanning, currentScan])

  const profile = buildProfile(scannedPosts)

  if (phase === 'intro') {
    return (
      <div className="text-center py-8 animate-fade-in">
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
          <Eye className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-3">OSINT Attack Simulation</h3>
        <p className="text-gray-500 max-w-md mx-auto mb-8">
          Watch how a cyber attacker uses your public social media posts to build a complete profile for a targeted attack.
        </p>
        <button
          onClick={startScan}
          className="px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-medium hover:from-red-600 hover:to-red-700 transition-all shadow-lg shadow-red-500/25"
        >
          Launch Simulated Attack
        </button>
      </div>
    )
  }

  if (showAttack) {
    return (
      <div className="animate-fade-in">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white mb-6">
          <h3 className="text-2xl font-bold mb-2">Attack Vectors Identified</h3>
          <p className="text-slate-300 mb-6">Based on the OSINT profile, here's how an attacker could exploit this information:</p>

          <div className="space-y-4">
            <div className="bg-red-500/20 rounded-xl p-4">
              <h4 className="font-bold text-red-300 mb-2">1. Spear Phishing Attack</h4>
              <p className="text-sm text-slate-300">Using the employee's name, role, and Project Titan knowledge, craft a convincing email appearing to come from a colleague about the Q4 deadline, containing a malicious attachment.</p>
            </div>
            <div className="bg-red-500/20 rounded-xl p-4">
              <h4 className="font-bold text-red-300 mb-2">2. Physical Security Breach</h4>
              <p className="text-sm text-slate-300">Clone the badge design from the Instagram photo, identify the building from the window view, and target the 22nd floor. The predictable 6AM running schedule reveals when the employee is away from home.</p>
            </div>
            <div className="bg-red-500/20 rounded-xl p-4">
              <h4 className="font-bold text-red-300 mb-2">3. Social Engineering Call</h4>
              <p className="text-sm text-slate-300">"Hi, this is Dr. Miller from St. Mary's Hospital. We're updating records for Emma's birth certificate..." — personal details make the pretext extremely convincing.</p>
            </div>
            <div className="bg-red-500/20 rounded-xl p-4">
              <h4 className="font-bold text-red-300 mb-2">4. Password Guessing</h4>
              <p className="text-sm text-slate-300">Common password patterns using: "Emma2021", "Buddy123", "TechCorp!", "Titan2024" — people often use personal details in passwords.</p>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
          <h4 className="font-bold text-amber-800 mb-3">How to Protect Yourself</h4>
          <ul className="space-y-2 text-sm text-amber-900">
            <li>- Never post photos of work badges, access cards, or security infrastructure</li>
            <li>- Avoid sharing specific project names, timelines, or internal details</li>
            <li>- Don't reveal your daily routine, location patterns, or predictable schedules</li>
            <li>- Be cautious with personal milestones that reveal security question answers</li>
            <li>- Review your privacy settings on all social platforms regularly</li>
            <li>- Remember: anything public can and will be used against you</li>
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800">OSINT Reconnaissance</h3>
        <span className="text-xs px-3 py-1 bg-red-100 text-red-600 rounded-full font-medium">
          {scannedPosts.length}/{socialPosts.length} posts scanned
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
            <Search className="w-4 h-4" /> Social Media Feed — Attacker's View
          </h4>
          <div className="space-y-3">
            {socialPosts.map((post, index) => {
              const isScanned = scannedPosts.includes(post.id)
              const isScanning = scanning && currentScan === index
              return (
                <div
                  key={post.id}
                  className={`p-4 rounded-xl border-2 transition-all duration-500 ${
                    isScanning ? 'border-red-400 bg-red-50 animate-pulse shadow-lg shadow-red-500/20' :
                    isScanned ? 'border-red-200 bg-red-50/50' :
                    'border-gray-200 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                      post.platform === 'LinkedIn' ? 'bg-blue-100 text-blue-700' :
                      post.platform === 'Instagram' ? 'bg-pink-100 text-pink-700' :
                      post.platform === 'Twitter/X' ? 'bg-gray-100 text-gray-700' :
                      'bg-blue-100 text-blue-800'
                    }`}>{post.platform}</span>
                    <span className="text-xs text-gray-400">{post.timestamp}</span>
                    {isScanned && (
                      <span className={`text-xs px-2 py-0.5 rounded-full ml-auto font-medium ${
                        post.riskLevel === 'critical' ? 'bg-red-500 text-white' :
                        post.riskLevel === 'high' ? 'bg-orange-100 text-orange-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>{post.riskLevel.toUpperCase()}</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{post.content}</p>
                  {post.hasImage && (
                    <div className="bg-gray-100 rounded-lg p-3 mb-2 flex items-center gap-2">
                      <Camera className="w-4 h-4 text-gray-400" />
                      <span className="text-xs text-gray-500 italic">{post.imageDescription}</span>
                    </div>
                  )}
                  {isScanned && (
                    <div className="mt-2 space-y-1 animate-fade-in">
                      <p className="text-xs font-bold text-red-600 flex items-center gap-1">
                        <Crosshair className="w-3 h-3" /> Data Extracted:
                      </p>
                      {post.dataExtracted.map((d, i) => (
                        <p key={i} className="text-xs text-red-500 ml-4">→ {d}</p>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
            <Crosshair className="w-4 h-4" /> Attacker's Dossier
          </h4>
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-5 text-white sticky top-4">
            {profile.length === 0 ? (
              <div className="text-center py-8 text-slate-400">
                <Eye className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Scanning social media...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {profile.map((cat, i) => (
                  <div key={i}>
                    <div className="flex items-center gap-2 mb-2">
                      <cat.icon className="w-4 h-4 text-red-400" />
                      <span className="text-xs font-bold text-red-300 uppercase tracking-wide">{cat.category}</span>
                    </div>
                    <div className="space-y-1 ml-6">
                      {cat.items.map((item, j) => (
                        <p key={j} className="text-sm text-slate-300 animate-fade-in">• {item}</p>
                      ))}
                    </div>
                  </div>
                ))}

                {!scanning && scannedPosts.length === socialPosts.length && (
                  <button
                    onClick={() => setShowAttack(true)}
                    className="w-full mt-4 py-3 bg-red-500/20 border border-red-500/30 text-red-300 rounded-xl font-medium hover:bg-red-500/30 transition-colors flex items-center justify-center gap-2"
                  >
                    See Attack Vectors <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
