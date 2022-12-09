<template>
    <div class="container">
        <div class="background"></div>
        <div class="content">
            <div class="player">
                <div class="index">
                    <RouterLink to="/"><span>主页</span></RouterLink>
                </div>
                <div class="main">
                    <video width="800" height="500" ref="videoPlayer" class="video-js"></video>
                    <div class="introduce">
                        <div class="a_name">{{ thisanime['AnimeName'] }}</div>
                        <div class="a_lang">语言: {{ thisanime['AnimeLanguage'] }}</div>
                        <div class="a_cv">CV: {{ thisanime['CVName'] }}</div>
                        <div class="a_releace_date">上映日期: {{ thisanime['AnimeReleaseDate'] }}</div>
                        <div class="a_company">出品公司: {{ thisanime['AnimeCompany'] }}</div>
                        <div class="a_desc">背景:<br/> {{ thisanime['AnimeDescription'] }}</div>
                    </div>
                </div>
                <ul class="list">
                    <li v-for="(item, index) in vList" @click="reloadvideo(index + 1)">
                        <RouterLink
                            :to="{ path: '/play', query: { a_id: Route.query.a_id, a_id_num: index + 1 > 9 ? '0' + (index + 1) : '00' + (index + 1) } }">
                            第{{ index + 1 }}集
                        </RouterLink>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import { onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router';
const Route = useRoute()

const videoPlayer = ref()

const myPlayer = ref()

const vList = ref<number>()

const thisanime = ref({
    AnimeName: '',
    AnimeLanguage: '',
    CVName: '',
    AnimeReleaseDate: '',
    AnimeCompany: '',
    AnimeDescription: ''
})

const domain = ref()
const port = ref()

let vdo: HTMLVideoElement

let volumetmp = 0.1

fetch(`http://${import.meta.env.VITE_BACKEND_DOMAIN}:${import.meta.env.VITE_BACKEND_PORT}/api/anime/GetAnimeByID/${parseInt(Route.query.a_id.toString())}`).then(res => res.json()).then(a => {
    thisanime.value = a
    vList.value = a['AnimeEpisode']
})

const reloadvideo = (id: number) => {
    vdo.src = `http://${domain.value}:${port.value}/anime/videos/${Route.query.a_id}/${Route.query.a_id}_${id > 9 ? '0' + id : '00' + id}.mp4`
}

onMounted(() => {
    domain.value = import.meta.env.VITE_BACKEND_DOMAIN
    port.value = import.meta.env.VITE_BACKEND_PORT
    myPlayer.value = videojs(videoPlayer.value, {
        poster: `http://${domain.value}:${port.value}/anime/videos/poster.jpeg`,
        controls: true,
        sources: [
            {
                src: `http://${domain.value}:${port.value}/anime/videos/${Route.query.a_id}/${Route.query.a_id}_${Route.query.a_id_num}.mp4`,
                type: 'video/mp4',
            }
        ],
        controlBar: { remainingTimeDisplay: true },
        playbackRates: [0.5, 1, 1.5, 2]
    }, () => {
        myPlayer.value.log("play.....")
    })
    vdo = document.querySelector('.vjs-tech') as HTMLVideoElement
})

onUnmounted(() => {
    if (myPlayer.value) {
        myPlayer.value.dispose()
    }
})

window.onkeydown = (e) => {
    switch (e.key) {
        case ' ':
            {
                if (vdo.paused) {
                    vdo.play()
                } else {
                    vdo.pause()
                }
            }
            break;
        case "ArrowLeft":
            {
                vdo.currentTime = vdo.currentTime - 5
            }
            break;
        case "ArrowRight":
            {
                vdo.currentTime = vdo.currentTime + 5
            }
            break;
        case "ArrowUp":
            {
                vdo.volume !== 1 ? vdo.volume += volumetmp : 1;
            }
            break;
        case "ArrowDown":
            {
                vdo.volume !== 0 ? vdo.volume -= volumetmp : 1;
            }
            break;
        default:
            break;
    }
}
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
        display: flex;
        justify-content: center;

        .player {
            display: flex;
            flex-wrap: wrap;
            flex-direction: column;
            user-select: none;

            .main {
                display: flex;
                margin: 5% auto;
                border: 20px rgba(134, 134, 134, 0.425) solid;
                border-radius: 20px;

                .video-js {
                    height: 450px;
                }

                .introduce {
                    height: 450px;
                    width: 300px;
                    overflow-y: scroll;
                    background-color: rgba(189, 189, 189, 0.459);
                    line-height: 40px;
                    .a_name{
                        font-weight: 600;
                        font-size: 30px;
                    }
                    .a_cv{
                        line-height: normal;
                    }
                    .a_desc{
                        line-height: normal;
                    }
                }

            }

            .index {
                width: fit-content;
                position: absolute;
                margin-top: 1%;
                padding: 5px 20px;
                border-radius: 10px;
                left: 10%;
                background-color: rgba(139, 139, 139, 0.219);
                cursor: pointer;

                a {
                    text-decoration: none;
                    color: #000;
                }
            }


            .list {
                display: flex;
                justify-content: center;
                flex-wrap: wrap;
                width: 70%;
                margin: 0 auto;

                li {
                    border-radius: 10px;
                    background-color: rgba(182, 182, 182, 0.308);
                    width: 80px;
                    padding: 10px;
                    margin: 5px;
                    height: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;

                    a {
                        color: black;
                        text-decoration: none;
                    }
                }
            }
        }
    }
}
</style>