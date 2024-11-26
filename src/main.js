import { createApp } from 'vue'
import './assets/index.css'
import App from './App.vue'
import {router} from "./providers/router/index.js";
import {createPinia} from "pinia";

import 'primeicons/primeicons.css'
import 'devicon/devicon.min.css'

createApp(App)
    .use(router)
    .use(createPinia())
    .mount('#app')
