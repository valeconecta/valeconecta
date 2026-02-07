
import React from 'react';
import { Page } from '../types';
import ClientLayout from '../components/client/ClientLayout';

interface ClientDashboardPageProps {
  setCurrentPage: (page: Page, id?: number) => void;
}

const ClientDashboardPage: React.FC<ClientDashboardPageProps> = ({ setCurrentPage }) => {
  return (
    <ClientLayout setCurrentPage={setCurrentPage} />
  );
};

export default ClientDashboardPage;
