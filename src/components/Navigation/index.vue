<template>
    <Modal />
    <transition appear @before-enter="beforeEnter" @enter="enter">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Nahida Anime</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0 mt-2">
                        <li class="nav-item" v-for="item in pagesList">
                            <router-link class="router-link" :to="item.page">
                                <a :class="currentPage.page == item.page ? 'nav-link active' : 'nav-link'"
                                    aria-current="page">{{ item.title }}</a>
                            </router-link>
                        </li>
                    </ul>
                    <div class="me-auto d-flex" v-if="currentPage.page == 'animes'">
                        <input class="form-control me-2" placeholder="你想找什么视频..." v-model="searchValue">
                        <button class="btn btn-outline-primary" @click="search">Q</button>
                    </div>
                    <ul class="navbar-nav mb-2 mb-lg-0">
                        <li class="nav-item">
                            <router-link class="router-link" to="login" v-if="UserName == ''">
                                <a class="nav-link" aria-current="page">登录</a>
                            </router-link>
                            <div v-else class="d-flex align-items-center justify-content-between">
                                <a class="nav-link" aria-current="page">{{ UserName }}</a>
                                <a class="nav-link" style="cursor: pointer;" @click="cleanCookies">退出登录</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </transition>
</template>

<script setup lang="ts">
import gsap from 'gsap'
import { ref } from 'vue';
import Modal from '../Modal/index.vue'
import Bus from '../../Bus'

const searchValue = ref('')

const UserName = ref('')

if (document.cookie.split('=').length == 2) {
    UserName.value = document.cookie.split('=')[1]
}

const currentPage = defineProps({
    page: {
        type: String
    }
})

const pagesList = [
    {
        title: '主站',
        page: '/'
    },
    {
        title: '番剧',
        page: 'animes'
    },
    {
        title: '论坛',
        page: 'forum'
    }
]

const beforeEnter = (element: HTMLElement) => {
    element.style.opacity = '0'
    element.style.transform = 'translateY(-100px)'
}

const enter = (element: HTMLElement) => {
    gsap.to(element, {
        duration: 1,
        y: 0,
        opacity: 1,
    })
}

const search = () => {
    if (searchValue.value) {
        Bus.emit('SearchAnime', searchValue.value)
    } else {
        Bus.emit('showmessage', {
            title: '(lll￢ω￢)',
            message: '阁下认真的吗?'
        })
    }
}

const cleanCookies = () => {
    if (document.cookie.match(/[^ =;]+(?=\=)/g)) {
        document.cookie.match(/[^ =;]+(?=\=)/g)!.forEach((el, index) => {
            document.cookie = document.cookie.match(/[^ =;]+(?=\=)/g)![index] + "=0; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/"
            window.location.reload()
        })
    }
}
</script>

<style scoped>
.navbar {
    border-radius: 10px;
    border: 1px solid rgba(204, 235, 255, 0.148);
}

.active[aria-current="page"] {
    clip-path: polygon(0 20%, 100% 20%, 100% 75%, 50% 100%, 0 75%);
    background-color: #dc3545;
    color: white !important;
}

@media all and (width <=990px) {
    .active[aria-current="page"] {
        clip-path: polygon(0 0, 95% 0, 100% 50%, 95% 100%, 0% 100%);
    }
}
</style>