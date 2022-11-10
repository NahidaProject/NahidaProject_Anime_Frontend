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
                    <div class="user_accesstime">{{ `${new Date().getHours()}:${new Date().getMinutes() > 10 ? new
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
                    <div class="item"><a href="#item1">推荐</a></div>
                    <div class="item"><a href="#item2">番剧</a></div>
                    <div class="item"><a href="#item3">论坛</a></div>
                    <div class="item"><a href="#item4">排行</a></div>
                    <div class="item"><a href="#item5">漫画</a></div>
                    <div class="item"><a href="#item6">搜索</a></div>
                </div>
            </div>
            <div class="content_right">
                <div class="banner"></div>
                <article class="i_banner" id="item1">
                    <h2>推荐</h2>
                </article>
                <article class="i_banner" id="item2">
                    <h2>番剧</h2>
                </article>
                <article class="i_banner" id="item3">
                    <h2>论坛</h2>
                </article>
                <article class="i_banner" id="item4">
                    <h2>排行</h2>
                </article>
                <article class="i_banner" id="item5">
                    <h2>漫画</h2>
                </article>
                <article class="i_banner" id="item6">
                    <h2>搜索</h2>
                </article>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue';

const userip = ref('')

axios.defaults.baseURL = '/getip'
axios.get('/').then(res => {
    const sohodata = res.data.split('=')[1]
    userip.value = JSON.parse(sohodata.substr(0, sohodata.length - 1)).cip
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
            }

            .item a {
                text-decoration: none;
                color: black;
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
                margin: 0 20px;
            }

            .i_banner::after {
                position: absolute;
                width: 30px;
                height: 3px;
                background: linear-gradient(to bottom right, #82f53c, #3db127);
                content: '';
            }
        }
    }
}
</style>