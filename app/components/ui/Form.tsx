'use client'

import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import type { ValidationErrorItem } from "joi";

const Form = forwardRef(({ formItems, validationSchema, onFinish, initialValues }, ref) =>{
    const formRef = useRef<HTMLFormElement>(null);

    const getErrorsObject = (): Record<string, boolean> => {
        return Object.keys(formItems).reduce<Record<string, boolean>>((acc, key) => {
            acc[key] = false;
            return acc;
        }, {});
    };

    const [errors, setErrors] = useState(getErrorsObject());

    const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            onSubmit();
        }
    };

    const onSubmit = () => {
        const formData = new FormData(formRef?.current || undefined);

        const dataObject: Record<string, FormDataEntryValue> = {};
        for (const [key, value] of formData.entries()) {
            dataObject[key] = value;
        }

        const valid = handleValidate(dataObject);

        if (valid) {
            onFinish(dataObject);
        }
    };

    const handleValidate = (formData: Record<string, FormDataEntryValue>): boolean => {
        const { error } = validationSchema.validate(formData, { abortEarly: false });

        if (!error) {
            setErrors({});
            return true;
        }

        const newErrors = {};

        error.details.forEach((err: ValidationErrorItem) => {
            const key = err.path[0] as string;
            newErrors[key] = err.message;
        });

        setErrors(newErrors);
        return false;
    };

    useImperativeHandle(ref, ()=> ({
        submitForm: onSubmit,
    }))

    return (
        <form ref={formRef} className="flex flex-col mx-auto gap-5 items-start w-full" onKeyDown={handleKeyDown}>
            {Object.keys(formItems).map((formItem) => (
                <div key={formItem} className="w-full">
                    <label className="flex flex-col gap-2 w-full font-medium">
                        {formItem.charAt(0).toUpperCase() + formItem.slice(1)}:
                        <input
                            type="text"
                            name={formItem}
                            defaultValue={ initialValues && typeof initialValues === "object" && !Array.isArray(initialValues)
                                ? (initialValues as Record<string, string>)[formItem] ?? ""
                                : ""
                            }

                            className={`border rounded-lg px-3 py-2 outline-none transition-colors w-full ${
                                errors[formItem] ? "border-red-500 focus:ring-red-300" : "border-gray-200 focus:border-blue-500 focus:ring-blue-300"
                            }`}
                        />
                    </label>
                    {errors[formItem] && (
                        <span className="text-sm text-red-500 mt-1">{errors[formItem]}</span>
                    )}
                    <button type="submit"/>
                </div>
            ))}
        </form>
    );
})

export default Form;

