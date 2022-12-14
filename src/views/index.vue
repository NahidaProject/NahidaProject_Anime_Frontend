<template>
  <div class="container-fluid">
    <Navigation page="/"></Navigation>
    <div class="container-fluid">
      <YiYan />
      <div class="content container my-4">
        <!-- 资讯 -->
        <News></News>
        <div class="d-flex flex-column flex-fill" style="max-width: 450px;">
          <div class="d-flex flex-row">
            <input class="form-control me-2" placeholder="请输入关键字..." v-model="searchValue">
            <button class="btn btn-outline-primary" @click="Search">Q</button>
          </div>
          <!-- 本月热点 -->
          <Hots></Hots>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script setup lang="ts">
import Navigation from '../components/Navigation/index.vue'
import Footer from '../components/Footer/index.vue'
import YiYan from '../components/YiYan/index.vue'
import News from '../components/NewsList/index.vue'
import Hots from '../components/HotsList/index.vue'
import { ref } from 'vue'
import Bus from '../Bus'
const searchValue = ref('')
const Search = () => {
  if (searchValue.value) {
    fetch('http://localhost:1314/api/news/FindNews', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        NewsTitle: searchValue.value
      })
    }).then(res => res.json()).then(data => {
      Bus.emit('listnews', data)
    })
  } else {
    Bus.emit('showmessage', {
      title: '(lll￢ω￢)',
      message: '阁下认真的吗?'
    })
  }
}
</script>

<style scoped>
.content {
  display: flex;
  flex-wrap: wrap-reverse;
  justify-content: space-around;
}
</style>