'use client'

import React, { useRef, useState } from 'react';
import Button from "@/app/components/ui/Button";
import Modal from "@/app/components/ui/Modal";
import Form from "@/app/components/ui/Form";
import { postSchema } from "@/validation";

function AddPost({ setPosts }) {
    const formRef = useRef(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const formItems = {
        author: "",
        title: "",
        description: "",
    }

    const handleAdd = async (newPost) => {
        try {
            const apiUrl = `https://${process.env.NEXT_PUBLIC_BBC_API_KEY}.mockapi.io/posts`;

            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newPost),
            });
            console.log("response", response);
            if (response.ok) {
                console.log("success");
                const res = await fetch(`https://${process.env.NEXT_PUBLIC_BBC_API_KEY}.mockapi.io/posts`);
                const data = await res.json();
                setPosts(data);
                setIsAddModalOpen(false);
            }
        } catch (error) {
            console.log(error);
            console.log("success")
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