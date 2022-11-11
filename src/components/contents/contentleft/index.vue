<template>
    <div class="content_left">
        <div class="user_figure"></div>
        <div class="user_access">访问地址 - 访问时间</div>
        <div class="user_access_b">
            <div class="user_ip">{{ userip }}</div>
            -
            <div class="user_accesstime">{{ new Date().toString().split(' ')[4] }}</div>
        </div>
        <div class="select selected">首页</div>
        <div class="select">留言</div>
        <div class="select">社区</div>
        <div class="jump">
            <div class="jump_title">跳转</div>
            <hr>
            <div class="item" v-for="(item, index) in jump_title" :key="index">
                <a :href="'#item' + (index + 1)">{{ item.title }}</a>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref } from 'vue'
const jump_title = [{ title: '推荐' }, { title: '番剧' }, { title: '论坛' }, { title: '排行' }, { title: '漫画' }, { title: '搜索' }]
const userip = ref('')

axios.defaults.baseURL = '/getip'
axios.get('/').then(res => {
    const sohodata = res.data.split('=')[1]
    userip.value = JSON.parse(sohodata.substr(0, sohodata.length - 1)).cip
})

onMounted(() => {
    const item = document.querySelectorAll('.item') as NodeListOf<HTMLButtonElement>
    item.forEach(ele => {
        ele.addEventListener('click', (e) => {
            // TODO: Set animate transition while click the anchor
        })
    })
})
</script>

<style scoped lang="less">
.content_left {
    width: 17%;
    min-width: 178px;
    padding: 30px 0;
    position: fixed;
    z-index: 100;

    .user_figure {
        border-radius: 50%;
        width: 150px;
        height: 150px;
        background-image: url(http://www.cilicili.cc/api/images/tx);
        background-size: cover;
        margin: auto;
    }

    .user_access {
        font-size: 1.2rem;
        display: flex;
        justify-content: space-evenly;
    }

    .user_access_b {
        color: #6d6d6d;
        font-size: 1rem;
        display: flex;
        justify-content: space-evenly;
        text-shadow: white 0 0 5px;
    }

    .select {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        width: 70%;
        border-radius: 15px;
        color: rgb(156, 162, 168);
        text-shadow: white 0 0 6px;
        margin: 20px auto;
        user-select: none;
        cursor: pointer;
        padding: 5px 0;
    }

    .selected {
        background-color: rgba(218, 238, 255, 0.404);
    }

    .jump {
        text-align: end;
        user-select: none;

        .jump_title {
            font-size: 1.5rem;
        }
    }

    .item {
        transition: ease .3s;
        text-shadow: white 0 0 10px;
        display: flex;
        width: fit-content;
        position: relative;
        left: 100%;
        transform: translateX(-100%);

        a {
            text-decoration: none;
            color: black;
        }
    }

    .item:hover {
        font-size: 2rem;
        cursor: pointer;
        transition: ease .3s;
    }
}
</style>