import React from 'react';
import LegalPageLayout from '../components/legal/LegalPageLayout';
import { pricingContent } from '../constants/legal/pricing';

export default function PricingPage() {
  return <LegalPageLayout data={pricingContent} />;
}
