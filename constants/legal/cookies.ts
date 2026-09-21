import { LegalPageData } from '../../components/legal/LegalPageLayout';

export const cookiesContent: LegalPageData = {
  title: 'Cookie Policy',
  effectiveDate: '31 July 2026',
  lastUpdated: '31 July 2026',
  note:
    "Applies primarily to the Fatafat website; the mobile app uses equivalent device identifiers and SDKs rather than browser cookies. Update the specific third-party tool names once your analytics/ad-tech stack is finalised.",
  sections: [
    {
      id: 'what-are-cookies',
      title: 'What Are Cookies',
      blocks: [
        {
          type: 'p',
          text: 'Cookies are small text files placed on your device when you visit our website, which help the website function correctly, remember your preferences, and understand how visitors use the site. Similar technologies include local storage, SDKs, and mobile device identifiers used within the Fatafat app, referred to collectively in this Policy as "cookies" unless otherwise specified.',
        },
      ],
    },
    {
      id: 'types-of-cookies-we-use',
      title: 'Types of Cookies We Use',
      blocks: [
        {
          type: 'table',
          headers: ['Category', 'Purpose', 'Can you opt out?'],
          rows: [
            [
              'Strictly Necessary',
              'Required for the website/app to function — e.g. keeping you logged in, remembering your booking in progress, security.',
              'No — essential to the service',
            ],
            ['Functional', 'Remember your preferences, such as language or saved addresses.', 'Yes, via cookie settings'],
            ['Analytics', 'Help us understand how the Platform is used, so we can improve it.', 'Yes, via cookie settings'],
            [
              'Marketing / Advertising',
              'Show relevant offers on and off the Platform, and measure campaign performance.',
              'Yes, via cookie settings',
            ],
          ],
        },
      ],
    },
    {
      id: 'third-party-cookies',
      title: 'Third-Party Cookies',
      blocks: [
        {
          type: 'p',
          text: 'Some cookies are placed by third-party service providers on our behalf, including analytics providers, payment gateway partners, and, where enabled, advertising networks. These third parties may use cookies to collect information about your activity on our website for their own purposes, subject to their own privacy policies. [List specific third-party tools here once finalised, e.g. Google Analytics, Meta Pixel, payment gateway fraud-detection cookies.]',
        },
      ],
    },
    {
      id: 'mobile-app-tracking',
      title: 'Mobile App Tracking',
      blocks: [
        { type: 'p', text: 'The Fatafat mobile app does not use browser cookies but may use comparable technologies, including:' },
        {
          type: 'ul',
          items: [
            "Device identifiers (such as Android Advertising ID or Apple's IDFA), used for analytics and, where you have consented, advertising.",
            'Software Development Kits (SDKs) from our service providers, including our maps/navigation provider, payment gateway, crash-reporting tool, and push-notification service.',
            'Local storage on your device, used to remember your login session and app preferences.',
          ],
        },
        {
          type: 'p',
          text: "You can manage advertising identifiers and app permissions (such as location access) through your device's operating system settings.",
        },
      ],
    },
    {
      id: 'managing-your-cookie-preferences',
      title: 'Managing Your Cookie Preferences',
      blocks: [
        {
          type: 'p',
          text: 'When you first visit our website, you will be shown a cookie consent banner allowing you to accept or reject non-essential cookies. You can change your preferences at any time via the "Cookie Settings" link in the website footer. You can also manage or delete cookies through your browser settings, though disabling strictly necessary cookies may prevent parts of the website from functioning correctly.',
        },
      ],
    },
    {
      id: 'changes-to-this-policy',
      title: 'Changes to This Policy',
      blocks: [
        {
          type: 'p',
          text: 'We may update this Cookie Policy from time to time to reflect changes in the cookies and technologies we use. The "Last Updated" date at the top of this Policy indicates when it was last revised.',
        },
      ],
    },
  ],
};
