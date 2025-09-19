"use client";

import Link from "next/link";
import EmptyData from "@/app/components/ui/EmptyData";
import {use, useCallback, useEffect, useRef, useState} from "react";
import LoginForm from "@/app/login/page";
import AddPost from "@/app/components/AddPost";
import Search from "@/app/components/Search";
import {Post} from "@/types";
import {formatDate} from "@/helpers/formateDate";
import Pagination from "@/app/components/Pagination";
import {getToken} from "@/helpers/fromLocalStorage";

export default function Following() {
    // const { id } = use(params);

    const [token, setToken] = useState(() => getToken());
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [searchValue, setSearchValue] = useState("");
    const isInitialMount = useRef(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch("http://localhost:3002/api/posts/", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                const data = await res.json();
                setPosts(data.items);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {

            }
        };

        fetchPosts();
    }, [token]);

    const fetchPosts = useCallback(async (value: string, page: number) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts?search=${value}&limit=4&page=${page}`);
            if (response.ok) {
                const data = await response.json();
                setPosts(data.items);
                setTotalPages(data.totalPages);
            } else {
                setPosts([]);
            }
        } catch {
            setPosts([]);
        }
    }, [setPosts, setTotalPages]);

    const handleSearch = (value: string) => {
        setSearchValue(value);
        setCurrentPage(1);
    };

    const handleChangePage = (page: number) => {
        setCurrentPage(page);
    };

    useEffect(() => {

        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }
        fetchPosts(searchValue, currentPage);
    }, [searchValue, currentPage, fetchPosts]);

    return (
        !token ? <LoginForm setToken={setToken} />
            : (
                <div className="max-w-5xl mx-auto p-6">
                    <AddPost setPosts={setPosts} setTotalPages={setTotalPages} />
                    <Search handleSearch={handleSearch} />
                    {posts?.length ? (
                            <>
                                <div className="flex flex-col w-200 mx-auto gap-8">
                                    {posts.map((item: Post) => (
                                        <div
                                            key={item.id}
                                            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow flex flex-col"
                                        >
                                            <div className="p-6 flex flex-col flex-grow">
                                                <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                                                    <span>{formatDate(item?.created_at)}</span>
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
                                <Pagination totalPages={totalPages}  current={currentPage} handleChangePage={handleChangePage} />
                            </>
                        )
                        : (
                            <EmptyData label='No results found' />
                        )}
                </div>
            )
    );
}

