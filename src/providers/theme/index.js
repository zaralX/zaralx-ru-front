
export function toggleDark() {
    const current = localStorage.getItem("theme");
    if (current == null) {
        localStorage.setItem("theme", 'dark')
    } else {
        localStorage.setItem("theme", isDark() ? 'light' : 'dark')
    }

    if (isDark()) {
        document.documentElement.classList.add('dark')
        document.documentElement.classList.remove('light')
    } else {
        document.documentElement.classList.remove('dark')
        document.documentElement.classList.add('light')
    }

    return isDark();
}

export function isDark() {
    return localStorage.getItem("theme") === 'dark';
}

export function initDark() {
    const current = localStorage.getItem("theme");
    if (current == null) {
        localStorage.setItem("theme", 'dark')
    }
    if (isDark()) {
        document.documentElement.classList.add('dark')
        document.documentElement.classList.remove('light')
    } else {
        document.documentElement.classList.remove('dark')
        document.documentElement.classList.add('light')
    }
}