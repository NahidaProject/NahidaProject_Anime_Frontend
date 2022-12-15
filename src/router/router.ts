import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import Index from '../views/index.vue'
import Animes from '../views/animes.vue'
import Forum from '../views/forum.vue'
import SearchResult from '../views/searchResult.vue'
import Login from '../views/login.vue'
import Forgot from '../views/forgot.vue'
import Register from '../views/register.vue'
import AnimePlayer from '../views/animePlayer.vue'

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
    // {
    //     path: '/forum',
    //     component: Forum,
    //     meta: {
    //         title: '论坛'
    //     }
    // },
    {
        path: '/login',
        component: Login,
        meta: {
            title: '登录'
        }
    },
    {
        path: '/forgot',
        component: Forgot,
        meta: {
            title: '忘记密码'
        }
    },
    {
        path: '/register',
        component: Register,
        meta: {
            title: '立即注册'
        }
    },
    {
        path: '/searchResult',
        component: SearchResult,
        meta: {
            title: '搜索结果'
        }
    },
    {
        path: '/animePlayer',
        component: AnimePlayer,
        meta: {
            title: '播放器'
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