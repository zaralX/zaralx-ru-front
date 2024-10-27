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
                    dark: '#3D2D1E'
                },
                'bg-main': {
                    light: '#ffffff',
                    dark: '#191919'
                },
                'bg-second': {
                    light: '#f3f3f3',
                    dark: '#151515'
                },
                'bg-third': {
                    light: '#e8e8e8',
                    dark: '#111111'
                },
                'border-inside': {
                    light: '#dab76a',
                    dark: '#968060'
                },
                'border-inside-more': {
                    light: '#93857d',
                    dark: '#d5d0a1'
                },

            },
            fontFamily: {
                'montserrat': ['Montserrat', "none"],
                'rubik': ['Rubik', "none"],
                'fira': ['"Fira Code"', "none"],
            },
        },
    },
    darkMode: 'class',
    plugins: [],
}

