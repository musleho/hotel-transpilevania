'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";

interface SearchProps {
    roomTypeFilter: string;
    searchQuery: string;
}

const Search: React.FC<SearchProps> = ({
    roomTypeFilter,
    searchQuery,
}) => {
    const router = useRouter();
    const [typeFilter, setTypeFilter] = useState<string>(roomTypeFilter || 'all');
    const [searchTerm, setSearchTerm] = useState<string>(searchQuery || '');
    const handleRoomTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTypeFilter(e.target.value);
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }

    const handleFilter = () => {
        // Navigate to rooms filter
        router.push(`/rooms?roomType=${typeFilter}&searchQuery=${searchTerm}`);
    }
    
    return (
        <section className='bg-tertiary-light px-4 py-6 rounded-lg'>
            <div className='container mx-auto flex gap-4 flex-wrap justify-between items-center'>
                <div className='w-full md:1/3 lg:w-auto mb-4 md:mb-0'>
                    <label
                        htmlFor=''
                        className='block text-sm font-medium mb-2 text-black'>
                        Room Type
                    </label>
                    <div className='relative'>
                        <select
                            name=''
                            id=''
                            value={typeFilter}
                            onChange={handleRoomTypeChange}
                            className='w-full px-4 py-2 capitalize rounded leading-tight dark:bg-black focus:outline-none'>
                            <option value='All'>All</option>
                            <option value='Basic'>Basic</option>
                            <option value='Luxury'>Luxury</option>
                            <option value='Suite'>Suite</option>
                        </select>
                    </div>
                </div>
                <div className='w-full md:1/3 lg:w-auto mb-4 md:mb-0'>
                    <label
                        htmlFor=''
                        className='block text-sm font-medium mb-2 text-black'>
                        Search
                    </label>
                    <input
                        type='search'
                        name='label-search'
                        placeholder='Search'
                        id='search'
                        className='w-full px-4 py-3 rounded leading-tight dark:bg-black dark:placeolder:text-white focus:outline-none'
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
                <button className="btn-primary" onClick={handleFilter}>Search</button>
            </div>
        </section>
    );
};

export default Search;
