<template>
    <div class="container-fluid">
        <div id="carousel" class="carousel carousel-dark slide carousel-fade" data-bs-ride="carousel">
            <div class="carousel-inner">
                <div :class="index == 0 ? 'carousel-item active data-bs-interval' : 'carousel-item  data-bs-interval'"
                    v-for="item,index in newsList">
                    <div class="card-img d-block w-100" @click="play(item.AnimeID)"
                        :style="{ 'background-image': 'url(http://localhost:1314/anime/main_image/' + `${item.AnimeID >= 10 ? '0000' + item.AnimeID : '00000' + item.AnimeID}` + '.png)' }">
                    </div>
                    <div class="carousel-caption d-none d-md-block">
                        <h1>{{ item.AnimeName }}</h1>
                        <p class="text-end">{{ item.AnimeStats }}...</p>
                    </div>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
let newsList: any = reactive([])

fetch('http://localhost:1314/api/anime/GetRecommendAnimes').then(async res => {
    newsList.push(...await res.json())
})

const play = (animeid: number) => {
    router.push({
        path: '/animePlayer',
        query: {
            'animeid': animeid
        }
    })
}

</script>

<style scoped>
.carousel-caption {
    font-family: deyihei;
    height: 35%;
}

.card-img {
    background-size: cover;
    background-position: center;
    height: 30vh;
    border-radius: 30px;
}
</style>