"use client"

import React from 'react';
import { useRouter } from "next/navigation";
import { formatDate } from "@/helpers/formateDate";
import Button from "@/app/components/ui/Button";

function PostsByTag({ postsByTag }) {
    const router = useRouter();

    if (!postsByTag || postsByTag.length === 0) {
        return (
            <div className="text-center text-gray-500 py-10">
                <p>No posts found for this tag</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
                <Button type="text" label="Go Back" onClick={() => router.back()} />
            <div
                style={{ background: postsByTag.tag.color }}
                className="px-6 py-3 mt-4 rounded-2xl text-2xl font-bold text-white shadow-md text-center"
            >
                <p>{postsByTag.tag.name}</p>
            </div>

            <div className="space-y-6">
                {postsByTag.posts.map((post) => (
                    <div
                        key={post.id}
                        className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
                    >
                        <div className="flex justify-between items-center text-gray-500 text-sm mb-4">
                            <span className="font-medium">
                                {post?.first_name + " " + post?.last_name}
                            </span>
                            <span>{formatDate(post?.created_at)}</span>
                        </div>

                        <h1 className="text-2xl font-semibold mb-3 text-gray-900">
                            {post?.title}
                        </h1>

                        <p className="text-gray-700 leading-relaxed">
                            {post?.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PostsByTag;
