
import React from 'react';
import { Page } from '../types';
import ProfessionalLayout from '../components/professional/ProfessionalLayout';

interface ProfessionalDashboardPageProps {
  setCurrentPage: (page: Page) => void;
}

const ProfessionalDashboardPage: React.FC<ProfessionalDashboardPageProps> = ({ setCurrentPage }) => {
  return (
    <ProfessionalLayout setCurrentPage={setCurrentPage} />
  );
};

export default ProfessionalDashboardPage;
