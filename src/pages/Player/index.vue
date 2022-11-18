<template>
    <div class="container">
        <div class="background"></div>
        <div class="content">
            <div class="player">
                <div class="index">
                    <RouterLink to="/"><span>主页</span></RouterLink>
                </div>
                <video width="800" height="500" ref="videoPlayer" class="video-js"></video>
                <ul class="list">
                    <li v-for="(item, index) in vList" @click="reloadvideo(index + 1)">
                        <RouterLink
                            :to="{ path: '/play', query: { a_id: Route.query.a_id, a_id_num: index + 1 > 10 ? '0' + (index + 1) : '00' + (index + 1) } }">
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

let vdo: HTMLVideoElement

fetch(`http://localhost:1314/api/getAnimeById/${Route.query.a_id}`).then(res => res.json()).then(a => {
    vList.value = a['a_set']
})

const reloadvideo = (id: number) => {
    vdo.src = `http://localhost:1314/anime/videos/${Route.query.a_id}/${Route.query.a_id}_${id > 10 ? '0' + id : '00' + id}.mp4`
}

onMounted(() => {
    myPlayer.value = videojs(videoPlayer.value, {
        poster: "http://localhost:1314/anime/videos/poster.jpeg",
        controls: true,
        sources: [
            {
                src: `http://localhost:1314/anime/videos/${Route.query.a_id}/${Route.query.a_id}_${Route.query.a_id_num}.mp4`,
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
                console.log('上');
            }
            break;
        case "ArrowDown":
            {
                console.log('下');
            }
            break;
        default: ; break;
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

            .video-js {
                height: 450px;
                margin: 5%;
                margin: 5% auto;
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