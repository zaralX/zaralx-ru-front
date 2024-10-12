/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx,vue}",
    ],
    theme: {
        extend: {
            colors: {
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
            }
        },
    },
    darkMode: 'class',
    plugins: [],
}

