import React from 'react';
import LegalPageLayout from '../components/legal/LegalPageLayout';
import { cookiesContent } from '../constants/legal/cookies';

export default function CookiesPage() {
  return <LegalPageLayout data={cookiesContent} />;
}
