import React, {useState} from 'react';

type University = {
    country: string;
    alpha_two_code: string;
    web_pages: string[];
    state_province: string | null;
    name: string;
    domains: string[];
};

type UniversitiesTableProps = {
    universities: University[];
    error: boolean;
};

const UniversitiesTable: React.FC<UniversitiesTableProps> = ({universities, error}) => {
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const sortedUniversities = [...universities].sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.name.localeCompare(b.name); //asc sort
        } else {
            return b.name.localeCompare(a.name) //desc sort
        }
    });

    const handleSort = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    if (error) {
        return <p>Error fetching data</p>;
    }

    return (
        <div className="overflow-x-auto">
            {/* Desktop view */}
            <table className="mt-5 mb-5 hidden min-w-full overflow-hidden rounded-lg bg-white shadow-md sm:table">
                <thead className="bg-stone-200 text-sm uppercase leading-normal text-gray-600">
                <tr>
                    <th className="cursor-pointer px-6 py-3 text-left" onClick={handleSort}>
                        University Name {sortOrder === 'asc' ? '↓' : '↑'}
                    </th>
                    <th className="px-6 py-3 text-left">Domains</th>
                    <th className="px-6 py-3 text-left">Website Address</th>
                </tr>
                </thead>
                <tbody className="text-sm font-light text-gray-600">
                {sortedUniversities.map((university) => (
                    <tr key={university.name} className="border-b border-gray-200 hover:bg-gray-100">
                        <td className="border-r border-gray-200 px-6 py-3">{university.name}</td>
                        <td className="border-r border-gray-200 px-6 py-3">{university.domains.join(', ')}</td>
                        <td className="px-6 py-3">
                            <a href={university.web_pages[0]} target="_blank" rel="noopener noreferrer"
                               className="text-blue-600 underline">
                                {university.web_pages[0]}
                            </a>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Mobile view */}
            <div className="mt-5 grid grid-cols-1 gap-4 sm:hidden">
                {sortedUniversities.map((university) => (
                    <div key={university.name} className="rounded-lg bg-white p-4 shadow-md">
                        <div className="mb-2">
                            <strong className="block text-gray-800">University Name:</strong>
                            <span className="text-gray-600">{university.name}</span>
                        </div>
                        <div className="mb-2">
                            <strong className="block text-gray-800">Domains:</strong>
                            <span className="text-gray-600">{university.domains.join(', ')}</span>
                        </div>
                        <div className="mb-2">
                            <strong className="block text-gray-800">Website:</strong>
                            <a href={university.web_pages[0]} target="_blank" rel="noopener noreferrer"
                               className="text-blue-600 underline">
                                {university.web_pages[0]}
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UniversitiesTable;
