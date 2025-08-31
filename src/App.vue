<template>
  <div class="app">
    <AppNavbar></AppNavbar>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import AppNavbar from './components/AppNavbar.vue';

export default {
  name: 'App',
  components: {
    AppNavbar,
  },
}
</script>

<style>
@import '@/assets/reset.css';

.content {
  max-width: 1440px;
  margin: auto;
}
</style>
