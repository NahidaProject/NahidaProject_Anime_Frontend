<template>
    <div class="d-flex flex-column" style="max-width: 750px;">
        <h2 class="widget-title"><strong>资讯</strong></h2>
        <div class="card border-light mb-4" v-for="item in newsList">
            <div class="row g-0">
                <div class="col-md-4">
                    <div class="img-fluid rounded-start h-100 card-img"
                        :style="{ 'background-image': 'url(http://localhost:1314/anime/news/card/' + item.NewsID + '.jpg)' }">
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-text"><strong>{{ item.NewsTitle }}</strong></h5>
                        <hr>
                        <p class="card-text">
                            <small>
                                <span class="badge text-bg-dark text-light">{{ item.NewsCategory }}</span>
                            </small>
                            <small class="text-muted mx-2">{{ item.NewsAuthor }}</small>
                            <small class="text-muted mx-2">{{ item.NewsDate }}</small>
                            <small class="text-muted">{{ item.NewsViewCount }}阅读</small>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

let newsList:any = reactive([])

fetch('http://localhost:1314/api/news/GetAllNews').then(async res => {
    newsList.push(...await res.json())
})
</script>

<style scoped>
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

.card-img {
    background-size: cover;
    background-position: top;
}
</style>