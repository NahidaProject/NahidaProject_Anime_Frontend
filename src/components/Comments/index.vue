<template>
    <div v-for="item in commentsList">
        <div class="card m-4">
            <div class="card-header">
                {{ item['UserName'] }}
            </div>
            <div class="card-body">
                <blockquote class="blockquote mb-0">
                    <p>{{ item['CommentText'] }}</p>
                </blockquote>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import Bus from '../../Bus'
const UserName = ref('')
onUnmounted(() => {
    // 组件销毁时把任务列表清空
    Bus.off()
})
if (document.cookie.split('=').length == 2) {
    UserName.value = document.cookie.split('=')[1]
}
onMounted(() => {
    Bus.on('pushComment', async (comment: any) => {
        comment['UserName'] = UserName.value
        await fetch('http://localhost:1314/api/Comments/AddCommentByAnimeID', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(comment)
        })
        await fetch(`http://${import.meta.env.VITE_BACKEND_DOMAIN}:${import.meta.env.VITE_BACKEND_PORT}/api/Comments/GetCommentsByAnimeID/${comments.animeid}`).then(async res => {
            commentsList.value = await res.json()
        })
    })
})

const comments = defineProps({
    animeid: String
})

const commentsList = ref()

fetch(`http://${import.meta.env.VITE_BACKEND_DOMAIN}:${import.meta.env.VITE_BACKEND_PORT}/api/Comments/GetCommentsByAnimeID/${comments.animeid}`).then(async res => {
    commentsList.value = await res.json()
})
</script>

<style scoped>

</style>