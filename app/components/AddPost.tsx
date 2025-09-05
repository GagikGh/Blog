'use client'

import { useRef, useState } from 'react';
import { postSchema } from "@/validation";
import { Post } from "@/types";
import Button from "@/app/components/ui/Button";
import Modal from "@/app/components/ui/Modal";
import Form, { FormRef } from "@/app/components/ui/Form";

function AddPost({ setPosts }: { setPosts: (posts: Post[]) => void }){
    const formRef = useRef<FormRef>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const formItems: Record<string, string> = {
        author: "",
        title: "",
        description: "",
    }

    const handleAdd = async (newPost: Post) => {
        try {
            const apiUrl = `https://${process.env.NEXT_PUBLIC_BBC_API_KEY}.mockapi.io/posts`;
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newPost),
            });
            if (response.ok) {
                const res = await fetch(`https://${process.env.NEXT_PUBLIC_BBC_API_KEY}.mockapi.io/posts`);
                const data = await res.json();
                setPosts(data);
                setIsAddModalOpen(false);
            }
        } catch (error) {
            console.log(error);
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
