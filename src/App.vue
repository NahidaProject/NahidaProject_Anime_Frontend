<template>
  <div class="container">
    <transition appear @before-enter="beforeEnter" @enter="enter">
      <h1>Hello, Bootstrap and Vite!</h1>
    </transition>
    <button class="btn btn-primary">Primary button</button>
  </div>
</template>

<script setup lang="ts">
import gsap from 'gsap'
const beforeEnter = (element: HTMLElement) => {
  element.style.opacity = '0'
  element.style.transform = 'translateY(-100px)'
}
// where the animation will end up
const enter = (element: HTMLElement) => {
  gsap.to(element, {
    duration: 1,
    y: 0,
    opacity: 1,
  })
}
</script>

<style scoped>

</style>