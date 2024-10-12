import { createApp } from 'vue'
import './assets/index.css'
import App from './App.vue'
import {router} from "./providers/router/index.js";
import {createPinia} from "pinia";

createApp(App)
    .use(router)
    .use(createPinia())
    .mount('#app')
