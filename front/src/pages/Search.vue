<template>
  <div>
    <vs-row class="row">
      <vs-col
        vs-justify="center"
        vs-align="center"
        vs-w="4"
        vs-lg="4"
        vs-xs="12"
      >
        <vs-card class="search-bar" style="display: block">
          <div slot="header">
            <vs-row vs-type="flex" vs-justify="center" vs-w="12" class="checkboxes">
              <vs-col v-if="isActivity" vs-justify="space-between" vs-w="9">
                <vs-row id="font">
                  <vs-checkbox v-model="activitiesChecked" vs-value="tourist_attraction" id="font"
                    >Activities</vs-checkbox
                  >
                  <vs-checkbox v-model="activitiesChecked" vs-value="restaurant" id="font"
                    >Restaurants</vs-checkbox
                  >
                  <vs-checkbox v-model="activitiesChecked" vs-value="hotel" id="font">Hotels</vs-checkbox>
                  <vs-checkbox v-model="activitiesChecked" vs-value="bar" id="font">Bars</vs-checkbox>
                </vs-row>
              </vs-col>
              <vs-col
                v-if="isTransport"
                vs-justify="space-evenly"
                vs-lg="8"
                vs-sm="8"
              >
                <vs-row>
                  <vs-checkbox v-model="foot" disabled>By foot</vs-checkbox>
                  <vs-checkbox v-model="bike" disabled>Bike</vs-checkbox>
                  <vs-checkbox v-model="car" disabled>Car</vs-checkbox>
                </vs-row>
              </vs-col>
            </vs-row>
            <vs-row vs-type="flex" vs-justify="center" vs-w="12" v-if="isActivity">
              <vs-col 
                vs-type="flex"
                vs-lg="5"
                vs-sm="5"
                vs-xs="12"
              >
                <vs-select placeholder="Range" v-model="rangeText" label="Range">
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
                vs-type="flex"
                vs-lg="5"
                vs-sm="5"
                vs-xs="12"
              >
                <vs-input
                  type="date"
                  :min="getDate"
                  :value="getDate"
                  v-model="selectedDate"
                  label="Date"
                />
              </vs-col>
              <vs-col
                vs-type="flex"
                vs-lg="5"
                vs-sm="5"
                vs-xs="12"
              >
                <div class="vs-component vs-con-input-label vs-input vs-input-primary">
                  <label class="vs-input--label">City</label>
                  <mapbox-geocoder
                    access-token="pk.eyJ1IjoidGlmYWluZWsiLCJhIjoiY2tvbzl5ODZqMDlqOTJ5bnVxb3Z0dWNtNyJ9.EsQKq2Ll_f7hmDaY_DCflA"
                    @mb-created="(instance) => (control = instance)"
                    types="place"
                    :limit="2"
                    @mb-result="
                      (res) => {
                        getCityLocation(res);
                      }
                    "
                    class="places-input"
                  />
                </div>
              </vs-col>
              <vs-col
                vs-type="flex"
                vs-lg="5"
                vs-sm="5"
                vs-xs="12"
              >
                <vs-button
                    type="relief"
                    class='button'
                    @click.prevent="search"
                  >Search</vs-button>
              </vs-col>
            </vs-row>
            <vs-row vs-type="flex" vs-justify="space-around" vs-w="12" v-if="isTransport">
              <vs-col
                vs-type="flex"
                vs-lg="5"
                vs-sm="5"
                vs-xs="12"
                vs-justify="center"
              >
              <div class="vs-component vs-con-input-label vs-input vs-input-primary">
                <label class="vs-input--label">To</label>
                <mapbox-geocoder
                  access-token="pk.eyJ1IjoidGlmYWluZWsiLCJhIjoiY2tvbzl5ODZqMDlqOTJ5bnVxb3Z0dWNtNyJ9.EsQKq2Ll_f7hmDaY_DCflA"
                  @mb-created="(instance) => (control = instance)"
                  types="place"
                  :limit="4"
                  @mb-result="
                    (res) => {
                      getToLocation(res);
                    }
                  "
                  class="places-input"
                />
              </div>
              </vs-col>
              <vs-col
                vs-type="flex"
                vs-lg="5"
                vs-sm="5"
                vs-xs="12"
              >
                <div class="vs-component vs-con-input-label vs-input vs-input-primary">
                  <label class="vs-input--label">From</label>
                  <mapbox-geocoder
                    access-token="pk.eyJ1IjoidGlmYWluZWsiLCJhIjoiY2tvbzl5ODZqMDlqOTJ5bnVxb3Z0dWNtNyJ9.EsQKq2Ll_f7hmDaY_DCflA"
                    @mb-created="(instance) => (control = instance)"
                    types="place"
                    :limit="4"
                    @mb-result="
                      (res) => {
                        getFromLocation(res);
                      }
                    "
                    class="places-input"
                  />
                </div>
              </vs-col>
              <vs-col
                vs-type="flex"
                vs-lg="5"
                vs-sm="5"
                vs-xs="12"
                vs-justify="center"
              >
                <vs-input
                  type="date"
                  :min="getDate"
                  :value="getDate"
                  v-model="selectedDate"
                  label="Date"
                />
              </vs-col>
              <vs-col
                vs-lg="5"
                vs-sm="5"
                vs-xs="12"
              >
                <vs-button
                  type="relief"
                  class='button'
                  @click.prevent="search"
                >Search</vs-button>
              </vs-col>
            </vs-row>
          </div>
          <div v-if="isActivity" class="activities"> 
            <activity-search-card
              v-for="(activity, index) in activitiesArray"
              :key="index"
              @click.native="selectPin(activity.lon, activity.lat)"
              :activityData="activity"
              :date="selectedDate"
              imgSrc="https://img-19.ccm2.net/8vUCl8TXZfwTt7zAOkBkuDRHiT8=/1240x/smart/b829396acc244fd484c5ddcdcb2b08f3/ccmcms-commentcamarche/20494859.jpg"
            />
          </div>
          <div v-else>
            <transport-search-card 
              v-for="(transport, index) in transportsArray"
              :key="index"
              :title="transport.title"
              :distance="transport.distance"
              :time="transport.time"
              :fromId="fromId"
              :toId="toId"
              :date="selectedDate"
            />
          </div>
        </vs-card>
      </vs-col>
      <vs-col vs-w="8" vs-lg="8" vs-xs="3">
        <div id="map" style="width: 100%; height: 100%"></div>
      </vs-col>
    </vs-row>
  </div>
</template>
<script>
const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");
import ActivitySearchCard from "../components/ActivitySearchCard.vue";
import TransportSearchCard from "../components/TransportSearchCard.vue";
import Mapbox from 'mapbox-gl';
import { getLocationsActivities } from '../api_wrapper/activity';
import {getLocationById, getOrCreate} from '../api_wrapper/locations';
import {getTransports} from '../api_wrapper/transport';

export default {
  name: "Search",
  components: { ActivitySearchCard, TransportSearchCard },
  data() {
    return {
      map: {},
      accessToken: 'pk.eyJ1IjoidGlmYWluZWsiLCJhIjoiY2tvY3k4OW1pMG1nNjJvbjFwcnNzNWI4eiJ9.4GbB9581EIhx7AA43BpmTg',
      mapStyle: 'mapbox://styles/tifainek/ckor6l9ku14w217q9l71uvj2y',
      activitiesChecked: [],
      foot: true,
      bike: true,
      car: true,
      boat: true,
      range: "10",
      price: [0, 100],
      selectedDate: "",
      priceText: "",
      rangeText: "",
      fromId: '',
      toId: '',
      cityId: '',
      city: '',
      to: '',
      from: '',
      activitiesArray: [],
      transportsArray: [],
      selectedCoord: {
        lat: 0,
        lon: 0,
      },
      markers: [],
      date: '',
    };
  },
  methods: {
    setRange() {
      this.rangeText = "Within " + this.range + "km";
    },
    setPrice() {
      this.priceText = `${this.price[0]} - ${this.price[1]}€`;
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
    getCityLocation(res) {
      this.city = {
        lat: res.result.center[1],
        lon: res.result.center[0],
        name: res.result.text,
      };
    },
    selectPin(lon, lat) {
      if (this.selectedCoord.lon !== 0 && this.selectedCoord.lat !== 0) {
        const marker = new mapboxgl.Marker({ color: '#118AB2' })
          .setLngLat([this.selectedCoord.lon, this.selectedCoord.lat])
          .addTo(this.map);
        this.markers.push(marker)
      }
      this.selectedCoord.lon = lon;
      this.selectedCoord.lat = lat;
      const marker2 = new mapboxgl.Marker({ color: '#fc2171' })
        .setLngLat([this.selectedCoord.lon, this.selectedCoord.lat])
        .addTo(this.map);
      this.markers.push(marker2)
      this.map.flyTo({center: [lon, lat], zoom: 15, speed: 1,})
    },
    addMarkers() {
      for (let i = 0; i < this.coordArray.length; i += 1) {
      let marker = new mapboxgl.Marker({ color: '#118AB2' })
        .setLngLat([this.coordArray[i].lon, this.coordArray[i].lat])
        .addTo(this.map);
      this.markers.push(marker);
      };
    },
    removeMarkers() {
      this.markers.forEach((marker) => marker.remove())
      this.markers = []
    },
    async getAndFormatActivities() {
      this.city = await getLocationById(this.cityId);
      this.activitiesArray = await getLocationsActivities({
        lon: this.city.lon,
        lat: this.city.lat,
        range: this.range,
        types: ['tourist_attraction', 'restaurant', 'hotel', 'bar']
      });
      this.activitiesArray = this.activitiesArray.filter(activity => this.isValueInCheckedArray(activity.type[0]))
    },
    isValueInCheckedArray(value) {
      for (let i = 0; i < this.activitiesChecked.length; i++) {
        if (value === this.activitiesChecked[i]) return true;
      }
      return false;
    },
    async getAndFormatTransport() {
      this.from = await getLocationById(this.fromId);
      this.to = await getLocationById(this.toId);
      this.transportsArray = await getTransports({
        from: {
          lon: this.from.lon,
          lat: this.from.lat
        },
        to: {
          lon: this.to.lon,
          lat: this.to.lat
        },
      });
      for (let i = 0; i < this.transportsArray.length; i++) {
        this.transportsArray[i] = {
          title: `From ${this.from.name} to ${this.to.name}`,
          time: Math.round(this.transportsArray[i].duration  / 3600),
          distance: Math.round(this.transportsArray[i].distance / 1000),
        };
      }
    },
    async search() {
      if (this.isActivity) {
        this.city = await getOrCreate({lon: this.city.lon, lat: this.city.lat, name: this.city.name});
        this.cityId = this.city.id.toString();
        this.removeMarkers();
        this.map.flyTo({center: [this.city.lon, this.city.lat], zoom: 10, speed: 1,})
        await this.getAndFormatActivities();
        this.addMarkers();
      }
      else {
        this.from = await getOrCreate({lon: this.from.lon, lat: this.from.lat, name: this.from.name});
        this.to = await getOrCreate({lon: this.to.lon, lat: this.to.lat, name: this.to.name});
        this.fromId = this.from.id.toString();
        this.toId = this.to.id.toString();
        this.removeMarkers();
        this.addMarkers();
        this.map.flyTo({center: [this.from.lon, this.from.lat], zoom: 5, speed: 1,})
        await this.getAndFormatTransport();
      }
    },
  },
  computed: {
    getDate() {
      return new Date().toISOString().split("T")[0];
    },
    isActivity() {
      return this.$route.name == "SearchActivity";
    },
    isTransport() {
      return this.$route.name == "SearchTransport";
    },
    coordArray() {
      if (this.isActivity) {
        return this.activitiesArray;
      } 
      else {
        return [{lon: this.from.lon, lat: this.from.lat}, {lon: this.to.lon, lat: this.to.lat}]
      }
    }
  },

  async mounted() {
    mapboxgl.accessToken = this.accessToken;
    this.setRange();
    this.selectedDate = this.$route.query.date;
    let zoom = 12;
    if (this.isActivity) {
      this.cityId = this.$route.query.placeId;
      this.activitiesChecked.push(this.$route.query.type)
      await this.getAndFormatActivities();
    }
    else {
      this.fromId = this.$route.query.fromId;
      this.toId = this.$route.query.toId
      await this.getAndFormatTransport();
      zoom = 4;
    }
    this.map = new mapboxgl.Map({
      container: 'map', // container id
      style: this.mapStyle, // style URL
      center: [this.$route.query.lon || this.coordArray[0].lon, this.$route.query.lat || this.coordArray[0].lat], // starting position [lng, lat]
      zoom: zoom // starting zoom
    });
    this.addMarkers();
  },
};
</script>
<style>
.map {
  width: 100%;
  height: 100%;
}

.slider {
  padding: 25px 15px 0 15px !important;
}

.checkboxes {
  padding: 20px 0;
}

.search-bar {
  height: 100%;
}

.row {
  height: 94vh;
  width: 100vw;
  overflow: hidden !important;
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

.activities {
  height: 80vh;
  overflow: scroll;
}

.button {
  width: 200px;
  height: 40px;
  margin-top: 10px;
}
</style>
