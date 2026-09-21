import React from 'react';
import LegalPageLayout from '../components/legal/LegalPageLayout';
import { termsContent } from '../constants/legal/terms';

export default function TermsPage() {
  return <LegalPageLayout data={termsContent} />;
}
