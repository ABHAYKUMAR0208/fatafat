import React from 'react';
import LegalPageLayout from '../components/legal/LegalPageLayout';
import { privacyContent } from '../constants/legal/privacy';

export default function PrivacyPage() {
  return <LegalPageLayout data={privacyContent} />;
}
