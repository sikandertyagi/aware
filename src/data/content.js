export const moduleContent = {
  'social-media': {
    sections: [
      {
        title: 'Understanding Social Media Risks',
        description: 'Social media platforms are a goldmine for attackers. Every piece of information you share — your job title, workplace, interests, routines, and connections — can be used to build a profile for targeted attacks against you or your organization.',
        warnings: [
          'Attackers create fake profiles to connect with employees and gather intelligence',
          'Location tags and check-ins reveal your routine and current whereabouts',
          'Photos can expose sensitive information in the background (screens, badges, documents)'
        ]
      },
      {
        title: 'Privacy Settings Checklist',
        description: 'Your first line of defense is properly configured privacy settings. Most platforms default to maximum visibility — you need to actively restrict access.',
        tips: [
          'Set your profile to private/friends-only on all personal accounts',
          'Review who can see your posts, friends list, and personal details',
          'Disable location services for social media apps',
          'Turn off facial recognition and photo tagging from strangers',
          'Regularly audit your connected apps and revoke access to unused ones'
        ]
      },
      {
        title: 'Identifying Fake Accounts',
        description: 'Fake accounts are used for social engineering, intelligence gathering, and spreading misinformation. Learning to spot them is crucial.',
        tips: [
          'Check account creation date — new accounts are suspicious',
          'Look for stolen or stock photos (use reverse image search)',
          'Be wary of profiles with very few personal posts but many connections',
          'Verify identities through separate, trusted channels before accepting requests'
        ],
        alerts: [
          'A fake account posing as your CEO could ask for urgent wire transfers',
          'Attackers clone real profiles to bypass your trust filters'
        ]
      }
    ],
    scenario: {
      description: 'An employee at a defense contractor accepted a LinkedIn connection from an attractive "recruiter." Over several weeks, the recruiter built rapport and eventually asked about specific projects the employee worked on, claiming it was to match them with opportunities.',
      outcome: 'The "recruiter" was actually a foreign intelligence operative. The employee inadvertently disclosed classified project details, resulting in a major security breach and criminal charges.',
      prevention: 'Always verify identities through official channels. Never discuss work projects with unverified contacts, regardless of how legitimate they appear. Report suspicious contacts to your security team.'
    }
  },

  'post-management': {
    sections: [
      {
        title: 'The Digital Footprint Problem',
        description: 'Every post, comment, like, and share becomes part of your permanent digital footprint. Even deleted content may persist in caches, screenshots, and archives. Attackers systematically collect this data to build detailed profiles.',
        warnings: [
          'Deleted posts can still be found in web archives and cached pages',
          'Metadata in photos can reveal GPS coordinates, device info, and timestamps',
          'Seemingly innocent posts can be combined to reveal sensitive patterns'
        ]
      },
      {
        title: 'What NOT to Post',
        description: 'Understanding what information is off-limits is critical for protecting yourself and your organization from information leakage.',
        warnings: [
          'Internal project details, codenames, or unreleased product information',
          'Photos of your badge, access cards, security infrastructure, or office layouts',
          'Screenshots of internal tools, emails, or communications',
          'Travel schedules, especially for executives or government officials',
          'Complaints about company security measures or IT systems',
          'Details about your company\'s vendors, partners, or contracts'
        ]
      },
      {
        title: 'Safe Posting Practices',
        description: 'You can maintain an active social media presence while keeping security intact. The key is awareness and good judgment.',
        tips: [
          'Apply the "newspaper test" — would you be comfortable seeing this on the front page?',
          'Wait 24 hours before posting emotional or impulsive content',
          'Strip metadata from photos before uploading (use metadata removal tools)',
          'Never post in real-time about your location; share experiences after you leave',
          'When in doubt about work-related content, check with your communications team'
        ]
      }
    ],
    scenario: {
      description: 'A software engineer posted a selfie celebrating a late night at work. In the background, a whiteboard showed the architecture of an unreleased product, and their screen displayed a customer database.',
      outcome: 'Competitors identified the product roadmap from the whiteboard, and a data privacy violation was triggered by the visible customer records. The company faced regulatory fines and competitive disadvantage.',
      prevention: 'Always scan photos for background information before posting. Use the "clean desk" approach — ensure nothing sensitive is visible in your workspace when taking photos.'
    }
  },

  'phishing': {
    sections: [
      {
        title: 'How Phishing Works',
        description: 'Phishing attacks use deceptive emails, messages, or websites to trick you into revealing sensitive information or installing malware. They exploit trust, urgency, and authority to bypass your critical thinking.',
        alerts: [
          '91% of cyber attacks begin with a phishing email',
          'Modern phishing emails can be nearly indistinguishable from legitimate ones',
          'AI-generated phishing is making attacks more sophisticated and personalized'
        ]
      },
      {
        title: 'Red Flags to Watch For',
        description: 'While phishing is getting more sophisticated, most attacks still contain telltale signs if you know what to look for.',
        warnings: [
          'Urgency: "Your account will be locked in 24 hours" — designed to prevent careful thinking',
          'Suspicious sender: domains that look similar but aren\'t quite right (g00gle.com, micros0ft.com)',
          'Generic greetings: "Dear Customer" instead of your name',
          'Requests for credentials: legitimate services never ask for your password via email',
          'Unexpected attachments: especially .exe, .zip, or macro-enabled documents',
          'Mismatched links: hover to see if the URL matches the displayed text'
        ]
      },
      {
        title: 'Types of Phishing Attacks',
        description: 'Phishing comes in many forms beyond traditional email. Understanding the variations helps you stay vigilant across all channels.',
        tips: [
          'Email phishing: Mass-sent emails impersonating trusted brands',
          'Spear phishing: Targeted attacks using personal information about you',
          'Whaling: Attacks specifically targeting senior executives',
          'Smishing: Phishing via SMS text messages',
          'Vishing: Phishing through phone calls',
          'Clone phishing: Duplicated legitimate emails with malicious links swapped in'
        ]
      },
      {
        title: 'What To Do',
        description: 'Having a clear response plan turns a potential breach into a non-event.',
        tips: [
          'STOP: Don\'t click links or open attachments in suspicious messages',
          'VERIFY: Contact the sender through a known, separate channel',
          'REPORT: Forward suspicious emails to your security team immediately',
          'DELETE: Remove the message after reporting to prevent accidental clicks later'
        ]
      }
    ],
    scenario: {
      description: 'An employee received an email appearing to be from Microsoft 365, warning that their password would expire in 2 hours. The email contained a link to a perfect replica of the Microsoft login page. The employee entered their credentials.',
      outcome: 'Attackers used the stolen credentials to access the company\'s email system, intercepted financial communications, and redirected a $1.2M payment to a fraudulent account.',
      prevention: 'Never click password reset links in emails. Go directly to the service by typing the URL. Enable MFA so stolen passwords alone are not enough. Report all suspicious emails to IT security.'
    }
  },

  'honeytrap': {
    sections: [
      {
        title: 'What is a Honeytrap?',
        description: 'A honeytrap is a social engineering technique where an attacker uses an attractive persona — often romantic or flattering — to manipulate a target into revealing sensitive information. These operations can be conducted online or in person and often target employees with access to valuable information.',
        alerts: [
          'Honeytraps are used by criminal organizations, competitors, and nation-state actors',
          'Both men and women can be targets — and perpetrators',
          'These operations can last weeks or months to build sufficient trust'
        ]
      },
      {
        title: 'Warning Signs',
        description: 'Honeytrap operators follow recognizable patterns. Being aware of these signs can help you identify and avoid being manipulated.',
        warnings: [
          'An unusually attractive stranger initiates contact and shows immediate strong interest',
          'They ask specific questions about your work, projects, or access levels',
          'The relationship progresses unusually fast — emotional investment is pushed early',
          'They create situations where you might feel indebted or compromised',
          'They discourage you from telling colleagues or friends about the relationship',
          'They have vague or unverifiable personal backgrounds'
        ]
      },
      {
        title: 'Protecting Yourself',
        description: 'You don\'t need to be paranoid, but maintaining healthy skepticism with new online contacts is essential.',
        tips: [
          'Verify identities — do reverse image searches on profile photos',
          'Never share work information with romantic interests or new acquaintances',
          'Be especially cautious when traveling abroad or at industry events',
          'Report any suspicious approaches to your security team without embarrassment',
          'Remember: if something seems too good to be true, investigate further',
          'Keep personal and professional social media accounts separate'
        ]
      }
    ],
    scenario: {
      description: 'A government employee matched with someone on a dating app who claimed to be a researcher. Over two months, they built a relationship. The "researcher" gradually asked about the employee\'s work on sensitive policy documents, framing questions as intellectual curiosity.',
      outcome: 'The employee shared draft policy documents to impress their romantic interest. The documents were leaked to a foreign government, compromising diplomatic negotiations.',
      prevention: 'Never share work documents or discuss classified/sensitive work with anyone outside your authorized circle, regardless of the personal relationship. Report unusual interest in your work to security.'
    }
  },

  'cyber-fraud': {
    sections: [
      {
        title: 'Common Cyber Fraud Tactics',
        description: 'Cyber fraud encompasses a wide range of schemes designed to steal money or valuable information. Understanding the most common tactics helps you recognize and avoid them.',
        alerts: [
          'Business Email Compromise (BEC) caused $2.7 billion in losses in 2023 alone',
          'Investment scams are the costliest form of fraud, averaging $70,811 per victim',
          'AI deepfakes are now being used to impersonate executives in video calls'
        ]
      },
      {
        title: 'Business Email Compromise (CEO Fraud)',
        description: 'Attackers impersonate executives or vendors to trick employees into transferring money or sharing sensitive data. These attacks are highly targeted and use urgency to override normal verification processes.',
        warnings: [
          'Emails "from the CEO" requesting urgent wire transfers to new accounts',
          'Vendor emails with updated banking information for payments',
          'Requests to purchase gift cards and share the codes',
          'Pressure to bypass normal approval procedures due to "urgency"'
        ],
        tips: [
          'Always verify financial requests through a phone call to a known number',
          'Never bypass approval workflows, regardless of who is asking',
          'Confirm vendor banking changes through established contacts, not the email requesting the change'
        ]
      },
      {
        title: 'Online Shopping & Investment Scams',
        description: 'Fraudulent websites and investment platforms are designed to look legitimate while stealing your money or financial information.',
        warnings: [
          'Prices dramatically lower than competitors',
          'Pressure to act quickly ("only 2 left!", "offer expires in 10 minutes!")',
          'Requests for unusual payment methods (wire transfers, cryptocurrency, gift cards)',
          'Guaranteed high returns with no risk — this does not exist in legitimate investing'
        ],
        tips: [
          'Research companies before purchasing — check reviews on independent sites',
          'Use credit cards (not debit) for online purchases for better fraud protection',
          'Verify website authenticity: check domain age, look for contact information, read the fine print'
        ]
      }
    ],
    scenario: {
      description: 'A finance employee received an email from what appeared to be the CFO, requesting an urgent $350,000 wire transfer to a new vendor for a "confidential acquisition." The email matched the CFO\'s communication style perfectly and came from a spoofed domain (company-mail.com vs company.com).',
      outcome: 'The employee processed the transfer without phone verification due to the "confidential" nature. The money was irrecoverable — transferred through multiple accounts across jurisdictions within hours.',
      prevention: 'Implement mandatory dual-authorization for all transfers above a threshold. Always verify via phone call to a known number. Train employees that urgency and secrecy are red flags, not reasons to skip verification.'
    }
  },

  'password-security': {
    sections: [
      {
        title: 'Why Passwords Still Matter',
        description: 'Despite advances in biometrics and passwordless authentication, passwords remain the primary defense for most accounts. A single compromised password can cascade into multiple breaches through credential reuse.',
        alerts: [
          '81% of data breaches involve weak or stolen passwords',
          'The average person has 100+ online accounts',
          'Password cracking tools can test billions of combinations per second'
        ]
      },
      {
        title: 'Building Strong Passwords',
        description: 'Password strength is primarily about length and randomness — not complexity rules. A long passphrase is both stronger and easier to remember than a short, complex password.',
        tips: [
          'Use passphrases: 4+ random words like "correct-horse-battery-staple"',
          'Make each password unique — NEVER reuse across accounts',
          'Aim for 16+ characters minimum for important accounts',
          'Use a password manager to generate and store all passwords',
          'Enable multi-factor authentication wherever available'
        ],
        warnings: [
          'Don\'t use personal information (birthdays, names, pet names)',
          'Avoid common patterns (Password1!, qwerty123, 123456)',
          'Don\'t use the same password across multiple services',
          'Never share passwords via email, text, or chat'
        ]
      },
      {
        title: 'Multi-Factor Authentication (MFA)',
        description: 'MFA adds layers of defense beyond just a password. Even if your password is stolen, the attacker still needs your second factor.',
        tips: [
          'Use authenticator apps (Google Authenticator, Microsoft Authenticator) over SMS when possible',
          'Hardware security keys (YubiKey, Titan) provide the strongest protection',
          'Store backup codes in a secure location (password manager, not a sticky note)',
          'Enable MFA on all accounts that support it — email, banking, social media'
        ],
        alerts: [
          'SMS-based MFA can be bypassed via SIM swapping attacks',
          'MFA fatigue attacks bombard you with approval requests — never approve requests you didn\'t initiate'
        ]
      }
    ],
    scenario: {
      description: 'An employee used the same password for their personal email and corporate VPN. Their personal email provider suffered a data breach, and the password was published on the dark web.',
      outcome: 'Attackers used the leaked password to access the corporate VPN, then moved laterally through the network, exfiltrating customer data over several weeks before detection. The breach affected 500,000 customer records.',
      prevention: 'Use unique passwords for every account via a password manager. Enable MFA on all corporate systems. Monitor breach notification services and change compromised passwords immediately.'
    }
  },

  'safe-browsing': {
    sections: [
      {
        title: 'Navigating the Web Safely',
        description: 'The internet is full of threats disguised as legitimate content. From malicious ads to fake download buttons, attackers use countless techniques to compromise your system or steal your data.',
        alerts: [
          'Over 560,000 new malware instances are detected daily',
          'Malvertising (malicious ads) appears even on trusted, legitimate websites',
          'Drive-by downloads can install malware without any clicks from you'
        ]
      },
      {
        title: 'HTTPS and Secure Connections',
        description: 'Understanding what HTTPS does — and doesn\'t — protect you from is essential for safe browsing.',
        tips: [
          'Look for the padlock icon — but remember it only means the connection is encrypted',
          'HTTPS does NOT mean the website is trustworthy or legitimate',
          'Avoid entering sensitive information on HTTP (non-encrypted) pages',
          'Use a VPN when connecting through public Wi-Fi networks'
        ],
        warnings: [
          'Phishing sites regularly use HTTPS — don\'t let the padlock create false confidence',
          'Certificate warnings are serious — never bypass them without understanding why they appear'
        ]
      },
      {
        title: 'Browser Safety Best Practices',
        description: 'Your browser is your gateway to the web. Keeping it secure reduces your attack surface significantly.',
        tips: [
          'Keep your browser updated — updates patch security vulnerabilities',
          'Only install extensions from official stores, and minimize the number you use',
          'Use an ad blocker to reduce exposure to malvertising',
          'Clear cookies and browsing data regularly',
          'Use separate browser profiles for work and personal browsing'
        ]
      },
      {
        title: 'Public Wi-Fi Dangers',
        description: 'Public Wi-Fi networks are inherently insecure. Attackers can easily intercept unencrypted traffic or set up fake hotspots.',
        warnings: [
          'Avoid accessing banking, email, or corporate resources on public Wi-Fi without a VPN',
          'Attackers can create fake Wi-Fi networks with legitimate-sounding names ("Airport_Free_WiFi")',
          'Even password-protected public networks are shared with every other user on that network'
        ],
        tips: [
          'Always use your company VPN when working remotely',
          'Use your phone\'s mobile hotspot as a safer alternative to public Wi-Fi',
          'Disable auto-connect to open networks on your devices'
        ]
      }
    ],
    scenario: {
      description: 'An employee working from a coffee shop connected to "CoffeeShop_WiFi" (a fake network set up by an attacker). They logged into their company email and processed a few invoices.',
      outcome: 'The attacker intercepted the unencrypted session cookies and gained access to the employee\'s email. They used it to send fraudulent invoices to the company\'s clients, resulting in $200,000 in losses.',
      prevention: 'Always verify Wi-Fi network names with the establishment. Use a VPN for all work activities outside the office. Enable MFA to make stolen cookies less useful.'
    }
  },

  'data-protection': {
    sections: [
      {
        title: 'Data Classification',
        description: 'Not all data requires the same level of protection. Understanding how to classify data helps you handle it appropriately and comply with regulations.',
        tips: [
          'Public: Information intended for public consumption (marketing materials, published reports)',
          'Internal: Company information not for public release (org charts, internal policies)',
          'Confidential: Sensitive business data (financial reports, strategic plans, contracts)',
          'Restricted: Highest sensitivity (PII, healthcare records, credentials, encryption keys)'
        ],
        alerts: [
          'Misclassifying data can lead to regulatory fines up to 4% of global revenue (GDPR)',
          'When in doubt about classification, treat data as the higher sensitivity level'
        ]
      },
      {
        title: 'Handling Sensitive Data',
        description: 'Proper data handling practices protect both the organization and the individuals whose data you manage.',
        tips: [
          'Encrypt sensitive data at rest and in transit',
          'Use company-approved tools for sharing — never use personal email or cloud storage',
          'Follow the principle of least privilege — only access data you need for your role',
          'Shred physical documents containing sensitive information',
          'Lock your screen whenever you leave your workstation (Win+L or Cmd+Ctrl+Q)'
        ],
        warnings: [
          'Never store sensitive data on personal devices or unauthorized cloud services',
          'Don\'t send sensitive data in unencrypted emails',
          'Don\'t copy sensitive data to USB drives without authorization',
          'Never leave sensitive documents visible on your desk or screen in public spaces'
        ]
      },
      {
        title: 'Data Breach Response',
        description: 'Knowing what to do when a breach occurs — or is suspected — can dramatically reduce the damage.',
        tips: [
          'Report suspected breaches to your security team immediately — time is critical',
          'Document what you observed: what data, when, how you discovered it',
          'Don\'t attempt to investigate or fix the breach yourself',
          'Preserve evidence — don\'t delete logs, emails, or files related to the incident',
          'Follow your organization\'s incident response plan'
        ],
        alerts: [
          'The average time to detect a breach is 204 days — early detection saves millions',
          'Regulatory reporting deadlines can be as short as 72 hours (GDPR) or 24 hours (some sectors)'
        ]
      }
    ],
    scenario: {
      description: 'An employee emailed a spreadsheet containing 10,000 customer records (names, addresses, phone numbers) to their personal email to "work from home." The personal email account was later compromised in a phishing attack.',
      outcome: 'The customer data was exposed in the phishing breach. The company had to notify all affected customers, pay regulatory fines of $2.3M, and faced class-action lawsuits. The employee was terminated.',
      prevention: 'Never transfer company data to personal accounts. Use approved remote access solutions (VPN, virtual desktops). If you need to work with data remotely, use company-provided and secured devices only.'
    }
  }
}
