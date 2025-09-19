"use client";

import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { formatDate } from "@/helpers/formateDate";
import { getToken, getUserId } from "@/helpers/fromLocalStorage";
import { CommentsProps } from "@/types";
import LoadingSpinner from "@/app/components/ui/LoadingSpinner";

function Comments({ postId, comments, setComments }: CommentsProps) {
    const [isLoading, setIsLoading] = useState<number | null>(null);
    const userId = getUserId();

    const toggleLike = async (commentId: number) => {
        const token = getToken();
        if (!token) return;

        setIsLoading(commentId);

        try {
            const apiUrl = `http://localhost:4000/posts/${postId}/comments/${commentId}/likes`;
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();

                setComments(prevComments =>
                    prevComments.map(comment => {
                        if (comment.id === commentId) {
                            if (data.unliked) {
                                return {
                                    ...comment,
                                    likes: comment.likes.filter(id => id !== userId),
                                };
                            } else if (data.liked) {
                                return {
                                    ...comment,
                                    likes: [...comment.likes, userId],
                                };
                            }
                        }
                        return comment;
                    })
                );
            }
        } catch (error) {
            console.error("Error toggling like:", error);
        } finally {
            setIsLoading(null);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Comments</h2>
            <div className="space-y-4">
                {comments.map((comment) => (
                    <div key={comment.id} className="p-4 flex justify-between items-center bg-gray-100 rounded-lg">
                        <div>
                            <p className="text-gray-800">
                                <span className="font-semibold">{comment.firstname}</span> {comment.text}
                            </p>
                            <span className="text-sm text-gray-500">{formatDate(comment.created_at)}</span>
                        </div>

                        <button
                            className="bg-red-100 p-2 rounded flex items-center gap-1"
                            onClick={() => toggleLike(comment.id)}
                            disabled={isLoading === comment.id}
                        >
                            {isLoading === comment.id ? (
                                <LoadingSpinner size="small" indicator="spinner" />
                            ) : (
                                <>
                                    <FontAwesomeIcon
                                        icon={faHeart}
                                        className={comment.likes.includes(userId) ? "text-red-400" : "text-gray-300"}
                                    />
                                    <span className="text-sm text-gray-500">{comment.likes.length}</span>
                                </>
                            )}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Comments;
