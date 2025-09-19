"use client"

import { useRef } from 'react';

function Search({ handleSearch }: { handleSearch: (search: string) => void }) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);



    const handleChange = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
            const value = inputRef.current?.value || '';
            handleSearch(value);
        }, 500);
    }

    return (
        <div className="border border-gray-200 w-200 mx-auto rounded-md py-1">
            <input
                className="focus:outline-none px-3 py-1 w-full"
                placeholder="Search by cities..."
                ref={inputRef}
                onChange={handleChange}
            />
        </div>
    );
}

export default Search;
