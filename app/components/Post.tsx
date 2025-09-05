'use client'

import React from 'react';
import PostActions from "@/app/components/postActions";
import {formatDate} from "@/helpers/formateDate";

function Post({ data, id }) {
    const [postData, setPostData] = React.useState(data);
    console.log(data, postData);
    return (
        <div className="relative max-w-3xl mx-auto p-6 ">
            <PostActions id={id} setPostData={setPostData}/>
            <div className="flex justify-between text-gray-500 text-sm mb-4">
                <span>{postData?.author || "Unknown Author"}</span>
                <span>{formatDate(postData?.createdAt)}</span>
            </div>

            <h1 className="text-3xl font-bold mb-4">{postData?.title}</h1>
            {/*{data.image && (*/}
            {/*    <Image*/}
            {/*        src={data.image}*/}
            {/*        alt={data.title}*/}
            {/*        width={800}*/}
            {/*        height={800}*/}
            {/*        className="w-full h-64 object-cover mb-4 rounded-xl"*/}
            {/*    />*/}
            {/*)}*/}
            <p className="text-gray-700 mb-4">{postData?.description}</p>
            <p className="text-gray-700 mb-4">
                {postData?.content?.slice(0, postData?.content?.indexOf("["))}
                <a
                    href={postData?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                >
                    Read full article
                </a>
            </p>
        </div>
    );
}

export default Post;