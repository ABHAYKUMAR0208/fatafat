import React from 'react';
import LegalPageLayout from '../components/legal/LegalPageLayout';
import { safetyContent } from '../constants/legal/safety';

export default function SafetyPage() {
  return <LegalPageLayout data={safetyContent} />;
}
