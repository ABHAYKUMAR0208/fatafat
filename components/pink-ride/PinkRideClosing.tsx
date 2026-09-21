import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import React, { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { StoreBadgeIcon } from '../GetFatafatApp';
import { colors, fonts } from '../../constants/theme';

const IS_WEB = Platform.OS === 'web';

/* ---------------------------------------------------------------------- */
/* Follow us                                                              */
/* ---------------------------------------------------------------------- */
const SOCIALS: {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}[] = [
  { id: 'facebook', label: 'Facebook', icon: 'logo-facebook', color: '#1877F2' },
  { id: 'instagram', label: 'Instagram', icon: 'logo-instagram', color: '#C13584' },
  { id: 'linkedin', label: 'LinkedIn', icon: 'logo-linkedin', color: '#0A66C2' },
  { id: 'youtube', label: 'YouTube', icon: 'logo-youtube', color: '#FF0000' },
];

function SocialIcon({ item, index }: { item: (typeof SOCIALS)[number]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const hoverHandlers = IS_WEB
    ? {
        // @ts-ignore -- web only pointer events
        onMouseEnter: () => setHovered(true),
        // @ts-ignore -- web only pointer events
        onMouseLeave: () => setHovered(false),
      }
    : {};

  return (
    <MotiView
      from={{ opacity: 0, scale: 0.5, translateY: 16 }}
      animate={{ opacity: 1, scale: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 450, delay: index * 100 }}
    >
      <Pressable
        style={[
          styles.socialIcon,
          { backgroundColor: item.color },
          hovered && styles.socialIconHovered,
        ]}
        {...hoverHandlers}
      >
        <Ionicons name={item.icon} size={26} color="#FFFFFF" />
        {hovered && <Text style={styles.socialTooltip}>{item.label}</Text>}
      </Pressable>
    </MotiView>
  );
}

function FollowUs() {
  return (
    <View style={styles.followSection}>
      <Text style={styles.followHeading}>
        Follow <Text style={styles.followHighlight}>us</Text> on
      </Text>
      <View style={styles.socialRow}>
        {SOCIALS.map((item, i) => (
          <SocialIcon key={item.id} item={item} index={i} />
        ))}
      </View>
      <View style={styles.dividerLine} />
    </View>
  );
}

/* ---------------------------------------------------------------------- */
/* Choose Lady Rider hero CTA                                             */
/* ---------------------------------------------------------------------- */
// function ChooseLadyRiderCta() {
//   return (
//     <View style={styles.ctaSection}>
//       <MotiView
//         from={{ opacity: 0, translateY: 40, scale: 0.97 }}
//         animate={{ opacity: 1, translateY: 0, scale: 1 }}
//         transition={{ type: 'timing', duration: 650 }}
//       >
//         <LinearGradient
//           colors={[colors.magenta, '#D946EF', '#9333EA']}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 1 }}
//           style={styles.ctaCard}
//         >
//           <View style={styles.ctaOrb1} />
//           <View style={styles.ctaOrb2} />
//           <View style={styles.ctaOrb3} />

//           <View style={styles.ctaContent}>
//             <Text style={styles.ctaHeading}>
//               Choose Lady Rider on your next trip
//             </Text>
//             <Text style={styles.ctaSubtitle}>
//               Available now for Android and iOS across Delhi NCR, 7:45 AM to 8:00 PM daily.
//             </Text>

//             <View style={styles.ctaButtons}>
//               <Pressable style={styles.ctaStoreBtn}>
//                 <StoreBadgeIcon kind="play" />
//                 <View>
//                   <Text style={styles.ctaStoreBtnSmall}>GET IT ON</Text>
//                   <Text style={styles.ctaStoreBtnBig}>Google Play</Text>
//                 </View>
//               </Pressable>
//               <Pressable style={styles.ctaStoreBtn}>
//                 <StoreBadgeIcon kind="apple" />
//                 <View>
//                   <Text style={styles.ctaStoreBtnSmall}>Download on the</Text>
//                   <Text style={styles.ctaStoreBtnBig}>App Store</Text>
//                 </View>
//               </Pressable>
//             </View>
//           </View>
//         </LinearGradient>
//       </MotiView>
//     </View>
//   );
// }

/* ---------------------------------------------------------------------- */
/* On the Road                                                            */
/* ---------------------------------------------------------------------- */
type RoadCard = {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  tint: string;
  tintBg: string;
};

const ROAD_CARDS: RoadCard[] = [
  {
    id: 'lady-cab-driver',
    icon: 'car-sport-outline',
    title: 'Lady Cab Driver',
    description: 'Woman driver at the wheel of a car — safe, reliable, and comfortable rides you can trust.',
    tint: colors.magenta,
    tintBg: '#FCE7F3',
  },
  {
    id: 'pink-scooty',
    icon: 'speedometer-outline',
    title: 'Pink Scooty',
    description: 'Affordable two-wheeler rides with trained lady captains for quick city commutes.',
    tint: '#9333EA',
    tintBg: '#F3E8FF',
  },
  {
    id: 'verified-captains',
    icon: 'shield-checkmark-outline',
    title: 'Verified Captains',
    description: 'Every Lady Captain is background-verified, trained, and rated by the community.',
    tint: '#E11D48',
    tintBg: '#FFE4E6',
  },
  {
    id: 'women-community',
    icon: 'people-outline',
    title: 'Women Community',
    description: 'Built by women, for women. Join thousands who ride safe every single day.',
    tint: '#A21CAF',
    tintBg: '#FAE8FF',
  },
];

function RoadCardItem({ card, index }: { card: RoadCard; index: number }) {
  const [hovered, setHovered] = useState(false);
  const hoverHandlers = IS_WEB
    ? {
        // @ts-ignore -- web only pointer events
        onMouseEnter: () => setHovered(true),
        // @ts-ignore -- web only pointer events
        onMouseLeave: () => setHovered(false),
      }
    : {};

  return (
    <MotiView
      from={{ opacity: 0, translateY: 30, scale: 0.96 }}
      animate={{
        opacity: 1,
        translateY: hovered ? -6 : 0,
        scale: 1,
      }}
      transition={{ type: 'timing', duration: hovered ? 250 : 550, delay: hovered ? 0 : 200 + index * 110 }}
      style={styles.roadCardOuter}
    >
      <Pressable
        style={[styles.roadCard, hovered && { borderColor: card.tint, shadowOpacity: 0.14 }]}
        {...hoverHandlers}
      >
        <View style={[styles.roadCardIcon, { backgroundColor: card.tintBg }]}>
          <Ionicons name={card.icon} size={24} color={card.tint} />
        </View>
        <Text style={[styles.roadCardTitle, hovered && { color: card.tint }]}>{card.title}</Text>
        <Text style={styles.roadCardDesc}>{card.description}</Text>
        {hovered && (
          <View style={styles.roadCardLink}>
            <Text style={[styles.roadCardLinkText, { color: card.tint }]}>Learn more</Text>
            <Ionicons name="arrow-forward" size={14} color={card.tint} />
          </View>
        )}
      </Pressable>
    </MotiView>
  );
}

function OnTheRoad() {
  return (
    <View style={styles.roadSection}>
      <View style={styles.roadHeader}>
        <View style={styles.roadBadge}>
          <View style={styles.roadBadgeDot} />
          <Text style={styles.roadBadgeLabel}>ON THE ROAD</Text>
        </View>
        <Text style={styles.roadTitle}>
          Real Lady Captains,{'\n'}
          <Text style={styles.roadTitleAccent}>real rides</Text>
        </Text>
        <Text style={styles.roadDesc}>
          Every ride is powered by trained, verified women captains who make safety the top priority.
        </Text>
      </View>

      <View style={styles.roadGrid}>
        {ROAD_CARDS.map((card, i) => (
          <RoadCardItem key={card.id} card={card} index={i} />
        ))}
      </View>
    </View>
  );
}

/* ---------------------------------------------------------------------- */
/* Export                                                                 */
/* ---------------------------------------------------------------------- */
export default function PinkRideClosing() {
  return (
    <View>
      {/* <ChooseLadyRiderCta /> */}
      <OnTheRoad />
      <FollowUs />
    </View>
  );
}

const styles = StyleSheet.create({
  /* Follow us */
  followSection: {
    paddingVertical: 40,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  followHeading: {
    fontFamily: fonts.bodyMedium,
    fontSize: 20,
    color: colors.bodyMutedOnLight,
    marginBottom: 28,
  },
  followHighlight: {
    fontFamily: fonts.display,
    color: colors.magenta,
  },
  socialRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
  },
  socialIcon: {
    width: 60,
    height: 60,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.15,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    // @ts-ignore -- web-only transition, no-op on native
    transitionProperty: 'transform, box-shadow',
    // @ts-ignore -- web-only transition, no-op on native
    transitionDuration: '250ms',
  },
  socialIconHovered: {
    transform: [{ scale: 1.14 }, { translateY: -4 }],
  },
  socialTooltip: {
    position: 'absolute',
    bottom: -26,
    fontFamily: fonts.bodyMedium,
    fontSize: 11,
    color: colors.bodyMutedOnLight,
  },
  dividerLine: {
    width: 160,
    height: 1,
    marginTop: 32,
    backgroundColor: 'rgba(224,22,108,0.25)',
  },

  /* CTA */
  ctaSection: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    maxWidth: 1152,
    width: '100%',
    alignSelf: 'center',
  },
  ctaCard: {
    borderRadius: 28,
    overflow: 'hidden',
    position: 'relative',
  },
  ctaOrb1: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255,255,255,0.10)',
    top: -30,
    left: -20,
  },
  ctaOrb2: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(255,255,255,0.08)',
    bottom: -50,
    right: 20,
  },
  ctaOrb3: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.10)',
    top: 40,
    right: '30%',
  },
  ctaContent: {
    paddingVertical: 56,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  ctaHeading: {
    fontFamily: fonts.display,
    fontSize: 30,
    lineHeight: 36,
    letterSpacing: -0.6,
    color: '#FFFFFF',
    textAlign: 'center',
    maxWidth: 560,
  },
//   ctaHeadingUnderline: {
//     textDecorationLine: 'underline',
//     textDecorationStyle: 'solid',
//     textDecorationColor: 'rgba(255,255,255,0.5)',
//   },
  ctaSubtitle: {
    fontFamily: fonts.body,
    fontSize: 15,
    lineHeight: 24,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    marginTop: 18,
    maxWidth: 460,
  },
  ctaButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 14,
    marginTop: 30,
  },
  ctaStoreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(255,255,255,0.16)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.24)',
    borderRadius: 16,
    paddingVertical: 13,
    paddingHorizontal: 20,
    // @ts-ignore -- web-only transition, no-op on native
    transitionProperty: 'background-color, transform',
    // @ts-ignore -- web-only transition, no-op on native
    transitionDuration: '200ms',
  },
  ctaStoreBtnSmall: {
    fontFamily: fonts.body,
    fontSize: 10,
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: 0.3,
  },
  ctaStoreBtnBig: {
    fontFamily: fonts.displayMedium,
    fontSize: 15,
    color: '#FFFFFF',
    marginTop: 1,
  },

  /* On the road */
  roadSection: {
    paddingHorizontal: 24,
    paddingVertical: 56,
    maxWidth: 1152,
    width: '100%',
    alignSelf: 'center',
  },
  roadHeader: {
    alignItems: 'center',
    maxWidth: 480,
    alignSelf: 'center',
    marginBottom: 40,
  },
  roadBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FCE7F3',
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(224,22,108,0.2)',
    marginBottom: 18,
  },
  roadBadgeDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.magenta },
  roadBadgeLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: 11.5,
    letterSpacing: 1,
    color: '#BE185D',
    textTransform: 'uppercase',
  },
  roadTitle: {
    fontFamily: fonts.display,
    fontSize: 32,
    lineHeight: 38,
    letterSpacing: -0.6,
    color: colors.ink,
    textAlign: 'center',
  },
  roadTitleAccent: { color: colors.magenta },
  roadDesc: {
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 26,
    color: colors.bodyMutedOnLight,
    textAlign: 'center',
    marginTop: 14,
  },
  roadGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    justifyContent: 'center',
  },
  roadCardOuter: {
    flexGrow: 1,
    flexBasis: 240,
    maxWidth: 280,
  },
  roadCard: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#FFFFFF',
    padding: 24,
    shadowColor: '#0F172A',
    shadowOpacity: 0.06,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2,
    // @ts-ignore -- web-only transition, no-op on native
    transitionProperty: 'border-color, box-shadow',
    // @ts-ignore -- web-only transition, no-op on native
    transitionDuration: '250ms',
  },
  roadCardIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  roadCardTitle: {
    fontFamily: fonts.display,
    fontSize: 17,
    color: colors.ink,
    marginBottom: 8,
  },
  roadCardDesc: {
    fontFamily: fonts.body,
    fontSize: 13.5,
    lineHeight: 21,
    color: colors.bodyMutedOnLight,
  },
  roadCardLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 12,
  },
  roadCardLinkText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 13.5,
  },
});