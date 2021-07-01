<template>
  <div>
    <vs-row class="trip-page">
      <vs-col vs-lg="6" vs-sm="6" vs-xs="0">
        <div id="map" style="width: 100%; height: 100%"></div>
      </vs-col>
      <vs-col vs-lg="6" vs-sm="6" vs-xs="12">
        <div class="title-card">
          <div>
            <h1>{{trip.title}}</h1>
            <span>Dates : {{ trip.infos.startDate }} to {{ trip.infos.endDate }}</span>
            <br>
            <span>From {{ trip.infos.startLocation.name }} to {{ trip.infos.endLocation.name }}</span>
          </div>
          <div>
            <vs-select v-model="selectedData" multiple label="Display">
              <vs-select-item
                v-for="(item, index) in selectData"
                :key="index"
                :value="item.value"
                :text="item.text"
              />
            </vs-select>
            <vs-button
            type="relief"
            class="print-button"
            @click.prevent="printElem"
          >
            Print my trip
          </vs-button>
          </div>
        </div>
        <div class="trips-section">
          <TripSection 
            v-for="(section, index) in sectionsArray" 
            :key="index" :name="section" 
            :dataArray="activities[section]" 
            :date="trip.infos.startDate" 
            :deleteActivity="deleteActivity"
            :selectPin="selectPin"
          />
        </div>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");

import { getTripById } from '../api_wrapper/travels';
import { getLocationById } from '../api_wrapper/locations';
import Mapbox from 'mapbox-gl';
import TripSection from '../components/TripSection';
import {getAllPlanningByTripId, deletePlanningById} from '../api_wrapper/planning';
import {getTransportById } from '../api_wrapper/transport';
import {getActivityById} from "../api_wrapper/activity";

export default {
  name: 'TripPage',
  components: {
    TripSection,
  },
  data() {
    return {
      accessToken: 'pk.eyJ1IjoidGlmYWluZWsiLCJhIjoiY2tvY3k4OW1pMG1nNjJvbjFwcnNzNWI4eiJ9.4GbB9581EIhx7AA43BpmTg',
      mapStyle: 'mapbox://styles/tifainek/ckor6l9ku14w217q9l71uvj2y',
      trip: {
        title: '',
        infos: {
          endLocation: {},
          startLocation: {},
          startDate: '',
          endDate: '',
        },
      },
      selectedData:["restaurant", "hotel", "bar", "tourist_attraction", "transport"],
      selectData: [
        { value: "restaurant", text: "Restaurant" },
        { value: "hotel", text: "Hotel" },
        { value: "bar", text: "Bar" },
        { value: "tourist_attraction", text: "Activity" },
        { value: "transport", text: "Transport" },
      ],
      activities: {
        restaurant: [],
        hotel: [],
        bar: [],
        tourist_attraction: [],
        transport: [],
      },
      coordArray: [],
      map: {},
      markers: [],
      selectedCoord: {
        lat: 0,
        lon: 0,
      },
    };
  },
  async mounted() {
    mapboxgl.accessToken = this.accessToken;
    const trip = await getTripById(this.$route.query.id);
    this.trip.title = trip.name.charAt(0).toUpperCase() + trip.name.slice(1);
    this.trip.infos = {
      startLocation: await getLocationById(trip.fromId),
      endLocation: await getLocationById(trip.toId),
      startDate: (new Date(trip.arrivalDate)).toLocaleDateString("fr-FR"),
      endDate: (new Date(trip.departDate)).toLocaleDateString("fr-FR")
    };
    this.map = new mapboxgl.Map({
      container: 'map', // container id
      style: this.mapStyle, // style URL
      center: [this.trip.infos.endLocation.lon, this.trip.infos.endLocation.lat], // starting position [lng, lat]
      zoom: 10 // starting zoom
    });
    await this.getAndFormatActivities();
    this.addMarkers();
  },
  methods: {
    async printElem() {
      const myWindow = window.open('', 'PRINT', 'height=400,width=600');
      myWindow.document.write('<html><head><title>Print my trip</title></head><body>');
      myWindow.document.write(`<h1>${this.trip.title}</h1>`);
      myWindow.document.write(`<h2>From ${this.trip.infos.startLocation.name} to ${this.trip.infos.endLocation.name}</h2>`);
      myWindow.document.write(`<h4>Restaurant</h4>`);
      this.printSection(this.activities.restaurant, myWindow);
      myWindow.document.write(`<h4>Bar</h4>`);
      this.printSection(this.activities.bar, myWindow);
      myWindow.document.write(`<h4>Hotel</h4>`);
      this.printSection(this.activities.hotel, myWindow);
      myWindow.document.write(`<h4>Activities</h4>`);
      this.printSection(this.activities.tourist_attraction, myWindow);
      myWindow.document.write(`<h4>Transport</h4>`);
      for (let i = 0; i < this.activities.transport.length; i++) {
        myWindow.document.write(`<p>- Duration: ${this.activities.transport[i].duration}h Distance: ${this.activities.transport[i].distance}km</p>`);
      }
      myWindow.document.write('</body></html>');
      myWindow.print();
      myWindow.close();
    },

    printSection(section, myWindow) {
      for (let i = 0; i < section.length; i++) {
        myWindow.document.write(`<p>- Name: ${section[i].name} Adress: ${section[i].address}</p>`);
      }
    },
    async selectPin(activity) {
      const location = await getLocationById(activity.locationId);
      if (this.selectedCoord.lon !== 0 && this.selectedCoord.lat !== 0) {
        const marker = new mapboxgl.Marker({ color: '#118AB2' })
          .setLngLat([this.selectedCoord.lon, this.selectedCoord.lat])
          .addTo(this.map);
        this.markers.push(marker)
      }
      this.selectedCoord.lon = location.lon;
      this.selectedCoord.lat = location.lat;
      const marker2 = new mapboxgl.Marker({ color: '#fc2171' })
        .setLngLat([this.selectedCoord.lon, this.selectedCoord.lat])
        .addTo(this.map);
      this.markers.push(marker2)
      this.map.flyTo({center: [location.lon, location.lat], zoom: 15, speed: 1,})
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
      const allActis = await getAllPlanningByTripId(this.$route.query.id);
      for await (const activity of allActis) {
        if (activity.transportId) {
          let transport = await getTransportById(activity.transportId);
          transport.planningId = activity.id;
          this.activities.transport.push(transport);
        }
        if (activity.activityId) {
          let acti = await getActivityById(activity.activityId);
          acti.planningId = activity.id;
          this.activities[acti.type[0]].push(acti);
          let location = await getLocationById(acti.locationId);
          this.coordArray.push(location);
        }
      }
    },
    async deleteActivity(id) {
      await deletePlanningById(id);
      this.activities = {
        restaurant: [],
        hotel: [],
        bar: [],
        tourist_attraction: [],
        transport: [],
      }
      await this.getAndFormatActivities();
    }
  },
  computed: {
    sectionsArray() {
      return this.selectedData;
    }
  }
}
</script>

<style scoped>
.trip-page {
  height: 93vh;
}
.trip-map {
  height: 93vh;
}
.title-card {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  margin-bottom: 0;
  padding: 20px 40px;
  background-color: white;
  border-radius: 0 0 10px 10px;
  box-shadow: 0 5px 5px rgba(212, 212, 212, .4);
}
.card-content {
  display:flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0;
}
.dropdown-custom {
  display: flex;
}
.trips-section {
  height: 80vh;
  overflow: scroll;
}
.print-button {
  margin-top: 10px;
}
</style>