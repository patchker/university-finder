import React from 'react';

interface PopulationDataProps {
    populationData?: {
        data: {
            country: string;
            iso3: string;
        };
    };
    latestPopulation?: {
        year: number;
        value: number;
    };
}

const PopulationData: React.FC<PopulationDataProps> = ({populationData, latestPopulation}) => {
    if (!populationData || !latestPopulation) {
        return null;
    }

    return (
        <div className="my-4 max-w-2xl overflow-hidden rounded-lg bg-white p-6 shadow-md">
            <h3 className="mb-4 border-b pb-2 text-lg font-semibold text-gray-800">Population Information</h3>
            <p className="mb-4 text-sm text-gray-600">
                Below you will find the latest population data for the selected country. This data includes the country
                name, its ISO code, and the population for the most recent year available.
            </p>

            <div className="mb-3 flex items-center justify-between gap-10">
                <span className="font-medium text-gray-600">Country:</span>
                <span className="font-bold text-gray-900">{populationData.data.country}</span>
            </div>

            <div className="mb-3 flex items-center justify-between gap-10">
                <span className="font-medium text-gray-600">Country code (ISO):</span>
                <span className="font-bold text-gray-900">{populationData.data.iso3}</span>
            </div>

            <div className="mb-3 flex items-center justify-between gap-10">
                <span className="font-medium text-gray-600">Year:</span>
                <span className="font-bold text-gray-900">{latestPopulation.year}</span>
            </div>

            <div className="mb-3 flex items-center justify-between gap-10">
                <span className="font-medium text-gray-600">Population:</span>
                <span className="font-bold text-gray-900">{latestPopulation.value.toLocaleString()}</span>
            </div>
        </div>
    );
};

export default PopulationData;
