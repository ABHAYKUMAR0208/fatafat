import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Linking,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import Footer from '../Shared/Footer';
import SiteHeader, { HEADER_HEIGHT } from '../Shared/SiteHeader';
import { colors, fonts } from '../../constants/theme';

const DESKTOP_BREAKPOINT = 900;

/* ---------------------------------------------------------------------- */
/* Content model                                                          */
/* ---------------------------------------------------------------------- */
export type LegalBlock =
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'table'; headers: string[]; rows: string[][] };

export type LegalSection = {
  id: string;
  title: string;
  blocks: LegalBlock[];
};

export type LegalPageData = {
  title: string;
  effectiveDate: string;
  lastUpdated: string;
  note?: string;
  sections: LegalSection[];
  extraContactNote?: string;
};

/* ---------------------------------------------------------------------- */
/* Block renderers                                                        */
/* ---------------------------------------------------------------------- */
function Paragraph({ text }: { text: string }) {
  return <Text style={styles.paragraph}>{text}</Text>;
}

function BulletList({ items }: { items: string[] }) {
  return (
    <View style={styles.list}>
      {items.map((item, i) => (
        <View key={i} style={styles.listRow}>
          <View style={styles.bullet} />
          <Text style={styles.listText}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

function DataTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <View style={styles.table}>
      <View style={[styles.tableRow, styles.tableHeadRow]}>
        {headers.map((h, i) => (
          <Text key={i} style={[styles.tableCell, styles.tableHeadCell]}>
            {h}
          </Text>
        ))}
      </View>
      {rows.map((row, ri) => (
        <View key={ri} style={[styles.tableRow, ri % 2 === 1 && styles.tableRowAlt]}>
          {row.map((cell, ci) => (
            <Text key={ci} style={styles.tableCell}>
              {cell}
            </Text>
          ))}
        </View>
      ))}
    </View>
  );
}

function Block({ block }: { block: LegalBlock }) {
  if (block.type === 'p') return <Paragraph text={block.text} />;
  if (block.type === 'ul') return <BulletList items={block.items} />;
  return <DataTable headers={block.headers} rows={block.rows} />;
}

/* ---------------------------------------------------------------------- */
/* Page                                                                    */
/* ---------------------------------------------------------------------- */
export default function LegalPageLayout({ data }: { data: LegalPageData }) {
  const { width } = useWindowDimensions();
  const isDesktop = width >= DESKTOP_BREAKPOINT;
  const router = useRouter();

  const scrollRef = useRef<ScrollView>(null);
  const offsets = useRef<Record<string, number>>({});
  const [activeId, setActiveId] = useState<string | null>(null);

  const scrollToSection = (id: string) => {
    const y = offsets.current[id];
    if (y == null || !scrollRef.current) return;
    scrollRef.current.scrollTo({ y: y - HEADER_HEIGHT - 16, animated: true });
    setActiveId(id);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView ref={scrollRef} contentContainerStyle={styles.scroll}>
        <SiteHeader />

        {/* Hero */}
        <View style={styles.hero}>
          <View style={styles.heroInner}>
            <Pressable onPress={() => router.push('/' as any)}>
              <Text style={styles.crumb}>
                Home <Text style={styles.crumbSep}>/</Text> {data.title}
              </Text>
            </Pressable>
            <Text style={styles.eyebrow}>Fatafat · GIT Software Technologies</Text>
            <Text style={styles.h1}>{data.title}</Text>
            <Text style={styles.meta}>
              Effective Date: {data.effectiveDate} &nbsp;|&nbsp; Last Updated: {data.lastUpdated}
            </Text>
            {data.note ? (
              <View style={styles.noteBox}>
                <Text style={styles.noteText}>{data.note}</Text>
              </View>
            ) : null}
          </View>
        </View>

        <View style={styles.body}>
          <View style={[styles.layout, isDesktop && styles.layoutDesktop]}>
            {/* Table of contents */}
            {isDesktop && (
              <View style={styles.toc}>
                <Text style={styles.tocEyebrow}>On this page</Text>
                {data.sections.map((s) => (
                  <Pressable key={s.id} onPress={() => scrollToSection(s.id)} style={styles.tocItem}>
                    <Text style={[styles.tocLink, activeId === s.id && styles.tocLinkActive]}>{s.title}</Text>
                  </Pressable>
                ))}
              </View>
            )}

            {/* Article */}
            <View style={styles.article}>
              {data.sections.map((s) => (
                <View
                  key={s.id}
                  onLayout={(e) => {
                    offsets.current[s.id] = e.nativeEvent.layout.y;
                  }}
                  style={styles.section}
                >
                  <Text style={styles.h2}>{s.title}</Text>
                  {s.blocks.map((b, i) => (
                    <Block key={i} block={b} />
                  ))}
                </View>
              ))}

              <View style={styles.contactCard}>
                <Text style={styles.contactTitle}>Contact Us</Text>
                <Text style={styles.contactLine}>
                  If you have any questions about this {data.title}, please contact us at:
                </Text>
                <Text style={styles.contactCompany}>GIT Software Technologies</Text>
                <Text style={styles.contactLine}>
                  Email: legal@fatafat.app &nbsp;|&nbsp; Grievance Officer: grievance@fatafat.app
                </Text>
                <Text style={styles.contactLine}>
                  Registered Office: [Insert registered office address of the India entity once incorporated]
                </Text>
                {data.extraContactNote ? (
                  <Pressable onPress={() => Linking.openURL('tel:112')}>
                    <Text style={styles.contactEmergency}>{data.extraContactNote}</Text>
                  </Pressable>
                ) : null}
              </View>
            </View>
          </View>
        </View>

        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------------------------------------------------------------------- */
/* Styles                                                                  */
/* ---------------------------------------------------------------------- */
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.paper },
  scroll: { paddingTop: HEADER_HEIGHT },

  hero: { backgroundColor: colors.navy, paddingVertical: 40 },
  heroInner: { width: '100%', maxWidth: 1200, alignSelf: 'center', paddingHorizontal: 24 },
  crumb: { fontFamily: fonts.body, fontSize: 13, color: colors.textMuted },
  crumbSep: { color: colors.textMuted },
  eyebrow: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colors.secondaryBlue,
    marginTop: 14,
  },
  h1: { fontFamily: fonts.display, fontSize: 34, color: colors.textOnDark, marginTop: 8 },
  meta: { fontFamily: fonts.body, fontSize: 13, color: colors.textMuted, marginTop: 10 },
  noteBox: {
    marginTop: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
    backgroundColor: 'rgba(255,255,255,0.06)',
    padding: 14,
  },
  noteText: { fontFamily: fonts.body, fontSize: 13, lineHeight: 20, color: colors.textMuted },

  body: { width: '100%', maxWidth: 1200, alignSelf: 'center', paddingHorizontal: 24, paddingTop: 36 },
  layout: { flexDirection: 'column', gap: 32 },
  layoutDesktop: { flexDirection: 'row', alignItems: 'flex-start' },

  toc: { width: 220, gap: 4, paddingTop: 4 },
  tocEyebrow: {
    fontFamily: fonts.bodyMedium,
    fontSize: 11,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colors.bodyMutedOnLight,
    marginBottom: 10,
  },
  tocItem: { paddingVertical: 5 },
  tocLink: { fontFamily: fonts.body, fontSize: 13.5, color: colors.bodyMutedOnLight },
  tocLinkActive: { color: colors.accentBlue, fontFamily: fonts.bodyMedium },

  article: { flex: 1, minWidth: 0, paddingBottom: 64 },
  section: { marginBottom: 30 },
  h2: { fontFamily: fonts.displayMedium, fontSize: 20, color: colors.ink, marginBottom: 10 },
  paragraph: { fontFamily: fonts.body, fontSize: 14.5, lineHeight: 24, color: colors.bodyMutedOnLight, marginBottom: 10 },

  list: { marginBottom: 10, gap: 8 },
  listRow: { flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  bullet: { width: 5, height: 5, borderRadius: 2.5, backgroundColor: colors.accentBlue, marginTop: 8 },
  listText: { flex: 1, fontFamily: fonts.body, fontSize: 14.5, lineHeight: 23, color: colors.bodyMutedOnLight },

  table: {
    marginTop: 6,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    overflow: 'hidden',
  },
  tableRow: { flexDirection: 'row' },
  tableRowAlt: { backgroundColor: colors.cloud },
  tableHeadRow: { backgroundColor: colors.navy },
  tableCell: {
    flex: 1,
    fontFamily: fonts.body,
    fontSize: 13,
    lineHeight: 19,
    color: colors.bodyMutedOnLight,
    padding: 10,
  },
  tableHeadCell: { fontFamily: fonts.bodyMedium, color: colors.textOnDark, fontSize: 12 },

  contactCard: {
    marginTop: 10,
    backgroundColor: colors.cloud,
    borderRadius: 16,
    padding: 20,
    gap: 4,
  },
  contactTitle: { fontFamily: fonts.bodyMedium, fontSize: 15, color: colors.ink },
  contactLine: { fontFamily: fonts.body, fontSize: 13.5, lineHeight: 21, color: colors.bodyMutedOnLight },
  contactCompany: { fontFamily: fonts.bodyMedium, fontSize: 14, color: colors.ink, marginTop: 4 },
  contactEmergency: {
    fontFamily: fonts.bodyMedium,
    fontSize: 13.5,
    color: colors.accentBlue,
    marginTop: 10,
  },
});
