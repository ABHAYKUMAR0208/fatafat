import { Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import React, { useEffect, useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import Svg, {
  Circle,
  Defs,
  Path,
  Pattern,
  RadialGradient,
  Rect,
  Stop,
} from 'react-native-svg';
import { colors, fonts } from '../../constants/theme';

const IS_WEB = Platform.OS === 'web';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

/* ---------------------------------------------------------------------- */
/* Palette — scoped to this section only                                  */
/* ---------------------------------------------------------------------- */
type Variant = 'indigo' | 'amber' | 'rose' | 'sky';

const VARIANT_STYLES: Record<
  Variant,
  { color: string; pressed: string; bg: string; border: string }
> = {
  indigo: { color: colors.navy, pressed: '#0E1730', bg: colors.chipBg, border: 'rgba(22,31,66,0.16)' },
  amber: { color: colors.secondaryBlue, pressed: '#1B7FC4', bg: '#EAF0FE', border: 'rgba(30,155,224,0.25)' },
  rose: { color: colors.navy, pressed: '#0E1730', bg: colors.chipBg, border: 'rgba(22,31,66,0.16)' },
  sky: { color: colors.secondaryBlue, pressed: '#1B7FC4', bg: '#EAF0FE', border: 'rgba(30,155,224,0.25)' },
};

/* ---------------------------------------------------------------------- */
/* Icon shapes (drawn as SVG so they can "line-draw" in on mount)         */
/* ---------------------------------------------------------------------- */
type IconShape =
  | { type: 'circle'; cx: number; cy: number; r: number; len: number; fillOpacity?: number }
  | { type: 'path'; d: string; len: number };

type FeatureCard = {
  id: string;
  title: string;
  description: string;
  variant: Variant;
  shapes: IconShape[];
};

const FEATURE_CARDS: FeatureCard[] = [
  {
    id: 'lady-rider',
    title: 'Lady Rider',
    description: 'Woman drivers on scooty or cab, ensuring safe rides with trusted partners.',
    variant: 'indigo',
    shapes: [
      { type: 'circle', cx: 24, cy: 16, r: 7, len: 44 },
      { type: 'path', d: 'M16 32 L18 24 L24 22 L30 24 L32 32', len: 29 },
      { type: 'circle', cx: 16, cy: 34, r: 4, len: 25 },
      { type: 'circle', cx: 32, cy: 34, r: 4, len: 25 },
      { type: 'path', d: 'M16 34 L32 34', len: 16 },
    ],
  },
  {
    id: 'parcel-delivery',
    title: 'Parcel Delivery',
    description: 'Captain handing over packages — fast, reliable doorstep deliveries every day.',
    variant: 'amber',
    shapes: [
      { type: 'path', d: 'M14 18 h20 v16 h-20 z', len: 72 },
      { type: 'path', d: 'M14 24 L24 20 L34 24', len: 22 },
      { type: 'path', d: 'M24 20 L24 34', len: 14 },
      { type: 'path', d: 'M10 36 Q10 40 14 40', len: 6 },
      { type: 'path', d: 'M38 36 Q38 40 34 40', len: 6 },
    ],
  },
  {
    id: 'carpool',
    title: 'Carpool',
    description: 'Co-travellers sharing intercity rides — save money, reduce your carbon footprint.',
    variant: 'rose',
    shapes: [
      { type: 'path', d: 'M8 26 h32 v12 h-32 z', len: 88 },
      { type: 'path', d: 'M14 26 L18 18 L30 18 L34 26', len: 30 },
      { type: 'circle', cx: 16, cy: 38, r: 3, len: 19 },
      { type: 'circle', cx: 32, cy: 38, r: 3, len: 19 },
      { type: 'circle', cx: 20, cy: 14, r: 3.5, len: 22, fillOpacity: 0.1 },
      { type: 'circle', cx: 28, cy: 14, r: 3.5, len: 22, fillOpacity: 0.1 },
    ],
  },
  {
    id: 'everyday-ride',
    title: 'Everyday Ride',
    description: 'Bike, Auto or Car — affordable city rides available in seconds, anytime you need.',
    variant: 'sky',
    shapes: [
      { type: 'circle', cx: 16, cy: 32, r: 6, len: 38 },
      { type: 'circle', cx: 34, cy: 32, r: 6, len: 38 },
      { type: 'path', d: 'M16 32 L22 20 L28 20 L34 32', len: 33 },
      { type: 'path', d: 'M22 20 L28 14', len: 9 },
      { type: 'path', d: 'M10 20 L22 20', len: 12 },
    ],
  },
];

/* ---------------------------------------------------------------------- */
/* Line-draw animated icon                                                */
/* ---------------------------------------------------------------------- */
function AnimatedShape({
  shape,
  color,
  progress,
}: {
  shape: IconShape;
  color: string;
  progress: Animated.SharedValue<number>;
}) {
  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: shape.len * (1 - progress.value),
  }));

  if (shape.type === 'circle') {
    return (
      <AnimatedCircle
        cx={shape.cx}
        cy={shape.cy}
        r={shape.r}
        stroke={color}
        strokeWidth={2}
        fill={shape.fillOpacity ? color : 'none'}
        fillOpacity={shape.fillOpacity ?? 0}
        strokeLinecap="round"
        strokeDasharray={shape.len}
        animatedProps={animatedProps}
      />
    );
  }

  return (
    <AnimatedPath
      d={shape.d}
      stroke={color}
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={shape.len}
      animatedProps={animatedProps}
    />
  );
}

function CardIcon({ shapes, color, delay }: { shapes: IconShape[]; color: string; delay: number }) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(delay, withTiming(1, { duration: 850, easing: Easing.out(Easing.cubic) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Svg width={30} height={30} viewBox="0 0 48 48">
      {shapes.map((shape, i) => (
        <AnimatedShape key={i} shape={shape} color={color} progress={progress} />
      ))}
    </Svg>
  );
}

/* ---------------------------------------------------------------------- */
/* Floating decorative dot                                                */
/* ---------------------------------------------------------------------- */
function FloatDot({
  color,
  size,
  style,
  delay,
}: {
  color: string;
  size: number;
  style: any;
  delay: number;
}) {
  return (
    <MotiView
      style={[styles.floatDot, { width: size, height: size, backgroundColor: color }, style]}
      from={{ translateY: 0, opacity: 0.5 }}
      animate={{ translateY: [0, -8, 0], opacity: [0.5, 1, 0.5] }}
      transition={{ type: 'timing', duration: 2600, delay, loop: true }}
    />
  );
}

/* ---------------------------------------------------------------------- */
/* Feature card                                                           */
/* ---------------------------------------------------------------------- */
function ServiceCard({
  card,
  index,
  active,
  onPress,
}: {
  card: FeatureCard;
  index: number;
  active: boolean;
  onPress: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const v = VARIANT_STYLES[card.variant];
  const showCta = hovered || active;

  const hoverHandlers = IS_WEB
    ? {
        // @ts-ignore - web only pointer events
        onMouseEnter: () => setHovered(true),
        // @ts-ignore - web only pointer events
        onMouseLeave: () => setHovered(false),
      }
    : {};

  return (
    <MotiView
      from={{ opacity: 0, translateY: 28 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 650, delay: 150 + index * 100 }}
      style={styles.cardOuter}
    >
      <Pressable onPress={onPress} {...hoverHandlers}>
        <MotiView
          from={false}
          animate={{ translateY: hovered ? -6 : 0 }}
          transition={{ type: 'timing', duration: 300 }}
          style={[
            styles.card,
            active && { borderColor: v.color, shadowOpacity: 0.16 },
          ]}
        >
          <View style={[styles.visual, { backgroundColor: v.bg }]}>
            <FloatDot color={v.color} size={10} delay={0} style={{ top: 14, left: '14%', opacity: 0.25 }} />
            <FloatDot color={v.color} size={7} delay={500} style={{ top: '55%', right: '18%', opacity: 0.3 }} />
            <View style={[styles.iconWrap, { backgroundColor: '#fff', borderColor: v.border }]}>
              <CardIcon shapes={card.shapes} color={v.color} delay={250 + index * 100} />
            </View>
          </View>

          <View style={styles.cardContent}>
            <Text style={[styles.cardTitle, active && { color: v.color }]}>{card.title}</Text>
            <Text style={styles.cardDescription}>{card.description}</Text>

            <View style={[styles.cardCta, !showCta && styles.cardCtaHidden]}>
              <Text style={[styles.cardCtaLabel, { color: v.color }]}>Learn more</Text>
              <Ionicons name="arrow-forward" size={13} color={v.color} />
            </View>
          </View>
        </MotiView>
      </Pressable>
    </MotiView>
  );
}

/* ---------------------------------------------------------------------- */
/* Section                                                                 */
/* ---------------------------------------------------------------------- */
export default function OnTheRoadSection() {
  const [activeCard, setActiveCard] = useState<string | null>('parcel-delivery');

  return (
    <View style={styles.section}>
      {/* Ambient background: dot grid + soft colour blobs */}
      <View pointerEvents="none" style={StyleSheet.absoluteFill}>
        <Svg width="100%" height="100%">
          <Defs>
            <RadialGradient id="otrBlobIndigo" cx="100%" cy="0%" r="60%">
              <Stop offset="0" stopColor={colors.accentBlue} stopOpacity={0.06} />
              <Stop offset="1" stopColor={colors.accentBlue} stopOpacity={0} />
            </RadialGradient>
            <RadialGradient id="otrBlobRose" cx="0%" cy="100%" r="55%">
              <Stop offset="0" stopColor={colors.secondaryBlue} stopOpacity={0.05} />
              <Stop offset="1" stopColor={colors.secondaryBlue} stopOpacity={0} />
            </RadialGradient>
            <Pattern id="otrDots" width={40} height={40} patternUnits="userSpaceOnUse">
              <Circle cx={1} cy={1} r={1} fill="rgba(15,23,42,0.10)" />
            </Pattern>
          </Defs>
          <Rect width="100%" height="100%" fill="url(#otrDots)" opacity={0.5} />
          <Rect width="100%" height="100%" fill="url(#otrBlobIndigo)" />
          <Rect width="100%" height="100%" fill="url(#otrBlobRose)" />
        </Svg>
      </View>

      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 600 }}
        style={styles.headBlock}
      >
        <View style={styles.badge}>
          <View style={styles.badgeDotWrap}>
            <View style={styles.badgeDot} />
          </View>
          <Text style={styles.badgeLabel}>ON THE ROAD</Text>
        </View>

        <Text style={styles.heading}>
          Real rides, every day{' '}
          <Text style={styles.headingHighlight}>across Delhi NCR</Text>
        </Text>

        <Text style={styles.subheading}>
          From daily commutes to parcel deliveries, see how our services keep
          the city moving — one ride at a time.
        </Text>
      </MotiView>

      <View style={styles.grid}>
        {FEATURE_CARDS.map((card, index) => (
          <ServiceCard
            key={card.id}
            card={card}
            index={index}
            active={activeCard === card.id}
            onPress={() => setActiveCard(card.id)}
          />
        ))}
      </View>

      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 600, delay: 550 }}
      >
        <Pressable style={styles.bottomBar}>
          <View>
            <Text style={styles.bottomBarText}>Explore all services</Text>
            <Text style={styles.bottomBarSub}>See what&apos;s available in your city</Text>
          </View>
          <View style={styles.bottomBarArrow}>
            <Ionicons name="arrow-forward" size={16} color="#fff" />
          </View>
        </Pressable>
      </MotiView>
    </View>
  );
}

/* ---------------------------------------------------------------------- */
/* Styles — font family / sizes matched to the rest of the site           */
/* (see WhyFatafat.tsx, HowItWorks.tsx, ServicesGrid.tsx, WhereWeOperate.tsx) */
/* ---------------------------------------------------------------------- */
const styles = StyleSheet.create({
  section: {
    paddingVertical: 72,
    paddingHorizontal: 24,
    alignItems: 'center',
    backgroundColor: colors.paper,
    position: 'relative',
    overflow: 'hidden',
  },
  headBlock: {
    alignItems: 'center',
    maxWidth: 720,
    marginBottom: 44,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.chipBg,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
    marginBottom: 20,
  },
  badgeDotWrap: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: 'rgba(51,80,222,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accentBlue,
  },
  badgeLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    letterSpacing: 1,
    color: colors.accentBlue,
  },
  heading: {
    fontFamily: fonts.display,
    fontSize: 34,
    lineHeight: 40,
    color: colors.ink,
    textAlign: 'center',
    maxWidth: 520,
  },
  headingHighlight: {
    color: colors.accentBlue,
  },
  subheading: {
    fontFamily: fonts.body,
    fontSize: 15,
    lineHeight: 23,
    color: colors.bodyMutedOnLight,
    textAlign: 'center',
    maxWidth: 560,
    marginTop: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    justifyContent: 'center',
    width: '100%',
    maxWidth: 1200,
    marginBottom: 40,
  },
  cardOuter: {
    flexGrow: 1,
    flexBasis: 250,
    maxWidth: 280,
  },
  card: {
    width: '100%',
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: colors.border,
    overflow: 'hidden',
    shadowColor: '#0F172A',
    shadowOpacity: 0.07,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
    ...(IS_WEB
      ? ({
          // @ts-ignore - web-only smooth hover transitions
          transitionProperty: 'border-color, box-shadow',
          // @ts-ignore
          transitionDuration: '300ms',
        } as any)
      : {}),
  },
  cardBar: {
    height: 4,
    width: '100%',
  },
  visual: {
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  floatDot: {
    position: 'absolute',
    borderRadius: 999,
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    padding: 22,
  },
  cardTitle: {
    fontFamily: fonts.display,
    fontSize: 19,
    color: colors.ink,
    marginBottom: 8,
  },
  cardDescription: {
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 21,
    color: colors.bodyMutedOnLight,
  },
  cardCta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 14,
  },
  cardCtaHidden: {
    opacity: IS_WEB ? 0.35 : 1,
  },
  cardCtaLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: 14,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    paddingVertical: 16,
    paddingHorizontal: 26,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: colors.border,
    maxWidth: 480,
    width: '100%',
  },
  bottomBarText: {
    fontFamily: fonts.displayMedium,
    fontSize: 15,
    color: colors.ink,
  },
  bottomBarSub: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.bodyMutedOnLight,
    marginTop: 2,
  },
  bottomBarArrow: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
});