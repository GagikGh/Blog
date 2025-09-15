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
    title: string;
    created_at: number,
    description: string;
    id: string;
}

export interface Posts {
    total: number;
    totalPages: number;
    items: Post[];
}

export type PostProps = {
    data: Post;
    id: string;
};

export type FormRef = {
    submitForm: () => void;
};
