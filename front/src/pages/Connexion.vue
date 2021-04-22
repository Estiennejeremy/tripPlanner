<template>
  <div class="content">
    <auth-card :connexion="false"></auth-card>
  </div>
</template>
<script>
import AuthCard from '../components/AuthCard';

export default {
  name: 'Connexion',
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
}
</style>