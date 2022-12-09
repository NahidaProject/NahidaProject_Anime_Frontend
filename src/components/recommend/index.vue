<template>
    <div class="container">
        <swiper :effect="'coverflow'" :centeredSlides="true" :slidesPerView="'auto'" :pagination="true"
            :modules="modules" :coverflowEffect="{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
            }" :autoplay="{ delay: 3000 }">
            <swiper-slide class="card" v-for="(item, index) in animes"
                :style="{ 'background-image': `url(http://${domain}:${port}/anime/main_image/`+`${item['AnimeID']>=10?'0000':'00000'}`+`${item['AnimeID']}.png)` }">
                <div class="ms">
                    <div class="title">
                        {{ item['AnimeName'] }}
                    </div>
                    <p class="desc">
                        {{ item['AnimeDescription'] }}
                    </p>
                </div>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Swiper, SwiperSlide } from "swiper/vue"
import { EffectCoverflow, Pagination, Autoplay } from "swiper"
import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
const domain = ref()
const port = ref()
const modules = [EffectCoverflow, Pagination, Autoplay]

interface animedata {
    AnimeName: string,
    AnimeDescription: string,
    AnimeRecommend: string
}
let animes = ref(<{}>[])
fetch(`http://${import.meta.env.VITE_BACKEND_DOMAIN}:${import.meta.env.VITE_BACKEND_PORT}/api/anime/GetAllAnimes`)
    .then(data => data.json())
    .then(anime => {
        let a: animedata[] = []
        anime.forEach((element: animedata) => {
            if (element['AnimeRecommend']=='true') {
                a.push(element)
            }
        });
        animes.value = a
        domain.value = import.meta.env.VITE_BACKEND_DOMAIN
        port.value = import.meta.env.VITE_BACKEND_PORT
    })
</script>

<style scoped>
.card {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    width: 300px;
    height: 400px;
    user-select: none;
}

.ms {
    height: 50%;
    background-color: rgba(36, 36, 36, 0.274);
    position: relative;
    top: 100%;
    transform: translateY(-100%);
}

.title {
    color: white;
    font-size: 25px;
    font-weight: 800;
}

.desc {
    color: white;
    font-size: 15px;
    width: 100%;
    height: 100px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
}

.swiper-slide {
    width: 300px;
    height: 400px;
}
</style>