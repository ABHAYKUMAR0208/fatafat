import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { AnimatePresence, MotiView } from 'moti';
import React, { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts, gradients } from '../../constants/theme';
import { StoreBadgeIcon } from '../GetFatafatApp';

const IS_WEB = Platform.OS === 'web';

// Blue / white / amber — matches the rest of the brand (colors.accentBlue,
// colors.secondaryBlue) instead of a one-off green accent.
const AMBER = '#1B7FC4';
const AMBER_BG = '#EAF0FE';
const AMBER_BORDER = 'rgba(27,127,196,0.20)';
const BLUE = colors.accentBlue;
const BLUE_BG = colors.chipBg;
const BLUE_BORDER = 'rgba(51,80,222,0.18)';

const GLASS_BG = 'rgba(255,255,255,0.72)';
const GLASS_BORDER = 'rgba(255,255,255,0.9)';

function useHover() {
  const [hovered, setHovered] = useState(false);
  const handlers = IS_WEB
    ? {
        // @ts-ignore -- web only pointer events
        onMouseEnter: () => setHovered(true),
        // @ts-ignore -- web only pointer events
        onMouseLeave: () => setHovered(false),
      }
    : {};
  return { hovered, handlers };
}

/** Soft blue + amber glow blobs behind a section — gives the translucent glass
 * cards on top of it something to actually show through. Scrolls with the
 * section (unlike a fixed page background) so it stays lined up with its card. */
function SectionGlow() {
  return (
    <View pointerEvents="none" style={styles.glowLayer}>
      <View style={[styles.glowBlob, styles.glowBlobBlue]} />
      <View style={[styles.glowBlob, styles.glowBlobAmber]} />
    </View>
  );
}

function SectionHeader({
  badgeIcon,
  badgeLabel,
  heading,
  headingAccent,
  lead,
}: {
  badgeIcon: keyof typeof Ionicons.glyphMap;
  badgeLabel: string;
  heading: string;
  headingAccent: string;
  lead: string;
}) {
  return (
    <View style={styles.header}>
      <View style={styles.badge}>
        <Ionicons name={badgeIcon} size={13} color={AMBER} />
        <Text style={styles.badgeLabel}>{badgeLabel}</Text>
      </View>
      <Text style={styles.heading}>
        {heading} <Text style={styles.headingAccent}>{headingAccent}</Text>
      </Text>
      <Text style={styles.lead}>{lead}</Text>
    </View>
  );
}

/* ───────────────────────── How It Works ───────────────────────── */

type Step = { title: string; description: string };

const PASSENGER_STEPS: Step[] = [
  {
    title: 'Compare rides already published',
    description:
      'See every available ride on your route with departure times, price per seat, and driver ratings side by side.',
  },
  {
    title: 'Book instantly, or request a seat',
    description:
      "Some drivers accept bookings automatically. Others review requests first — you'll hear back within minutes either way.",
  },
  {
    title: 'No rides yet? Set an alert',
    description:
      "If nothing matches, create a route alert and we'll notify you the moment a driver publishes a trip on your route.",
  },
];

const DRIVER_STEPS: Step[] = [
  {
    title: 'Publish your trip',
    description:
      'Enter your route, date, departure time, and price per seat. Your trip goes live instantly for riders to see.',
  },
  {
    title: 'Accept automatically, or review requests',
    description:
      "Choose auto-accept for instant bookings, or manually review each rider's profile and rating before confirming.",
  },
  {
    title: 'Drive, and get paid your price',
    description:
      'Earnings land in your account within 24 hours of trip completion. You set the price — we handle the rest.',
  },
];

function StepColumn({
  icon,
  label,
  steps,
  tone,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  steps: Step[];
  tone: 'blue' | 'amber';
}) {
  const bg = tone === 'blue' ? BLUE_BG : AMBER_BG;
  const fg = tone === 'blue' ? BLUE : AMBER;

  return (
    <View style={styles.stepColumn}>
      <View style={styles.stepColumnHeader}>
        <View style={[styles.stepColumnIcon, { backgroundColor: bg }]}>
          <Ionicons name={icon} size={16} color={fg} />
        </View>
        <Text style={styles.stepColumnLabel}>{label}</Text>
      </View>

      {steps.map((step, i) => (
        <View key={step.title} style={styles.stepCard}>
          <View style={[styles.stepNumber, { backgroundColor: bg }]}>
            <Text style={[styles.stepNumberText, { color: fg }]}>{i + 1}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.stepTitle}>{step.title}</Text>
            <Text style={styles.stepDescription}>{step.description}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

export function CarpoolHowItWorks({ isDesktop }: { isDesktop: boolean }) {
  return (
    <View style={styles.section}>
      <SectionHeader
        badgeIcon="git-network-outline"
        badgeLabel="How It Works"
        heading="From search to seat,"
        headingAccent="in three steps."
        lead="Whether you're riding or driving, the process is fast, transparent, and fair."
      />

      <View style={[styles.stepGrid, !isDesktop && styles.stepGridStacked]}>
        <StepColumn icon="person-outline" label="As a passenger" steps={PASSENGER_STEPS} tone="blue" />
        <StepColumn icon="car-outline" label="As a driver" steps={DRIVER_STEPS} tone="amber" />
      </View>
    </View>
  );
}

/* ───────────────────────── Pricing ───────────────────────── */

const PRICE_PER_SEAT = 450;

export function CarpoolPricing({ isDesktop }: { isDesktop: boolean }) {
  const [seats, setSeats] = useState(2);
  const driverTotal = PRICE_PER_SEAT * seats;
  const fee = Math.round(25 + driverTotal * 0.022);
  const total = driverTotal + fee;

  return (
    <View style={styles.section}>
      <View style={[styles.pricingRow, !isDesktop && styles.pricingRowStacked]}>
        <View style={styles.pricingText}>
          <View style={styles.badge}>
            <Ionicons name="pricetag-outline" size={13} color={AMBER} />
            <Text style={styles.badgeLabel}>How Pricing Works</Text>
          </View>
          <Text style={[styles.heading, { textAlign: 'left', marginTop: 18 }]}>
            The driver sets the price.{'\n'}
            <Text style={styles.headingAccent}>We just keep it honest.</Text>
          </Text>
          <Text style={[styles.lead, { textAlign: 'left', marginTop: 14 }]}>
            Drivers choose what to charge per seat to cover fuel and tolls. We suggest a fair
            price range based on distance and demand, but the final call is always theirs. A
            small service fee is added on top to keep the platform running.
          </Text>

          <View style={{ marginTop: 24, gap: 16 }}>
            {[
              { icon: 'options-outline' as const, title: 'Driver sets the price', body: 'Per-seat pricing based on fuel, tolls, and vehicle costs.', tone: 'blue' as const },
              { icon: 'scale-outline' as const, title: 'Suggested range keeps it fair', body: "We show a recommended band so riders aren't overcharged.", tone: 'amber' as const },
              { icon: 'receipt-outline' as const, title: 'Small service fee added', body: 'A nominal platform fee per booking covers support and operations.', tone: 'blue' as const },
            ].map((row) => (
              <View key={row.title} style={{ flexDirection: 'row', gap: 14, alignItems: 'flex-start' }}>
                <View style={[styles.pricingIcon, { backgroundColor: row.tone === 'blue' ? BLUE_BG : AMBER_BG }]}>
                  <Ionicons name={row.icon} size={15} color={row.tone === 'blue' ? BLUE : AMBER} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.stepTitle}>{row.title}</Text>
                  <Text style={styles.stepDescription}>{row.body}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.calcCard}>
          <SectionGlow />
          <Text style={styles.calcHeading}>Price calculator</Text>

          <Text style={styles.calcLabel}>Price per seat (set by driver)</Text>
          <View style={styles.calcPriceRow}>
            <Text style={styles.calcPriceValue}>₹{PRICE_PER_SEAT}</Text>
            <Text style={styles.calcPriceHint}>per seat</Text>
          </View>

          <Text style={[styles.calcLabel, { marginTop: 20 }]}>Number of seats</Text>
          <View style={styles.seatStepper}>
            <Pressable style={styles.seatBtn} onPress={() => setSeats((s) => Math.max(1, s - 1))}>
              <Ionicons name="remove" size={16} color={colors.ink} />
            </Pressable>
            <Text style={styles.seatCount}>{seats}</Text>
            <Pressable style={styles.seatBtn} onPress={() => setSeats((s) => Math.min(6, s + 1))}>
              <Ionicons name="add" size={16} color={colors.ink} />
            </Pressable>
          </View>

          <View style={styles.calcBreakdown}>
            <View style={styles.calcBreakdownRow}>
              <Text style={styles.calcBreakdownLabel}>Driver's price ({seats} seats)</Text>
              <Text style={styles.calcBreakdownValue}>₹{driverTotal.toLocaleString('en-IN')}</Text>
            </View>
            <View style={styles.calcBreakdownRow}>
              <Text style={styles.calcBreakdownLabel}>Service fee</Text>
              <Text style={styles.calcBreakdownValue}>₹{fee.toLocaleString('en-IN')}</Text>
            </View>
            <View style={[styles.calcBreakdownRow, styles.calcTotalRow]}>
              <Text style={styles.calcTotalLabel}>You pay</Text>
              <Text style={styles.calcTotalValue}>₹{total.toLocaleString('en-IN')}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

/* ───────────────────────── Safety & Trust ───────────────────────── */

type SafetyFeature = { id: string; icon: keyof typeof Ionicons.glyphMap; title: string; description: string };

const SAFETY_FEATURES: SafetyFeature[] = [
  {
    id: 'id',
    icon: 'id-card-outline',
    title: 'Verified ID, both sides',
    description: 'Drivers verify license & vehicle registration. Passengers verify a government ID. No one rides unchecked.',
  },
  {
    id: 'chat',
    icon: 'chatbubble-ellipses-outline',
    title: 'Message & call in-app only',
    description: 'All communication stays inside the app. No personal numbers are shared, and every chat is logged.',
  },
  {
    id: 'rating',
    icon: 'star-outline',
    title: 'Ratings after every ride',
    description: 'Both driver and passenger rate each other. Low-rated accounts get flagged and reviewed.',
  },
  {
    id: 'women-only',
    icon: 'female-outline',
    title: 'Prefer a women-only ride?',
    description: 'Female passengers can filter for female drivers — visible during search, enforced automatically.',
  },
  {
    id: 'confirm',
    icon: 'checkmark-circle-outline',
    title: 'Confirm before you travel',
    description: "Get the driver's photo, vehicle details, and pickup point 2 hours before departure. Your call to confirm.",
  },
  {
    id: 'report',
    icon: 'flag-outline',
    title: 'Report a ride, anytime',
    description: 'File a report with one tap. Our safety team reviews every report within 4 hours.',
  },
];

function SafetyCard({ feature }: { feature: SafetyFeature }) {
  const { hovered, handlers } = useHover();
  return (
    <View style={[styles.glassCard, hovered && styles.glassCardHovered]} {...handlers}>
      <LinearGradient
        colors={gradients.carpool}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.safetyIconWrap, hovered && { transform: [{ scale: 1.08 }] }]}
      >
        <Ionicons name={feature.icon} size={20} color="#FFFFFF" />
      </LinearGradient>
      <Text style={styles.stepTitle}>{feature.title}</Text>
      <Text style={styles.stepDescription}>{feature.description}</Text>
    </View>
  );
}

export function CarpoolSafety() {
  return (
    <View style={styles.section}>
      <SectionGlow />
      <SectionHeader
        badgeIcon="shield-checkmark-outline"
        badgeLabel="Safety & Trust"
        heading="Every match is between"
        headingAccent="two verified people."
        lead="From ID checks to in-app messaging and post-ride ratings, every layer is designed so you can ride with confidence."
      />
      <View style={styles.safetyGrid}>
        {SAFETY_FEATURES.map((f) => (
          <SafetyCard key={f.id} feature={f} />
        ))}
      </View>
    </View>
  );
}

/* ───────────────────────── Requirements to publish ───────────────────────── */

type Requirement = { id: string; title: string; description: string };

const REQUIREMENTS: Requirement[] = [
  {
    id: 'licence',
    title: 'Valid driving licence',
    description: 'Verified once against government records before your first published ride.',
  },
  {
    id: 'vehicle',
    title: 'Your own registered vehicle',
    description: 'Vehicle registration certificate (RC) in your name, or with authorisation to drive it.',
  },
  {
    id: 'insurance',
    title: 'Current insurance',
    description: "Valid vehicle insurance covering the trip you're publishing.",
  },
  {
    id: 'genuine',
    title: 'A genuine cost-sharing trip',
    description:
      "Carpool is for sharing a journey you're already making — not for running it as a commercial taxi service.",
  },
];

export function CarpoolRequirements() {
  return (
    <View style={styles.section}>
      <SectionGlow />
      <View style={styles.badge}>
        <Ionicons name="clipboard-outline" size={13} color={AMBER} />
        <Text style={styles.badgeLabel}>Requirements</Text>
      </View>
      <Text style={[styles.heading, styles.headingLeft]}>What it takes to publish a ride</Text>

      <View style={styles.reqList}>
        {REQUIREMENTS.map((req) => (
          <View key={req.id} style={styles.reqRow}>
            <View style={styles.reqTick}>
              <Ionicons name="checkmark" size={14} color={BLUE} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.reqTitle}>{req.title}</Text>
              <Text style={styles.reqDescription}>{req.description}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

/* ───────────────────────── FAQ ───────────────────────── */

type FaqItem = { id: string; icon: keyof typeof Ionicons.glyphMap; question: string; answer: string };

const CARPOOL_FAQS: FaqItem[] = [
  {
    id: 'cancel',
    icon: 'close-circle-outline',
    question: 'Can I cancel a booking?',
    answer:
      'Yes. Cancel more than 12 hours before departure for a full refund. Between 6–12 hours, a 20% fee applies. Under 6 hours, the booking is non-refundable — this protects drivers from last-minute empty seats.',
  },
  {
    id: 'driver-cancels',
    icon: 'return-up-back-outline',
    question: 'What if the driver cancels?',
    answer:
      "If a driver cancels at any point, you get a 100% refund automatically — no fees. We'll also try to match you with an alternative ride on the same route if one is available.",
  },
  {
    id: 'vs-cab',
    icon: 'swap-horizontal-outline',
    question: 'How is this different from booking a cab?',
    answer:
      'On-demand cab booking is a commercial service. Carpooling is different — a real driver is already taking that route and shares empty seats to split fuel and toll costs. The driver sets the price, and it stays a genuine cost-sharing trip.',
  },
  {
    id: 'choose',
    icon: 'people-outline',
    question: 'Can I choose who I travel with?',
    answer:
      "Absolutely. Every listing shows the driver's name, photo, rating, trip count, and vehicle details, so you pick the ride that feels right. Drivers can review passenger profiles too.",
  },
  {
    id: 'no-show',
    icon: 'alert-circle-outline',
    question: "What if my driver doesn't show up?",
    answer:
      "If the driver hasn't arrived within 15 minutes and isn't reachable in-app, mark them as a no-show for a full refund. Their account gets flagged, and we'll try to find you an alternative ride.",
  },
];

function FaqRow({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false);
  const { hovered, handlers } = useHover();
  const active = open || hovered;

  return (
    <View style={[styles.faqItem, open && styles.faqItemOpen]} {...handlers}>
      <Pressable style={styles.faqTrigger} onPress={() => setOpen((v) => !v)}>
        <View style={[styles.faqIconBadge, active && styles.faqIconBadgeActive]}>
          <Ionicons name={item.icon} size={18} color={active ? '#FFFFFF' : AMBER} />
        </View>
        <Text style={styles.faqQuestion}>{item.question}</Text>
        <View style={open ? { transform: [{ rotate: '180deg' }] } : undefined}>
          <Ionicons name="chevron-down" size={18} color={AMBER} />
        </View>
      </Pressable>

      <AnimatePresence>
        {open ? (
          <MotiView
            from={{ opacity: 0, translateY: -6 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: -6 }}
            transition={{ type: 'timing', duration: 220 }}
            style={styles.faqAnswerWrap}
          >
            <Text style={styles.faqAnswer}>{item.answer}</Text>
          </MotiView>
        ) : null}
      </AnimatePresence>
    </View>
  );
}

export function CarpoolFAQ() {
  return (
    <View style={styles.section}>
      <SectionHeader
        badgeIcon="help-circle-outline"
        badgeLabel="FAQ"
        heading="Common"
        headingAccent="questions."
        lead="Everything you need to know about carpooling."
      />
      <View style={{ gap: 14, maxWidth: 780, alignSelf: 'center', width: '100%' }}>
        {CARPOOL_FAQS.map((item) => (
          <FaqRow key={item.id} item={item} />
        ))}
      </View>
    </View>
  );
}

/* ───────────────────────── On The Road ───────────────────────── */

type PhotoCard = { id: string; title: string; caption: string };

const PHOTO_CARDS: PhotoCard[] = [
  { id: 'boarding', title: 'Passenger boarding', caption: 'Meeting the driver for an intercity trip' },
  { id: 'highway', title: 'On the highway', caption: 'Co-travellers sharing the ride' },
  { id: 'publish', title: 'Driver publishing a ride', caption: 'Setting up a trip from the Driver App' },
];

export function CarpoolOnTheRoad() {
  return (
    <View style={styles.section}>
      <View style={styles.badge}>
        <Ionicons name="car-sport-outline" size={13} color={AMBER} />
        <Text style={styles.badgeLabel}>On The Road</Text>
      </View>
      <Text style={[styles.heading, styles.headingLeft]}>Real trips, real co-travellers</Text>
      <Text style={[styles.lead, { textAlign: 'left', marginTop: 10, marginBottom: 32 }]}>
        Photo placeholders below — sized for your team to drop in licensed photography.
      </Text>

      <View style={styles.photoGrid}>
        {PHOTO_CARDS.map((card) => (
          <View key={card.id} style={styles.photoCard}>
            <View style={styles.photoTag}>
              <Text style={styles.photoTagText}>PHOTO</Text>
            </View>
            <View style={styles.photoIconWrap}>
              <Ionicons name="image-outline" size={22} color={AMBER} />
            </View>
            <Text style={styles.photoTitle}>{card.title}</Text>
            <Text style={styles.photoCaption}>{card.caption}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

/* ───────────────────────── CTA banner ───────────────────────── */

function StoreButtonDark({ kind, small, big }: { kind: 'play' | 'apple'; small: string; big: string }) {
  const { hovered, handlers } = useHover();
  return (
    <Pressable style={[styles.ctaStoreBtn, hovered && styles.ctaStoreBtnHovered]} {...handlers}>
      <StoreBadgeIcon kind={kind} />
      <View>
        <Text style={styles.ctaStoreSmall}>{small}</Text>
        <Text style={styles.ctaStoreBig}>{big}</Text>
      </View>
    </Pressable>
  );
}

export function CarpoolCTA() {
  return (
    <View style={styles.section}>
      <LinearGradient
        colors={[colors.navy, colors.accentBlue, colors.ink]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.ctaBanner}
      >
        <View style={styles.ctaBadge}>
          <Ionicons name="flash-outline" size={13} color={colors.secondaryBlue} />
          <Text style={styles.ctaBadgeLabel}>Available now</Text>
        </View>
        <Text style={styles.ctaHeading}>Start sharing rides today</Text>
        <Text style={styles.ctaBody}>
          Save money, meet people, and reduce your carbon footprint — one ride at a time.
        </Text>
        <View style={styles.ctaStoreRow}>
          <StoreButtonDark kind="play" small="GET IT ON" big="Google Play" />
          <StoreButtonDark kind="apple" small="Download on the" big="App Store" />
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { paddingHorizontal: 24, paddingVertical: 48, maxWidth: 1200, width: '100%', alignSelf: 'center', position: 'relative' },

  header: { alignItems: 'center', maxWidth: 620, alignSelf: 'center', marginBottom: 40 },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 8,
    backgroundColor: AMBER_BG,
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: AMBER_BORDER,
  },
  badgeLabel: { fontFamily: fonts.bodyMedium, fontSize: 11.5, letterSpacing: 1, color: AMBER, textTransform: 'uppercase' },

  heading: {
    fontFamily: fonts.display,
    fontSize: 30,
    lineHeight: 36,
    letterSpacing: -0.6,
    color: colors.ink,
    textAlign: 'center',
    marginTop: 18,
  },
  headingLeft: { textAlign: 'left', alignSelf: 'flex-start', marginBottom: 8 },
  headingAccent: { color: AMBER },
  lead: {
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 26,
    color: colors.bodyMutedOnLight,
    textAlign: 'center',
    marginTop: 14,
  },

  /* Decorative glass backdrop */
  glowLayer: { ...StyleSheet.absoluteFillObject, overflow: 'hidden' },
  glowBlob: {
    position: 'absolute',
    width: 340,
    height: 340,
    borderRadius: 170,
    opacity: 0.12,
    // @ts-ignore -- web-only soft blur, matches components/PinkRideScene.tsx
    filter: IS_WEB ? 'blur(70px)' : undefined,
  },
  glowBlobBlue: { backgroundColor: colors.accentBlue, top: -60, left: -80 },
  glowBlobAmber: { backgroundColor: colors.secondaryBlue, bottom: -80, right: -60 },

  /* Shared glassmorphism card */
  glassCard: {
    flexGrow: 1,
    flexBasis: 260,
    maxWidth: 320,
    borderRadius: 20,
    padding: 24,
    backgroundColor: GLASS_BG,
    borderWidth: 1,
    borderColor: GLASS_BORDER,
    shadowColor: colors.navy,
    shadowOpacity: 0.08,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 4,
    // @ts-ignore -- web-only glass blur, matches components/WhyFatafat.tsx
    backdropFilter: IS_WEB ? 'blur(20px) saturate(160%)' : undefined,
    // @ts-ignore -- web-only transition, no-op on native
    transitionProperty: 'transform, box-shadow',
    // @ts-ignore -- web-only transition, no-op on native
    transitionDuration: '250ms',
  },
  glassCardHovered: { transform: [{ translateY: -6 }] },

  /* How it works */
  stepGrid: { flexDirection: 'row', gap: 24 },
  stepGridStacked: { flexDirection: 'column' },
  stepColumn: { flex: 1, gap: 12 },
  stepColumnHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 6 },
  stepColumnIcon: { width: 32, height: 32, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  stepColumnLabel: { fontFamily: fonts.displayMedium, fontSize: 16, color: colors.ink },
  stepCard: {
    flexDirection: 'row', gap: 14, backgroundColor: GLASS_BG,
    borderWidth: 1, borderColor: GLASS_BORDER, borderRadius: 16, padding: 16,
    // @ts-ignore -- web-only glass blur
    backdropFilter: IS_WEB ? 'blur(16px) saturate(150%)' : undefined,
  },
  stepNumber: { width: 28, height: 28, borderRadius: 9, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  stepNumberText: { fontFamily: fonts.displayMedium, fontSize: 13 },
  stepTitle: { fontFamily: fonts.bodyMedium, fontSize: 14.5, color: colors.ink, marginBottom: 4 },
  stepDescription: { fontFamily: fonts.body, fontSize: 13, lineHeight: 20, color: colors.bodyMutedOnLight },

  /* Pricing */
  pricingRow: { flexDirection: 'row', gap: 48, alignItems: 'flex-start' },
  pricingRowStacked: { flexDirection: 'column', gap: 32 },
  pricingText: { flex: 1 },
  pricingIcon: { width: 30, height: 30, borderRadius: 10, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  calcCard: {
    flex: 1, backgroundColor: GLASS_BG, borderWidth: 1, borderColor: GLASS_BORDER,
    borderRadius: 20, padding: 24, minWidth: 280, overflow: 'hidden',
    shadowColor: colors.navy, shadowOpacity: 0.08, shadowRadius: 24, shadowOffset: { width: 0, height: 12 }, elevation: 4,
    // @ts-ignore -- web-only glass blur
    backdropFilter: IS_WEB ? 'blur(20px) saturate(160%)' : undefined,
  },
  calcHeading: { fontFamily: fonts.displayMedium, fontSize: 17, color: colors.ink, marginBottom: 18 },
  calcLabel: { fontFamily: fonts.bodyMedium, fontSize: 12, color: colors.bodyMutedOnLight, marginBottom: 8 },
  calcPriceRow: {
    flexDirection: 'row', alignItems: 'baseline', gap: 8, backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 14, paddingVertical: 14, paddingHorizontal: 16,
  },
  calcPriceValue: { fontFamily: fonts.display, fontSize: 22, color: AMBER },
  calcPriceHint: { fontFamily: fonts.body, fontSize: 12.5, color: colors.bodyMutedOnLight },
  seatStepper: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  seatBtn: {
    width: 38, height: 38, borderRadius: 11, backgroundColor: 'rgba(255,255,255,0.6)',
    alignItems: 'center', justifyContent: 'center',
  },
  seatCount: { fontFamily: fonts.display, fontSize: 20, color: colors.ink, minWidth: 24, textAlign: 'center' },
  calcBreakdown: { marginTop: 22, paddingTop: 18, borderTopWidth: 1, borderTopColor: colors.border, gap: 10 },
  calcBreakdownRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  calcBreakdownLabel: { fontFamily: fonts.body, fontSize: 13.5, color: colors.bodyMutedOnLight },
  calcBreakdownValue: { fontFamily: fonts.bodyMedium, fontSize: 13.5, color: colors.ink },
  calcTotalRow: { marginTop: 4, paddingTop: 12, borderTopWidth: 1, borderTopColor: colors.border },
  calcTotalLabel: { fontFamily: fonts.displayMedium, fontSize: 15, color: colors.ink },
  calcTotalValue: { fontFamily: fonts.display, fontSize: 22, color: AMBER },

  /* Safety grid */
  safetyGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 20, justifyContent: 'center' },
  safetyIconWrap: {
    width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginBottom: 20,
    // @ts-ignore -- web-only transition, no-op on native
    transitionProperty: 'transform',
    // @ts-ignore -- web-only transition, no-op on native
    transitionDuration: '250ms',
  },

  /* Requirements */
  reqList: { marginTop: 24, gap: 4, width: '100%' },
  reqRow: {
    flexDirection: 'row', gap: 16, alignItems: 'flex-start',
    paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  reqTick: {
    width: 26, height: 26, borderRadius: 13, backgroundColor: BLUE_BG,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2,
  },
  reqTitle: { fontFamily: fonts.displayMedium, fontSize: 16, color: colors.ink, marginBottom: 4 },
  reqDescription: { fontFamily: fonts.body, fontSize: 14, lineHeight: 21, color: colors.bodyMutedOnLight },

  /* FAQ */
  faqItem: {
    borderRadius: 18, borderWidth: 1, borderColor: GLASS_BORDER, backgroundColor: GLASS_BG, overflow: 'hidden',
    // @ts-ignore -- web-only glass blur
    backdropFilter: IS_WEB ? 'blur(16px) saturate(150%)' : undefined,
    // @ts-ignore -- web-only transition, no-op on native
    transitionProperty: 'border-color, background-color',
    // @ts-ignore -- web-only transition, no-op on native
    transitionDuration: '250ms',
  },
  faqItemOpen: { borderColor: AMBER_BORDER, backgroundColor: 'rgba(234,240,254,0.85)' },
  faqTrigger: { flexDirection: 'row', alignItems: 'center', gap: 16, paddingVertical: 18, paddingHorizontal: 20 },
  faqIconBadge: {
    width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center',
    backgroundColor: AMBER_BG, flexShrink: 0,
    // @ts-ignore -- web-only transition, no-op on native
    transitionProperty: 'background-color',
    // @ts-ignore -- web-only transition, no-op on native
    transitionDuration: '250ms',
  },
  faqIconBadgeActive: { backgroundColor: AMBER },
  faqQuestion: { flex: 1, fontFamily: fonts.bodyMedium, fontSize: 14.5, lineHeight: 21, color: colors.ink },
  faqAnswerWrap: { paddingHorizontal: 20, paddingLeft: 76, paddingBottom: 20 },
  faqAnswer: { fontFamily: fonts.body, fontSize: 13.5, lineHeight: 21, color: colors.bodyMutedOnLight },

  /* On the road */
  photoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 20 },
  photoCard: {
    flexGrow: 1,
    flexBasis: 260,
    maxWidth: 340,
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    backgroundColor: AMBER_BG,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: 'rgba(27,127,196,0.35)',
  },
  photoTag: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.75)',
    borderRadius: 999,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginBottom: 18,
  },
  photoTagText: { fontFamily: fonts.bodyMedium, fontSize: 10, letterSpacing: 1, color: AMBER },
  photoIconWrap: {
    width: 52, height: 52, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.75)',
    alignItems: 'center', justifyContent: 'center', marginBottom: 18,
  },
  photoTitle: { fontFamily: fonts.displayMedium, fontSize: 15.5, color: colors.ink, marginBottom: 8, textAlign: 'center' },
  photoCaption: { fontFamily: fonts.body, fontSize: 13, color: colors.bodyMutedOnLight, textAlign: 'center' },

  /* CTA */
  ctaBanner: { borderRadius: 28, padding: 40, alignItems: 'center' },
  ctaBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 999, paddingVertical: 7, paddingHorizontal: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)',
  },
  ctaBadgeLabel: { fontFamily: fonts.bodyMedium, fontSize: 11.5, letterSpacing: 1, color: 'rgba(255,255,255,0.9)', textTransform: 'uppercase' },
  ctaHeading: { fontFamily: fonts.display, fontSize: 32, lineHeight: 38, color: '#FFFFFF', marginTop: 18, textAlign: 'center' },
  ctaBody: { fontFamily: fonts.body, fontSize: 15, lineHeight: 24, color: 'rgba(255,255,255,0.75)', marginTop: 12, textAlign: 'center', maxWidth: 440 },
  ctaStoreRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 12, marginTop: 28 },
  ctaStoreBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', borderRadius: 14, paddingVertical: 12, paddingHorizontal: 18,
    // @ts-ignore -- web-only transition, no-op on native
    transitionProperty: 'background-color, transform',
    // @ts-ignore -- web-only transition, no-op on native
    transitionDuration: '200ms',
  },
  ctaStoreBtnHovered: { backgroundColor: 'rgba(255,255,255,0.2)', transform: [{ translateY: -2 }] },
  ctaStoreSmall: { fontFamily: fonts.body, fontSize: 9.5, color: 'rgba(255,255,255,0.7)', letterSpacing: 0.4 },
  ctaStoreBig: { fontFamily: fonts.displayMedium, fontSize: 14.5, color: '#FFFFFF', marginTop: 1 },
});