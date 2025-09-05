'use client'

import React, { useState, useRef } from 'react';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { postSchema } from "@/validation";
import Button from "@/app/components/ui/Button";
import Modal from "@/app/components/ui/Modal";
import Form from "@/app/components/ui/Form";

function PostActions({ id, postData, setPostData }: {id: string, postData: Record<string, string>, setPostData: (id: string) => void}) {
    const formRef = useRef(null);
    const router = useRouter();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const formItems = {
        author: "",
        title: "",
        description: "",
    }

    const handleEdit = async (updatedData) => {
        try {
            const apiUrl = `https://${process.env.NEXT_PUBLIC_BBC_API_KEY}.mockapi.io/posts/${id}`;

            const response = await fetch(apiUrl, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
            });
            console.log("response", response);
            if (response.ok) {
                console.log("success");
                const res = await fetch(`https://${process.env.NEXT_PUBLIC_BBC_API_KEY}.mockapi.io/posts/${id}`);
                const data = await res.json();
                setPostData(data);
                setIsEditModalOpen(false);
            }
        } catch (error) {
            console.log(error);
            console.log("success")

        }
    }

    const handleDelete = async (id: string) => {
        try {
            const apiUrl = `https://${process.env.NEXT_PUBLIC_BBC_API_KEY}.mockapi.io/posts/${id}`;

            const response = await fetch(apiUrl, {
                method: "DELETE",
            });

            if (response.ok) {
                console.log(`User with ID ${id} deleted successfully.`);
                setIsDeleteModalOpen(false);
                router.push("/");
            } else {
                console.error(`Failed to delete user with ID ${id}. Status: ${response.status}`);
            }
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return (
        <div className='flex justify-between items-center p-6'>
            <Link href={"/"}>
                <Button type='text' label='Go Back'/>
            </Link>
            <div className="flex gap-2">
                <Button type='primary' label='Edit' onClick={() => setIsEditModalOpen(true)} />
                <Button type='primary' label='Delete' onClick={() => setIsDeleteModalOpen(true)} />
            </div>
            <Modal
                isOpen={isDeleteModalOpen}
                onCancel={() => setIsDeleteModalOpen(false)}
                onConfirm={() => handleDelete(id)}
                title="Delete Post"
            >
                <p>Do you really want to delete this post?</p>
            </Modal>
            <Modal
                isOpen={isEditModalOpen}
                onCancel={() => setIsEditModalOpen(false)}
                onConfirm={() => formRef?.current?.submitForm()}
                title="Edit Post"
            >
                <Form
                    ref={formRef}
                    formItems={formItems}
                    onFinish={handleEdit}
                    validationSchema={postSchema}
                    initialValues={postData}
                />
            </Modal>
        </div>
    );
}

export default PostActions;
