'use client'

import React from 'react';
import {formatDate} from "@/helpers/formateDate";
import Link from "next/link";

function Blogs({data}) {
    return (
        <div>
            <div className="flex flex-col w-200 mx-auto  gap-8">
                {data.map((item: any, index: number) => (
                    <div
                        key={index}
                        className="bg-white rounded-2xl  overflow-hidden shadow-md hover:shadow-xl transition-shadow flex flex-col"
                    >
                        <div className="p-6 flex flex-col flex-grow">
                            <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                                <span>{item?.author || "Unknown Author"}</span>
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
        </div>
    );
}

export default Blogs;
