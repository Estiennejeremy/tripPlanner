<template>
  <div class="content">
    <img src="../assets/forest.png" class="image" />
    <div class="bottom-part" />
    <auth-card :connexionProp="false"></auth-card>
  </div>
</template>
<script>
import AuthCard from "../components/AuthCard";

export default {
  name: "Connexion",
  components: { AuthCard },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style>
.content {
  display: flex;
  justify-content: center;
  max-height: 100vh;
  max-width: 100vw;
}
.image {
  width: 1920px;
  position: fixed;
  overflow: hidden !important;
}
.bottom-part {
  background-color: #494949;
  bottom: 0;
  height: 40vh;
  width: 100vw;
  position: absolute;
}
</style>
