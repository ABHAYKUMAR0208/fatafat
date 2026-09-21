import React from 'react';
import LegalPageLayout from '../components/legal/LegalPageLayout';
import { disclaimerContent } from '../constants/legal/disclaimer';

export default function DisclaimerPage() {
  return <LegalPageLayout data={disclaimerContent} />;
}
