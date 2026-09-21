import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import ParcelHero from '../components/parcel-delivery/ParcelHero';
import ParcelStats from '../components/parcel-delivery/ParcelStats';
import ParcelHowItWorks from '../components/parcel-delivery/ParcelHowItWorks';
import ParcelPricing from '../components/parcel-delivery/ParcelPricing';
import ParcelSafety from '../components/parcel-delivery/ParcelSafety';
import ParcelRequirements from '../components/parcel-delivery/ParcelRequirements';
import ParcelFAQ from '../components/parcel-delivery/ParcelFAQ';
import ParcelOnTheRoad from '../components/parcel-delivery/ParcelOnTheRoad';
import SiteHeader, { HEADER_HEIGHT } from '../components/Shared/SiteHeader';
import Footer from '../components/Shared/Footer';
import { colors } from '../constants/theme';

const DESKTOP_BREAKPOINT = 900;

export default function ParcelDeliveryPage() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= DESKTOP_BREAKPOINT;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <SiteHeader />

        <ParcelHero isDesktop={isDesktop} />
        <ParcelStats isDesktop={isDesktop} />
        <ParcelHowItWorks isDesktop={isDesktop} />
        <ParcelPricing isDesktop={isDesktop} />
        <ParcelSafety />
        <ParcelRequirements />
        <ParcelFAQ />
        <ParcelOnTheRoad />

        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.paper },
  scroll: { paddingTop: HEADER_HEIGHT },
});