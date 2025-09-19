import React from "react";
import Joi from "joi";

export interface ModalProps {
    title: string;
    isOpen: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    disabled: boolean;
    children: React.ReactNode;
}

export interface FormProps {
    formItems: Record<string, string>,
    validationSchema: Joi.Schema,
    onFinish: (updatedData: Record<string, FormDataEntryValue>) => Promise<void>,
}


export interface PostProps {
    id: number
    firstname: string
    lastname: string
    title: string,
    description: string
    created_at: number
    user_id: number
    comments: Comment[]
    tags:  Tag[] | null,
    errors?: string
}

export type FormRef = {
    submitForm: () => void;
};

export interface Tag {
    id: string;
    name: string;
    color: string;
}

export interface Comment {
    id: number;
    firstname: string;
    lastname: string;
    likes: number[]
    text: string;
    user_id: number;
    created_at: number;
}

export interface CommentsProps {
    comments: Comment[];
    setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
    postId: string;
}


