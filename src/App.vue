<template>
  <div>
    <Nabar/>
    <router-view></router-view>
    <Footer/>
  </div>
</template>

<script setup>
import Nabar from './components/page/Nabar.vue';
import Footer from './components/page/Footer.vue';
</script>
