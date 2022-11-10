import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import Anime from '../pages/Anime/index.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: () => Anime,
        meta: {
            title: '欢迎来到Nahida Anime'
        }
    }
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title as string
    }
    next()
})

export default router