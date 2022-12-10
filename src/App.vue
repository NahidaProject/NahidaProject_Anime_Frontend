<template>
  <transition appear @before-enter="beforeEnter" @enter="enter">
    <div class="container py-4 px-3 mx-auto">
      <h1>Hello, Bootstrap and Vite!</h1>
      <button class="btn btn-primary">Primary button</button>
    </div>
  </transition>
</template>

<script setup>
import gsap from 'gsap'
const beforeEnter = (el) => {
  el.childNodes[0].style.opacity = '0'
  el.childNodes[0].style.transform = 'translateY(-100px)'
}
// where the animation will end up
const enter = (el) => {
  gsap.to(el.childNodes[0], {
    duration: 1,
    y: 0,
    opacity: 1,
  })
}
</script>

<style lang="scss" scoped>

</style>