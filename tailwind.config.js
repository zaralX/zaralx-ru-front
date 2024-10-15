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
                'border-inside': {
                    light: '#968060',
                    dark: '#968060'
                },
                background: {
                    'level-0': {
                        light: '#ffffff',
                        dark: '#060606'
                    },
                    'level-1': {
                        light: '#f5f5f5',
                        dark: '#101010'
                    },
                    'level-2': {
                        light: '#f1f1f1',
                        dark: '#151515'
                    },
                    'level-3': {
                        light: '#ededed',
                        dark: '#191919'
                    }
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

