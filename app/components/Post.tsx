"use client"

import {useEffect, useState} from 'react';
import { formatDate } from "@/helpers/formateDate";
import { PostProps, Tag } from "@/types";
import PostActions from "@/app/components/postActions";
import Link from "next/link";

import Comments from "@/app/components/Comments";
import AddComment from "@/app/components/AddComment";
import Button from "@/app/components/ui/Button";
import {getToken} from "@/helpers/fromLocalStorage";

function Post({ data, id } : PostProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [postData, setPostData] = useState(data);
    const [comments, setComments] = useState(data?.comments);
    const [isUserFollow, setIsUserFollow] = useState(false);



    const toggleFollowing = async (commentId: number) => {
        const token = getToken();
        if (!token) return;

        setIsLoading(true);


        try {
            const apiUrl = `http://localhost:4000/posts/${id}/follows`;
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.followed)
                setIsUserFollow(data.followed)


            }
        } catch (error) {
            console.error("Error toggling like:", error);
        } finally {
            setIsLoading(null);
        }
    };

    return (
        <div className="relative max-w-3xl mx-auto p-6">
            <PostActions id={id} postData={postData} setPostData={setPostData} />
            <div className="flex justify-between text-gray-500 text-sm mb-4">
                <span>
                    {postData?.firstname + " " + postData?.lastname + " "}
                    <Button type="link" label={isUserFollow ? "Unfollow" : "Follow"} onClick={toggleFollowing} />
                </span>
                <span>{formatDate(postData?.created_at)}</span>
            </div>
            <h1 className="text-3xl font-bold mb-4">{postData?.title}</h1>
            <p className="text-gray-700 mb-4">{postData?.description}</p>
            <div className="flex flex-wrap gap-4 ">
                {postData?.tags?.map((tag: Tag) => (
                    <Link href={`/tags/${tag.id}`} key={tag.id}>
                        <div key={tag.id} style={{backgroundColor: tag?.color}}
                             className="w-fit px-4 py-1 text-lg rounded-2xl text-white hover:cursor-pointer">
                            <p>{"#" + tag?.name}</p>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
                <AddComment postId={id} setComments={setComments} />
                <Comments postId={id} comments={comments} setComments={setComments} />
            </div>
        </div>
    );
}

export default Post;
