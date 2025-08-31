import MainPage from '@/pages/MainPage.vue';
import RentPage from '@/pages/RentPage.vue';
import SalePage from '@/pages/SalePage.vue';

import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        component: MainPage
    },
    {
        path: "/rent",
        name: "rent",
        component: RentPage,
        props: { type: "rent" }
    },
    {
        path: "/sale",
        name: "sale",
        component: SalePage,
        props: { type: "sale" }
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router;