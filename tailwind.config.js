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
                    light: '#3D2D1E',
                    dark: '#3D2D1E'
                },
                'bg-main': {
                    light: '#191919',
                    dark: '#191919'
                },
                'bg-second': {
                    light: '#151515',
                    dark: '#151515'
                },
                'bg-third': {
                    light: '#111111',
                    dark: '#111111'
                },
                'border-inside': {
                    light: '#968060',
                    dark: '#968060'
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

