"use client"

import { useState, useRef } from 'react';
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FormRef, Post } from "@/types";
import { postSchema } from "@/validation";
import Form from "@/app/components/ui/Form";
import Button from "@/app/components/ui/Button";
import Modal from "@/app/components/ui/Modal";

function PostActions({ id, postData, setPostData }: { id: string, postData: Post, setPostData: (post: Post) => void }) {
    const formRef = useRef<FormRef>(null);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const formItems = {
        title: "",
        description: "",
    }

    const handleEdit = async (updatedData: Post) => {
        try {
            setIsLoading(true);
            const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`;
            const response = await fetch(apiUrl, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
            });
            if (response.ok) {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`);
                const data = await res.json();
                setPostData(data);
                setIsEditModalOpen(false);
            }
        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    const handleDelete = async (id: string) => {
        try {
            setIsLoading(true);
            const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`;
            const response = await fetch(apiUrl, {
                method: "DELETE",
            });
            if (response.ok) {
                setIsDeleteModalOpen(false);
                router.push("/")
            }
        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-between items-center p-6">
            <Link href={"/"}>
                <Button type="text" label="Go Back" />
            </Link>
            <div className="flex gap-2">
                <Button type="primary" label="Edit" onClick={() => setIsEditModalOpen(true)} />
                <Button type="primary" label="Delete" onClick={() => setIsDeleteModalOpen(true)} />
            </div>
            <Modal
                isOpen={isDeleteModalOpen}
                disabled={isLoading}
                onCancel={() => setIsDeleteModalOpen(false)}
                onConfirm={() => handleDelete(id)}
                title="Delete Post"
            >
                <p>Do you really want to delete this post?</p>
            </Modal>
            <Modal
                isOpen={isEditModalOpen}
                disabled={isLoading}
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
