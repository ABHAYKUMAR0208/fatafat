import { LegalPageData } from '../../components/legal/LegalPageLayout';

export const disclaimerContent: LegalPageData = {
  title: 'Disclaimer',
  effectiveDate: '31 July 2026',
  lastUpdated: '31 July 2026',
  note:
    'A disclaimer cannot exclude liability for death, personal injury, gross negligence, or a right guaranteed under the Consumer Protection Act, 2019 — have counsel confirm the enforceable scope before publishing.',
  sections: [
    {
      id: 'intermediary-status',
      title: 'Intermediary Status',
      blocks: [
        {
          type: 'p',
          text: 'GIT Software Technologies ("GIT") operates the Fatafat platform (the "Platform") as a technology intermediary that connects Riders and Senders with independent, third-party Captains. GIT is an "intermediary" as defined under the Information Technology Act, 2000. GIT does not itself provide transportation, courier, or carpooling services and does not own, lease, or operate any vehicle used to fulfil a booking made through the Platform.',
        },
      ],
    },
    {
      id: 'no-employment-or-agency-relationship',
      title: 'No Employment or Agency Relationship',
      blocks: [
        {
          type: 'p',
          text: 'Captains are independent, self-employed individuals or independent business entities who use the Platform to find booking opportunities. Nothing in these documents, or in the operation of the Platform, creates an employment, agency, joint venture, or partnership relationship between GIT and any Captain.',
        },
      ],
    },
    {
      id: 'third-party-conduct',
      title: 'Third-Party Conduct',
      blocks: [
        {
          type: 'p',
          text: 'While GIT undertakes the driver-verification and safety measures described in the Safety Policy, GIT cannot guarantee the conduct, driving standard, or behaviour of any Captain, Rider, Sender, or Recipient at all times, and is not liable for any act or omission of a Captain or other user that GIT could not reasonably have prevented through its verification, monitoring, and safety processes.',
        },
      ],
    },
    {
      id: 'as-is-and-as-available-basis',
      title: '"As Is" and "As Available" Basis',
      blocks: [
        {
          type: 'p',
          text: "The Platform, and all information, content, and functionality made available through it, is provided on an \"as is\" and \"as available\" basis. GIT does not warrant that the Platform will be uninterrupted, error-free, or free of harmful components, or that any fare estimate, arrival-time estimate, or route suggestion will be perfectly accurate, since these depend in part on third-party data (including maps, traffic, and network connectivity) outside GIT's control.",
        },
      ],
    },
    {
      id: 'limitation-of-liability',
      title: 'Limitation of Liability',
      blocks: [
        {
          type: 'p',
          text: "To the maximum extent permitted by applicable law, and subject to the Terms & Conditions, GIT disclaims liability for any indirect, incidental, or consequential loss arising from your use of the Platform, including loss of data, loss of profit, or loss arising from a service interruption, a third party's conduct, or an event beyond GIT's reasonable control (including a force majeure event, network failure, or government action). Nothing in this Disclaimer excludes or limits liability that cannot lawfully be excluded or limited, including for death or personal injury caused by GIT's proven negligence, or your rights under the Consumer Protection Act, 2019.",
        },
      ],
    },
    {
      id: 'third-party-links-and-services',
      title: 'Third-Party Links and Services',
      blocks: [
        {
          type: 'p',
          text: 'The Platform may contain links to, or integrate with, third-party services (including payment gateways, maps providers, and social sign-in providers). GIT is not responsible for the content, accuracy, or practices of any third-party service, and your use of such services is governed by their own terms and privacy policies.',
        },
      ],
    },
    {
      id: 'no-financial-or-insurance-advice',
      title: 'No Financial or Insurance Advice',
      blocks: [
        {
          type: 'p',
          text: 'Nothing on the Platform constitutes financial, insurance, or legal advice. Insurance coverage details provided in the Safety Policy are a summary for informational purposes; the actual terms of any insurance policy are governed exclusively by the policy document issued by the relevant insurer.',
        },
      ],
    },
  ],
};
