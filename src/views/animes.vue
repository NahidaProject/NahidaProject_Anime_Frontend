<template>
    <div class="container-fluid">
        <Navigation page="animes"></Navigation>
        <div class="content">
            <Carousel class="my-3"></Carousel>
            <div class="select container-fluid d-flex flex-warp">
                <div class="shown w-75">
                    <div class="mx-3 my-3" v-for="item in animeList">
                        <div class="card-img" @click="play(item['AnimeID'])"
                            :style="{ 'background-image': `url(http://${domain}:${port}/anime/main_image/` + (item['AnimeID'] >= 10 ? '0000' + item['AnimeID'] : '00000' + item['AnimeID']) + '.png)' }">
                        </div>
                        <div class="animename">{{ item['AnimeName'] }}</div>
                    </div>
                </div>
                <div class="filter w-25 d-none d-lg-block" style="min-width: 310px;">
                    <div class="filter-title">筛选</div>
                    <div class="d-flex">
                        <div>地区</div>
                        <ul class="d-inline">
                            <li @click=clanguage(item.LanguageName) class="mx-2 d-inline" v-for="item in animeLanguage"
                                :title="item.LanguageName">{{
                                        item.LanguageName
                                }}
                            </li>
                        </ul>
                    </div>
                    <div class="d-flex">
                        <div>状态</div>
                        <ul class="d-inline">
                            <li @click=cstats(item.StatsName) class="mx-2 d-inline" :title="item.StatsName"
                                v-for="item in animeStats">
                                {{ item.StatsName }}
                            </li>
                        </ul>
                    </div>
                    <div class="d-flex">
                        <div>风格</div>
                        <ul style="max-width: 230px;">
                            <li @click=ctype(item.Type) class="mx-2 d-inline" :title="item.Type"
                                v-for="item in animeType">
                                {{ item.Type }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script setup lang="ts">
import Navigation from '../components/Navigation/index.vue'
import Footer from '../components/Footer/index.vue'
import Carousel from '../components/Carousel/index.vue'
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const domain = ref('')
const port = ref('')
let animeList = ref([])

fetch(`http://${import.meta.env.VITE_BACKEND_DOMAIN}:${import.meta.env.VITE_BACKEND_PORT}/api/anime/GetAllAnimes`).then(res => res.json()).then(data => {
    domain.value = import.meta.env.VITE_BACKEND_DOMAIN
    port.value = import.meta.env.VITE_BACKEND_PORT
    animeList.value = data
})

const play = (animeid: number) => {
    router.push({
        path: '/animePlayer',
        query: {
            'animeid': animeid
        }
    })
}
const animeStats = [
    {
        StatsID: 0,
        StatsName: '全部'
    },
    {
        StatsID: 1,
        StatsName: '已完结'
    },
    {
        StatsID: 2,
        StatsName: '连载中'
    }
]
const animeLanguage = [
    {
        LanguageID: 0,
        LanguageName: '全部'
    },
    {
        LanguageID: 1,
        LanguageName: '国语'
    },
    {
        LanguageID: 2,
        LanguageName: '粤语'
    },
    {
        LanguageID: 3,
        LanguageName: '日语'
    },
    {
        LanguageID: 4,
        LanguageName: '英语'
    }
]
const animeType = [
    {
        TypeID: 0,
        Type: '全部'
    },

    {
        TypeID: 2,
        Type: '魔法'
    },
    {
        TypeId: 3,
        Type: '奇幻'
    },
    {
        TypeId: 4,
        Type: '架空'
    },
    {
        TypeId: 5,
        Type: '原创'
    },
    {
        TypeId: 6,
        Type: '战斗'
    },
    {
        TypeId: 7,
        Type: '日常'
    },
    {
        TypeId: 8,
        Type: '喜剧'
    },
    {
        TypeId: 9,
        Type: '恋爱'
    },
    {
        TypeId: 10,
        Type: '动画'
    },
    {
        TypeId: 11,
        Type: '校园'
    },
    {
        TypeId: 12,
        Type: '百合'
    },
    {
        TypeID: 1,
        Type: '小说改'
    }
]
let currentFilter = reactive({
    AnimeLanguage: '全部',
    AnimeStats: '全部',
    AnimeType: '全部'
})
const Filter = () => {
    if (currentFilter.AnimeLanguage == '全部') {
        currentFilter.AnimeLanguage = ''
    }
    if (currentFilter.AnimeStats == '全部') {
        currentFilter.AnimeStats = ''
    }
    if (currentFilter.AnimeType == '全部') {
        currentFilter.AnimeType = ''
    }
    fetch(`http://${import.meta.env.VITE_BACKEND_DOMAIN}:${import.meta.env.VITE_BACKEND_PORT}/api/anime/FilterAnimes`, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(currentFilter)
    }).then(res=>res.json()).then(data=>{
        animeList.value = data
    })
}
const clanguage = (name: string) => {
    currentFilter.AnimeLanguage = name
    Filter()
}
const cstats = (name: string) => {
    currentFilter.AnimeStats = name
    Filter()
}
const ctype = (name: string) => {
    currentFilter.AnimeType = name
    Filter()
}
</script>

<style scoped>
.filter-title {
    color: #333;
    font-size: 1.1em;
    margin: -5px 0 20px;
    padding-left: 12px;
    position: relative;
}

.shown {
    display: flex;
    max-width: 75%;
    flex-wrap: wrap;
    justify-content: space-around;
}

.card-img {
    width: 160px;
    height: 240px;
    background-size: cover;
    background-position: center;
}

.animename {
    width: 160px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis "...";
}

.filter-title::before {
    background-color: #ff4c4c;
    border-radius: 3px;
    content: " ";
    width: 4px;
    height: 18px;
    position: absolute;
    top: 3px;
    left: 0;
}
</style>