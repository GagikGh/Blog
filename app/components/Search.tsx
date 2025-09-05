'use client'

import {useEffect, useRef, useState} from 'react';
import useDebounce from "@/hooks/useDebounce";
import { Post } from "@/types";

function Search({ setPosts }: {setPosts: (post: Post[]) => void }) {
    const [value, setValue] = useState('');
    const debouncedValue = useDebounce(value);
    const initialRef = useRef<boolean>(false);

    const handleSearch = async () => {
        try {
            const response = await fetch(`https://${process.env.NEXT_PUBLIC_BBC_API_KEY}.mockapi.io/posts?search=${debouncedValue}`);
            if (response.ok) {
                const data = await response.json();

                setPosts(data);
            } else {
                setPosts([]);
            }
        } catch {
            setPosts([]);
        }
    }

    useEffect(() => {
        if (initialRef.current){

            handleSearch()
        } else {
            initialRef.current = true;
        }

    }, [debouncedValue])

    return (
        <div className="border border-gray-200 rounded-md py-1">
            <input
                className="focus:outline-none px-3 py-1 w-full"
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
