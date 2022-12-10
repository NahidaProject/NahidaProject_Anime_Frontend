<template>
    <div class="modal fade" id="LoginStats" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5 text-danger" id="ModalLabel">{{ modal.title }}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    {{ modal.message }}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">好的</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Modal } from 'bootstrap';
const modal = defineProps({
    title: {
        type: String
    },
    message:{
        type: String
    }
})

const showModal=()=>{
    const modal = new Modal('#LoginStats')
    modal.show()
}

defineExpose({showModal})
</script>

<style scoped>

</style>