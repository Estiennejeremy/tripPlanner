<template>
  <div>
    <vs-row class="row">
      <vs-col
        type="flex"
        vs-justify="center"
        vs-align="center"
        vs-w="4"
        vs-lg="4"
        vs-xs="12"
      >
        <vs-card class="search-bar">
          <div slot="header" v-if="this.$props.type === 'activity'">
            <h3>
              Activity
            </h3>
          </div>
          <div>
            <span
              >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.</span
            >
            <span
              >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.</span
            >
          </div>
          <div slot="header" v-if="this.$props.type === 'transport'">
            <h3>
              Transport
            </h3>
          </div>
        </vs-card>
      </vs-col>
      <vs-col vs-w="8" vs-lg="8" vs-xs="12">
        <div id="mapbox" class="map" />
      </vs-col>
    </vs-row>
  </div>
</template>
<script>
const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");

export default {
  name: "Search",
  data() {
    return {};
  },
  props : {
    type: {
        type: String,
        required: true
    }
  },
  methods: {},
  mounted() {
      console.log(this.$props.type)
    mapboxgl.accessToken =
      "pk.eyJ1IjoidHJpcHBsYW5uZXIxMCIsImEiOiJja295M2dmajMwYjVqMnhxbms3MDJiZ2d5In0.LmgJtpjSjypFMvpvGj2UTA";
    const map = new mapboxgl.Map({
      container: "mapbox",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-74.5, 40],
      zoom: 9,
    });
  },
};
</script>
<style>
.map {
  visibility: visible;
  height: 100%;
}

.search-bar {
  height: 100%;
}

.row {
    height: 91vh;
    width: 100vw;
    overflow: hidden !important;
}
</style>
