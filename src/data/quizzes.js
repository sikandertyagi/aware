export const quizzes = {
  'social-media': [
    {
      question: 'You receive a friend request from someone claiming to be a colleague but their profile was created recently. What should you do?',
      options: [
        'Accept immediately — they said they know you',
        'Verify their identity through another channel before accepting',
        'Accept but restrict their access to your posts',
        'Ignore all friend requests from colleagues'
      ],
      correct: 1,
      explanation: 'Always verify identity through a known channel (phone, in-person, company email) before accepting requests from unfamiliar profiles.'
    },
    {
      question: 'Which privacy setting is most important to review on social media?',
      options: [
        'Profile picture visibility',
        'Who can see your posts and personal information',
        'Theme and display settings',
        'Notification preferences'
      ],
      correct: 1,
      explanation: 'Controlling who can see your posts and personal information is critical to preventing social engineering attacks.'
    },
    {
      question: 'A social media quiz asks for your mother\'s maiden name, first pet, and school. Why is this risky?',
      options: [
        'It takes too much time to complete',
        'These are common security questions — attackers can use answers to reset your passwords',
        'The quiz might have a virus',
        'It\'s not risky at all'
      ],
      correct: 1,
      explanation: 'These "fun quizzes" often harvest answers to common security questions used for account recovery.'
    },
    {
      question: 'What is "social engineering" in the context of social media?',
      options: [
        'Building social media platforms',
        'Manipulating people into revealing confidential information',
        'Engineering viral social media posts',
        'Automating social media management'
      ],
      correct: 1,
      explanation: 'Social engineering is the psychological manipulation of people to divulge confidential information or take actions that compromise security.'
    },
    {
      question: 'Your company has a social media policy. When should you review it?',
      options: [
        'Only when you first join the company',
        'Never — it does not apply to personal accounts',
        'Regularly, and before posting anything work-related',
        'Only if you manage the company social accounts'
      ],
      correct: 2,
      explanation: 'Social media policies apply to all employees and should be reviewed regularly, especially before posting work-related content.'
    }
  ],

  'post-management': [
    {
      question: 'You want to share a photo from the office. What should you check first?',
      options: [
        'The lighting and angle of the photo',
        'Whether any sensitive information (screens, documents, badges) is visible',
        'How many likes it might get',
        'The best filter to use'
      ],
      correct: 1,
      explanation: 'Always check for sensitive information in the background — screens, whiteboards, documents, badges, and access cards can all leak data.'
    },
    {
      question: 'Which of these is safe to post publicly?',
      options: [
        'A photo of your new employee badge',
        'Your excitement about a public product launch that has already been announced',
        'Details about an upcoming unannounced project',
        'Screenshots of internal company tools'
      ],
      correct: 1,
      explanation: 'Only share information that has been officially and publicly announced by the company.'
    },
    {
      question: 'What is OSINT and why does it matter for your posts?',
      options: [
        'A social media platform',
        'Open Source Intelligence — attackers can piece together public posts to build profiles for targeted attacks',
        'An encryption standard',
        'A type of antivirus software'
      ],
      correct: 1,
      explanation: 'OSINT (Open Source Intelligence) involves collecting publicly available information. Attackers can combine seemingly harmless posts into a detailed profile.'
    },
    {
      question: 'You accidentally posted confidential information. What is the first thing to do?',
      options: [
        'Hope nobody saw it',
        'Delete the post and immediately notify your security team',
        'Edit the post to remove the sensitive part',
        'Post a follow-up saying to ignore the previous post'
      ],
      correct: 1,
      explanation: 'Delete immediately and report to your security team. Even after deletion, the information may have been cached or screenshotted.'
    },
    {
      question: 'A journalist contacts you on LinkedIn asking about your company. What should you do?',
      options: [
        'Answer their questions — it is good PR',
        'Direct them to your company\'s official PR or communications team',
        'Block them immediately',
        'Share only "harmless" information'
      ],
      correct: 1,
      explanation: 'Always redirect media inquiries to your company\'s official PR or communications team. Even "harmless" information can be used out of context.'
    }
  ],

  'phishing': [
    {
      question: 'You receive an urgent email from "IT Support" asking you to click a link and verify your credentials. What red flags do you see?',
      options: [
        'No red flags — IT support often sends these',
        'Urgency, request for credentials, and a suspicious link',
        'The email came during business hours',
        'The email has the company logo'
      ],
      correct: 1,
      explanation: 'Urgency, requests for credentials, and suspicious links are classic phishing indicators. Legitimate IT departments rarely ask for passwords via email.'
    },
    {
      question: 'How can you verify if an email link is safe?',
      options: [
        'Click it quickly to see where it goes',
        'Hover over the link to preview the actual URL before clicking',
        'If the email looks professional, the link is safe',
        'Copy and paste the link into your browser'
      ],
      correct: 1,
      explanation: 'Hovering over links reveals the actual destination URL. Look for misspellings, unusual domains, and unexpected redirects.'
    },
    {
      question: 'What is "spear phishing"?',
      options: [
        'Phishing attacks sent to millions of people',
        'A targeted phishing attack aimed at a specific individual using personal information',
        'Phishing through phone calls only',
        'A type of spam filter'
      ],
      correct: 1,
      explanation: 'Spear phishing targets specific individuals using gathered personal information, making the attack much more convincing.'
    },
    {
      question: 'Which email sender address is most likely a phishing attempt?',
      options: [
        'support@microsoft.com',
        'support@micros0ft-secure.com',
        'noreply@company.com',
        'hr@company.com'
      ],
      correct: 1,
      explanation: 'Attackers use domains that look similar to legitimate ones but with subtle differences (like "0" instead of "o" or added words).'
    },
    {
      question: 'You clicked a suspicious link by accident. What should you do immediately?',
      options: [
        'Nothing — if you did not enter any data, you are fine',
        'Disconnect from the network, run a malware scan, and report it to your security team',
        'Clear your browser history',
        'Restart your computer'
      ],
      correct: 1,
      explanation: 'Even without entering data, malicious sites can install malware. Disconnect, scan, and report immediately.'
    }
  ],

  'honeytrap': [
    {
      question: 'An attractive stranger on LinkedIn is very eager to connect and starts asking about your work projects. This could be a:',
      options: [
        'Legitimate networking opportunity',
        'Honeytrap — an attacker using a fake persona to extract information',
        'Recruiter looking to hire you',
        'Random connection request'
      ],
      correct: 1,
      explanation: 'Honeytraps use attractive personas and flattery to build trust, then gradually extract sensitive work-related information.'
    },
    {
      question: 'What is a common tactic used in honeytrap operations?',
      options: [
        'Sending malware directly',
        'Building a relationship over time, then requesting sensitive information or favors',
        'Hacking into your computer directly',
        'Filing a legal complaint'
      ],
      correct: 1,
      explanation: 'Honeytraps are long-game operations. Attackers invest time in building trust before making their requests for information.'
    },
    {
      question: 'Which of these is a warning sign of a potential honeytrap?',
      options: [
        'A colleague asking about project deadlines',
        'Someone you recently met online who seems too perfect and asks specific questions about your work',
        'A recruiter reaching out through official company channels',
        'A friend sharing industry news'
      ],
      correct: 1,
      explanation: 'Profiles that seem too good to be true, combined with specific questions about your work, are classic honeytrap indicators.'
    },
    {
      question: 'A romantic interest you met online asks you to send a photo of your workplace. What should you do?',
      options: [
        'Send it — it is just a photo',
        'Decline and be cautious — they may be gathering intelligence about your workplace security',
        'Send a photo but blur sensitive areas',
        'Ask them to send a photo of their workplace first'
      ],
      correct: 1,
      explanation: 'Workplace photos can reveal security measures, layouts, badge designs, and other sensitive details useful for an attacker.'
    },
    {
      question: 'How can organizations protect employees from honeytraps?',
      options: [
        'Ban all social media use',
        'Regular awareness training, clear reporting procedures, and a culture of security consciousness',
        'Monitor all employee communications',
        'Restrict internet access completely'
      ],
      correct: 1,
      explanation: 'Awareness training helps employees recognize and report attempts, while clear procedures ensure quick response without stigma.'
    }
  ],

  'cyber-fraud': [
    {
      question: 'You receive an email from your CEO urgently requesting a wire transfer to a new vendor. What should you do?',
      options: [
        'Process it immediately — the CEO said it is urgent',
        'Verify the request through a separate communication channel (phone call, in-person)',
        'Reply to the email asking for confirmation',
        'Forward it to your manager via email'
      ],
      correct: 1,
      explanation: 'CEO fraud (Business Email Compromise) is extremely common. Always verify financial requests through a separate, trusted channel.'
    },
    {
      question: 'What is a "pig butchering" scam?',
      options: [
        'A meat industry fraud',
        'A long-term investment scam where attackers build trust before convincing victims to invest in fake platforms',
        'A type of computer virus',
        'A social media challenge'
      ],
      correct: 1,
      explanation: 'Pig butchering scams "fatten up" victims with small returns before convincing them to invest larger amounts in fraudulent platforms.'
    },
    {
      question: 'You find a USB drive in the parking lot. What should you do?',
      options: [
        'Plug it into your computer to find the owner',
        'Turn it in to security — never plug unknown devices into your computer',
        'Give it to IT to check on their computer',
        'Throw it away'
      ],
      correct: 1,
      explanation: 'Unknown USB drives may contain malware that executes automatically when plugged in. Always turn them in to security.'
    },
    {
      question: 'An invoice from a regular vendor arrives with new bank details. What should you do?',
      options: [
        'Update the bank details and process the payment',
        'Call the vendor using a known phone number to verify the change',
        'Email the vendor to confirm the new details',
        'Pay half the amount as a test'
      ],
      correct: 1,
      explanation: 'Invoice fraud involves intercepting legitimate invoices and changing payment details. Always verify changes through a known, trusted channel.'
    },
    {
      question: 'Which is a sign of a fraudulent e-commerce website?',
      options: [
        'It uses HTTPS',
        'Prices significantly below market value, poor grammar, no contact information, and recently created domain',
        'It has product reviews',
        'It accepts credit cards'
      ],
      correct: 1,
      explanation: 'Look for unrealistic prices, poor grammar, missing contact details, and new domains. HTTPS alone does not guarantee legitimacy.'
    }
  ],

  'password-security': [
    {
      question: 'Which password is the strongest?',
      options: [
        'Password123!',
        'Correct-Horse-Battery-Staple-42',
        'J0hn$m1th2024',
        'qwerty!@#$%'
      ],
      correct: 1,
      explanation: 'Long passphrases with random words are both strong and memorable. Length matters more than complexity with short passwords.'
    },
    {
      question: 'What is the primary benefit of multi-factor authentication (MFA)?',
      options: [
        'It makes logging in faster',
        'Even if your password is stolen, an attacker still needs the second factor to access your account',
        'It replaces the need for strong passwords',
        'It encrypts your password'
      ],
      correct: 1,
      explanation: 'MFA adds a second layer of defense. Even compromised passwords cannot be used without the additional authentication factor.'
    },
    {
      question: 'You need passwords for 50+ accounts. What is the best approach?',
      options: [
        'Use the same strong password everywhere',
        'Use a reputable password manager to generate and store unique passwords',
        'Write them all down in a notebook',
        'Use variations of one password (MyPass1, MyPass2, etc.)'
      ],
      correct: 1,
      explanation: 'Password managers generate, store, and auto-fill unique strong passwords. This eliminates password reuse, the biggest password security risk.'
    },
    {
      question: 'Your password appears in a data breach notification. What should you do first?',
      options: [
        'Ignore it — breaches happen all the time',
        'Change the password immediately, and change it on any other site where you used the same password',
        'Wait to see if any suspicious activity occurs',
        'Delete the email notification'
      ],
      correct: 1,
      explanation: 'Act immediately. Breached credentials are tested against other services within hours. Change the password everywhere it was reused.'
    },
    {
      question: 'Which MFA method is most secure?',
      options: [
        'SMS text message codes',
        'Hardware security keys (like YubiKey) or authenticator apps',
        'Email-based codes',
        'Security questions'
      ],
      correct: 1,
      explanation: 'Hardware keys and authenticator apps are more secure than SMS (which can be intercepted via SIM swapping) or email codes.'
    }
  ],

  'safe-browsing': [
    {
      question: 'You need to access your bank account. Which approach is safest?',
      options: [
        'Click the link in the email from your bank',
        'Type the bank\'s URL directly into your browser or use your saved bookmark',
        'Search for the bank name and click the first result',
        'Use the link saved in your notes app'
      ],
      correct: 1,
      explanation: 'Typing the URL directly or using a saved bookmark prevents phishing attacks from email links or search result manipulation.'
    },
    {
      question: 'You see a pop-up warning that your computer is infected and to call a number. What is this?',
      options: [
        'A legitimate security warning',
        'A tech support scam — close the browser tab immediately',
        'A message from your antivirus software',
        'A Windows system notification'
      ],
      correct: 1,
      explanation: 'Legitimate security software never displays phone numbers in pop-ups. These are tech support scams designed to gain remote access.'
    },
    {
      question: 'What does the padlock icon in your browser address bar indicate?',
      options: [
        'The website is completely safe and trustworthy',
        'The connection between your browser and the website is encrypted (HTTPS)',
        'The website has been verified by law enforcement',
        'Your antivirus is protecting you on this site'
      ],
      correct: 1,
      explanation: 'The padlock means the connection is encrypted (HTTPS), NOT that the website is trustworthy. Phishing sites can also use HTTPS.'
    },
    {
      question: 'When is it safe to use public Wi-Fi for work?',
      options: [
        'Always — public Wi-Fi is convenient',
        'Only when using a VPN that encrypts all your traffic',
        'When the Wi-Fi has a password',
        'When you are only browsing, not logging in'
      ],
      correct: 1,
      explanation: 'A VPN encrypts all traffic, protecting it from interception on public networks. Without a VPN, avoid accessing sensitive information.'
    },
    {
      question: 'A website asks you to install a browser extension to view content. What should you do?',
      options: [
        'Install it — you need to see the content',
        'Refuse — unknown extensions can steal data, inject ads, or monitor your browsing',
        'Install it temporarily and uninstall later',
        'Check if your colleague has it installed'
      ],
      correct: 1,
      explanation: 'Malicious extensions can access everything in your browser including passwords and session tokens. Only install trusted, vetted extensions.'
    }
  ],

  'data-protection': [
    {
      question: 'You need to send sensitive documents to a colleague. What is the safest method?',
      options: [
        'Regular email attachment',
        'Use the company\'s approved encrypted file sharing platform',
        'Personal cloud storage link',
        'USB drive via postal mail'
      ],
      correct: 1,
      explanation: 'Company-approved encrypted platforms ensure data stays within controlled, auditable environments with proper access controls.'
    },
    {
      question: 'What is the principle of "least privilege"?',
      options: [
        'Using the cheapest tools available',
        'Users should only have access to the data and systems they need for their specific job function',
        'Keeping privileges private',
        'Everyone should have the same level of access'
      ],
      correct: 1,
      explanation: 'Least privilege minimizes the potential damage from breaches or insider threats by limiting access to only what is necessary.'
    },
    {
      question: 'You are leaving the company. What should you do with company data on your personal devices?',
      options: [
        'Keep it as a reference for your next job',
        'Securely delete all company data and confirm with IT that it has been removed',
        'Transfer it to a personal cloud account',
        'Leave it — the company can remotely wipe it'
      ],
      correct: 1,
      explanation: 'Company data must be securely removed from personal devices during offboarding. Retaining it may violate policies and laws.'
    },
    {
      question: 'What is a "data breach"?',
      options: [
        'When data is backed up',
        'Unauthorized access, disclosure, or loss of sensitive information',
        'When you forget your password',
        'When a hard drive fails'
      ],
      correct: 1,
      explanation: 'A data breach is any incident where sensitive information is accessed, disclosed, or lost without authorization.'
    },
    {
      question: 'You discover that a database containing customer information is accessible without authentication. What should you do?',
      options: [
        'Check what data is in it out of curiosity',
        'Report it to your security team immediately without accessing the data',
        'Tell your colleagues about it',
        'Secure it yourself by adding a password'
      ],
      correct: 1,
      explanation: 'Report security findings to your security team immediately. Accessing or modifying systems without authorization may itself be a violation.'
    }
  ]
}
