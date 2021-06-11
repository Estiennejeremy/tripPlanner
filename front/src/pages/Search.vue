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
            <vs-row vs-type="flex" vs-justify="space-around" vs-w="12" v-if="isActivity">
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
                <vs-select placeholder="Price" v-model="priceText" label="Price">
                  <div class="slider">
                    <vs-slider
                      v-model="price"
                      text-fixed="€"
                      v-on:change="setPrice"
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
                        getToLocation(res);
                      }
                    "
                    class="places-input"
                  />
                </div>
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
                <vs-select placeholder="Price" v-model="priceText" label="Price">
                  <div class="slider">
                    <vs-slider
                      v-model="price"
                      text-fixed="€"
                      v-on:change="setPrice"
                    />
                  </div>
                </vs-select>
              </vs-col>
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
            </vs-row>
          </div>
          <div v-if="isActivity"> 
            <activity-search-card
              v-for="(activity, index) in activitiesArray"
              :key="index"
              @click.native="selectPin(activity.long, activity.lat)"
              :title="activity.title"
              imgSrc="https://img-19.ccm2.net/8vUCl8TXZfwTt7zAOkBkuDRHiT8=/1240x/smart/b829396acc244fd484c5ddcdcb2b08f3/ccmcms-commentcamarche/20494859.jpg"
            />
          </div>
          <div v-else>
            <transport-search-card 
              v-for="(transport, index) in transportsArray"
              :key="index"
              @click.native="selectPin(transport.long, transport.lat)"
              :title="transport.title"
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

export default {
  name: "Search",
  components: { ActivitySearchCard, TransportSearchCard },
  data() {
    return {
      map: {},
      accessToken: 'pk.eyJ1IjoidGlmYWluZWsiLCJhIjoiY2tvY3k4OW1pMG1nNjJvbjFwcnNzNWI4eiJ9.4GbB9581EIhx7AA43BpmTg',
      mapStyle: 'mapbox://styles/tifainek/ckor6l9ku14w217q9l71uvj2y',
      restaurants: true,
      hotels: true,
      bars: true,
      activities: true,
      plane: true,
      train: true,
      car: true,
      boat: true,
      switchStatus: "",
      range: "10",
      price: [0, 100],
      selectedDate: "",
      priceText: "",
      rangeText: "",
      activitiesArray: [
        {
          title: "Activité 1",
          lat: 43.6333,
          long: 1.4,
        },
        {
          title: "Activité 2",
          lat: 43.6043,
          long: 1.4437,
        }
      ],
      transportsArray: [
        {
          type: "Plane",
          lat: 48.8534,
          long: 2.3488,
        },
        {
          type: "Car",
          lat: 48.8534,
          long: 2,
        }
      ],
      selectedCoord: {
        lat: 0,
        long: 0,
      },
      markers: [],
    };
  },
  methods: {
    switchType() {
      this.selectedCoord = {lat: 0, long: 0};
      this.removeMarkers();
      if (this.$route.name == "SearchActivity") {
        this.$router.replace("/search/transport");
      } else {
        this.$router.replace("/search/activity");
      }
      this.map.flyTo({center: [this.coordArray[0].long, this.coordArray[0].lat], zoom: 10, speed: 1,})
      this.addMarkers();
    },
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
    selectPin(long, lat) {
      if (this.selectedCoord.long !== 0 && this.selectedCoord.lat !== 0) {
        const marker = new mapboxgl.Marker({ color: '#118AB2' })
          .setLngLat([this.selectedCoord.long, this.selectedCoord.lat])
          .addTo(this.map);
        this.markers.push(marker)
      }
      this.selectedCoord.long = long;
      this.selectedCoord.lat = lat;
      const marker2 = new mapboxgl.Marker({ color: '#fc2171' })
        .setLngLat([this.selectedCoord.long, this.selectedCoord.lat])
        .addTo(this.map);
      this.markers.push(marker2)
      this.map.flyTo({center: [long, lat], zoom: 10, speed: 0.5,})
    },
    addMarkers() {
      for (let i = 0; i < this.coordArray.length; i += 1) {
      let marker = new mapboxgl.Marker({ color: '#118AB2' })
        .setLngLat([this.coordArray[i].long, this.coordArray[i].lat])
        .addTo(this.map);
      this.markers.push(marker);
      };
    },
    removeMarkers() {
      this.markers.forEach((marker) => marker.remove())
      this.markers = []
    }
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
      if (this.isActivity) return this.activitiesArray;
      else return this.transportsArray;
    }
  },
  mounted() {
    mapboxgl.accessToken = this.accessToken;
    this.setRange();
    if (this.$route.name == "SearchActivity") this.switchStatus = true;
    else this.switchStatus = false;
    this.map = new mapboxgl.Map({
      container: 'map', // container id
      style: this.mapStyle, // style URL
      center: [this.$route.query.lon || this.coordArray[0].long, this.$route.query.lat || this.coordArray[0].lat], // starting position [lng, lat]
      zoom: 9 // starting zoom
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
