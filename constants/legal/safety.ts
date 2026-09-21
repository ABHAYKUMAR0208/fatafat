import { LegalPageData } from '../../components/legal/LegalPageLayout';

export const safetyContent: LegalPageData = {
  title: 'Safety Policy',
  effectiveDate: '31 July 2026',
  lastUpdated: '31 July 2026',
  note:
    'Grounded in the Motor Vehicle Aggregator Guidelines, 2025 and state-specific rules for Delhi, Haryana, and UP. Confirm final insurance sums and feature list against whichever state\u2019s rules apply once your aggregator licences are granted.',
  extraContactNote: 'For an active safety emergency, always use the in-app SOS button first, and contact local emergency services (112) directly if you are in immediate danger.',
  sections: [
    {
      id: 'our-commitment-to-safety',
      title: 'Our Commitment to Safety',
      blocks: [
        {
          type: 'p',
          text: 'Safety is a condition of operating Fatafat, not an add-on. This Policy describes how we verify Captains before they can accept bookings, the safety features built into the Platform, the insurance coverage maintained for Riders, Senders, and Captains, and what happens when something goes wrong.',
        },
      ],
    },
    {
      id: 'captain-verification',
      title: 'Captain Verification',
      blocks: [
        { type: 'p', text: 'Before a Captain is permitted to accept bookings on the Platform, GIT requires:' },
        {
          type: 'ul',
          items: [
            "A valid driving licence, verified electronically against the Ministry of Road Transport & Highways' Sarathi database.",
            'A valid vehicle registration certificate and permit, verified against the Vahan database.',
            'Valid, current vehicle insurance.',
            "Police verification / background check, where mandated by the applicable state's aggregator rules.",
            'A vehicle-fitness and pollution-compliance check, and, in NCR areas covered by a clean-fuel mandate, confirmation that the vehicle meets the applicable fuel-type requirement.',
            'A recent photograph of the Captain and the vehicle, used for in-app identity confirmation before a trip.',
          ],
        },
        {
          type: 'p',
          text: "Re-verification is carried out periodically and whenever a document nears expiry, and a Captain's account is automatically restricted if a required document lapses.",
        },
      ],
    },
    {
      id: 'in-app-safety-features',
      title: 'In-App Safety Features',
      blocks: [
        {
          type: 'ul',
          items: [
            'Live GPS tracking of every trip, visible to the Rider or Sender throughout.',
            'Trip-sharing, allowing you to share your live trip status and location with a trusted contact.',
            'An in-app SOS / panic button connected to emergency response, available throughout the trip.',
            'Call and chat masking, so Riders and Captains can communicate without exposing personal phone numbers.',
            "Two-way ratings after every trip, feeding into each Captain's and Rider's safety and quality record.",
            'Route-deviation detection, which flags a trip that departs materially from the expected route for review.',
            'A first-aid kit and, where required by applicable state rules, a fire extinguisher carried in the vehicle.',
          ],
        },
      ],
    },
    {
      id: 'insurance-coverage',
      title: 'Insurance Coverage',
      blocks: [
        {
          type: 'p',
          text: 'Consistent with the Motor Vehicle Aggregator Guidelines and the state-specific rules under which GIT is licensed, GIT maintains or requires the following minimum insurance coverage:',
        },
        {
          type: 'table',
          headers: ['Coverage', 'Minimum Sum Insured', 'Who it protects'],
          rows: [
            ['Passenger insurance', 'Rs. 5,00,000', 'Riders, for the duration of a trip'],
            ['Captain health insurance', 'Rs. 5,00,000', 'Onboarded Captains'],
            ['Captain term (life) insurance', 'Rs. 10,00,000', 'Onboarded Captains'],
          ],
        },
        {
          type: 'p',
          text: "This is a summary for informational purposes only; the exact terms, exclusions, and claims process are governed by the policy document issued by GIT's insurance partner, available on request.",
        },
      ],
    },
    {
      id: 'pink-scooty-additional-safety-measures',
      title: 'Pink Scooty — Additional Safety Measures',
      blocks: [
        {
          type: 'p',
          text: 'Pink Scooty is a service category intended for women riders, with additional safety measures including women Captains (where the local Captain pool allows), enhanced identity verification, and priority routing of any Pink Scooty safety report to a dedicated review queue.',
        },
      ],
    },
    {
      id: 'raising-a-safety-concern',
      title: 'What Happens If You Raise a Safety Concern',
      blocks: [
        {
          type: 'p',
          text: "Pressing the in-app SOS button during a trip alerts our Safety Desk in real time and, depending on the severity, may notify local emergency services. A safety report — whether raised through SOS, a route-deviation flag, or a post-trip complaint — is reviewed by a trained Safety Desk agent, who may contact you for more information, escalate to law enforcement where warranted, and take action against the Captain's or Rider's account ranging from a warning to permanent removal from the Platform, pending investigation.",
        },
        {
          type: 'p',
          text: 'We aim to acknowledge a safety report within 15 minutes during active hours and provide a substantive update within 24 hours.',
        },
      ],
    },
    {
      id: 'community-guidelines',
      title: 'Community Guidelines',
      blocks: [
        {
          type: 'p',
          text: 'All users — Riders, Senders, and Captains — are expected to treat each other with respect. GIT has zero tolerance for harassment, discrimination, violence, or threats of violence on the Platform, and any substantiated report of such conduct will result in permanent removal from the Platform and may be reported to law enforcement.',
        },
      ],
    },
    {
      id: 'vehicle-and-road-safety',
      title: 'Vehicle and Road Safety',
      blocks: [
        {
          type: 'ul',
          items: [
            'Captains are required to comply with all applicable traffic laws, and may not use a mobile phone in a manner prohibited while driving other than through an approved in-vehicle mount for navigation.',
            'A vehicle that fails a fitness, insurance, or pollution check is automatically restricted from accepting bookings until the issue is resolved.',
            "GIT reserves the right to require additional safety training for a Captain following a substantiated safety complaint, before reinstating their ability to accept bookings.",
          ],
        },
      ],
    },
    {
      id: 'data-used-for-safety',
      title: 'Data Used for Safety',
      blocks: [
        {
          type: 'p',
          text: 'Safety features rely on the processing of your location and trip data as described in the Privacy Policy. This data is used strictly for the purposes described in this Safety Policy and the Privacy Policy, including live tracking, route-deviation detection, and incident investigation.',
        },
      ],
    },
  ],
};
