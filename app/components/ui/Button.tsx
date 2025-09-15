'use client'

interface typeStyles {
    default: string,
    primary: string,
    dashed: string,
    link: string,
    text: string,
}

interface sizeStyles {
    large: string,
    middle: string,
    small: string,
}

const typeStyles: typeStyles = {
    default: "border border-gray-300 rounded-md text-black hover:cursor-pointer hover:border-blue-500 hover:text-blue-500 transition duration-300",
    primary: "bg-blue-500  rounded-md hover:cursor-pointer hover:opacity-80 text-white transition duration-300",
    dashed: "border border-dashed border-gray-300 rounded-md text-black hover:cursor-pointer hover:border-blue-500 hover:text-blue-500 transition duration-300",
    link: "text-blue-500 hover:cursor-pointer hover:opacity-70 transition duration-300",
    text: "text-black rounded-md hover:bg-gray-200 hover:cursor-pointer transition duration-300"
}

const sizeStyles: sizeStyles = {
    large: "px-4 py-3 text-xl",
    middle: "px-3 py-2 text-lg",
    small: "px-2 py-1 text-md",
}

interface ButtonProps {
    type?: keyof typeof typeStyles;
    size?: keyof typeof sizeStyles;
    label?: string | React.ReactNode;
    color?: string,
    disabled?: boolean,
    onClick?: () => void;
}

function Button({ type = "default", size = "middle", label = "Custom Button", disabled, onClick }: ButtonProps) {
    return (
        <button
            className={`w-fit ${typeStyles[type]} ${sizeStyles[size]}`}
            onClick={onClick}
            disabled={disabled}
        >
            {label}
        </button>
    );
}

export default Button;
