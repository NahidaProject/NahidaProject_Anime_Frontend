<template>
    <div class="container">
        <div class="animecard" v-for="(item, index) in animeList">
            <div class="tilt" data-tilt
                :style="{ 'background-image': 'url(http://localhost:1314/anime/main_image/' + item['a_id'] + '.png)' }">
                <RouterLink :to="{ path: '/play', query: { a_id: item['a_id'],a_id_num: '001' } }">
                    <div class="cover"></div>
                </RouterLink>
            </div>
            <div>
                {{ item["a_name"] }}
            </div>
            <div>
                {{ item["a_stats"] }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import VanillaTilt from 'vanilla-tilt';
import { onUpdated, ref } from 'vue';
const animeList = ref([])
fetch('http://localhost:1314/api/getAllAnime')
    .then(data => data.json())
    .then(anime => {
        animeList.value = anime
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
}

.tilt {
    width: 160px;
    height: 240px;
    background-color: aqua;
    background-size: cover;
    background-position: center;
}
</style>