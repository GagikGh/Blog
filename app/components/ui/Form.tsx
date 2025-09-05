"use client";

import React, {
    forwardRef,
    useImperativeHandle,
    useRef,
    useState,
    ForwardedRef,
} from "react";

import Joi, { ValidationErrorItem } from "joi";

export type FormRef = {
    submitForm: () => void;
};

export type FormProps<T> = {
    formItems: Record<string, string>;
    validationSchema: Joi.Schema;
    onFinish: (data: T) => void | Promise<void>;
    initialValues?: Partial<T>;
};

const Form = forwardRef(<T,>(
    {
        formItems,
        validationSchema,
        onFinish,
        initialValues,
    }: FormProps<T>,
    ref: ForwardedRef<FormRef>
) => {
    const formRef = useRef<HTMLFormElement>(null);

    // Errors: record<string, string|null>
    const getErrorsObject = (): Record<string, string | null> => {
        return Object.keys(formItems).reduce<Record<string, string | null>>(
            (acc, key) => {
                acc[key] = null;
                return acc;
            },
            {}
        );
    };

    const [errors, setErrors] = useState<Record<string, string | null>>(
        getErrorsObject()
    );

    const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            onSubmit();
        }
    };

    const onSubmit = () => {
        if (!formRef.current) return;

        const formData = new FormData(formRef.current);

        // Convert FormData to generic object T
        const dataObject = Object.fromEntries(formData.entries()) as unknown as T;

        const valid = handleValidate(dataObject);

        if (valid) {
            onFinish(dataObject);
        }
    };

    const handleValidate = (formData: T): boolean => {
        const { error } = validationSchema.validate(formData, {
            abortEarly: false,
        });

        if (!error) {
            setErrors(getErrorsObject());
            return true;
        }

        const newErrors: Record<string, string | null> = getErrorsObject();

        error.details.forEach((err: ValidationErrorItem) => {
            const key = err.path[0] as string;
            newErrors[key] = err.message;
        });

        setErrors(newErrors);
        return false;
    };

    useImperativeHandle(ref, () => ({
        submitForm: onSubmit,
    }));

    return (
        <form
            ref={formRef}
            className="flex flex-col mx-auto gap-5 items-start w-full"
            onKeyDown={handleKeyDown}
        >
            {Object.keys(formItems).map((formItem) => (
                <div key={formItem} className="w-full">
                    <label className="flex flex-col gap-2 w-full font-medium">
                        {formItem.charAt(0).toUpperCase() + formItem.slice(1)}:
                        <input
                            type="text"
                            name={formItem}
                            defaultValue={
                                initialValues &&
                                typeof initialValues === "object" &&
                                !Array.isArray(initialValues)
                                    ? (initialValues as Record<string, string>)[formItem] ?? ""
                                    : ""
                            }
                            className={`border rounded-lg px-3 py-2 outline-none transition-colors w-full ${
                                errors[formItem]
                                    ? "border-red-500 focus:ring-red-300"
                                    : "border-gray-200 focus:border-blue-500 focus:ring-blue-300"
                            }`}
                        />
                    </label>
                    {errors[formItem] && (
                        <span className="text-sm text-red-500 mt-1">{errors[formItem]}</span>
                    )}
                </div>
            ))}
        </form>
    );
});

Form.displayName = "Form";

export default Form;
