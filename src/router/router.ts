import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import Anime from '../pages/Anime/index.vue'
import Player from '../pages/Player/index.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: Anime,
        meta: {
            title: '欢迎来到Nahida Anime'
        }
    },
    {
        path: '/play',
        component: Player,
        meta:{
            title: '放映室'
        }
    }
]

const router = createRouter({
    routes,
    history: createWebHashHistory()
})

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title as string
    }
    next()
})

export default router