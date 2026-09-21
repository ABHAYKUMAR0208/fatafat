import React from 'react';
import LegalPageLayout from '../components/legal/LegalPageLayout';
import { refundCancellationContent } from '../constants/legal/refundCancellation';

export default function RefundCancellationPage() {
  return <LegalPageLayout data={refundCancellationContent} />;
}
