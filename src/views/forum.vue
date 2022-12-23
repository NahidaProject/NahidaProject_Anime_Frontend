<template>
    <ModalFullScreen/>
    <div class="container-fluid">
        <Navigation page="forum"></Navigation>
        <div class="container-fluid px-4 px-xxl-2 d-flex justify-content-center">
            <div class="d-lg-grid container-fluid" id="content" style="min-width: 340px;">
                <!-- 左边分区 -->
                <div class="sidebar">
                    <div class="masthead py-5">
                        <div
                            class="mb-4 text-center text-lg-start d-flex flex-column justify-content-center align-items-center">
                            <a class="flex-shrink-0 mb-lg-3 link-dark text-decoration-none" href="/"
                                aria-label="Nahida">
                                <img src="src/assets/Nahida.png" alt="Nahida"
                                    class="bd-booticon d-block mx-auto mb-3 mx-lg-0" width="200" height="165">
                            </a>
                            <div class="container" style="max-width: 400px;">
                                <h3 class="text-center"># 板块</h3>
                                <div class="my-2">
                                    <button class="w-100 btn btn-danger mb-3">综合</button>
                                    <!-- <button class="w-100 btn btn-outline-danger">资源</button> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 右边分区帖子 -->
                <div class="main d-flex justify-content-center align-items-center">
                    <div class="w-100 mx-auto my-5">
                        <table class="table table-hover" style="border-collapse:separate;border-spacing: 0px 15px;">
                            <tbody id="tablebody">
                                <tr v-for="item in formList" @click="GetPost(item['PostID'])">
                                    <td style="width: 70%;white-space: nowrap;">{{ item['PostTitle'] }}</td>
                                    <td class="d-none d-sm-block d-sm-none d-md-block d-md-none d-lg-block">{{
                                            item['PostAuthor']
                                    }}</td>
                                    <td style="background-color: black;color: white;padding: 0 2px;text-align: center;">
                                        {{ item['PostDate'] }}</td>
                                </tr>
                            </tbody>
                        </table>
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
import router from '../router/router';
import ModalFullScreen from '../components/ModalFullScreen/index.vue'
import { ref } from 'vue';
import Bus from '../Bus';
const formList = ref()

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

fetch(`http://${import.meta.env.VITE_BACKEND_DOMAIN}:${import.meta.env.VITE_BACKEND_PORT}/api/form/GetAllPosts`).then(res => res.json()).then(data => {
    formList.value = data
})

const GetPost=(PostID:string)=>{
    if(PostID){
        Bus.emit('showposts', PostID)
    }
}
</script>

<style scoped>
#content {
    grid-template-columns: 1.15fr 3fr;
    gap: 3rem;
}
</style>