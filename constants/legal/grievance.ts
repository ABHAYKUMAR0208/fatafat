import { LegalPageData } from '../../components/legal/LegalPageLayout';

export const grievanceContent: LegalPageData = {
  title: 'Grievance Officer Policy',
  effectiveDate: '31 July 2026',
  lastUpdated: '31 July 2026',
  note:
    'Insert the actual named Grievance Officer, phone number, and physical address before publishing — the IT Rules, 2021 require these to be publicly displayed, not just an email alias.',
  sections: [
    {
      id: 'purpose',
      title: 'Purpose',
      blocks: [
        {
          type: 'p',
          text: 'This Grievance Officer Policy is published in accordance with Rule 3(2) of the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021 ("IT Rules"), and Rule 13 of the Digital Personal Data Protection Rules, 2025 ("DPDP Rules"). It sets out how you can raise a grievance regarding your use of the Fatafat platform (the "Platform"), content on the Platform, or the processing of your personal data, and the timelines within which GIT Software Technologies ("GIT") will respond.',
        },
      ],
    },
    {
      id: 'who-can-raise-a-grievance',
      title: 'Who Can Raise a Grievance',
      blocks: [
        { type: 'p', text: 'Any Rider, Sender, Captain, or other user of the Platform may raise a grievance, including a complaint about:' },
        {
          type: 'ul',
          items: [
            'Content posted or displayed on the Platform that you believe is unlawful, defamatory, or otherwise objectionable.',
            "A safety incident, a dispute over a fare or refund, or a Captain's or Rider's conduct.",
            'The collection, use, sharing, or retention of your personal data, or a request to access, correct, or erase your personal data under the Digital Personal Data Protection Act, 2023.',
            'Any other violation of the Terms & Conditions or any policy referenced in them.',
          ],
        },
      ],
    },
    {
      id: 'grievance-officer',
      title: 'Grievance Officer',
      blocks: [
        {
          type: 'table',
          headers: ['Field', 'Details'],
          rows: [
            ['Name', "[Insert Grievance Officer's full name]"],
            ['Designation', 'Grievance Officer, GIT Software Technologies'],
            ['Email', 'grievance@fatafat.app'],
            ['Phone', '[Insert direct phone number, active during business hours]'],
            ['Postal Address', '[Insert registered office address of the India entity]'],
            ['Hours', 'Monday–Saturday, 9:00 AM – 6:00 PM IST, excluding public holidays'],
          ],
        },
      ],
    },
    {
      id: 'how-to-raise-a-grievance',
      title: 'How to Raise a Grievance',
      blocks: [
        { type: 'p', text: 'You may raise a grievance through any of the following channels:' },
        {
          type: 'ul',
          items: ['In-app: Support > Raise a Complaint', 'Email: grievance@fatafat.app', 'Post: written to the registered address above'],
        },
        {
          type: 'p',
          text: 'Please include your registered mobile number or email, a description of the issue, the relevant trip or booking ID (if applicable), and any supporting evidence (such as a screenshot).',
        },
      ],
    },
    {
      id: 'response-timelines',
      title: 'Response Timelines',
      blocks: [
        { type: 'p', text: 'Consistent with the IT Rules, GIT will:' },
        {
          type: 'ul',
          items: [
            'Acknowledge your grievance within 24 hours of receipt.',
            'Resolve the grievance within 15 days of receipt, except for a complaint requiring removal of content that is prima facie in the nature of a sexually explicit or impersonation-related image, in which case action will be taken within 24 hours of the complaint, in accordance with Rule 3(2)(b) of the IT Rules.',
            'For a data-protection grievance under the DPDP Rules, respond within the timeline prescribed by the Digital Personal Data Protection Rules, 2025.',
          ],
        },
        { type: 'p', text: 'If you are not satisfied with the resolution provided, you may escalate the matter as described below.' },
      ],
    },
    {
      id: 'escalation',
      title: 'Escalation',
      blocks: [
        { type: 'p', text: 'If your grievance is not resolved to your satisfaction, or the timelines above are not met, you may escalate to:' },
        {
          type: 'ul',
          items: [
            'A Nodal Officer / senior escalation contact at nodal@fatafat.app, where GIT has appointed one for coordination with law enforcement and government agencies.',
            'For a data-protection grievance that remains unresolved, the Data Protection Board of India, once your grievance has first been raised with GIT as required under the DPDP Act.',
            'For a consumer complaint, the National Consumer Helpline or the appropriate Consumer Disputes Redressal Commission under the Consumer Protection Act, 2019.',
            'For a safety incident involving a criminal offence, the local police, in addition to (not instead of) raising the matter with GIT.',
          ],
        },
      ],
    },
    {
      id: 'record-keeping',
      title: 'Record-Keeping',
      blocks: [
        {
          type: 'p',
          text: 'GIT maintains a record of every grievance received, the action taken, and the time taken to resolve it, consistent with the reporting and compliance obligations under the IT Rules.',
        },
      ],
    },
    {
      id: 'updates-to-this-policy',
      title: 'Updates to This Policy',
      blocks: [
        {
          type: 'p',
          text: "This Policy may be updated to reflect a change in the designated Grievance Officer or a change in applicable law. The current Grievance Officer's details are always available on the Platform and on the Fatafat website footer.",
        },
      ],
    },
  ],
};
