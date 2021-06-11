<template>
  <div class="background-black">
    <div
      class="header"
      @mouseover="hover = true"
      @mouseleave="hover = false"
      :class="{ hover: hover }"
    >
      <h1 class="title" @click.prevent="goToHomepage()">
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
      from: {},
      to: {},
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
      this.goToHomepage();
    },
    goToHomepage() {
      this.$router.push("/");
    },
    goToTrips() {
      this.$router.push("/trips");
    },
  },
  computed: {
    pageTitle() {
      if (this.$route.name === "Trips") return "My trips";
      return "Trip planner";
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
</style>
