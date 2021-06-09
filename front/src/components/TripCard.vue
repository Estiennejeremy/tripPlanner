<template>
    <vs-card actionable class="cardx">
      <div slot="header">
        <h3>
          {{ title }}
        </h3>
      </div>
      <div slot="media">
        <img :src="imgSrc">
      </div>
      <div>
        <span>Dates : {{ tripInfos.startDate }} to {{ tripInfos.endDate }}</span>
        <br>
        <span>From {{ tripInfos.startLocation }} to {{ tripInfos.endLocation }}</span>
      </div>
      <div slot="footer" v-if="!noButton">
        <vs-row vs-justify="flex-end">
          <vs-button 
            color="primary"
            type="relief"
            class="open-button"
            @click.prevent="goToTrip()"
          >
            Open
          </vs-button>
          <vs-button color="danger" type="relief" @click.prevent="deleteTrip()">Delete</vs-button>
        </vs-row>
      </div>
    </vs-card>
</template>

<script>
import { deleteTripById } from '../api_wrapper/travels';

export default {
  name: "TripCard",
  props: {
    tripId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    tripInfos: {
      type: Object,
      required: true,
    },
    imgSrc: {
      type: String,
      required: true,
    },
    noButton: Boolean
  },
  methods: {
    goToTrip() {
      this.$router.push(`/trip?id=${this.tripId}`);
    },
    async deleteTrip() {
      await deleteTripById(this.tripId);
      window.location.href = "/trips";
    }
  }
}
</script>

<style scoped>
  .open-button {
    margin-right: 10px;
  }
</style>