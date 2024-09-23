import {useState, useEffect} from 'react';
import SearchForm from './components/Form/SearchForm.tsx';
import UniversitiesTable from './components/Table/UniversitiesTable.tsx';
import {useGetCountryByNameQuery} from './app/slices/universitiesApi.tsx';
import Footer from './components/shared/Footer.tsx';
import {usePostCountryPopulationMutation} from './app/slices/populationApi.tsx';
import PopulationData from './components/Population/PopulationData.tsx';
import Header from './components/shared/Header.tsx';

interface PopulationCount {
    year: number;
    value: number;
}

function App() {
    const [countryName, setCountryName] = useState<string>('');
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);


    const {
        data: countryData,
        error: countryError,
        isFetching: isFetchingCountry,
    } = useGetCountryByNameQuery(countryName, {skip: !isSubmitted});

    //rtk query mutation
    const [postCountryPopulation, {
        data: populationData,
        error: populationError,
        isFetching: isFetchingPopulation
    }] = usePostCountryPopulationMutation();

    //post a request after receiving data
    useEffect(() => {
        if (countryData && countryData.length > 0) {
            postCountryPopulation(countryName);
        }
    }, [countryData, countryName, postCountryPopulation]);

    const getLatestPopulation = () => {
        return populationData?.data?.populationCounts?.reduce(
            (max: PopulationCount, entry: PopulationCount) =>
                entry.year > max.year ? entry : max,
            populationData.data.populationCounts[0]
        ) || null;
    };


    const renderMessage = () => {
        if (countryError) return <p className="text-red-500">Error during request. Try again later.</p>;
        if (countryData && countryData.length === 0) return <p className="text-red-500">No country with the specified
            name was found.</p>;
        return null;
    };

    const handleSearch = (isValid: boolean) => {
        setIsSubmitted(isValid);
    };

    const latestPopulation = getLatestPopulation();

    return (
        <div className="flex min-h-screen flex-col bg-gray-100 font-poppins">
            <Header/>
            <div className="flex flex-grow flex-col items-center px-4">
                <SearchForm isLoading={isFetchingCountry} setCountryName={setCountryName} countryName={countryName}
                            onSearch={handleSearch}/>

                {isSubmitted && (
                    <>
                        {renderMessage()}

                        {countryData?.length > 0 && (
                            <UniversitiesTable universities={countryData} error={!!countryError}
                            />
                        )}
                    </>
                )}

                {isFetchingPopulation && <p>Loading population data...</p>}
                {populationError && <p className="text-red-500">Error
                    occurred: {"message" in populationError && populationError?.message || 'An error occurred'}</p>}

                {latestPopulation &&
                    <PopulationData populationData={populationData} latestPopulation={latestPopulation}/>}
            </div>
            <Footer/>
        </div>
    );
}

export default App;
