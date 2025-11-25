export default defineEventHandler(async () => {
    const response = await fetch(
        "https://api.github.com/repos/zaralX/zaralx-ru-front/commits/main",
        {
            headers: {
                "User-Agent": "zaralx-ru-app",
                "Accept": "application/vnd.github.v3+json"
            }
        }
    );

    if (!response.ok) {
        return { date: null };
    }

    const json = await response.json();

    if (!json.commit?.committer?.date) {
        return { date: null }
    }

    const reformatted = new Date(json.commit?.committer?.date).toLocaleString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false }).replace(',', ' года в');

    return {
        date: reformatted
    };
});
