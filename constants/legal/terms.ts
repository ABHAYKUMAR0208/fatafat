import { LegalPageData } from '../../components/legal/LegalPageLayout';

export const termsContent: LegalPageData = {
  title: 'Terms & Conditions',
  effectiveDate: '31 July 2026',
  lastUpdated: '31 July 2026',
  note:
    'Draft prepared for review before launch. Bracketed items [like this] must be completed with final entity, address, and contact details once the operating entity is finalised. Have this reviewed by a qualified Indian lawyer before publication.',
  sections: [
    {
      id: 'introduction-and-acceptance',
      title: 'Introduction and Acceptance',
      blocks: [
        {
          type: 'p',
          text: 'These Terms & Conditions ("Terms") govern access to and use of the Fatafat mobile application and website (together, the "Platform"), operated by GIT Software Technologies ("GIT", "Company", "we", "us", "our"). The Platform enables users ("Riders", "Senders", "you") to book on-demand cab, auto-rickshaw, Pink Scooty, carpooling, and parcel delivery services, and connects them with independent driver-partners ("Captains") who provide those services.',
        },
        {
          type: 'p',
          text: 'By creating an account, or by clicking "I Agree", or by otherwise accessing or using the Platform, you confirm that you have read, understood, and agree to be bound by these Terms, our Privacy Policy, Cookie Policy, Pricing Policy, Refund & Cancellation Policy, Disclaimer, and Safety Policy, each of which is incorporated into these Terms by reference. If you do not agree, you must not use the Platform.',
        },
        {
          type: 'p',
          text: 'These Terms constitute an electronic record under the Information Technology Act, 2000 and the rules made thereunder, and do not require any physical or digital signature.',
        },
      ],
    },
    {
      id: 'eligibility',
      title: 'Eligibility',
      blocks: [
        {
          type: 'ul',
          items: [
            'You must be at least 18 years old and capable of entering into a legally binding contract under the Indian Contract Act, 1872, to create a Fatafat account.',
            'You must provide accurate, current, and complete information during registration, including a valid mobile number verified by OTP.',
            'GIT reserves the right to refuse registration, or to suspend or terminate an existing account, at its sole discretion where these Terms are violated or fraudulent, unsafe, or abusive conduct is reasonably suspected.',
          ],
        },
      ],
    },
    {
      id: 'nature-of-the-platform',
      title: 'Nature of the Platform',
      blocks: [
        {
          type: 'p',
          text: 'GIT is a technology aggregator. The Platform is a marketplace that connects Riders and Senders with independent, third-party Captains who own or lawfully operate their own vehicles. GIT does not itself provide transportation, courier, or carpooling services, does not own or operate any vehicle used to fulfil a booking, and is not a common carrier.',
        },
        {
          type: 'p',
          text: 'Captains are independent contractors, not employees or agents of GIT. GIT is not responsible for the acts or omissions of any Captain, except to the extent expressly stated in the Safety Policy or required by applicable law, including the Motor Vehicle Aggregator Guidelines and any state-specific aggregator scheme under which GIT holds or is applying for a licence.',
        },
      ],
    },
    {
      id: 'services-offered',
      title: 'Services Offered',
      blocks: [
        {
          type: 'p',
          text: 'Subject to availability in your city and service area, the Platform allows you to book the following services:',
        },
        {
          type: 'ul',
          items: [
            'Cab — on-demand four-wheeler point-to-point transport.',
            'Auto — on-demand three-wheeler point-to-point transport.',
            'Pink Scooty — two-wheeler transport intended for women riders, subject to the eligibility and safety conditions described in the Safety Policy.',
            'Carpooling (Peer-to-Peer) — a cost-sharing arrangement between a Driver travelling on their own account and one or more co-travellers, governed additionally by the Carpool Terms available in-app.',
            'Parcel — on-demand pickup and delivery of parcels between a Sender and a Recipient, subject to the item restrictions in Section 8.',
          ],
        },
        {
          type: 'p',
          text: 'GIT may add, modify, suspend, or discontinue any service, in any city, at any time, with or without notice, including to comply with a change in law or a government directive.',
        },
      ],
    },
    {
      id: 'booking-fares-and-payment',
      title: 'Booking, Fares, and Payment',
      blocks: [
        {
          type: 'p',
          text: 'Fare estimates shown before booking are indicative and calculated based on distance, time, demand, applicable surge/dynamic pricing, tolls, and other factors described in the Pricing Policy. The final fare charged may differ from the estimate due to route deviation, waiting time, tolls, or other factors incurred during the trip.',
        },
        {
          type: 'p',
          text: "Payment may be made via the payment methods enabled on the Platform, including UPI, cards, net banking, and in-app wallet, processed through GIT's third-party payment gateway partner(s). GIT does not store your full card details.",
        },
        { type: 'p', text: 'All applicable taxes, including GST, are included in or added to the fare as shown at the time of booking.' },
      ],
    },
    {
      id: 'user-conduct',
      title: 'User Conduct',
      blocks: [
        { type: 'p', text: 'You agree that you will not, and will not permit any third party to:' },
        {
          type: 'ul',
          items: [
            'Use the Platform for any unlawful purpose, or in a manner that violates any applicable law, including local transport and traffic regulations.',
            'Harass, threaten, abuse, or discriminate against any Captain, Rider, Sender, or Recipient on any ground, including gender, religion, caste, or disability.',
            'Provide false identity, payment, or booking information.',
            'Damage, tamper with, or misuse any vehicle or equipment used to provide a service.',
            'Carry any prohibited, hazardous, illegal, or contraband item as a Parcel (see Section 8).',
            'Circumvent, disable, or interfere with any safety feature of the Platform, including live tracking, the SOS/panic button, or trip-sharing.',
          ],
        },
        {
          type: 'p',
          text: 'GIT may suspend or terminate your account, without prior notice, for a violation of this Section, and may report unlawful conduct to the relevant police or regulatory authority.',
        },
      ],
    },
    {
      id: 'captain-conduct-and-verification',
      title: 'Captain Conduct and Verification',
      blocks: [
        {
          type: 'p',
          text: "GIT requires every Captain to complete document verification (driving licence, registration certificate, insurance, and, where applicable, police verification) before being permitted to accept bookings, consistent with the requirements described in the Safety Policy and applicable state aggregator rules. GIT does not guarantee that a Captain's conduct will at all times meet these standards, and encourages Riders and Senders to use the in-app rating, SOS, and reporting features described in the Safety Policy for any concern.",
        },
      ],
    },
    {
      id: 'parcel-service-restrictions',
      title: 'Parcel Service — Restrictions',
      blocks: [
        {
          type: 'p',
          text: 'The following items must never be sent through the Parcel service: cash, jewellery and precious metals above a reasonable personal-use value, firearms and weapons, explosives and hazardous or flammable materials, narcotics and controlled substances, live animals, human remains, counterfeit goods, and any item whose carriage is prohibited by applicable law. GIT and the Captain reserve the right to refuse or discontinue carriage of any item reasonably suspected to violate this Section, and to report the same to the relevant authority.',
        },
      ],
    },
    {
      id: 'cancellations-and-refunds',
      title: 'Cancellations and Refunds',
      blocks: [
        {
          type: 'p',
          text: 'Cancellation charges, no-show policy, and refund timelines are set out in the Refund & Cancellation Policy, which forms part of these Terms.',
        },
      ],
    },
    {
      id: 'intellectual-property',
      title: 'Intellectual Property',
      blocks: [
        {
          type: 'p',
          text: 'The Platform, including its name, logo, "Fatafat" branding, software, and all content (excluding user-generated content and third-party content), is the property of GIT or its licensors and is protected by applicable intellectual property law. You are granted a limited, non-exclusive, non-transferable, revocable licence to use the Platform for its intended personal, non-commercial purpose. You may not copy, modify, reverse-engineer, or create derivative works from the Platform.',
        },
      ],
    },
    {
      id: 'limitation-of-liability',
      title: 'Limitation of Liability',
      blocks: [
        {
          type: 'p',
          text: "To the maximum extent permitted by applicable law, GIT's liability arising out of or relating to your use of the Platform shall not exceed the amount of fees paid by you for the specific booking giving rise to the claim. GIT shall not be liable for any indirect, incidental, consequential, or punitive damages. Nothing in this Section limits any liability that cannot be excluded or limited under applicable Indian law, including in relation to death or personal injury caused by GIT's proven negligence, or GIT's obligations under the Consumer Protection Act, 2019.",
        },
        { type: 'p', text: 'Further disclaimers applicable to your use of the Platform are set out in the Disclaimer, which forms part of these Terms.' },
      ],
    },
    {
      id: 'indemnity',
      title: 'Indemnity',
      blocks: [
        {
          type: 'p',
          text: 'You agree to indemnify and hold harmless GIT, its officers, directors, employees, and affiliates from any claim, loss, liability, or expense (including reasonable legal fees) arising out of your breach of these Terms, your violation of any law, or your misuse of the Platform.',
        },
      ],
    },
    {
      id: 'suspension-and-termination',
      title: 'Suspension and Termination',
      blocks: [
        {
          type: 'p',
          text: 'You may stop using the Platform and delete your account at any time through the in-app settings or by writing to us. GIT may suspend or terminate your access to the Platform, with or without notice, for a violation of these Terms, for extended inactivity, or as required by law.',
        },
      ],
    },
    {
      id: 'governing-law-and-dispute-resolution',
      title: 'Governing Law and Dispute Resolution',
      blocks: [
        {
          type: 'p',
          text: 'These Terms are governed by the laws of India. Subject to the grievance redressal process set out in the Grievance Officer Policy, any dispute arising out of or in connection with these Terms shall first be attempted to be resolved amicably, failing which it shall be referred to arbitration under the Arbitration and Conciliation Act, 1996, seated in [Delhi / insert city], with the courts at [Delhi / insert city] having exclusive jurisdiction over any matter not subject to arbitration.',
        },
      ],
    },
    {
      id: 'amendments',
      title: 'Amendments',
      blocks: [
        {
          type: 'p',
          text: 'GIT may revise these Terms from time to time. Material changes will be notified through the Platform or by email at least 7 days before they take effect. Your continued use of the Platform after a revision takes effect constitutes acceptance of the revised Terms.',
        },
      ],
    },
    {
      id: 'grievance-redressal',
      title: 'Grievance Redressal',
      blocks: [
        {
          type: 'p',
          text: 'For any grievance relating to these Terms or your use of the Platform, please refer to the Grievance Officer Policy, which sets out our Grievance Officer\u2019s contact details and the applicable resolution timelines under the Information Technology Rules, 2021.',
        },
      ],
    },
  ],
};
