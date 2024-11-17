import {defineStore, storeToRefs} from "pinia";
import {ref} from "vue"
import {http} from "../api/auth/index.js";

const useUser = defineStore('userStore', () => {
    const User = ref(null)
    const UserLoading = ref(true)
    const UserLoaded = ref(false)

    async function UpdateUser() {
        const response = await http.post('/users/@me');
        User.value = response.data;
    }

    async function RefreshData() {
        try {
            try {
                await UpdateUser()
            } catch (error) { console.error(error); }
            UserLoading.value = false;
            if (User.value) {
                UserLoaded.value = true;
            }
        } catch (e) {
            console.error(e)
            UserLoading.value = false;
        }
    }

    async function Logout() {
        await http.post(`/users/@me/logout`).then(() => {
            window.location.href = '/'
        })
    }

    async function Delete() {
        await http.post(`/users/@me/delete`).then(() => {
            window.location.href = '/'
        })
    }

    return {
        RefreshData,
        Logout,
        Delete,
        User,
        UserLoading,
        UserLoaded,
    }
})

export default useUser