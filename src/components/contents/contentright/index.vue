<template>
    <div class="content_right">
        <div class="banner">
            <div class="yiyan">
                <span>{{ yiyan }}</span>
                <span>--{{ fromwhere }}</span>
            </div>
        </div>
        <div :id='"item" + (index + 1)' v-for="(item, index) in jump_title" :key="index">
            <article class="i_banner">
                <h2>{{ item.title }}</h2>
            </article>
            <template v-if="item.title == '推荐'">
                <Recommend></Recommend>
            </template>
            <template v-else-if="item.title == '番剧'">
                <Anime></Anime>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Recommend from '../../recommend/index.vue'
import Anime from '../../anime/index.vue'

const jump_title = [
    { title: '推荐' },
    { title: '番剧' },
    // { title: '论坛' },
    // { title: '排行' },
    // { title: '漫画' },
    // { title: '搜索' }
]

const yiyan = ref<string>('')
const fromwhere = ref<string>('')
fetch(`http://${import.meta.env.VITE_BACKEND_DOMAIN}:${import.meta.env.VITE_BACKEND_PORT}/api/yiyan/yiyanrandom`).then(res=>res.json()
).then(y=>{
    yiyan.value = y.yiyan
    fromwhere.value = y.fromwhere
})

onMounted(() => {
    const h2 = document.querySelectorAll('h2') as NodeListOf<HTMLHeadingElement>
    h2.forEach(ele => {
        ele.addEventListener('mouseenter', (e) => {
            const h2b = e.target as HTMLElement
            h2b.classList.add("h2after")
        })
        ele.addEventListener('mouseleave', (e) => {
            const h2b = e.target as HTMLElement
            h2b.classList.remove('h2after')
        })
    })
})
</script>

<style scoped lang="less">
.content_right {
    width: 78%;
    min-width: 800px;
    background-color: white;
    border-radius: 20px;
    padding: 20px 0;
    position: relative;
    left: 100%;
    transform: translateX(-100%);

    .banner {
        background-size: cover;
        background-image: url(http://www.cilicili.cc/api/images/bg);
        width: 95%;
        height: 500px;
        margin: 0 auto;
        border-radius: 15px;
        border: 1px solid #eee;
        transition: opacity .4s ease-out;

        .yiyan {
            background-image: linear-gradient(to top, rgba(16, 16, 16, .35) 25%, rgba(16, 16, 16, 0) 100%);
            color: white;
            height: 8%;
            position: relative;
            top: 100%;
            transform: translateY(-100%);
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 0 0 15px 15px;
        }
    }

    .i_banner {
        color: #444;
        font-family: microsoft yahei;
        margin: 25px 20px;

        h2 {
            font-size: 1.2em;
            position: relative;
            padding-bottom: 10px;
            font-weight: 600;
        }

        h2::before {
            content: '';
            width: 75%;
            padding: 0 25px;
            border-bottom: 1px solid #eee;
            position: absolute;
            bottom: -1px;
        }

        h2::after {
            transition: all .35s ease-out;
            content: "";
            position: absolute;
            background: linear-gradient(to bottom right, #82f53c, #3db127);
            width: 1em;
            height: 5px;
            border-radius: 6px;
            box-shadow: 0 2px 12px #3db127;
            bottom: -3px;
            left: 0;
        }

        .h2after::after {
            transition: all .35s ease-out;
            content: "";
            position: absolute;
            background: linear-gradient(to bottom right, #82f53c, #3db127);
            width: 2em;
            height: 5px;
            border-radius: 6px;
            box-shadow: 0 2px 12px #3db127;
            bottom: -3px;
            left: 0;
        }
    }
}
</style>