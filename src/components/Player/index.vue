<template>
    <div class="card-img p-5" :style="{ '--backgroundImage': backgroundImg }">
        <div class="vdo">
            <video id="myVideo" class="h-100 container video-js vjs-big-play-centered" autoplay="true"
                preload="auto"></video>
        </div>
        <div class="episode my-2">
            <h4 class="widget-title">剧集列表</h4>
            <div class="list">
                <span v-for="index in nowplayeranime" @click="newepisode(parseInt(index), vPlayer)">
                    第{{ index }}集
                </span>
            </div>
        </div>
        <div class="commentarea">
            <textarea class="form-control" style="height: 100px;background-color: rgba(255, 255, 255, .9);"
                placeholder="发一条有趣的评论..." v-model="comment"></textarea>
            <button @click="SendComment()" type="button" class="btn my-2 btn-danger">发送</button>
        </div>
    </div>
    <Comments :animeid="aid"></Comments>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import 'video.js/dist/video-js.css'
import videojs, { VideoJsPlayer } from 'video.js';
import { onMounted, ref } from 'vue';
import Comments from '../Comments/index.vue'
import Bus from '../../Bus'
const route = useRoute()
const aid = route.query.animeid as any
const nowplayeranime = ref('')
const domain = ref('')
const port = ref('')
const comment = ref()
const nowplayerid = ref('')
const nowplayerepisode = ref<number>()
const backgroundImg = ref('')
const keyList = ['ArrowUp', 'w', 'ArrowDown', 's', 'ArrowLeft', 'a', 'ArrowRight', 'd', ' ', 'Enter', 'n', 'm']
let vPlayer: VideoJsPlayer

fetch(`http://${import.meta.env.VITE_BACKEND_DOMAIN}:${import.meta.env.VITE_BACKEND_PORT}/api/anime/GetAnimeByID/${aid}`).then(res => res.json()).then(data => {
    domain.value = import.meta.env.VITE_BACKEND_DOMAIN
    port.value = import.meta.env.VITE_BACKEND_PORT
    nowplayeranime.value = data['AnimeEpisode']
    backgroundImg.value = `url(http://${domain.value}:${port.value}/anime/main_image/` + nowplayerid.value + '.png)'
})

const newepisode = (id: number, el?: VideoJsPlayer) => {
    nowplayerepisode.value = id
    let currentEpisode
    if (id >= 10) {
        currentEpisode = `0${id}`
    } else {
        currentEpisode = `00${id}`
    }
    document.querySelector('title')!.innerHTML = `第${id}集`
    el?.src({ src: `http://${import.meta.env.VITE_BACKEND_DOMAIN}:${import.meta.env.VITE_BACKEND_PORT}/anime/videos/${nowplayerid.value}/${nowplayerid.value}_${currentEpisode}.mp4` })
}

const SendComment = () => {
    Bus.emit('pushComment', { AnimeID: aid, CommentText: comment.value, UserName: '' })
    comment.value = null
}

onMounted(() => {
    if (aid >= 10) {
        nowplayerid.value = '0000' + aid
    } else {
        nowplayerid.value = '00000' + aid
    }
    // 初始化播放器
    vPlayer = videojs(document.querySelector('#myVideo')!, {
        controls: true,
        controlBar: {
            fullscreenToggle: false
        }
    }, function () {
        this.on('ended', () => {
            if (nowplayerepisode.value !== parseInt(nowplayeranime.value)) {
                newepisode(nowplayerepisode.value! + 1, vPlayer)
            } else {
                return
            }
        })
    })
    // 页面初始化时为第一集
    newepisode(1, vPlayer)
    // 全局监听指定键位事件
    window.addEventListener('keydown', (e: any) => {
        const { key } = e;
        keyList.map((k) => {
            if (key == k)
                e.preventDefault();
        })
        switch (key) {
            case "ArrowUp":
            case "w":
                vPlayer.volume(vPlayer.volume() + 0.1);
                break;
            case "ArrowDown":
            case "s":
                vPlayer.volume(vPlayer.volume() - 0.1);
                break;
            case "ArrowLeft":
            case "a":
                vPlayer.currentTime(vPlayer.currentTime() - 3);
                break;
            case "ArrowRight":
            case "d":
                vPlayer.currentTime(vPlayer.currentTime() + 3);
                break;
            case " ":
                vPlayer.paused() ? vPlayer.play() : vPlayer.pause();
                break;
            case 'Enter':
                vPlayer.isFullscreen() ? vPlayer.exitFullscreen() : vPlayer.requestFullscreen()
                break;
            case 'n':
                if (nowplayerepisode.value == 1) {
                    break;
                } else {
                    newepisode(nowplayerepisode.value! - 1, vPlayer)
                }
                break;
            case 'm':
                if (nowplayerepisode.value == parseInt(nowplayeranime.value)) {
                    break;
                } else {
                    newepisode(nowplayerepisode.value! + 1, vPlayer)
                }
            default:
                break;
        }
    })
})
</script>

<style scoped>
.card-img::before {
    content: '';
    position: absolute;
    background-size: cover;
    background-position: top;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: var(--backgroundImage);
    filter: blur(5px) brightness(0.8);
    z-index: -1;
}

.vdo {
    height: 60vh;
    margin: 0 auto;
}

.episode {
    margin: 0 auto;
}

.episode .list {
    overflow: scroll;
    white-space: nowrap;
    /* background-color: rgba(78, 56, 56, 0.616); */
    padding: 20px;
    margin: 0 auto;
}

.episode span {
    color: white;
    padding: 2px;
    margin: 0 10px 10px 0;
    cursor: pointer;
}

.episode span:hover {
    color: rgb(171, 171, 202);
}

.widget-title {
    color: white;
    font-size: 1.1em;
    margin: -5px 0 20px;
    padding-left: 12px;
    position: relative;
}

.widget-title::before {
    background-color: #ff4c4c;
    border-radius: 3px;
    content: " ";
    width: 4px;
    height: 18px;
    position: absolute;
    top: 3px;
    left: 0;
}

.commentarea {
    display: flex;
    align-items: flex-end;
    flex-wrap: wrap;
}

.btn {
    position: relative;
    min-width: 60px;
    max-width: 60px;
    max-height: 40px;
    left: 100%;
    transform: translateX(-100%);
}

@media all and (width <=790px) {
    .vdo {
        height: 20vh;
    }
}
</style>