'use client'

import { createPortal } from "react-dom";
import { ModalProps } from "@/types";
import Button from "./Button";


function Modal({isOpen, title, children, onConfirm, onCancel}: ModalProps) {

    return isOpen && createPortal(
        <div>
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40"></div>

            <div
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                 w-[400px] max-w-[90%] bg-white rounded-2xl shadow-lg
                 p-6 z-50 transition-all duration-500 flex flex-col gap-4"
            >
                <h2 className="text-xl font-bold">{title}</h2>
                {children}
                <div className="flex gap-4 self-end">
                    <Button
                        onClick={onCancel}
                        type="text"
                        label="Cancel"
                    />
                    <Button
                        onClick={onConfirm}
                        type="primary"
                        label={title}
                    />
                </div>
            </div>
        </div>, document.body
    );
}

export default Modal;
