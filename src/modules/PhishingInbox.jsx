import { useState } from 'react'
import { Mail, AlertTriangle, Shield, Trash2, Flag, ExternalLink, Paperclip, Clock, ChevronLeft } from 'lucide-react'

const emails = [
  {
    id: 1,
    from: 'IT Security Team <security@yourcompany.com>',
    fromDisplay: 'IT Security Team',
    subject: 'Mandatory Password Reset Required',
    preview: 'Your password expires in 24 hours. Click below to reset...',
    time: '9:41 AM',
    body: `Hi Team,

Your corporate password expires in 24 hours. Please click the link below to reset it immediately to avoid losing access to your account.

[Reset Password Now] → https://yourcompany-secure.com/reset

This is a mandatory security update.

Thanks,
IT Security Team`,
    isPhishing: true,
    redFlags: [
      'Domain is "yourcompany-secure.com" — not your real company domain',
      'Creates false urgency with "24 hours" deadline',
      'Legitimate IT teams provide instructions, not suspicious links',
      'No personalization — generic "Hi Team"',
    ],
    hasAttachment: false,
    starred: false,
  },
  {
    id: 2,
    from: 'Sarah Chen <s.chen@yourcompany.com>',
    fromDisplay: 'Sarah Chen',
    subject: 'Q3 Budget Meeting - Thursday 2PM',
    preview: 'Hi, just confirming our budget review meeting...',
    time: '10:15 AM',
    body: `Hi,

Just confirming our Q3 budget review meeting this Thursday at 2PM in Conference Room B.

Please bring your department's spending reports. I've attached the agenda.

See you there!
Sarah`,
    isPhishing: false,
    redFlags: [],
    hasAttachment: true,
    attachmentName: 'Q3_Budget_Agenda.pdf',
    starred: false,
  },
  {
    id: 3,
    from: 'DocuSign <noreply@docuslgn.com>',
    fromDisplay: 'DocuSign',
    subject: 'Complete Your Document Signing',
    preview: 'You have a document waiting for your electronic signature...',
    time: '11:02 AM',
    body: `You have received a document that requires your electronic signature.

Document: Employment_Contract_Amendment_2024.pdf
Sent by: HR Department

[Review & Sign Document] → https://docuslgn.com/sign/abc123

This document expires in 48 hours.

Powered by DocuSign`,
    isPhishing: true,
    redFlags: [
      'Domain is "docuslgn.com" (with letter L) — not "docusign.com" (with letter I)',
      'You weren\'t expecting any document to sign',
      'Artificial 48-hour deadline creates urgency',
      'No specific sender name from HR',
    ],
    hasAttachment: false,
    starred: false,
  },
  {
    id: 4,
    from: 'James Rodriguez <j.rodriguez@yourcompany.com>',
    fromDisplay: 'James Rodriguez',
    subject: 'Re: Project Phoenix Update',
    preview: 'Thanks for the update. The client loved the demo...',
    time: '11:30 AM',
    body: `Thanks for the update. The client loved the demo yesterday!

A few action items from the call:
1. Update the dashboard mockups by Friday
2. Schedule a follow-up call for next Tuesday
3. Send the revised timeline to the PM

Can you handle items 1 and 2? I'll take care of the timeline.

Best,
James`,
    isPhishing: false,
    redFlags: [],
    hasAttachment: false,
    starred: true,
  },
  {
    id: 5,
    from: 'Microsoft 365 <admin@microsoftonline-verify.com>',
    fromDisplay: 'Microsoft 365',
    subject: '⚠️ Unusual Sign-In Activity Detected',
    preview: 'We detected a sign-in to your account from an unusual location...',
    time: '12:18 PM',
    body: `⚠️ Security Alert

We detected a sign-in to your Microsoft 365 account from an unusual location:

Location: Lagos, Nigeria
Device: Unknown Linux Device
Time: Today at 3:42 AM

If this wasn't you, your account may be compromised.

[Secure My Account Now] → https://microsoftonline-verify.com/secure

If this was you, you can ignore this message.

Microsoft Account Security Team`,
    isPhishing: true,
    redFlags: [
      'Domain "microsoftonline-verify.com" is not a real Microsoft domain',
      'Microsoft uses "microsoft.com" or "live.com" for security alerts',
      'Scare tactics with specific fake location details',
      'Real Microsoft alerts direct you to account.microsoft.com',
    ],
    hasAttachment: false,
    starred: false,
  },
  {
    id: 6,
    from: 'CEO Office <ceo@yourcompany.com>',
    fromDisplay: 'David Park (CEO)',
    subject: 'Urgent: Wire Transfer Needed',
    preview: 'I need you to process an urgent wire transfer...',
    time: '1:45 PM',
    body: `Hi,

I'm in a confidential meeting and can't talk right now. I need you to urgently process a wire transfer of $47,500 to a new vendor.

This is time-sensitive and confidential — please don't discuss with anyone else until it's done.

Wire to:
Bank: First National
Account: 8847291056
Routing: 071000013

Please confirm once sent.

David Park
CEO`,
    isPhishing: true,
    redFlags: [
      'CEO asking for urgent wire transfer is a classic BEC (Business Email Compromise) attack',
      '"Confidential — don\'t discuss with anyone" isolates you from verification',
      'Urgency pressure to bypass normal approval processes',
      'Real executives follow proper financial authorization channels',
    ],
    hasAttachment: false,
    starred: false,
  },
]

export default function PhishingInbox() {
  const [selectedEmail, setSelectedEmail] = useState(null)
  const [results, setResults] = useState({})
  const [finished, setFinished] = useState(false)

  const phishingCount = emails.filter(e => e.isPhishing).length
  const answered = Object.keys(results).length
  const correct = Object.values(results).filter(r => r.correct).length

  function handleVerdict(emailId, verdict) {
    const email = emails.find(e => e.id === emailId)
    const isCorrect = verdict === email.isPhishing
    setResults(prev => ({
      ...prev,
      [emailId]: { verdict, correct: isCorrect, isPhishing: email.isPhishing }
    }))

    if (answered + 1 >= emails.length) {
      setTimeout(() => setFinished(true), 1500)
    }
  }

  if (finished) {
    const score = Math.round((correct / emails.length) * 100)
    return (
      <div className="animate-fade-in">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white mb-6">
          <h3 className="text-2xl font-bold mb-2">Inbox Analysis Complete</h3>
          <p className="text-slate-300 mb-6">You correctly identified {correct} out of {emails.length} emails.</p>

          <div className="flex items-center gap-6 mb-6">
            <div className="text-center">
              <p className="text-4xl font-bold">{score}%</p>
              <p className="text-xs text-slate-400">accuracy</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-red-400">{phishingCount}</p>
              <p className="text-xs text-slate-400">phishing emails</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-green-400">{emails.length - phishingCount}</p>
              <p className="text-xs text-slate-400">legitimate emails</p>
            </div>
          </div>

          <div className="space-y-3">
            {emails.map(email => {
              const result = results[email.id]
              return (
                <div key={email.id} className={`p-4 rounded-xl ${result?.correct ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    {result?.correct
                      ? <Shield className="w-5 h-5 text-green-400" />
                      : <AlertTriangle className="w-5 h-5 text-red-400" />}
                    <span className="font-medium text-sm">{email.subject}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ml-auto ${email.isPhishing ? 'bg-red-500/30 text-red-300' : 'bg-green-500/30 text-green-300'}`}>
                      {email.isPhishing ? 'PHISHING' : 'LEGITIMATE'}
                    </span>
                  </div>
                  {email.isPhishing && (
                    <ul className="text-xs text-slate-300 space-y-1 ml-7">
                      {email.redFlags.map((flag, i) => (
                        <li key={i}>- {flag}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
          <h4 className="font-bold text-amber-800 mb-3">Key Takeaways</h4>
          <ul className="space-y-2 text-sm text-amber-900">
            <li>- Always check the sender's actual email domain, not just the display name</li>
            <li>- Urgency + secrecy = red flag. Legitimate requests follow normal processes</li>
            <li>- Hover over links before clicking — the URL should match the claimed sender</li>
            <li>- When in doubt, verify through a separate channel (call the person directly)</li>
            <li>- Report suspicious emails to your IT security team immediately</li>
          </ul>
        </div>
      </div>
    )
  }

  if (selectedEmail) {
    const email = emails.find(e => e.id === selectedEmail)
    const result = results[email.id]
    return (
      <div className="animate-fade-in">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 border-b px-4 py-3 flex items-center gap-3">
            <button onClick={() => setSelectedEmail(null)} className="text-gray-500 hover:text-gray-700">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm font-medium text-gray-700">Back to Inbox</span>
          </div>

          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-1">{email.subject}</h3>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium text-gray-800">{email.fromDisplay}</span>
              <span className="text-xs text-gray-400">&lt;{email.from.match(/<(.+)>/)?.[1] || email.from}&gt;</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
              <Clock className="w-3 h-3" />
              <span>{email.time}</span>
              {email.hasAttachment && (
                <span className="flex items-center gap-1 text-blue-500">
                  <Paperclip className="w-3 h-3" /> {email.attachmentName}
                </span>
              )}
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-6 text-sm text-gray-700 whitespace-pre-line font-mono leading-relaxed">
              {email.body}
            </div>

            {!result ? (
              <div className="flex gap-3">
                <button
                  onClick={() => handleVerdict(email.id, true)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-red-50 border-2 border-red-200 text-red-700 rounded-xl font-medium hover:bg-red-100 transition-colors"
                >
                  <Flag className="w-4 h-4" /> Report as Phishing
                </button>
                <button
                  onClick={() => handleVerdict(email.id, false)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-green-50 border-2 border-green-200 text-green-700 rounded-xl font-medium hover:bg-green-100 transition-colors"
                >
                  <Shield className="w-4 h-4" /> Mark as Safe
                </button>
              </div>
            ) : (
              <div className={`p-4 rounded-xl ${result.correct ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'}`}>
                <div className="flex items-center gap-2 mb-2">
                  {result.correct
                    ? <Shield className="w-5 h-5 text-green-600" />
                    : <AlertTriangle className="w-5 h-5 text-red-600" />}
                  <span className={`font-bold ${result.correct ? 'text-green-700' : 'text-red-700'}`}>
                    {result.correct ? 'Correct!' : 'Incorrect!'}
                  </span>
                  <span className={`text-sm ml-auto px-2 py-0.5 rounded-full ${email.isPhishing ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                    {email.isPhishing ? 'This was phishing' : 'This was legitimate'}
                  </span>
                </div>
                {email.isPhishing && email.redFlags.length > 0 && (
                  <ul className="text-sm text-gray-600 space-y-1 mt-2">
                    {email.redFlags.map((flag, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <AlertTriangle className="w-3 h-3 text-amber-500 mt-1 shrink-0" />
                        {flag}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800">Phishing Inbox Challenge</h3>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">{answered}/{emails.length} reviewed</span>
          <span className="text-sm font-medium text-green-600">{correct} correct</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b px-4 py-3 flex items-center gap-3">
          <Mail className="w-5 h-5 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Inbox</span>
          <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">{emails.length}</span>
          <span className="ml-auto text-xs text-gray-400">Review each email and decide: phishing or legitimate?</span>
        </div>

        <div className="divide-y divide-gray-100">
          {emails.map(email => {
            const result = results[email.id]
            return (
              <button
                key={email.id}
                onClick={() => setSelectedEmail(email.id)}
                className={`w-full text-left px-4 py-3 hover:bg-blue-50/50 transition-colors flex items-start gap-3 ${
                  result ? 'bg-gray-50/50' : 'bg-white'
                }`}
              >
                <div className="mt-1 shrink-0">
                  {result ? (
                    result.correct
                      ? <Shield className="w-5 h-5 text-green-500" />
                      : <AlertTriangle className="w-5 h-5 text-red-500" />
                  ) : (
                    <Mail className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm ${result ? 'text-gray-500' : 'font-semibold text-gray-900'}`}>
                      {email.fromDisplay}
                    </span>
                    <span className="text-xs text-gray-400 ml-auto shrink-0">{email.time}</span>
                  </div>
                  <p className={`text-sm truncate ${result ? 'text-gray-400' : 'text-gray-800'}`}>{email.subject}</p>
                  <p className="text-xs text-gray-400 truncate">{email.preview}</p>
                </div>
                {email.hasAttachment && <Paperclip className="w-4 h-4 text-gray-300 mt-1 shrink-0" />}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
