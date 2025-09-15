"use client"

import { useState } from 'react';
import { formatDate } from "@/helpers/formateDate";
import { PostProps} from "@/types";
import PostActions from "@/app/components/postActions";
import Link from "next/link";

function Post({ data, id }: PostProps) {
    const [postData, setPostData] = useState(data);

    return (
        <div className="relative max-w-3xl mx-auto p-6">
            <PostActions id={id} postData={postData} setPostData={setPostData}/>
            <div className="flex justify-between text-gray-500 text-sm mb-4">
                <span>{postData?.firstname + " " + postData?.lastname}</span>
                <span>{formatDate(postData?.created_at)}</span>
            </div>
            <h1 className="text-3xl font-bold mb-4">{postData?.title}</h1>
            <p className="text-gray-700 mb-4">{postData?.description}</p>
            <div className="flex flex-wrap gap-4 ">
                {postData.tags.map((tag) => (
                    <Link href={`/tags/${tag.id}`} key={tag.id}>
                        <div key={tag.id} style={{ backgroundColor: tag?.color }}
                             className="w-fit px-4 py-1 text-lg rounded-2xl text-white hover:cursor-pointer">
                            <p>{"#" + tag?.name}</p>
                        </div>
                    </Link>

                ))}
            </div>
        </div>
    );
}

export default Post;
