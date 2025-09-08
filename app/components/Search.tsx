"use client"

import { useRef } from 'react';
import { Post } from '@/types';

function Search({ setPosts }: { setPosts: (post: Post[]) => void }) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const handleSearch = async (value: string) => {
        try {
            const response = await fetch(`https://${process.env.NEXT_PUBLIC_BBC_API_KEY}.mockapi.io/posts?search=${value}&limit=10&page=1`);

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
