const sizeStyles = {
    large: "w-16 h-16 border-4",
    middle: "w-12 h-12 border-4",
    small: "w-4 h-4 border-2",
}

interface LoadingSpinnerProps {
    size?: keyof typeof sizeStyles;
    indicator?: "spinner" | "dots";
}

function LoadingSpinner({ size = "middle", indicator = "dots" }: LoadingSpinnerProps) {
    return (

            indicator === "spinner" ? (
                <div
                    className={`w-4 h-4 border-gray-300 border-t-white rounded-full animate-spin ${sizeStyles[size]}`}
                ></div>
            ) : (
                <div className="flex gap-2">
                    <span className={`block bg-blue-500 rounded-full ${size === "large" ? "w-4 h-4" : size === "middle" ? "w-3 h-3" : "w-2 h-2"} animate-bounce delay-0`}></span>
                    <span className={`block bg-blue-500 rounded-full ${size === "large" ? "w-4 h-4" : size === "middle" ? "w-3 h-3" : "w-2 h-2"} animate-bounce delay-200`}></span>
                    <span className={`block bg-blue-500 rounded-full ${size === "large" ? "w-4 h-4" : size === "middle" ? "w-3 h-3" : "w-2 h-2"} animate-bounce delay-400`}></span>
                </div>
            )

    );
}

export default LoadingSpinner;
