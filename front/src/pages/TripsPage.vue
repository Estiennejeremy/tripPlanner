<template>
  <div class="trips-page">
    <vs-row vs-justify="flex-end">
      <vs-button 
        color="primary" 
        type="border"
        icon="add"
        size="large"
        @click.prevent="openModal()"
      >
        Add a trip
      </vs-button>
    </vs-row>
    <vs-row vs-justify="center">
      <vs-col
        v-for="trip in trips"
        :key="trip.id"
        vs-lg="3"
        vs-sm="6"
        vs-xs="12"
        class="trip-card"
        ref="trip"
      >
        <TripCard 
        :title="trip.title"
        :tripInfos="trip.infos"
        :imgSrc="trip.image"
        :tripId="trip.id"
        ></TripCard>
      </vs-col>
    </vs-row>
    <vs-popup title="Add a trip" :active.sync="openTripModal">
      <CreateTripModal ref="modal"/>
    </vs-popup>
  </div>
</template>

<script>
import TripCard from '../components/TripCard.vue';
import CreateTripModal from '../components/CreateTripModal.vue';
import { getUserTripsByUserId } from '../api_wrapper/travels';
import Cookies from 'js-cookie';
import { getUserByToken } from '../api_wrapper/users';
import { getLocationById } from '../api_wrapper/locations';

export default {
  name: "TripsPage",
  components: { TripCard, CreateTripModal },
  data() {
    return {
      openTripModal: false,
      trips: [],
      user: {},
    }
  },
  async mounted() {
    this.user = await getUserByToken(Cookies.get('token'));
    const trips = await getUserTripsByUserId(this.user.id);
    await this.formatTrips(trips);
    this.$refs.modal.$on("updateData", async () => {
      const trips = await getUserTripsByUserId(this.user.id);
      await this.formatTrips(trips);
    });
  },
  methods: {
    openModal() {
      this.openTripModal = true;
    },
    async getLocationName(locationId) {
      const location = await getLocationById(locationId);
    },
    // TODO: find a way to get locations name in the loop 
    async formatTrips(trips) {
      this.trips = [];
      for await (const trip of trips) {
        let formattedTrip = {};
        formattedTrip.title = trip.name.charAt(0).toUpperCase() + trip.name.slice(1);
        formattedTrip.id = trip.id.toString();
        formattedTrip.infos = {
          startLocation: (await getLocationById(trip.fromId)).name,
          endLocation: (await getLocationById(trip.toId)).name,
          startDate: (new Date(trip.arrivalDate)).toLocaleDateString("fr-FR"),
          endDate: (new Date(trip.departDate)).toLocaleDateString("fr-FR")
        };
        formattedTrip.image = `/landscape${Math.floor(Math.random() * 5) + 1}.jpg`
        this.trips.push(formattedTrip);
      }
    },
  }
}
</script>

<style scoped>
  .trip-card {
    margin: 20px 20px 0 20px!important;
    /* max-width: 300px; */
  }
  .trips-page {
    padding: 20px;
  }
</style>