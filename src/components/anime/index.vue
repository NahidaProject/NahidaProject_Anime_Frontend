<template>
    <div class="container">
        <div class="animecard" v-for="(item, index) in animeList">
            <div class="tilt" data-tilt
                :style="{ 'background-image': `url(http://${domain}:${port}/anime/main_image/`+`${item['AnimeID']>=10?'0000':'00000'}`+`${item['AnimeID']}.png)` }">
                <RouterLink :to="{ path: '/play', query: { a_id: item['AnimeID']>=10?'0000'+item['AnimeID']:'00000'+item['AnimeID'], a_id_num: '001' } }">
                    <div class="cover"></div>
                </RouterLink>
            </div>
            <div>
                {{ item["AnimeName"] }}
            </div>
            <div :style="{ 'color': `${item['AnimeStats'] == '已完结' ? 'green' : 'red'}` }">
                {{ item["AnimeStats"] }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onUpdated, ref } from 'vue'
import VanillaTilt from 'vanilla-tilt'
const domain = ref()
const port = ref()
interface animedata {
    AnimeStats: string,
    AnimeID: number,
    AnimeName: string,
}

const animeList = ref(<{}>[])  

fetch(`http://${import.meta.env.VITE_BACKEND_DOMAIN}:${import.meta.env.VITE_BACKEND_PORT}/api/anime/GetAllAnimes`)
    .then(data => data.json())
    .then(anime => {
        let a: animedata[] = [], b: animedata[] = []
        anime.forEach((e: animedata) => {
            if (e.AnimeStats == '连载中') {
                a.push(e)
            } else {
                b.push(e)
            }
        });
        animeList.value = a.concat(b)
        domain.value = import.meta.env.VITE_BACKEND_DOMAIN
        port.value = import.meta.env.VITE_BACKEND_PORT
    })

onUpdated(() => {
    VanillaTilt.init(document.querySelectorAll(".tilt") as any, {
        max: 35,
        speed: 600
    })
})
</script>

<style scoped>
.container {
    padding: 0 20px 0 30px;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}

.cover {
    /* background-color: rgba(110, 110, 110, 0.267); */
    width: 100%;
    height: 100%;
    position: relative;
    filter: blur(15px);
    cursor: pointer;
}

.animecard {
    user-select: none;
    display: flex;
    flex-direction: column;
    width: 160px;
    margin: 10px;
}

.tilt {
    width: 160px;
    height: 240px;
    background-size: cover;
    background-position: center;
}
</style>