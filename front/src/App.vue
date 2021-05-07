<template>
  <div id="app">
    <Header />
    <router-view class="page-content"></router-view>
  </div>
</template>

<script>
import Header from './components/Header.vue';

export default {
  name: 'App',
  components: {Header},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
}
h1, h2, h3, h4 {
  font-family: 'Poppins', sans-serif;
}
p, span, input {
  font-family: Avenir;
}
.content {
  display: flex;
  justify-content: center;
  max-height: 100vh;
  max-width: 100vw;
}
</style>
