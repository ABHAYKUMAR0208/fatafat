import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../../constants/theme';
import Footer from './Footer';
import SiteHeader, { HEADER_HEIGHT } from './SiteHeader';

type Highlight = { icon: keyof typeof Ionicons.glyphMap; label: string };

type Props = {
  eyebrow: string;
  title: string;
  /** Word(s) within the title to render in the accent color. Must match exactly. */
  titleAccent?: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  highlights?: Highlight[];
};

/**
 * Shared shell for header nav pages that don't (yet) have a fully custom
 * design of their own. Keeps SiteHeader + Footer + the core visual language
 * (badge, display heading, accent word, paper background) consistent with
 * Home and Pink Ride while each page's own copy/icon set it apart.
 */
export default function PagePlaceholder({
  eyebrow,
  title,
  titleAccent,
  description,
  icon,
  highlights,
}: Props) {
  const parts = titleAccent ? title.split(titleAccent) : [title];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <SiteHeader />

        <View style={styles.hero}>
          <View style={styles.iconWrap}>
            <Ionicons name={icon} size={30} color={colors.navy} />
          </View>

          <View style={styles.badge}>
            <Text style={styles.badgeLabel}>{eyebrow}</Text>
          </View>

          <Text style={styles.title}>
            {parts.map((part, i) => (
              <React.Fragment key={i}>
                {part}
                {titleAccent && i < parts.length - 1 ? (
                  <Text style={styles.titleAccent}>{titleAccent}</Text>
                ) : null}
              </React.Fragment>
            ))}
          </Text>

          <Text style={styles.description}>{description}</Text>

          {highlights && highlights.length > 0 && (
            <View style={styles.highlights}>
              {highlights.map((h) => (
                <View key={h.label} style={styles.highlightRow}>
                  <View style={styles.highlightIcon}>
                    <Ionicons name={h.icon} size={16} color={colors.secondaryBlue} />
                  </View>
                  <Text style={styles.highlightLabel}>{h.label}</Text>
                </View>
              ))}
            </View>
          )}

          <View style={styles.notice}>
            <Ionicons name="construct-outline" size={15} color={colors.bodyMutedOnLight} />
            <Text style={styles.noticeText}>This page is on its way — check back soon.</Text>
          </View>
        </View>

        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.paper },
  scroll: { paddingTop: HEADER_HEIGHT },
  hero: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 64,
    paddingBottom: 72,
    maxWidth: 640,
    alignSelf: 'center',
    width: '100%',
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: colors.chipBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  badge: {
    backgroundColor: colors.chipBg,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 7,
    marginBottom: 20,
  },
  badgeLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    letterSpacing: 0.5,
    color: colors.accentBlue,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 36,
    lineHeight: 42,
    color: colors.ink,
    textAlign: 'center',
    marginBottom: 16,
  },
  titleAccent: { color: colors.accentBlue },
  description: {
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 25,
    color: colors.bodyMutedOnLight,
    textAlign: 'center',
    maxWidth: 480,
  },
  highlights: {
    marginTop: 28,
    gap: 12,
    width: '100%',
    maxWidth: 360,
  },
  highlightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  highlightIcon: {
    width: 28,
    height: 28,
    borderRadius: 9,
    backgroundColor: 'rgba(30,155,224,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  highlightLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: 13.5,
    color: colors.ink,
  },
  notice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 36,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 999,
    backgroundColor: colors.chipBg,
  },
  noticeText: {
    fontFamily: fonts.body,
    fontSize: 12.5,
    color: colors.bodyMutedOnLight,
  },
});