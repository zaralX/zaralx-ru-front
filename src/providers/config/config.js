export const config = import.meta.env.PROD ? {
    api: 'https://api.zaralx.ru/',
    discord_auth: "https://discord.com/oauth2/authorize?client_id=988380114112872469&response_type=code&redirect_uri=https%3A%2F%2Fzaralx.ru%2Fauth%2Fdiscord%2Fend&scope=email+identify",
    avatar_service: "https://img.zaralx.ru/v1/minecraft/user/face/full/"
} : {
    api: 'http://localhost:3000/',
    discord_auth: "https://discord.com/oauth2/authorize?client_id=988380114112872469&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fauth%2Fdiscord%2Fend&scope=email+identify",
    avatar_service: "https://img.zaralx.ru/v1/minecraft/user/face/full/"
}