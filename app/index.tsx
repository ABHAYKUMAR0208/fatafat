import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { colors } from '../constants/theme';
import HeroSection from '../components/home/HeroSection';
import ServicesGrid from '../components/home/ServicesGrid';
import SiteHeader, { HEADER_HEIGHT } from '../components/Shared/SiteHeader';
import StatsBar from '../components/home/StatsBar';
import HowItWorks from '../components/home/HowItWorks';
import WhyFatafat from '../components/home/WhyFatafat';
import WhereWeOperate from '../components/home/WhereWeOperate';
import OnTheRoadSection from '@/components/home/OnTheRoadSection';
import Footer from '@/components/Shared/Footer';

// Provide a fallback when ../components/ScrollReveal is missing so TS/packager won't fail.
let ScrollRevealProvider: any = ({ children }: any) => children;
let useScrollRevealProps: any = () => ({});
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const _sr = require('../components/ScrollReveal');
  if (_sr?.ScrollRevealProvider) ScrollRevealProvider = _sr.ScrollRevealProvider;
  if (_sr?.useScrollRevealProps) useScrollRevealProps = _sr.useScrollRevealProps;
} catch (e) {
  // module not found — keep fallbacks
}

export default function Home() {
  return (
    <ScrollRevealProvider>
      <HomeScroll />
    </ScrollRevealProvider>
  );
}

function HomeScroll() {
  const scrollRevealProps = useScrollRevealProps();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll} {...scrollRevealProps}>
        <SiteHeader />
        <HeroSection />
        <StatsBar />
        <ServicesGrid />
        <HowItWorks />
        <WhyFatafat />
        <WhereWeOperate />
        <OnTheRoadSection />
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.paper },
  scroll: { paddingTop: HEADER_HEIGHT },
});