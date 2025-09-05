/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}", // Your main pages directory
        "./pages/**/*.{js,ts,jsx,tsx,mdx}", // For older Next.js versions
        "./components/**/*.{js,ts,jsx,tsx,mdx}", // **This is the key line to include**
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};