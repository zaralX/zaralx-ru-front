import {defineStore} from "pinia";
import {ref} from "vue"

const useUser = defineStore('userStore', () => {
    const User = ref(null)
    const UserLoading = ref(true)
    const UserLoaded = ref(false)

    async function UpdateUser() {
        // const response = await http.post('/user');
        // User.value = response.data;
    }

    async function RefreshData() {
        try {
            await UpdateUser()
            UserLoading.value = false;
            if (User) {
                UserLoaded.value = true;
            }
        } catch (e) {
            console.error(e)
            UserLoading.value = false;
        }
    }

    async function Logout() {
        // await http.post(`/user/logout`)
    }

    return {
        RefreshData,
        Logout,
        User,
        UserLoading,
        UserLoaded,
    }
})

export default useUser