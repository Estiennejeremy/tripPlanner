<template>
  <div class="content">
    <img src="../assets/landscape2.jpg" class="image" />
    <vs-row vs-justify="center" class="auth-container">
        <vs-col type="flex" vs-justify="center" vs-align="center" vs-lg="4" vs-xs="8" vs-sm="4">
          <auth-card />
        </vs-col>
    </vs-row>

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
  max-height: 100%;
  max-width: 100%;
}
.image {
  width: 100%;
  position: fixed;
  overflow: hidden !important;
}
.auth-container {
  z-index: 2;
  margin-top: 25vh;
}
</style>
