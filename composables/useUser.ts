import { ref } from 'vue';
import { http } from '~/composables/useHttp';

const user = ref(null)
const userLoading = ref(true)
const userLoaded = ref(false)
const aboutPageShowcased = ref(false)

export const useUser = () => {

    async function UpdateUser() {
        const response = await http.post('/users/@me');
        user.value = response.data;
    }

    async function RefreshData() {
        try {
            try {
                await UpdateUser()
            } catch (error) { console.error(error); }
            userLoading.value = false;
            if (user.value) {
                userLoaded.value = true;
            }
        } catch (e) {
            console.error(e)
            userLoading.value = false;
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
        user,
        RefreshData,
        Logout,
        Delete,
        aboutPageShowcased,
    };
};
