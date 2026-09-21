import React from 'react';
import LegalPageLayout from '../components/legal/LegalPageLayout';
import { grievanceContent } from '../constants/legal/grievance';

export default function GrievancePage() {
  return <LegalPageLayout data={grievanceContent} />;
}
