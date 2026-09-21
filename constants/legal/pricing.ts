import { LegalPageData } from '../../components/legal/LegalPageLayout';

export const pricingContent: LegalPageData = {
  title: 'Pricing Policy',
  effectiveDate: '31 July 2026',
  lastUpdated: '31 July 2026',
  note:
    "Confirm final commission percentages and surge caps against each state's notified aggregator rules before publishing — Haryana's 2026 rules cap aggregator commission at 20%; Delhi and UP may set different or no explicit cap.",
  sections: [
    {
      id: 'how-fares-are-calculated',
      title: 'How Fares Are Calculated',
      blocks: [
        {
          type: 'p',
          text: 'The fare for a trip or delivery on Fatafat is calculated using some or all of the following components, depending on the service booked:',
        },
        {
          type: 'ul',
          items: [
            'Base fare — a fixed starting amount for the service and vehicle category selected (Cab, Auto, Pink Scooty, Parcel, or Carpool).',
            'Distance and time — a per-kilometre and, where applicable, per-minute charge for the estimated or actual route.',
            'Applicable taxes — GST and any other tax mandated by law, shown separately at checkout.',
            'Tolls, parking, and state entry charges — passed through at actual cost where incurred during the trip.',
            'Dynamic (surge) pricing — a temporary multiplier applied during periods of high demand relative to available Captains, capped in accordance with applicable state aggregator rules where such a cap is prescribed.',
            'Waiting charges — applied where a Captain waits beyond the complimentary waiting period at pickup.',
            'Cancellation charges — as set out in the Refund & Cancellation Policy.',
          ],
        },
      ],
    },
    {
      id: 'fare-estimate-vs-final-fare',
      title: 'Fare Estimate vs. Final Fare',
      blocks: [
        {
          type: 'p',
          text: 'The fare shown before you confirm a booking is an estimate based on the route, time, and demand conditions at the time of booking. The final fare charged at the end of the trip may differ from the estimate due to a change in route (including at your request or due to traffic/road conditions), additional waiting time, or a change in demand conditions between booking and trip completion. Any material difference will be reflected transparently in your in-app trip receipt, which itemises each fare component.',
        },
      ],
    },
    {
      id: 'carpooling-peer-to-peer-pricing',
      title: 'Carpooling (Peer-to-Peer) Pricing',
      blocks: [
        {
          type: 'p',
          text: "Carpooling fares represent a cost-sharing contribution from co-travellers towards the Driver's trip expenses, and are calculated differently from on-demand Cab/Auto fares, consistent with applicable cost-sharing regulations. The cost-sharing amount is set out to both parties before the trip is confirmed and is not intended to generate a profit for the Driver.",
        },
      ],
    },
    {
      id: 'commission-and-fees',
      title: 'Commission and Fees',
      blocks: [
        {
          type: 'p',
          text: "GIT charges Captains a service commission on completed trips, calculated as a percentage of the fare, disclosed to Captains within the Captain app before they accept a booking. Where a state's notified aggregator rules prescribe a maximum permissible commission (for example, a cap of 20% under applicable Haryana rules), GIT's commission in that state will not exceed the prescribed cap. GIT does not charge Riders or Senders a separate platform fee beyond the fare and any convenience fee expressly disclosed at checkout.",
        },
      ],
    },
    {
      id: 'promotions-discounts-and-wallet-credits',
      title: 'Promotions, Discounts, and Wallet Credits',
      blocks: [
        {
          type: 'p',
          text: 'From time to time, GIT may offer promotional fares, discount codes, referral credits, or wallet credits, each subject to its own terms displayed at the time of the offer, including validity period, minimum fare, and usage limits. Promotional value has no cash withdrawal value and cannot be combined with another offer unless expressly stated.',
        },
      ],
    },
    {
      id: 'best-fare-promise',
      title: 'Best Fare Promise',
      blocks: [
        {
          type: 'p',
          text: 'Where GIT operates a Best Fare Promise or fare-match feature, a claim that a competing platform quoted a lower fare for a comparable trip must be submitted with supporting evidence (such as a screenshot) within the time window specified in-app, and is subject to review as described in the Refund & Cancellation Policy and applicable in-app terms.',
        },
      ],
    },
    {
      id: 'payment',
      title: 'Payment',
      blocks: [
        {
          type: 'p',
          text: 'Fares are payable through the payment methods enabled on the Platform. GST and other applicable taxes are calculated and displayed in accordance with applicable law. A detailed, itemised receipt is available in-app after every completed trip.',
        },
      ],
    },
    {
      id: 'changes-to-pricing',
      title: 'Changes to Pricing',
      blocks: [
        {
          type: 'p',
          text: 'GIT may revise base fares, per-kilometre/per-minute rates, or commission structures from time to time, in response to fuel cost, regulatory requirements, or market conditions. Material changes to publicly quoted fare structures will be reflected on the Platform before they take effect on a new booking; changes do not apply retroactively to a trip already in progress or completed.',
        },
      ],
    },
  ],
};
