import type { Ionicons } from '@expo/vector-icons';
import type { ComponentType } from 'react';
import CarpoolScene from '../components/illustrations/CarpoolScene';
import ParcelDelivery from '../components/illustrations/ParcelDelivery';
import PinkScooterRider from '../components/pink-ride/illustrations/PinkScooterRider';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

export type HeroSlide = {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  /** Sky gradient shifts per slide so the whole scene's "mood" matches the service. */
  skyTop: string;
  skyBottom: string;
  accent: string;
  Illustration: ComponentType<{ accent?: string }>;

  // --- Left-column "big copy" content — synced to whichever slide is active ---
  badgeLabel: string;
  /** Each line of the big heading. Mark one (or more) as `accent: true` to color it. */
  headingLines: { text: string; accent?: boolean }[];
  /** Wrap words in **double asterisks** to render them bold. */
  body: string;
  /** Optional row of checkmark bullets under the body copy. Omit to hide the row for this slide. */
  bullets?: { icon: IconName; label: string }[];
};

export const heroSlides: HeroSlide[] = [
  {
    id: 'ride',
    eyebrow: 'RIDES',
    title: 'Get there without the wait',
    subtitle: 'Verified drivers, upfront fares, live tracking.',
    skyTop: '#0B1230',
    skyBottom: '#161F42',
    accent: '#3350DE',
    Illustration: CarpoolScene,

    badgeLabel: 'NOW LIVE IN DELHI NCR',
    headingLines: [
      { text: 'Fixed fares.' },
      { text: 'Verified captains.' },
      { text: 'Zero surge games.', accent: true },
    ],
    body:
      'Book autos, bikes, cars and same-city parcels at a fare decided upfront — not by demand. Now also intercity Carpool, and women-only Pink Fleet available on every ride type.',
    bullets: [
      { icon: 'checkmark-circle-outline', label: 'Fixed fare promise' },
      { icon: 'shield-checkmark-outline', label: 'Background-verified captains' },
      { icon: 'cube-outline', label: 'Parcels in 30 minutes' },
    ],
  },
  {
    id: 'pink',
    eyebrow: 'PINK RIDES',
    title: 'Rides built for her safety',
    subtitle: 'Women drivers, women riders, always tracked.',
    skyTop: '#3E1030',
    skyBottom: '#E0166C',
    accent: '#FFD5E8',
    Illustration: PinkScooterRider,

    badgeLabel: 'VERIFIED WOMEN, BOTH SIDES',
    headingLines: [
      { text: 'Ride with confidence.' },
      { text: 'Drive with freedom.', accent: true },
    ],
    body:
      'Two ways to travel with a woman behind the wheel: choose a **Lady Cab Driver** for a car ride, or book **Pink Scooty** — where both driver and passenger are women, every time. Bookable 7:45 AM to 8:00 PM.',
    // no bullets on this slide — matches the reference design
  },
  {
    id: 'parcel',
    eyebrow: 'DELIVERY',
    title: 'Parcels there by evening',
    subtitle: 'Same-day pickup, real-time proof of delivery.',
    skyTop: '#161F42',
    skyBottom: '#3350DE',
    accent: '#EAF0FE',
    Illustration: ParcelDelivery,

    badgeLabel: 'SAME-CITY, SAME-DAY',
    headingLines: [
      { text: 'Send it today.' },
      { text: 'Track it live.', accent: true },
    ],
    body:
      'Drop a parcel with a nearby captain and watch it move in real time. **Same-day pickup** across Delhi NCR, with photo proof the moment it lands.',
    bullets: [{ icon: 'time-outline', label: 'Delivered in 30 minutes' }],
  },
];