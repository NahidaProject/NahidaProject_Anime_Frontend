<template>
    <div class="container-fluid">
        <Navigation/>
        {{route.query.keyword==''?'阁下请你认真点>~<':route.query.keyword}}
        <Footer></Footer>
    </div>
</template>

<script setup lang="ts">
import Navigation from '../components/Navigation/index.vue'
import Footer from '../components/Footer/index.vue'
import { useRoute } from 'vue-router';

const route = useRoute()

// 路由参数route.query.keyword

</script>

<style scoped>

</style>