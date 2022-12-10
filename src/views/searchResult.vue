<template>
    <div class="container">
        <Navigation></Navigation>
        {{route.query.keyword}}
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