"use client";

import React from "react";
import Button from "@/app/components/ui/Button";
import { getToken } from "@/helpers/fromLocalStorage";

function AddComment({ postId, setComments }) {
    const [isLoading, setIsLoading] = React.useState(false);
    const [text, setText] = React.useState("");

    const handleAdd = async () => {
        const token = getToken();
        try {
            setIsLoading(true);
            const apiUrl = `http://localhost:4000/posts/${postId}/comments`;
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ text }),
            });

            if (response.ok) {
                // await response.json();
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}/comments`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                });
                const data = await res.json();
                setComments(data);
                setText("");
            }
        } catch (error) {
            console.error("Error adding comment:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Add Comment</h2>
            <div className="flex flex-col gap-4">
                <textarea
                    placeholder="Write your comment..."
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    rows="3"
                    value={text}
                    onChange={(e) => setText(e.target.value)} // ✅ controlled
                />
                <Button
                    label="Add"
                    disabled={isLoading || !text.trim()}
                    onClick={handleAdd}
                />
            </div>
        </div>
    );
}

export default AddComment;
