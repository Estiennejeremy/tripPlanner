<template>
  <div>
    <vs-row class="trip-page">
      <vs-col vs-lg="6" vs-sm="6" vs-xs="0">
        <MglMap
          :access-token="accessToken"
          :map-style="mapStyle"
          class="trip-map"
          @load="onMapLoad"
        />
      </vs-col>
      <vs-col vs-lg="6" vs-sm="6" vs-xs="12">
        <vs-card class="title-card">
          <div>
            <h1>{{trip.title}}</h1>
            <span>Dates : {{ trip.infos.startDate }} to {{ trip.infos.endDate }}</span>
            <br>
            <span>From {{ trip.infos.startLocation.name }} to {{ trip.infos.endLocation.name }}</span>
          </div>
            <vs-select v-model="selectedData" multiple label="Display">
              <vs-select-item
                v-for="(item, index) in selectData"
                :key="index"
                :value="item.value"
                :text="item.text"
              />
            </vs-select>
        </vs-card>
        <TripSection v-for="(section, index) in sectionsArray" :key="index" :name="section"/>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import { getTripById } from '../api_wrapper/travels';
import { getLocationById } from '../api_wrapper/locations';
import Mapbox from 'mapbox-gl';
import { MglMap } from 'vue-mapbox';
import TripSection from '../components/TripSection';

export default {
  name: 'TripPage',
  components: {
    MglMap,
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
      selectedData:["Restaurant", "Hotel", "Bar", "Train", "Bus", "Plane"],
      selectData: [
        { value: "Restaurant", text: "Restaurant" },
        { value: "Hotel", text: "Hotel" },
        { value: "Bar", text: "Bar" },
        { value: "Train", text: "Train" },
        { value: "Bus", text: "Bus" },
        { value: "Plane", text: "Plane" },
      ],
    };
  },
  async mounted() {
    this.mapbox = Mapbox;
    const trip = await getTripById(this.$route.query.id);
    this.trip.title = trip.name.charAt(0).toUpperCase() + trip.name.slice(1);
    this.trip.infos = {
      startLocation: await getLocationById(trip.fromId),
      endLocation: await getLocationById(trip.toId),
      startDate: (new Date(trip.arrivalDate)).toLocaleDateString("fr-FR"),
      endDate: (new Date(trip.departDate)).toLocaleDateString("fr-FR")
    };
  },
  methods: {
    onMapLoad({ map }) {
      map.addControl(new Mapbox.NavigationControl());
      map.flyTo({
        center: [this.trip.infos.endLocation.lon, this.trip.infos.endLocation.lat],
        zoom: 10,
        bearing: 2,
        speed: 3,
        easing(t) {
          return t;
        },
        essential: true,
      });
      // for (let i = 0; i < this.citiesCoord.length; i += 1) {
      //   new Mapbox.Marker({ color: '#118AB2' })
      //     .setLngLat([this.citiesCoord[i].long, this.citiesCoord[i].lat])
      //     .addTo(map);
      // }
    },
  },
  computed: {
    sectionsArray() {
      return this.selectedData;
    }
  }
}
</script>

<style>
.trip-page {
  height: 93vh;
}
.trip-map {
  height: 93vh;
}
.title-card {
  padding: 0 20px;
  margin-bottom: 0;
}
.vs-card--content {
  display:flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0;
}
.dropdown-custom {
  display: flex;
}
</style>