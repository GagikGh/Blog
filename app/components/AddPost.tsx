'use client'

import { useRef, useState } from "react";
import { postSchema } from "@/validation";
import { FormRef, Post } from "@/types";
import Button from "@/app/components/ui/Button";
import Modal from "@/app/components/ui/Modal";
import Form from "@/app/components/ui/Form";
import { getToken } from "@/helpers/fromLocalStorage";

function AddPost({ setPosts, setTotalPages }: { setPosts: (posts: Post[]) => void, setTotalPages: (totalPages: number) => void }) {
    const formRef = useRef<FormRef>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const formItems: Record<string, string> = {
        title: "",
        description: "",
    };

    const handleAdd = async (newPost: Post) => {
        const token = getToken();
        try {
            setIsLoading(true);
            const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/posts`;
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },

                body: JSON.stringify(newPost),
            });

            if (response.ok) {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`);
                const data = await res.json();
                setPosts(data.items);
                setTotalPages(data.totalPages);
                setIsAddModalOpen(false);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Blog Posts</h1>
            <Button
                label="Add Post"
                type="primary"
                onClick={() => setIsAddModalOpen(true)}
            />
            <Modal
                isOpen={isAddModalOpen}
                disabled={isLoading}
                onCancel={() => setIsAddModalOpen(false)}
                onConfirm={()=> formRef?.current?.submitForm()}
                title="Add Post"
            >
                <Form
                    ref={formRef}
                    formItems={formItems}
                    onFinish={handleAdd}
                    validationSchema={postSchema}
                />
            </Modal>
        </div>
    );
}

export default AddPost;
