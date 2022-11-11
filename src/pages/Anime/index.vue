<template>
    <div class="container">
        <div class="background"></div>
        <div class="content">
            <ContentLeft></ContentLeft>
            <Live2D></Live2D>
            <ContentRight></ContentRight>
        </div>
    </div>
</template>

<script setup lang="ts">
import ContentLeft from '../../components/contents/contentleft/index.vue'
import ContentRight from '../../components/contents/contentright/index.vue'
import Live2D from '../../components/contents/live2d/index.vue'
</script>

<style scoped lang="less">
.container {
    font-family: "Segoe UI", "Lucida Grande", Helvetica, Arial, "Microsoft YaHei", FreeSans, Arimo, "Droid Sans", "wenquanyi micro hei", "Hiragino Sans GB", "Hiragino Sans GB W3", FontAwesome, sans-serif;
    line-height: 1.6;

    .background {
        position: fixed;
        left: 0;
        right: 0;
        background-image: url(http://www.cilicili.cc/api/images/bg);
        background-size: cover;
        filter: blur(15px);
        opacity: .2;
        z-index: -10;
        width: 100vw;
        height: 100vh;
    }

    .content {
        justify-content: space-between;
        width: 80vw;
        margin: 10px auto;
        min-width: 1024px;
    }
}
</style>