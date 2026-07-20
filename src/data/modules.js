import {
  Share2, FileWarning, ShieldAlert, Heart, Banknote,
  Lock, Globe, Database
} from 'lucide-react'

export const modules = [
  {
    id: 'social-media',
    title: 'Social Media Safety',
    description: 'Navigate social platforms securely. Learn privacy settings, safe sharing practices, and how to identify fake accounts.',
    icon: Share2,
    color: '#3b82f6',
    bgColor: '#eff6ff',
    path: '/module/social-media',
    threats: ['Identity Theft', 'Social Engineering', 'Data Mining'],
    stats: { attacks: '3.2B', affected: '72%' }
  },
  {
    id: 'post-management',
    title: 'Managing Your Posts',
    description: 'Understand what to share and what to keep private. Protect your organization by managing your digital footprint.',
    icon: FileWarning,
    color: '#8b5cf6',
    bgColor: '#f5f3ff',
    path: '/module/post-management',
    threats: ['Information Leakage', 'OSINT Exposure', 'Reputation Risk'],
    stats: { attacks: '1.8B', affected: '58%' }
  },
  {
    id: 'phishing',
    title: 'Phishing Protection',
    description: 'Recognize and avoid phishing emails, messages, and websites. Learn the red flags that give attackers away.',
    icon: ShieldAlert,
    color: '#ef4444',
    bgColor: '#fef2f2',
    path: '/module/phishing',
    threats: ['Email Phishing', 'Spear Phishing', 'Smishing'],
    stats: { attacks: '5.5B', affected: '83%' }
  },
  {
    id: 'honeytrap',
    title: 'Honeytrap Awareness',
    description: 'Identify manipulation tactics where attackers use emotional or romantic lures to extract sensitive information.',
    icon: Heart,
    color: '#ec4899',
    bgColor: '#fdf2f8',
    path: '/module/honeytrap',
    threats: ['Romance Scams', 'Catfishing', 'Blackmail'],
    stats: { attacks: '800M', affected: '34%' }
  },
  {
    id: 'cyber-fraud',
    title: 'Cyber Fraud Prevention',
    description: 'Protect yourself from online scams, fake websites, and fraudulent transactions. Stay vigilant against fraud.',
    icon: Banknote,
    color: '#f59e0b',
    bgColor: '#fffbeb',
    path: '/module/cyber-fraud',
    threats: ['CEO Fraud', 'Invoice Scams', 'Payment Fraud'],
    stats: { attacks: '4.1B', affected: '67%' }
  },
  {
    id: 'password-security',
    title: 'Password Security',
    description: 'Create strong, unique passwords and use multi-factor authentication. Your first line of defense starts here.',
    icon: Lock,
    color: '#10b981',
    bgColor: '#ecfdf5',
    path: '/module/password-security',
    threats: ['Brute Force', 'Credential Stuffing', 'Keylogging'],
    stats: { attacks: '2.9B', affected: '61%' }
  },
  {
    id: 'safe-browsing',
    title: 'Safe Browsing',
    description: 'Browse the internet safely. Identify malicious websites, avoid drive-by downloads, and use secure connections.',
    icon: Globe,
    color: '#06b6d4',
    bgColor: '#ecfeff',
    path: '/module/safe-browsing',
    threats: ['Malware', 'Drive-by Downloads', 'Man-in-the-Middle'],
    stats: { attacks: '3.8B', affected: '71%' }
  },
  {
    id: 'data-protection',
    title: 'Data Protection & Privacy',
    description: 'Handle sensitive data responsibly. Understand classification, encryption, and compliance requirements.',
    icon: Database,
    color: '#6366f1',
    bgColor: '#eef2ff',
    path: '/module/data-protection',
    threats: ['Data Breach', 'Insider Threats', 'Non-compliance'],
    stats: { attacks: '1.2B', affected: '45%' }
  }
]
