import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import React, { useState } from 'react';
import { Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { StoreBadgeIcon } from '../GetFatafatApp';
import { colors, fonts } from '../../constants/theme';

// Full logo, tagline recoloured white so it reads on the dark footer surface.
const logoImg = require('../../assets/logo/fatafat-logo-light.png');

const IS_WEB = Platform.OS === 'web';

/* ---------------------------------------------------------------------- */
/* Local palette — dark surface built from the site's own tokens, so this */
/* footer still feels like the rest of the Pink Ride page.                */
/* ---------------------------------------------------------------------- */
const FOOTER_TOP = '#0F172A'; // matches the reference footer background
const FOOTER_BOTTOM = '#0F172A'; // flat — no gradient, matches the reference exactly
const HAIRLINE = 'rgba(255,255,255,0.10)';
const DIM_TEXT = 'rgba(255,248,240,0.45)';
const MUTED_TEXT = 'rgba(255,248,240,0.62)';

/* ---------------------------------------------------------------------- */
/* Content                                                                 */
/* ---------------------------------------------------------------------- */
const USEFUL_LINKS = [
  'Lady Captain Registration',
  'Terms & Conditions',
  'Privacy Policy',
  'Cookie Policy',
  'Pricing Policy',
  'Refund & Cancellation Policy',
  'Disclaimer',
];

const COMPANY_LINKS = ['About Us', 'Safety', 'Careers', 'Contact Us', 'Grievance Officer', 'Help & FAQ'];

const LEGAL_LINKS = ['Privacy', 'Terms', 'Cookies', 'Disclaimer'];

const SOCIALS: { id: string; d: string; label: string }[] = [
  {
    id: 'facebook',
    label: 'Facebook',
    d: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    d: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
  },
  {
    id: 'x',
    label: 'X',
    d: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    d: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
];

/* ---------------------------------------------------------------------- */
/* Building blocks                                                        */
/* ---------------------------------------------------------------------- */
function SocialLink({ item, index }: { item: (typeof SOCIALS)[number]; index: number }) {
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
      from={{ opacity: 0, translateY: 10 }}
      animate={{ opacity: 1, translateY: hovered ? -3 : 0 }}
      transition={{ type: 'timing', duration: hovered ? 200 : 450, delay: hovered ? 0 : index * 80 }}
    >
      <Pressable
        style={[styles.socialLink, hovered && styles.socialLinkHovered]}
        {...hoverHandlers}
      >
        <Svg width={16} height={16} viewBox="0 0 24 24">
          <Path d={item.d} fill={hovered ? '#FFFFFF' : MUTED_TEXT} />
        </Svg>
      </Pressable>
    </MotiView>
  );
}

function FooterLink({ label, active }: { label: string; active?: boolean }) {
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
    <Pressable style={styles.linkRow} {...hoverHandlers}>
      <View style={[styles.linkDot, hovered && styles.linkDotVisible]} />
      <Text style={[styles.linkLabel, (hovered || active) && styles.linkLabelActive]}>{label}</Text>
    </Pressable>
  );
}

function LinkColumn({ title, links, delay }: { title: string; links: string[]; delay: number }) {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 550, delay }}
      style={styles.linkCol}
    >
      <Text style={styles.colHeading}>{title}</Text>
      <View style={styles.linkList}>
        {links.map((label) => (
          <FooterLink key={label} label={label}  />
        ))}
      </View>
    </MotiView>
  );
}

function SupportRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.supportBlock}>
      <Text style={styles.supportLabel}>{label}</Text>
      <Text style={styles.supportValue}>{value}</Text>
    </View>
  );
}

/* ---------------------------------------------------------------------- */
/* Footer                                                                  */
/* ---------------------------------------------------------------------- */
export default function PinkRideFooter() {
  return (
    <View style={styles.footer}>
      <LinearGradient
        colors={['transparent', colors.magenta, '#D946EF', '#A855F7', 'transparent']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.accentBar}
      />

      <View style={styles.container}>
        <View style={styles.mainGrid}>
          {/* Column 1 — Brand */}
          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 550 }}
            style={styles.brandCol}
          >
            <Image
              source={logoImg}
              style={styles.logoImg}
              resizeMode="contain"
              accessibilityLabel="Fatafat"
            />
            <Text style={styles.brandDesc}>
              Fixed-fare rides, same-city parcel delivery, intercity carpool and Lady Rider options
              across Delhi NCR. A product of{' '}
              <Text style={styles.brandDescHighlight}>GIT Software Technologies FZC</Text>.
            </Text>
            <View style={styles.socialRow}>
              {SOCIALS.map((item, i) => (
                <SocialLink key={item.id} item={item} index={i} />
              ))}
            </View>
          </MotiView>

          {/* Column 2 — Useful Links */}
          <LinkColumn title="Useful Links" links={USEFUL_LINKS} delay={100} />

          {/* Column 3 — Company */}
          <LinkColumn title="Company" links={COMPANY_LINKS} delay={160} />

          {/* Column 4 — Get The App */}
          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 550, delay: 220 }}
            style={styles.appCol}
          >
            <Text style={styles.colHeading}>Get The App</Text>

            <View style={styles.appButtons}>
              <Pressable style={styles.appBtn}>
                <StoreBadgeIcon kind="play" />
                <View>
                  <Text style={styles.appBtnSmall}>Get it on</Text>
                  <Text style={styles.appBtnBig}>Google Play</Text>
                </View>
              </Pressable>
              <Pressable style={styles.appBtn}>
                <StoreBadgeIcon kind="apple" />
                <View>
                  <Text style={styles.appBtnSmall}>Download on the</Text>
                  <Text style={styles.appBtnBig}>App Store</Text>
                </View>
              </Pressable>
            </View>

            <SupportRow label="Support" value="support@fatafatapp.in" />
            <SupportRow label="Grievance Officer" value="grievance@fatafatapp.in" />
          </MotiView>
        </View>

        <View style={styles.divider} />

        <MotiView
          from={{ opacity: 0, translateY: 16 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 550, delay: 280 }}
          style={styles.bottomBar}
        >
          <Text style={styles.copyright}>
            © 2026 GIT Software Technologies FZC. All rights reserved. · Registered Office: Business
            Center, Sharjah Publishing City Free Zone, Sharjah, UAE
          </Text>
          <View style={styles.legalRow}>
            {LEGAL_LINKS.map((label) => (
              <Pressable key={label}>
                <Text style={styles.legalLink}>{label}</Text>
              </Pressable>
            ))}
          </View>
        </MotiView>
      </View>
    </View>
  );
}

/* ---------------------------------------------------------------------- */
/* Styles — font family / sizes matched to the rest of the site           */
/* (see Footer.tsx, GetFatafatApp.tsx, PinkRideClosing.tsx)                  */
/* ---------------------------------------------------------------------- */
const styles = StyleSheet.create({
  footer: {
    backgroundColor: FOOTER_BOTTOM,
    paddingTop: 3,
    position: 'relative',
    overflow: 'hidden',
    ...(IS_WEB
      ? ({
          // @ts-ignore -- web-only gradient background
          backgroundImage: `linear-gradient(180deg, ${FOOTER_TOP} 0%, ${FOOTER_BOTTOM} 65%)`,
        } as any)
      : {}),
  },
  accentBar: { height: 3, width: '100%' },

  container: {
    width: '100%',
    maxWidth: 1200,
    alignSelf: 'center',
    paddingHorizontal: 24,
    paddingTop: 48,
  },

  mainGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 40,
    paddingBottom: 40,
  },

  brandCol: { flexGrow: 1, flexBasis: 260, maxWidth: 320 },
  logoImg: { height: 104, width: 104 * (800 / 508), marginLeft: -4 },
  brandDesc: {
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 22,
    color: MUTED_TEXT,
    marginTop: 16,
    marginBottom: 22,
    maxWidth: 300,
  },
  brandDescHighlight: { fontFamily: fonts.bodyMedium, color: colors.textOnDark },
  socialRow: { flexDirection: 'row', gap: 12 },
  socialLink: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: HAIRLINE,
    alignItems: 'center',
    justifyContent: 'center',
    // @ts-ignore -- web-only transition, no-op on native
    transitionProperty: 'border-color, background-color',
    // @ts-ignore -- web-only transition, no-op on native
    transitionDuration: '250ms',
  },
  socialLinkHovered: {
    borderColor: colors.magenta,
    backgroundColor: colors.magenta,
  },

  linkCol: { flexGrow: 1, flexBasis: 160, maxWidth: 220 },
  colHeading: {
    fontFamily: fonts.bodyMedium,
    fontSize: 11.5,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: colors.textOnDark,
    marginBottom: 18,
  },
  linkList: { gap: 2 },
  linkRow: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 6 },
  linkDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: colors.magenta, opacity: 0 },
  linkDotVisible: { opacity: 1 },
  linkLabel: { fontFamily: fonts.body, fontSize: 13.5, color: DIM_TEXT },
  linkLabelActive: { color: colors.textOnDark },

  appCol: { flexGrow: 1, flexBasis: 240, maxWidth: 300 },
  appButtons: { gap: 10, marginBottom: 20 },
  appBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: HAIRLINE,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    // @ts-ignore -- web-only transition, no-op on native
    transitionProperty: 'border-color, transform',
    // @ts-ignore -- web-only transition, no-op on native
    transitionDuration: '250ms',
  },
  appBtnSmall: {
    fontFamily: fonts.body,
    fontSize: 9.5,
    color: DIM_TEXT,
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  appBtnBig: { fontFamily: fonts.displayMedium, fontSize: 13.5, color: colors.textOnDark, marginTop: 1 },

  supportBlock: { marginBottom: 10 },
  supportLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: 10.5,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: 'rgba(255,248,240,0.35)',
  },
  supportValue: { fontFamily: fonts.body, fontSize: 12.5, color: MUTED_TEXT, marginTop: 2 },

  divider: { height: 1, backgroundColor: HAIRLINE, marginBottom: 24 },
  bottomBar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    paddingBottom: 32,
  },
  copyright: { fontFamily: fonts.body, fontSize: 12, lineHeight: 18, color: 'rgba(255,248,240,0.35)', maxWidth: 640 },
  legalRow: { flexDirection: 'row', gap: 18 },
  legalLink: { fontFamily: fonts.bodyMedium, fontSize: 12, color: 'rgba(255,248,240,0.35)' },
});