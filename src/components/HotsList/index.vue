<template>
    <div class="hots my-2 d-flex flex-column">
        <h2 class="widget-title"><strong>本月热点</strong></h2>
        <div class="hot" v-for="item in hotsList">
            <div class="card border-light mb-3" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <div class="img-fluid h-100 card-img" @click="GetInformation(item.NewsID)"
                            :style="{ 'background-image': 'url(http://localhost:1314/anime/news/card/' + item.NewsID + '.jpg)' }">
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <small class="card-title" @click="GetInformation(item.NewsID)">{{ item.NewsTitle }}</small>
                            <p class="card-text">
                                <small class="text-muted">{{ item.HotsMeta }}</small>
                                <small class="text-muted">{{ item.NewsViewCount }} 阅读</small>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import Bus from '../../Bus';

let hotsList: any = reactive([])

fetch('http://localhost:1314/api/news/GetHotsList').then(async res => {
    hotsList.push(...await res.json())
})

const GetInformation = async (NewsID: Number) => {
    await fetch(`http://localhost:1314/api/news/GetNewsContentByID/${NewsID}`).then(async res => {
        Bus.emit('shownews', await res.json())
    })
}
</script>

<style scoped>
.card-img {
    background-size: cover;
    background-position: top;
    cursor: pointer;
}

.card-title {
    cursor: pointer;
}

.hots {
    margin-bottom: 20px;
    padding: 20px 17px;
    max-width: 300px;
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

@media all and (width <=1200px) {
    .hots {
        display: none !important;
    }
}
</style>