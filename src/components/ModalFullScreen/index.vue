<template>
    <div class="modal fade" tabindex="-1" id="FullScreenPost">
        <div class="modal-dialog modal-fullscreen">
            <div class="modal-content">
                <!-- 标题 -->
                <div class="modal-header">
                    <h5 class="modal-title">{{ PostTitle }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <!-- 讨论 -->
                <div class="modal-body" id="PostBody">

                </div>
                <!-- 关闭 -->
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Modal } from 'bootstrap';
import { onMounted, onUnmounted, ref } from 'vue';
import Bus from '../../Bus'
const PostTitle = ref('')
onUnmounted(() => {
    // 组件销毁时把任务列表清空
    Bus.off()
})
onMounted(() => {
    let modal = new Modal('#FullScreenPost')
    document.querySelector('#FullScreenPost')?.addEventListener('hidden.bs.modal', () => {
        // document.querySelector('#PostBody')!.innerHTML = ''
    })
    Bus.on('showposts', (PostID: string) => {
        fetch(`http://${import.meta.env.VITE_BACKEND_DOMAIN}:${import.meta.env.VITE_BACKEND_PORT}/api/form/GetPostByID`, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                PostID: PostID
            })
        }).then(res => res.json()).then(data => {
            PostTitle.value = data[0]['PostTitle']
            // document.querySelector('#PostBody')!.innerHTML = data[0]['PostBody']
            modal.show()
        })

    })
})
</script>

<style scoped>

</style>