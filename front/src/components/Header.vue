<template>
  <div class="background-black">
    <div
      class="header"
      @mouseover="hover = true"
      @mouseleave="hover = false"
      :class="{ hover: hover }"
    >
      <vs-row v-if="isSearchPage" vs-justify="center">
        <vs-col
          v-if="isActivityPage"
          vs-type="flex"
          vs-lg="3"
          vs-sm="3"
          vs-xs="3"
          vs-justify="center"
        >
          <vs-select placeholder="Range" v-model="rangeText">
            <div class="slider">
              <vs-slider
                v-model="range"
                text-fixed="km"
                v-on:change="setRange"
              />
            </div>
          </vs-select>
        </vs-col>
        <vs-col
          v-if="!isActivityPage"
          vs-type="flex"
          vs-lg="3"
          vs-sm="3"
          vs-xs="3"
          vs-justify="center"
        >
          <label class="title">From</label>
          <mapbox-geocoder
            access-token="pk.eyJ1IjoidGlmYWluZWsiLCJhIjoiY2tvbzl5ODZqMDlqOTJ5bnVxb3Z0dWNtNyJ9.EsQKq2Ll_f7hmDaY_DCflA"
            @mb-created="(instance) => (control = instance)"
            types="place"
            :limit="2"
            @mb-result="
              (res) => {
                getFromLocation(res);
              }
            "
            class="places-input"
          />
        </vs-col>
        <vs-col
          v-if="!isActivityPage"
          vs-type="flex"
          vs-lg="3"
          vs-sm="3"
          vs-xs="3"
          vs-justify="center"
        >
          <label class="vs-input--label title">To</label>

          <mapbox-geocoder
            access-token="pk.eyJ1IjoidGlmYWluZWsiLCJhIjoiY2tvbzl5ODZqMDlqOTJ5bnVxb3Z0dWNtNyJ9.EsQKq2Ll_f7hmDaY_DCflA"
            @mb-created="(instance) => (control = instance)"
            types="place"
            :limit="2"
            @mb-result="
              (res) => {
                getToLocation(res);
              }
            "
            class="places-input"
        /></vs-col>
        <vs-col
          vs-type="flex"
          vs-lg="3"
          vs-sm="3"
          vs-xs="3"
          vs-justify="center"
        >
          <vs-input
            type="date"
            :min="getDate"
            :value="getDate"
            v-model="selectedDate"
          />
        </vs-col>
        <vs-col
          vs-type="flex"
          vs-lg="3"
          vs-sm="3"
          vs-xs="3"
          vs-justify="center"
        >
          <vs-select placeholder="Price" v-model="priceText">
            <div class="slider">
              <vs-slider
                v-model="price"
                text-fixed="€"
                v-on:change="setPrice"
              />
            </div>
          </vs-select>
        </vs-col>
      </vs-row>
      <h1 class="title" @click.prevent="goToHomepage()" v-else>
        {{ pageTitle }}
      </h1>
      <vs-dropdown class="profile-icon" v-if="displayProfile()">
        <a class="a-icon" href="#">
          <vs-icon icon="account_circle" color="white" size="small"></vs-icon>
          <vs-icon icon="expand_more" color="white" size="small"></vs-icon>
        </a>

        <vs-dropdown-menu class="dropdown-menu">
          <vs-dropdown-item @click="openProfileModal = true">
            My profile
          </vs-dropdown-item>
          <vs-dropdown-item @click.prevent="goToTrips()">
            My trips
          </vs-dropdown-item>
          <vs-dropdown-item divider color="red" @click.prevent="logout()">
            Log out
          </vs-dropdown-item>
        </vs-dropdown-menu>
      </vs-dropdown>
    </div>
    <vs-popup title="Update profile" :active.sync="openProfileModal">
      <ProfileModal />
    </vs-popup>
  </div>
</template>

<script>
import ProfileModal from "../components/ProfileModal.vue";
import "material-icons/iconfont/material-icons.css";
import "@mapbox/mapbox-gl-geocoder/lib/mapbox-gl-geocoder.css";
import Cookies from "js-cookie";

export default {
  name: "Header",
  components: { ProfileModal },
  data() {
    return {
      hover: false,
      routeName: this.$route.name,
      openProfileModal: false,
      range: "",
      rangeText: "",
      price: [0, 50],
      priceText: "",
      selectedDate: "",
    };
  },
  methods: {
    displayProfile() {
      return !Boolean(this.routeName == "Connection");
    },
    goToProfile() {
      this.$router.push("/profile");
    },
    logout() {
      Cookies.remove("token");
      window.location.href = "connection";
    },
    goToHomepage() {
      this.$router.push("/");
    },
    goToTrips() {
      this.$router.push("/trips");
    },
    setRange() {
      this.rangeText = "Within " + this.range + "km";
    },
    setPrice() {
      this.priceText =
        "Between " + this.price[0] + "€ and " + this.price[1] + "€";
    },
    getFromLocation(res) {
      this.from = {
        lat: res.result.center[1],
        lon: res.result.center[0],
        name: res.result.text,
      };
    },
    getToLocation(res) {
      this.to = {
        lat: res.result.center[1],
        lon: res.result.center[0],
        name: res.result.text,
      };
    },
  },
  computed: {
    pageTitle() {
      if (this.$route.name === "Trips") return "My trips";
      return "Trip planner";
    },
    isSearchPage() {
      return (
        this.$route.name === "SearchActivity" ||
        this.$route.name === "SearchTransport"
      );
    },
    isActivityPage() {
      return this.$route.name === "SearchActivity";
    },
    getDate() {
      return new Date().toISOString().split("T")[0];
    },
  },
};
</script>

<style>
.title {
  color: white;
  font-size: 30px;
}
.header {
  background-color: #222222;
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
  z-index: 10;
  background-color: #222222;
}
.profile-icon {
  position: absolute !important;
  top: 20px;
  right: 5%;
  cursor: pointer;
}
.a-icon {
  outline: none;
  text-decoration: none !important;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}
.dropdown-menu {
  font-family: Avenir, sans-serif;
}
.vs-select--options {
  width: 400px !important;
}
.slider {
  padding-top: 25px !important;
  padding-left: 15px !important;
  padding-right: 15px !important;
}
</style>
