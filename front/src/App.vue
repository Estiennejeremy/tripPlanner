<template>
  <router-view id="app"></router-view>
</template>

<script>
export default {
  name: 'App',
  components: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.content {
  display: flex;
  justify-content: center;
  max-height: 100vh;
  max-width: 100vw;
}
</style>
