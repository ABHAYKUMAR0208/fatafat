import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import React, { useState } from 'react';
import {
  Image,
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
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
import StoreButtons from './StoreButtons';

// Full logo, tagline recoloured white so it reads on the dark footer surface.
const logoImg = require('../../assets/logo/fatafat-logo-light.png');

const IS_WEB = Platform.OS === 'web';

/* ---------------------------------------------------------------------- */
/* Local palette — dark footer surface built from the site's own tokens.  */
/* No new brand colours: just darker/lighter mixes of colors.ink/amber/   */
/* magenta/accentBlue so the footer still feels like the rest of Fatafat.   */
/* ---------------------------------------------------------------------- */
const FOOTER_TOP = '#1E2A56'; // lighter mix of colors.ink
const FOOTER_BOTTOM = '#0D1226'; // darker mix of colors.ink
const HAIRLINE = 'rgba(255,255,255,0.10)';
const SURFACE = 'rgba(255,255,255,0.05)';
const SURFACE_HOVER = 'rgba(255,255,255,0.09)';
const DIM_TEXT = 'rgba(255,248,240,0.45)';

/* ---------------------------------------------------------------------- */
/* Content                                                                 */
/* ---------------------------------------------------------------------- */
type FooterLinkItem = { label: string; href?: string; external?: string };

// href = in-app expo-router route. external = full URL opened via Linking.
// Items with neither are intentionally inert until a destination page/URL exists.
const USEFUL_LINKS: FooterLinkItem[] = [
  { label: 'Captain (Driver) registration', href: '/drive-with-us' },
  { label: 'Terms & conditions', href: '/terms' },
  { label: 'Privacy policy', href: '/privacy' },
  { label: 'Cookie policy', href: '/cookies' },
  { label: 'Pricing policy', href: '/pricing' },
  { label: 'Refund & cancellation', href: '/refund-cancellation' },
  { label: 'Disclaimer', href: '/disclaimer' },
];

const COMPANY_LINKS: FooterLinkItem[] = [
  { label: 'About us' }, // TODO: no /about route yet
  { label: 'Safety', href: '/safety' },
  { label: 'Careers' }, // TODO: no /careers route yet
  { label: 'Contact us', href: '/help' },
  { label: 'Grievance officer', href: '/grievance' },
  { label: 'Help & FAQ', href: '/help' },
];

const LEGAL_LINKS: FooterLinkItem[] = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Cookies', href: '/cookies' },
  { label: 'Disclaimer', href: '/disclaimer' },
];

const SOCIALS: { id: string; d: string; url?: string }[] = [
  {
    id: 'facebook',
    d: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
    url: 'https://facebook.com/fatafatapp', // TODO: replace with real handle
  },
  {
    id: 'instagram',
    d: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
    url: 'https://instagram.com/fatafatapp', // TODO: replace with real handle
  },
  {
    id: 'x',
    d: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
    url: 'https://x.com/fatafatapp', // TODO: replace with real handle
  },
  {
    id: 'linkedin',
    d: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
    url: 'https://linkedin.com/company/fatafatapp', // TODO: replace with real handle
  },
];

/* ---------------------------------------------------------------------- */
/* Small building blocks                                                  */
/* ---------------------------------------------------------------------- */
function SocialIcon({ d, index, url }: { d: string; index: number; url?: string }) {
  const [hovered, setHovered] = useState(false);
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
      from={{ opacity: 0, translateY: 10 }}
      animate={{ opacity: 1, translateY: hovered ? -4 : 0 }}
      transition={{ type: 'timing', duration: hovered ? 200 : 450, delay: hovered ? 0 : index * 80 }}
    >
      <Pressable
        style={styles.socialIcon}
        onPress={url ? () => Linking.openURL(url) : undefined}
        {...hoverHandlers}
      >
        {hovered ? (
          <LinearGradient
            colors={[colors.accentBlue, colors.secondaryBlue]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
        ) : null}
        <Svg width={16} height={16} viewBox="0 0 24 24">
          <Path d={d} fill={hovered ? '#FFFFFF' : colors.textMuted} />
        </Svg>
      </Pressable>
    </MotiView>
  );
}

function FooterLink({ label, href, external }: FooterLinkItem) {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const hoverHandlers = IS_WEB
    ? {
        // @ts-ignore - web only pointer events
        onMouseEnter: () => setHovered(true),
        // @ts-ignore - web only pointer events
        onMouseLeave: () => setHovered(false),
      }
    : {};

  const handlePress = () => {
    if (href) router.push(href as any);
    else if (external) Linking.openURL(external);
  };

  const disabled = !href && !external;

  return (
    <Pressable
      style={[styles.linkRow, disabled && styles.linkRowDisabled]}
      onPress={disabled ? undefined : handlePress}
      {...hoverHandlers}
    >
      <MotiView
        from={false}
        animate={{ translateX: hovered ? 0 : -8, opacity: hovered ? 1 : 0 }}
        transition={{ type: 'timing', duration: 200 }}
      >
        <Ionicons name="arrow-forward" size={12} color={colors.secondaryBlue} />
      </MotiView>
      <Text style={[styles.linkLabel, hovered && !disabled && styles.linkLabelHovered]}>{label}</Text>
    </Pressable>
  );
}

function LinkColumn({ title, links, delay }: { title: string; links: FooterLinkItem[]; delay: number }) {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 24 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 600, delay }}
      style={styles.linkCol}
    >
      <View style={styles.colHeadingRow}>
        <View style={styles.colHeadingBar} />
        <Text style={styles.colHeading}>{title}</Text>
      </View>
      <View style={styles.linkList}>
        {links.map((item) => (
          <FooterLink key={item.label} {...item} />
        ))}
      </View>
    </MotiView>
  );
}

function BottomLegalLink({ label, href, external }: FooterLinkItem) {
  const router = useRouter();
  const handlePress = () => {
    if (href) router.push(href as any);
    else if (external) Linking.openURL(external);
  };
  return (
    <Pressable onPress={href || external ? handlePress : undefined}>
      <Text style={styles.legalLink}>{label}</Text>
    </Pressable>
  );
}

function ContactRow({ icon, label, value }: { icon: keyof typeof Ionicons.glyphMap; label: string; value: string }) {
  return (
    <View style={styles.contactRow}>
      <View style={styles.contactIcon}>
        <Ionicons name={icon} size={14} color={colors.accentBlue} />
      </View>
      <View>
        <Text style={styles.contactLabel}>{label}</Text>
        <Text style={styles.contactValue}>{value}</Text>
      </View>
    </View>
  );
}

function NewsletterBanner() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 2500);
  };

  return (
    <MotiView
      from={{ opacity: 0, translateY: 24 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 600 }}
      style={styles.newsletter}
    >
      <LinearGradient
        colors={['rgba(51,80,222,0.20)', 'rgba(51,80,222,0.06)', 'rgba(30,155,224,0.10)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.newsletterContent}>
        <View style={styles.newsletterTag}>
          <View style={styles.newsletterTagDot} />
          <Text style={styles.newsletterTagLabel}>Stay Updated</Text>
        </View>
        <Text style={styles.newsletterTitle}>Get ride updates & exclusive offers</Text>
        <Text style={styles.newsletterDesc}>
          Join 50,000+ riders. Be the first to know about new city launches, features, and promos.
        </Text>
      </View>

      <View style={styles.newsletterForm}>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email address"
          placeholderTextColor={colors.textMuted}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.newsletterInput}
        />
        <Pressable style={styles.newsletterBtn} onPress={handleSubscribe}>
          <Text style={styles.newsletterBtnLabel}>{subscribed ? '✓ Subscribed!' : 'Subscribe'}</Text>
          {!subscribed && <Ionicons name="arrow-forward" size={14} color={colors.ink} />}
        </Pressable>
      </View>
    </MotiView>
  );
}

/* ---------------------------------------------------------------------- */
/* Section                                                                 */
/* ---------------------------------------------------------------------- */
export default function Footer() {
  return (
    <View style={styles.footer}>
      {/* Ambient background: soft colour blobs + dot grid, dark variant */}
      <View pointerEvents="none" style={StyleSheet.absoluteFill}>
        <Svg width="100%" height="100%">
          <Defs>
            <RadialGradient id="footerBlobBlue" cx="5%" cy="0%" r="55%">
              <Stop offset="0" stopColor={colors.accentBlue} stopOpacity={0.18} />
              <Stop offset="1" stopColor={colors.accentBlue} stopOpacity={0} />
            </RadialGradient>
            <RadialGradient id="footerBlobAmber" cx="100%" cy="100%" r="55%">
              <Stop offset="0" stopColor={colors.secondaryBlue} stopOpacity={0.08} />
              <Stop offset="1" stopColor={colors.secondaryBlue} stopOpacity={0} />
            </RadialGradient>
            <Pattern id="footerDots" width={40} height={40} patternUnits="userSpaceOnUse">
              <Circle cx={1} cy={1} r={1} fill="rgba(255,255,255,0.06)" />
            </Pattern>
          </Defs>
          <Rect width="100%" height="100%" fill="url(#footerDots)" opacity={0.6} />
          <Rect width="100%" height="100%" fill="url(#footerBlobMagenta)" />
          <Rect width="100%" height="100%" fill="url(#footerBlobAmber)" />
        </Svg>
      </View>

      <View style={styles.container}>
        <NewsletterBanner />

        <View style={styles.mainGrid}>
          {/* Brand column */}
          <MotiView
            from={{ opacity: 0, translateY: 24 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 600, delay: 80 }}
            style={styles.brandCol}
          >
            <Image
              source={logoImg}
              style={styles.logoImg}
              resizeMode="contain"
              accessibilityLabel="Fatafat"
            />
            <Text style={styles.brandDesc}>
              <Text style={styles.brandDescHighlight}>Fixed-fare rides</Text> and same-city parcel delivery
              across Delhi NCR. A product of GIT Software Technologies FZC.
            </Text>
            <View style={styles.socialRow}>
              {SOCIALS.map((s, i) => (
                <SocialIcon key={s.id} d={s.d} index={i} url={s.url} />
              ))}
            </View>
          </MotiView>

          <LinkColumn title="Useful Links" links={USEFUL_LINKS} delay={160} />
          <LinkColumn title="Company" links={COMPANY_LINKS} delay={240} />

          {/* App download column */}
          <MotiView
            from={{ opacity: 0, translateY: 24 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 600, delay: 320 }}
            style={styles.appCol}
          >
            <View style={styles.colHeadingRow}>
              <View style={styles.colHeadingBar} />
              <Text style={styles.colHeading}>Get the App</Text>
            </View>
            <StoreButtons />

            <View style={styles.contactBlock}>
              <ContactRow icon="mail-outline" label="Support" value="support@fatafatapp.com" />
              <ContactRow icon="shield-checkmark-outline" label="Grievance Officer" value="grievance@fatafatapp.com" />
            </View>
          </MotiView>
        </View>

        <View style={styles.divider} />

        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 600, delay: 400 }}
          style={styles.bottomBar}
        >
          <Text style={styles.copyright}>
            <Text style={styles.copyrightStrong}>© 2026 GIT Software Technologies FZC.</Text> All rights
            reserved. · Registered Office: Business Center, Sharjah Publishing City Free Zone, Sharjah, UAE
          </Text>
          <View style={styles.legalRow}>
            {LEGAL_LINKS.map((item) => (
              <BottomLegalLink key={item.label} {...item} />
            ))}
          </View>
        </MotiView>
      </View>
    </View>
  );
}

/* ---------------------------------------------------------------------- */
/* Styles — font family / sizes matched to the rest of the site           */
/* (see SiteHeader.tsx, WhereWeOperate.tsx, WhyFatafat.tsx, StoreButtons.tsx) */
/* ---------------------------------------------------------------------- */
const styles = StyleSheet.create({
  footer: {
    backgroundColor: FOOTER_BOTTOM,
    paddingTop: 64,
    position: 'relative',
    overflow: 'hidden',
    ...(IS_WEB
      ? ({
          // @ts-ignore - web-only gradient background
          backgroundImage: `linear-gradient(180deg, ${FOOTER_TOP} 0%, ${FOOTER_BOTTOM} 70%)`,
        } as any)
      : {}),
  },
  container: {
    width: '100%',
    maxWidth: 1200,
    alignSelf: 'center',
    paddingHorizontal: 24,
  },

  /* Newsletter */
  newsletter: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: HAIRLINE,
    padding: 32,
    marginBottom: 56,
    overflow: 'hidden',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 28,
  },
  newsletterContent: { flexGrow: 1, flexBasis: 280, maxWidth: 440 },
  newsletterTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: HAIRLINE,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginBottom: 14,
  },
  newsletterTagDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.secondaryBlue },
  newsletterTagLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: 11,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colors.secondaryBlue,
  },
  newsletterTitle: {
    fontFamily: fonts.display,
    fontSize: 24,
    lineHeight: 30,
    color: colors.textOnDark,
    marginBottom: 8,
  },
  newsletterDesc: { fontFamily: fonts.body, fontSize: 14, lineHeight: 21, color: colors.textMuted },
  newsletterForm: {
    flexGrow: 1,
    flexBasis: 280,
    maxWidth: 400,
    flexDirection: 'row',
    gap: 10,
  },
  newsletterInput: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderWidth: 1,
    borderColor: HAIRLINE,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.textOnDark,
  },
  newsletterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  newsletterBtnLabel: { fontFamily: fonts.bodyMedium, fontSize: 14, color: colors.ink },

  /* Main grid */
  mainGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 40,
    paddingBottom: 48,
  },
  brandCol: { flexGrow: 1, flexBasis: 260, maxWidth: 320 },
  logoImg: { height: 104, width: 104 * (800 / 508), marginLeft: -4 },
  brandDesc: {
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 22,
    color: colors.textMuted,
    marginTop: 16,
    marginBottom: 22,
  },
  brandDescHighlight: { color: colors.accentBlue, fontFamily: fonts.bodyMedium },
  socialRow: { flexDirection: 'row', gap: 12 },
  socialIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: SURFACE,
    borderWidth: 1,
    borderColor: HAIRLINE,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  /* Link columns */
  linkCol: { flexGrow: 1, flexBasis: 150, maxWidth: 200 },
  colHeadingRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 18 },
  colHeadingBar: { width: 14, height: 2, borderRadius: 1, backgroundColor: colors.accentBlue },
  colHeading: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colors.textOnDark,
  },
  linkList: { gap: 4 },
  linkRow: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingVertical: 6 },
  linkRowDisabled: { opacity: 0.45 },
  linkLabel: { fontFamily: fonts.body, fontSize: 14, color: colors.textMuted },
  linkLabelHovered: { color: colors.textOnDark },

  /* App download column */
  appCol: { flexGrow: 1, flexBasis: 240, maxWidth: 300 },
  contactBlock: {
    marginTop: 22,
    backgroundColor: SURFACE,
    borderWidth: 1,
    borderColor: HAIRLINE,
    borderRadius: 14,
    padding: 16,
    gap: 12,
  },
  contactRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  contactIcon: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'rgba(51,80,222,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: 10,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    color: DIM_TEXT,
  },
  contactValue: { fontFamily: fonts.body, fontSize: 12.5, color: colors.textMuted, marginTop: 1 },

  /* Divider + bottom bar */
  divider: { height: 1, backgroundColor: HAIRLINE, marginBottom: 20 },
  bottomBar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    paddingBottom: 32,
  },
  copyright: { fontFamily: fonts.body, fontSize: 12.5, lineHeight: 19, color: DIM_TEXT, maxWidth: 640 },
  copyrightStrong: { fontFamily: fonts.bodyMedium, color: colors.textMuted },
  legalRow: { flexDirection: 'row', gap: 20 },
  legalLink: { fontFamily: fonts.bodyMedium, fontSize: 12.5, color: DIM_TEXT },
});