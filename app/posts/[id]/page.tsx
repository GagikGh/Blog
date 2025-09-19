"use client";

import React, {use, useEffect, useState} from "react";
import Post from "@/app/components/Post";
import { getToken } from "@/helpers/fromLocalStorage";
import { PostProps } from "@/types"

export default function PostPage({ params }: { params: { id: string } }) {
    const { id } = use(params);
    const [data, setData] = useState<PostProps | { error: string } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const token = getToken();
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    setData({ error: "Article not found" });
                } else {
                    const json = await res.json();
                    setData(json);
                }
            } catch (err) {
                setData({ error: "Something went wrong " + err });
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (data?.error) return <p className="text-center mt-10">{data.error}</p>;

    return <Post data={data} id={id} />;
}
