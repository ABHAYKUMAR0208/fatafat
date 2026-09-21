import { LegalPageData } from '../../components/legal/LegalPageLayout';

export const refundCancellationContent: LegalPageData = {
  title: 'Refund & Cancellation Policy',
  effectiveDate: '31 July 2026',
  lastUpdated: '31 July 2026',
  note:
    'This document should stay consistent with the Consumer Protection (E-Commerce) Rules, 2020, which require refund and cancellation terms to be clearly displayed before checkout. Bracketed figures are placeholders — finalise with product/finance before publishing.',
  sections: [
    {
      id: 'general-principle',
      title: 'General Principle',
      blocks: [
        {
          type: 'p',
          text: 'Fatafat aims to make cancellation and refund terms clear before you confirm a booking, consistent with the Consumer Protection (E-Commerce) Rules, 2020. This Policy applies across Cab, Auto, Pink Scooty, Parcel, and Carpool bookings, with service-specific variations noted below.',
        },
      ],
    },
    {
      id: 'cancellation-by-you',
      title: 'Cancellation by You (Rider / Sender)',
      blocks: [
        {
          type: 'table',
          headers: ['Timing', 'Charge'],
          rows: [
            ['Within the free cancellation window (e.g. first 2 minutes after booking, before a Captain is assigned)', 'No charge'],
            ['After a Captain is assigned, but before the Captain has travelled more than 1 km towards pickup', 'No charge'],
            ['After the Captain has substantially approached or arrived at the pickup point', 'Cancellation fee applies, shown in-app before you confirm'],
            ['Repeated cancellations in a short period', 'May result in a temporary booking restriction'],
          ],
        },
        {
          type: 'p',
          text: 'The exact cancellation fee, and the free-cancellation time window, are displayed in-app at the time of booking and may vary by city, service, and demand conditions.',
        },
      ],
    },
    {
      id: 'cancellation-by-captain',
      title: 'Cancellation by Captain',
      blocks: [
        {
          type: 'p',
          text: "If a Captain cancels a confirmed booking, or fails to complete the trip through no fault of yours, you will not be charged, and any amount already collected (including for a prepaid trip) will be refunded in full. Repeated cancellations by a Captain are tracked and may result in action against that Captain's account under the Safety Policy.",
        },
      ],
    },
    {
      id: 'no-show-policy',
      title: 'No-Show Policy',
      blocks: [
        {
          type: 'p',
          text: 'If a Captain arrives at the pickup point and you are not present or reachable within a reasonable waiting period (typically 5 minutes) after the Captain has notified you of arrival, the trip may be marked a no-show and a no-show charge may apply, shown in-app before it is levied.',
        },
      ],
    },
    {
      id: 'parcel-cancellations',
      title: 'Parcel Cancellations',
      blocks: [
        {
          type: 'p',
          text: 'A parcel booking may be cancelled free of charge before the Captain has arrived for pickup. Once the Captain has picked up the parcel, cancellation is treated as an incomplete delivery and is handled under Service Failures below, not as a standard cancellation.',
        },
      ],
    },
    {
      id: 'carpooling-cancellations',
      title: 'Carpooling Cancellations',
      blocks: [
        {
          type: 'p',
          text: 'Carpooling bookings follow a modified cancellation schedule reflecting their cost-sharing nature: a co-traveller who cancels close to departure may forfeit part of the cost-sharing contribution to compensate the Driver, and a Driver who cancels a confirmed carpool results in a full refund to all co-travellers, consistent with the terms shown at the time of booking.',
        },
      ],
    },
    {
      id: 'service-failures-and-disputes',
      title: 'Service Failures and Disputes',
      blocks: [
        {
          type: 'p',
          text: 'Where a service is not delivered as booked — for example, a parcel is lost or damaged, or a trip is materially different from what was booked — you may raise a dispute through in-app support within 7 days of the affected trip. Claims are reviewed against available trip data (GPS trail, timestamps, in-app communication) and resolved in accordance with this Policy and, where applicable, the Best Fare Promise terms in the Pricing Policy.',
        },
      ],
    },
    {
      id: 'refund-method-and-timeline',
      title: 'Refund Method and Timeline',
      blocks: [
        {
          type: 'p',
          text: "Approved refunds are issued to the original payment method or, at your election, credited to your Fatafat in-app wallet. Refunds to a card, UPI, or bank account are typically processed within 5–7 business days, subject to your bank's or payment provider's own processing time. Wallet credits are typically applied immediately upon approval.",
        },
      ],
    },
    {
      id: 'promotional-and-wallet-payments',
      title: 'Promotional and Wallet Payments',
      blocks: [
        {
          type: 'p',
          text: "Where a booking was paid for in whole or in part using a promotional credit, discount, or non-withdrawable wallet balance, any refund due will first be applied to restore the promotional/wallet portion used, with any balance refunded in cash to the original payment method, unless the specific promotion's terms state otherwise.",
        },
      ],
    },
  ],
};
