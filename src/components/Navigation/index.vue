<template>
    <Modal :title="modalTitle" :message="modalMessage" ref="nModal" />
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
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item" v-for="item in pagesList">
                            <router-link class="router-link" :to="item.page">
                                <a :class="currentPage.page == item.page ? 'nav-link active' : 'nav-link'"
                                    aria-current="page">{{ item.title }}</a>
                            </router-link>
                        </li>
                    </ul>
                    <div class="me-auto d-flex">
                        <input class="form-control me-2" placeholder="你想找什么视频..." v-model="searchValue">
                        <button class="btn btn-outline-primary" @click="search">Q</button>
                    </div>
                    <ul class="navbar-nav mb-2 mb-lg-0">
                        <li class="nav-item">
                            <router-link class="router-link" to="login">
                                <a class="nav-link" aria-current="page">登录</a>
                            </router-link>
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
import { useRouter } from 'vue-router';
import Modal from '../Modal/index.vue'

const router = useRouter()

const searchValue = ref('')

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

// 模态框
const modalTitle = ref('')
const modalMessage = ref('')
const nModal = ref<InstanceType<typeof Modal>>()

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
        router.push({
            path: '/searchResult',
            query: {
                'keyword': searchValue.value
            }
        })
    } else {
        modalTitle.value = '(lll￢ω￢)'
        modalMessage.value = '阁下认真的吗?'
        nModal.value?.showModal()
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
    background-color: rgba(113, 159, 228, 0.673);
    color: white !important;
}
</style>