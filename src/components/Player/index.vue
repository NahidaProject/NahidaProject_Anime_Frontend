<template>
    <div class="card-img p-5"
        :style="{ 'background-image': `url(http://${domain}:${port}/anime/main_image/` + nowplayerid + '.png)' }">
        <div class="container-fluid vdo">
            <video id="myVideo" class="h-100 container video-js vjs-big-play-centered" autoplay="true"
                preload="auto"></video>
        </div>
        <div class="episode my-2">
            <h4 class="widget-title">剧集列表</h4>
            <div class="list">
                <span v-for="index in nowplayeranime" @click="newepisode(index)">
                    第{{ index }}集
                </span>
            </div>
        </div>
        <div class="commentarea container m-5">
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
import videojs from 'video.js';
import { onMounted, ref } from 'vue';
import Comments from '../Comments/index.vue'
import Bus from '../../Bus'
const route = useRoute()
const aid = route.query.animeid as any
const nowplayeranime = ref('')
const domain = ref('')
const port = ref('')

const comment = ref()

fetch(`http://${import.meta.env.VITE_BACKEND_DOMAIN}:${import.meta.env.VITE_BACKEND_PORT}/api/anime/GetAnimeByID/${aid}`).then(res => res.json()).then(data => {
    domain.value = import.meta.env.VITE_BACKEND_DOMAIN
    port.value = import.meta.env.VITE_BACKEND_PORT
    nowplayeranime.value = data['AnimeEpisode']
})

const nowplayerid = ref('')
const newepisode = (id: any) => {
    let currentEpisode
    if (id >= 10) {
        currentEpisode = `0${id}`
    } else {
        currentEpisode = `00${id}`
    }
    videojs(document.querySelector('#myVideo')!).dispose()
    document.querySelector('.vdo')!.innerHTML = '<video id="myVideo" class="h-100 container video-js vjs-big-play-centered" autoplay="true" preload="auto"></video>'
    videojs(document.querySelector('#myVideo')!, {
        controls: true,
        sources: [{
            src: `http://${import.meta.env.VITE_BACKEND_DOMAIN}:${import.meta.env.VITE_BACKEND_PORT}/anime/videos/${nowplayerid.value}/${nowplayerid.value}_${currentEpisode}.mp4`,
        }
        ]
    })
    document.querySelector('title')!.innerHTML = `第${id}集`
}
const SendComment = () => {
    Bus.emit('pushComment',{AnimeID:aid,CommentText:comment.value,UserName:''})
    comment.value=null
}
onMounted(() => {
    if (aid >= 10) {
        nowplayerid.value = '0000' + aid
    } else {
        nowplayerid.value = '00000' + aid
    }
    videojs(document.querySelector('#myVideo')!, {
        controls: true,
        sources: [{
            src: `http://${import.meta.env.VITE_BACKEND_DOMAIN}:${import.meta.env.VITE_BACKEND_PORT}/anime/videos/${nowplayerid.value}/${nowplayerid.value}_001.mp4`,
        }
        ]
    })
    document.querySelector('title')!.innerHTML = `第1集`
})
</script>

<style scoped>
.card-img {
    background-position: top;
    background-size: cover;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
}

.vdo {
    height: 60vh;
    width: 75%;
}

.episode {
    max-width: 180px;
}

.episode .list {
    display: flex;
    flex-wrap: wrap;
    background-color: rgba(78, 56, 56, 0.616);
    padding: 20px;
    align-items: center;
    justify-content: space-between;
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
    color: #333;
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