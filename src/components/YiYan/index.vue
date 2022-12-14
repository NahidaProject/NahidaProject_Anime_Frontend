<template>
    <div class="card container-fluid">
        <div class="card-img-top img rounded-2"></div>
        <div class="card-body">
            <p class="card-text text-end">{{ YiYan.Sentence }}</p>
            <p class="card-text text-end">--{{ YiYan.Origin }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const YiYan = reactive({
    Sentence: '',
    Origin: ''
})

fetch(`http://${import.meta.env.VITE_BACKEND_DOMAIN}:${import.meta.env.VITE_BACKEND_PORT}/api/YiYan/Random`).then(async res => {
    const { Sentence, Origin } = await res.json()
    YiYan.Sentence = Sentence
    YiYan.Origin = Origin
})
</script>

<style scoped>
.img {
    background-image: url(http://www.cilicili.cc/api/images/bg);
    background-size: cover;
    background-position: center;
    height: 40vh;
}
</style>