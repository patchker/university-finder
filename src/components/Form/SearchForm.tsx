import React, {useState, ChangeEvent, KeyboardEvent} from 'react';
import Loader from "../Loader/Loader.tsx";

interface SearchFormProps {
    isLoading: boolean;
    setCountryName: (name: string) => void;
    countryName: string;
    onSearch: (isValid: boolean) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({isLoading, setCountryName, countryName, onSearch}) => {
    const [inputValue, setInputValue] = useState<string>(countryName);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);


    const validateInput = (value: string): string | null => {
        const regex = /^[a-zA-Z\s]+$/;  // Only letters and spaces
        if (value.trim() === '') return 'The field cannot be empty.';
        if (value.length < 3) return 'The country name must be at least 3 characters long.';
        if (value.length > 30) return 'The country name can be a maximum of 30 characters long.';
        if (!regex.test(value)) return 'The country name cannot contain special characters or numbers.';
        return null;
    };

    const handleSearch = () => {
        const error = validateInput(inputValue);
        if (error) {
            setErrorMessage(error);
            onSearch(false);
            return;
        }
        setErrorMessage(null);
        setCountryName(inputValue);
        onSearch(true);
    };

    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    return (
        <div className="mx-auto my-8 max-w-xl overflow-hidden rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-center text-2xl font-semibold text-gray-800">
                Find Universities and Population Data
            </h2>
            <p className="mb-4 text-center text-sm text-gray-600">
                Enter the name of a country in English to retrieve data about universities (name, domains, websites) and
                the population of the selected country.
            </p>
            <div className="mb-4 flex items-center justify-center">
                <input
                    type="text"
                    placeholder="Enter country"
                    className="w-full rounded-md border border-gray-300 p-2 h-[40px] lg:w-[300px]"
                    onChange={handleInputChange}
                    value={inputValue}
                    onKeyDown={handleKeyPress}
                />
                <button
                    className="ml-2 rounded-md bg-stone-800 text-white w-[80px] h-[40px] hover:bg-stone-500"
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>
            {errorMessage && (
                <p className="mb-2 text-center text-red-500">{errorMessage}</p>
            )}
            {isLoading && <Loader/>}
        </div>
    );
};

export default SearchForm;
