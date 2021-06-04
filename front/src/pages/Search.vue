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
        <vs-card class="search-bar" style="display: block">
          <div slot="header">
            <vs-row vs-type="flex" vs-justify="space-evenly" vs-w="12">
              <vs-col v-if="isActivity" vs-justify="space-between" vs-w="9">
                <vs-row id="font">
                  <vs-checkbox v-model="activities" id="font"
                    >Activities</vs-checkbox
                  >
                  <vs-checkbox v-model="restaurants" id="font"
                    >Restaurants</vs-checkbox
                  >
                  <vs-checkbox v-model="hotels" id="font">Hotels</vs-checkbox>
                  <vs-checkbox v-model="bars" id="font">Bars</vs-checkbox>
                </vs-row>
              </vs-col>
              <vs-col
                v-if="isTransport"
                vs-justify="space-evenly"
                vs-lg="8"
                vs-sm="8"
              >
                <vs-row>
                  <vs-checkbox v-model="plane">Plane</vs-checkbox>
                  <vs-checkbox v-model="train">Train</vs-checkbox>
                  <vs-checkbox v-model="car">Car</vs-checkbox>
                  <vs-checkbox v-model="boat">Boat</vs-checkbox>
                </vs-row>
              </vs-col>

              <vs-col vs-justify="center" vs-w="2">
                <vs-switch
                  v-model="switchStatus"
                  v-on:click="switchType"
                  class="switch-type"
                >
                  <template #off>
                    Transports
                  </template>
                  <template #on>
                    Activities
                  </template>
                </vs-switch>
              </vs-col>
            </vs-row>
          </div>
          <div>
            <activity-search-card
              v-if="isActivity"
              title="Test Activity"
              imgSrc="https://img-19.ccm2.net/8vUCl8TXZfwTt7zAOkBkuDRHiT8=/1240x/smart/b829396acc244fd484c5ddcdcb2b08f3/ccmcms-commentcamarche/20494859.jpg"
            />
            <transport-search-card v-else />
          </div>
        </vs-card>
      </vs-col>
      <vs-col vs-w="8" vs-lg="8" vs-xs="3">
        <div id="mapbox" class="map" />
      </vs-col>
    </vs-row>
  </div>
</template>
<script>
const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");
import ActivitySearchCard from "../components/ActivitySearchCard.vue";
import TransportSearchCard from "../components/TransportSearchCard.vue";

export default {
  name: "Search",
  components: { ActivitySearchCard, TransportSearchCard },
  data() {
    return {
      restaurants: true,
      hotels: true,
      bars: true,
      activities: true,
      plane: true,
      train: true,
      car: true,
      boat: true,
      switchStatus: "",
    };
  },
  methods: {
    switchType() {
      if (this.$route.name == "SearchActivity") {
        this.$router.replace("/search/transport");
      } else {
        this.$router.replace("/search/activity");
      }
    },
  },
  computed: {
    isActivity() {
      return this.$route.name == "SearchActivity";
    },
    isTransport() {
      return this.$route.name == "SearchTransport";
    },
  },
  mounted() {
    mapboxgl.accessToken =
      "pk.eyJ1IjoidHJpcHBsYW5uZXIxMCIsImEiOiJja295M2dmajMwYjVqMnhxbms3MDJiZ2d5In0.LmgJtpjSjypFMvpvGj2UTA";
    const map = new mapboxgl.Map({
      container: "mapbox",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-74.5, 40],
      zoom: 9,
    });
    if (this.$route.name == "SearchActivity") this.switchStatus = true;
    else this.switchStatus = false;
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
  height: 94vh;
  width: 100vw;
  overflow: hidden !important;
}

.switch-type {
  width: 100px !important;
  font-size: x-large;
  background-color: rgb(0, 166, 166);
}

/* CSS for search cards  */
.add-icon {
  position: absolute;
  margin-right: 10px;
  right: 0;
  cursor: pointer;
}

.card-content {
  width: 100%;
  height: fit-content;
  background: #fff;
  border-radius: 8px;
  margin-bottom: 20px;
  -webkit-box-shadow: 0 4px 25px 0 rgb(0 0 0 / 10%);
  box-shadow: 0 4px 25px 0 rgb(0 0 0 / 10%);
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  padding-top: 0px;
  padding: 10px;
  position: relative;
}

.vs-switch--text.text-off {
  color: white !important;
}
</style>
