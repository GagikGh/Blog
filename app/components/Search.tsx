'use client'

import {useEffect, useState} from 'react';
import useDebounce from "@/hooks/useDebounce";

function Search({ setPosts }) {
    const [value, setValue] = useState('');
    const debouncedValue = useDebounce(value);

    const handleSearch = async () => {
        try {
            const response = await fetch(`https://${process.env.NEXT_PUBLIC_BBC_API_KEY}.mockapi.io/posts?search=${debouncedValue}`);
            console.log(response);
            if (response.ok) {
                const data = await response.json();

                setPosts(data);
            } else {
                setPosts([]);
            }
        } catch (error) {
            console.log(error);
            setPosts([]);
        }
    }

    useEffect(() => {
        handleSearch()
    }, [debouncedValue])



    return (
        <div className="border border-gray-200 rounded-md py-1">
            <input
                className="focus:outline-none px-3 py-1"
                placeholder="Search by cities..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            {/*<button*/}
            {/*    className="border-l border-gray-200 px-2 py-1 hover:text-yellow-200"*/}
            {/*    onClick={() => {setValue("")*/}
            {/*    }}*/}
            {/*>*/}
            {/*    Search*/}
            {/*</button>*/}
        </div>
    );
}

export default Search;