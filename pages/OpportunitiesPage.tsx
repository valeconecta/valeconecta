
import React from 'react';
import { Page } from '../types';
import OpportunitiesView from '../components/professional/views/OpportunitiesView';

interface OpportunitiesPageProps {
    setCurrentPage: (page: Page, id?: number) => void;
}

const OpportunitiesPage: React.FC<OpportunitiesPageProps> = ({ setCurrentPage }) => {
    return (
        <div className="bg-gray-50/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <OpportunitiesView setCurrentPage={setCurrentPage} />
            </div>
        </div>
    );
};

export default OpportunitiesPage;
