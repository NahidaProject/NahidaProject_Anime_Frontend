import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import Index from '../views/index.vue'
import Animes from '../views/animes.vue'
import Forum from '../views/forum.vue'
import SearchResult from '../views/searchResult.vue'
import Login from '../views/login.vue'


const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: Index,
        meta: {
            title: '主站'
        }
    },
    {
        path: '/animes',
        component: Animes,
        meta: {
            title: '番剧'
        }
    },
    {
        path: '/forum',
        component: Forum,
        meta: {
            title: '论坛'
        }
    },
    {
        path: '/login',
        component: Login,
        meta: {
            title: '登录'
        }
    },
    {
        path: '/searchResult',
        component: SearchResult,
        meta: {
            title: '搜索结果'
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