import {config} from "../../config/config.js";

export function getAvatarLink(nickname) {
    if (nickname == null) {
        return config.avatar_service + "alex";
    }
    return config.avatar_service + nickname;
}