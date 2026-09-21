import { LegalPageData } from '../../components/legal/LegalPageLayout';

export const privacyContent: LegalPageData = {
  title: 'Privacy Policy',
  effectiveDate: '31 July 2026',
  lastUpdated: '31 July 2026',
  note:
    'Drafted to align with the Digital Personal Data Protection Act, 2023 and DPDP Rules, 2025. Have this reviewed by counsel before publication, particularly retention periods and cross-border transfer provisions.',
  sections: [
    {
      id: 'introduction',
      title: 'Introduction',
      blocks: [
        {
          type: 'p',
          text: 'This Privacy Policy explains how GIT Software Technologies ("GIT", "we", "us", "our") collects, uses, discloses, and protects personal data when you use the Fatafat mobile application and website (the "Platform"), whether as a Rider, Sender, or Captain. This Policy is issued in accordance with the Digital Personal Data Protection Act, 2023 ("DPDP Act") and the Digital Personal Data Protection Rules, 2025 ("DPDP Rules"), and the Information Technology Act, 2000 and rules made thereunder.',
        },
        {
          type: 'p',
          text: 'By using the Platform, you consent to the collection and use of your personal data as described in this Policy. Where required by law, we will seek your specific, informed, and itemised consent before processing your personal data for a given purpose.',
        },
      ],
    },
    {
      id: 'personal-data-we-collect',
      title: 'Personal Data We Collect',
      blocks: [
        { type: 'p', text: 'Data you provide directly:' },
        {
          type: 'ul',
          items: [
            'Identity data: name, gender, date of birth, profile photo.',
            'Contact data: mobile number, email address, residential or pickup/drop addresses.',
            "Verification data: government ID proof, and, for Captains, driving licence, vehicle registration certificate, insurance, and vehicle photographs.",
            'Payment data: UPI ID, masked card details, and transaction history (full card numbers are processed directly by our payment gateway partner and are not stored by GIT).',
            'Communications: messages sent through in-app chat, support tickets, and call-masking records.',
          ],
        },
        { type: 'p', text: 'Data collected automatically:' },
        {
          type: 'ul',
          items: [
            'Location data: precise real-time GPS location during an active booking, and approximate location for service availability, subject to the device permission you grant.',
            'Device and usage data: device identifiers, IP address, app version, operating system, crash logs, and in-app interactions.',
            'Trip data: pickup/drop points, route taken, distance, duration, fare, and ratings.',
          ],
        },
        { type: 'p', text: 'Data from third parties:' },
        {
          type: 'ul',
          items: [
            'Basic profile information if you choose to sign up using a third-party account (e.g. Google or Apple sign-in).',
            'Payment confirmation data from our payment gateway partner.',
          ],
        },
      ],
    },
    {
      id: 'how-we-use-your-data',
      title: 'How We Use Your Data',
      blocks: [
        {
          type: 'p',
          text: 'We process your personal data for the following purposes, each based on your consent, the necessity of performing your booking contract, or a legitimate use permitted under the DPDP Act:',
        },
        {
          type: 'ul',
          items: [
            'To create and manage your account, and verify your identity.',
            'To match Riders/Senders with available Captains, calculate fares, and facilitate bookings and payments.',
            'To enable live trip tracking, in-app communication, and safety features such as the SOS button and trip-sharing with trusted contacts.',
            'To provide customer support and investigate complaints, disputes, or safety incidents.',
            'To send booking confirmations, receipts, and service-related notifications.',
            'With your separate consent, to send promotional communications, which you may opt out of at any time.',
            'To comply with applicable law, including sharing data with law enforcement or a government department where legally required.',
            'To detect, prevent, and investigate fraud, safety violations, and misuse of the Platform.',
          ],
        },
      ],
    },
    {
      id: 'consent',
      title: 'Consent',
      blocks: [
        {
          type: 'p',
          text: 'Where the DPDP Act requires your consent, we will present a clear, itemised notice describing the personal data to be collected and the specific purpose of processing, in English or a scheduled Indian language of your choice, before collecting your consent. You may withdraw consent at any time through the in-app privacy settings or by contacting us, though withdrawal will not affect the lawfulness of processing carried out before withdrawal, and may limit or prevent your continued use of certain features (for example, location-based booking).',
        },
      ],
    },
    {
      id: 'sharing-and-disclosure',
      title: 'Sharing and Disclosure',
      blocks: [
        { type: 'p', text: 'We share personal data only as necessary for the purposes above, and only with:' },
        {
          type: 'ul',
          items: [
            'The Captain or Rider/Sender relevant to your specific booking (e.g. name, approximate location, contact number masked through call-masking).',
            'Service providers who process data on our behalf under contract, including our cloud hosting provider, payment gateway, SMS/OTP provider, and maps/navigation provider.',
            'Government and regulatory authorities, including State Transport Departments, where required under the Motor Vehicle Aggregator Guidelines or a lawful order.',
            'A successor entity in the event of a merger, acquisition, or sale of assets, subject to equivalent privacy protections.',
          ],
        },
        { type: 'p', text: 'We do not sell your personal data to third parties.' },
      ],
    },
    {
      id: 'data-storage-and-security',
      title: 'Data Storage and Security',
      blocks: [
        {
          type: 'p',
          text: 'Your personal data is stored on servers located in India, consistent with applicable data-localisation requirements under the Motor Vehicle Aggregator Guidelines. We use industry-standard technical and organisational measures, including encryption in transit and at rest, access controls, and regular security review, to protect your personal data against unauthorised access, alteration, or loss. No system is completely secure, and we cannot guarantee absolute security.',
        },
      ],
    },
    {
      id: 'data-retention',
      title: 'Data Retention',
      blocks: [
        {
          type: 'p',
          text: 'We retain personal data only for as long as necessary to fulfil the purposes described in this Policy, or as required by applicable law. Trip and booking records are typically retained for 3 years to support dispute resolution, safety investigations, and statutory compliance, after which they are deleted or anonymised, unless a longer period is required by law or an ongoing legal proceeding.',
        },
      ],
    },
    {
      id: 'your-rights',
      title: 'Your Rights',
      blocks: [
        { type: 'p', text: 'Subject to the DPDP Act, you have the right to:' },
        {
          type: 'ul',
          items: [
            'Access a summary of the personal data we hold about you and the processing activities we carry out.',
            'Correct inaccurate or incomplete personal data, and update outdated data.',
            'Request erasure of your personal data, unless we are required to retain it by law.',
            'Withdraw consent at any time, as described above.',
            "Nominate another individual to exercise these rights on your behalf in the event of your death or incapacity, as provided under the DPDP Act.",
            'Register a complaint with us in the first instance, and thereafter with the Data Protection Board of India if unresolved.',
          ],
        },
        {
          type: 'p',
          text: "You may exercise these rights by writing to our Grievance Officer using the details in the Grievance Officer Policy.",
        },
      ],
    },
    {
      id: 'childrens-data',
      title: "Children's Data",
      blocks: [
        {
          type: 'p',
          text: 'The Platform is not intended for use by individuals under 18 years of age, and we do not knowingly collect personal data from children. If we become aware that we have inadvertently collected personal data from a child without verifiable parental/guardian consent, we will delete it promptly.',
        },
      ],
    },
    {
      id: 'cookies-and-tracking',
      title: 'Cookies and Tracking',
      blocks: [
        {
          type: 'p',
          text: 'Our website and app use cookies and similar tracking technologies as described in our separate Cookie Policy, which forms part of this Privacy Policy.',
        },
      ],
    },
    {
      id: 'changes-to-this-policy',
      title: 'Changes to This Policy',
      blocks: [
        {
          type: 'p',
          text: 'We may update this Privacy Policy from time to time to reflect changes in our practices or applicable law. We will notify you of material changes through the Platform or by email, and will seek fresh consent where required by the DPDP Act before applying a materially different purpose to previously collected data.',
        },
      ],
    },
  ],
};
