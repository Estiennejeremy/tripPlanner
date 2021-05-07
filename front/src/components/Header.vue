<template>
  <div class="background-black">
    <div class="header" @mouseover="hover=true" @mouseleave="hover=false" :class="{ hover: hover }">
      <h1 class="title">{{pageTitle}}</h1>
      <span @click.prevent="goToProfile()" v-if="displayProfile()">
        <img src="../assets/icons/account-circle.svg" class="profile-icon" />
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      hover: false,
      routeName: this.$route.name,
    };
  },
  methods: {
    displayProfile() {
      return !Boolean(this.routeName == 'Connection')
    },
    goToProfile() {
      // this.$router.push('profile');
    }
  },
  computed: {
    pageTitle() {
      return "Trip planner";
    }
  }
};
</script>

<style>
.title {
  color: white;
  font-size: 30px;
}
.header {
  background-color: black;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0px;
  z-index: 10;
}
.hover {
  transform: translateY(5px);
  box-shadow: none;
  transition: transform 0.2s, box-shadow 0.2s, background 0.1s;
}
.background-black {
  background-color: black;
}
.profile-icon {
  position: absolute;
  top:13px;
  right: 10px;
  width: 40px;
  cursor: pointer;
}
</style>

