<template>
    <div class="modal fade" id="LoginStats" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5 text-danger" id="ModalLabel"></h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body"></div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">好的</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Modal } from 'bootstrap';
import { onMounted, onUnmounted } from 'vue';
import Bus from '../../Bus'
onUnmounted(() => {
    // 组件销毁时把任务列表清空
    Bus.off()
})
onMounted(() => {
    let modal = new Modal('#LoginStats')
    Bus.on('shownews', (news: string) => {
        document.querySelector('.modal-body')!.innerHTML = news
        modal.show()
    })
    Bus.on('showmessage', (modal1: { title: any; message: any; }) => {
        document.querySelector('.modal-title')!.innerHTML = modal1.title
        document.querySelector('.modal-body')!.innerHTML = modal1.message
        modal.show()
    })
})
</script>

<style scoped>

</style>