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
    initialValues?: Post,
}

export interface Post {
    author: string;
    title: string;
    content: string;
    createdAt: number,
    description: string;
    id: string;
    image: string;
    url: string;
}

export type PostProps = {
    data: Post;
    id: string;
};

export type FormRef = {
    submitForm: () => void;
};
