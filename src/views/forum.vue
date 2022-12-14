<template>
    <div class="container-fluid">
        <Navigation page="forum"></Navigation>
        <Footer></Footer>
    </div>
</template>

<script setup lang="ts">
import Navigation from '../components/Navigation/index.vue'
import Footer from '../components/Footer/index.vue'
import router from '../router/router';
fetch(`http://${import.meta.env.VITE_BACKEND_DOMAIN}:${import.meta.env.VITE_BACKEND_PORT}/api/serverStatus`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: new Headers({
        'Content-Type': 'application/json'
    })
}).then(res => {
    if (res.status == 503) {
        router.push('/login')
    }
})
</script>

<style scoped>

</style>