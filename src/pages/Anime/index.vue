<template>
    <div class="container">
        <div class="background"></div>
        <div class="content">
            <div class="content_left">
                <div class="user_figure"></div>
                <div class="user_access">访问地址 - 访问时间</div>
                <div class="user_access_b">
                    <div class="user_ip">{{ userip }}</div>
                    -
                    <div class="user_accesstime">{{ `${new Date().getHours() > 10 ? new Date().getHours() : '0' + new
                            Date().getHours()}:${new Date().getMinutes() > 10 ? new
                                Date().getMinutes() : '0' + new Date().getMinutes()}:${new Date().getSeconds() > 10 ? new
                                    Date().getSeconds() : '0' + new Date().getSeconds()}`
                    }}</div>
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
            <div class="content_right">
                <div class="banner"></div>
                <div :id='"item" + (index + 1)' v-for="(item, index) in jump_title" :key="index">
                    <article class="i_banner">
                        <h2>{{ item.title }}</h2>
                    </article>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref } from 'vue';

const userip = ref('')

const jump_title = [{ title: '推荐' }, { title: '番剧' }, { title: '论坛' }, { title: '排行' }, { title: '漫画' }, { title: '搜索' }]

axios.defaults.baseURL = '/getip'
axios.get('/').then(res => {
    const sohodata = res.data.split('=')[1]
    userip.value = JSON.parse(sohodata.substr(0, sohodata.length - 1)).cip
})

onMounted(() => {
    const h2 = document.querySelectorAll('h2') as NodeListOf<HTMLHeadingElement>
    const item = document.querySelectorAll('.item') as NodeListOf<HTMLButtonElement>
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
    item.forEach(ele => {
        ele.addEventListener('click', (e) => {
            // TODO: Set animate transition while click the anchor
        })
    })
})


</script>

<style scoped lang="less">
.container {
    font-family: "Segoe UI", "Lucida Grande", Helvetica, Arial, "Microsoft YaHei", FreeSans, Arimo, "Droid Sans", "wenquanyi micro hei", "Hiragino Sans GB", "Hiragino Sans GB W3", FontAwesome, sans-serif;
    line-height: 1.6;

    .background {
        position: fixed;
        left: 0;
        right: 0;
        background-image: url(http://www.cilicili.cc/api/images/bg);
        background-size: cover;
        filter: blur(15px);
        opacity: .2;
        z-index: -10;
        width: 100vw;
        height: 100vh;
    }

    .content {
        justify-content: space-between;
        width: 80vw;
        margin: 10px auto;
        min-width: 1024px;

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

        .content_right {
            height: 4000px;
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
    }
}
</style>