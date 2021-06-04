<template>
  <div>
    <vs-row vs-justify="center">
      <vs-col
        v-for="trip in trips"
        :key="trip.id"
        vs-lg="3"
        vs-sm="6"
        vs-xs="12"
        class="trip-card"
      >
        <TripCard
          :title="trip.title"
          :tripInfos="trip.infos"
          :imgSrc="trip.image"
          :tripId="trip.id"
          class="click"
          @click="addToTrip(trip)"
          :noButton="true"
        ></TripCard>
      </vs-col>
      <vs-col vs-lg="3" vs-sm="6" vs-xs="12" vs-justify="center" vs-align="center" id="add-icon">
          <vs-icon
            icon="add"
            size="large"
            @click.prevent="openCreateTripModal = true"
          ></vs-icon>
          <h5 class="vs-input--label" id="font">Create a trip</h5>
      </vs-col>
    </vs-row>
    <vs-row vs-justify="flex-end">
      <vs-button color="danger" type="relief" @click.prevent="close"
        >Cancel</vs-button
      >
    </vs-row>
    <vs-popup title="Add a trip" :active.sync="openCreateTripModal">
      <CreateTripModal ref="modal" />
    </vs-popup>
  </div>
</template>

<script>
import "material-icons/iconfont/material-icons.css";
import CreateTripModal from "./CreateTripModal.vue";
import TripCard from "./TripCard.vue";
import { getUserTripsByUserId } from "../api_wrapper/travels";
import Cookies from "js-cookie";
import { getUserByToken } from "../api_wrapper/users";

export default {
  name: "AddToTripModal",
  components: { CreateTripModal, TripCard },
  data() {
    return {
      trips: [],
      user: {},
      openCreateTripModal: false,
    };
  },
  props: {
    close: {
      type: Function,
      required: true,
    },
  },
  methods: {
    async formatTrips(trips) {
      this.trips = [];
      for await (const trip of trips) {
        let formattedTrip = {};
        formattedTrip.title =
          trip.name.charAt(0).toUpperCase() + trip.name.slice(1);
        formattedTrip.id = trip.id.toString();
        formattedTrip.infos = {
          startLocation: "Start",
          endLocation: "End",
          startDate: new Date(trip.arrivalDate).toLocaleDateString("fr-FR"),
          endDate: new Date(trip.departDate).toLocaleDateString("fr-FR"),
        };
        formattedTrip.image = `/landscape${Math.floor(Math.random() * 5) +
          1}.jpg`;
        this.trips.push(formattedTrip);
      }
    },
  },
  async mounted() {
    this.user = await getUserByToken(Cookies.get("token"));
    const trips = await getUserTripsByUserId(this.user.id);
    await this.formatTrips(trips);
    this.$refs.modal.$on("updateData", async () => {
      const trips = await getUserTripsByUserId(this.user.id);
      await this.formatTrips(trips);
    });
  },
};
</script>

<style scoped>
.open-button {
  margin-right: 10px;
}
.click {
  cursor: pointer;
  margin-left: 5px;
  margin-right: 5px;
}
#add-icon {
  align-content: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}
</style>
