<template>
    <div id="canvas">
        <vueLive2d :size="200" :homePage="'#'" :model="['ShizukuTalk/shizuku-48', 'default']"></vueLive2d>
    </div>
</template>

<script setup lang="ts">
import vueLive2d from 'vue-live2d'
</script>

<style scoped>
#canvas {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 9999;
}
</style>