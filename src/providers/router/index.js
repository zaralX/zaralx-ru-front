import {createRouter, createWebHistory} from "vue-router";
import {routes} from "./routes/index.js";

const base_url = import.meta.env.BASE_URL

const router = createRouter({
    history: createWebHistory(base_url),
    routes
})

export { router }