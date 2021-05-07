<template>
  <vs-navbar v-model="activeItem" class="nabarx" color="#141414">
    <div slot="title">
      <vs-navbar-title id="title">
        {{ title }}
      </vs-navbar-title>
    </div>
    <div id="search">
      <vs-input icon="search" placeholder="Search" v-model="search" />
    </div>
  </vs-navbar>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      search: "",
    };
  },
  props: {
    title: Boolean,
  },
  methods: {},
};
</script>

<style>
.nabarx {
  display: flex;
  justify-content: center;
  color: white;
  height: 60px;
}

#title {
  font-size: 25px;
}

#search {
  position: absolute;
  right: 10px;
}
</style>
