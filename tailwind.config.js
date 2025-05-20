import animDelay from 'tailwindcss-animation-delay'

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx,vue}",
    ],
    theme: {
        extend: {
            colors: {
                'border-main': {
                    light: '#8d683f',
                },
                'bg-main': {
                    light: '#ffffff',
                },
                'bg-second': {
                    light: '#f3f3f3',
                },
                'bg-third': {
                    light: '#e8e8e8',
                },
                'border-inside': {
                    light: '#dab76a',
                },
                'border-inside-more': {
                    light: '#93857d',
                },

            },
            animation: {
                "clip-fluid": "clip-fluid 4s ease-in-out infinite"
            }
        },
    },
    darkMode: 'class',
    plugins: [
        animDelay,
    ],
}

