<template>
  <div class="add-to-trip">
    <vs-row vs-justify="center">
      <vs-select v-model="selectedData" label="Select a trip">
        <vs-select-item
          v-for="(trip, index) in trips"
          :key="index"
          :value="trip.id"
          :text="trip.name"
          id="select-trip"
        />
      </vs-select>
    </vs-row>
    <vs-row vs-justify="center">
      <vs-button
      type="relief"
      class="button"
      @click.prevent="addToTrip()"
    >
      Save
    </vs-button>
    </vs-row>
  </div>
</template>

<script>
import "material-icons/iconfont/material-icons.css";
import { getUserTripsByUserId } from "../api_wrapper/travels";
import Cookies from "js-cookie";
import { getUserByToken } from "../api_wrapper/users";
import { addActivityToTrip, addTransportToTrip } from "../api_wrapper/planning";

export default {
  name: "AddToTripModal",
  data() {
    return {
      trips: [],
      user: {},
      selectedData: '',
    };
  },
  props: {
    close: {
      type: Function,
      required: true,
    },
    activityId: {
      type: Number,
      default: null,
    },
    transportId: {
      type: Number,
      default: null,
    },
    date: {
      type: String,
      default: ''
    }
  },
  methods: {
    async addToTrip() {
      if (this.activityId) {
        const res = await addActivityToTrip({
          travelId: this.selectedData,
          date: this.date,
          activityId: this.activityId
        });
      }
      if (this.transportId) {
        const res = await addTransportToTrip({
          travelId: this.selectedData,
          date: this.date,
          transportId: this.transportId
        });
      }
      this.close();
    }
  },
  async mounted() {
    this.user = await getUserByToken(Cookies.get("token"));
    this.trips = await getUserTripsByUserId(this.user.id);
  },
};
</script>

<style scoped>
.button {
  width: 150px;
  margin-top: 20px;
}

.add-to-trip {
  padding: 20px;
}
</style>
