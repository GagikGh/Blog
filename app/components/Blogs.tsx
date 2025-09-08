"use client"

import { useEffect, useRef, useState } from 'react';
import { formatDate } from "@/helpers/formateDate";
import Link from "next/link";
import AddPost from "@/app/components/AddPost";
import Search from "@/app/components/Search";
import EmptyData from "@/app/components/ui/EmptyData";
import { Post } from "@/types";
import Pagination from "@/app/components/Pagination";

function Blogs({ data }: { data: Post[] }) {
    const totalPages = 3;
    const initialRef = useRef(false);
    const [posts, setPosts] = useState(data);
    const [currentPage, setCurrentPage] = useState(1);

    const changePage = async (page: number) => {
        const res = await fetch(
            `https://${process.env.NEXT_PUBLIC_BBC_API_KEY}.mockapi.io/posts?limit=10&page=${page}`,
        );
        const data = await res.json();
        setPosts(data);
    }

    useEffect(() => {
        if (initialRef.current){
            changePage(currentPage);
        } else {
            initialRef.current = true;
        }
    }, [currentPage]);

    return (
        <div>
            <AddPost setPosts={setPosts} />
            <Search setPosts={setPosts} />
            {posts.length ? (
                <div className="flex flex-col w-200 mx-auto gap-8">
                    {posts.map((item: Post) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow flex flex-col"
                        >
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                                    <span>{item?.author}</span>
                                    <span>{formatDate(item?.createdAt)}</span>
                                </div>
                                <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                                    <Link href={`/posts/${item?.id}`} className="hover:underline text-blue-600">
                                        {item.title}
                                    </Link>
                                </h2>
                                <p className="text-gray-600 text-sm flex-grow line-clamp-3">
                                    {item?.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                )
                : (
                <EmptyData label='No results found' />
            )}
            <Pagination totalPages={totalPages} current={currentPage} setCurrentPage={setCurrentPage} />
        </div>
    );
}

export default Blogs;
