<template>
  <div class="trip-section">
    <h2>{{ nameCorresp[name] }}</h2>
    <hr class="separator">
    <div v-if="name === 'transport'" class="acti-card">
      <TransportSearchCard 
        v-for="(transport, index) in dataArray"
        :key="index"
        :transportData="transport"
        :fromId="transport.fromId.toString()"
        :toId="transport.toId.toString()"
        :date="date"
        :deleteActivity="deleteActivity"
      />
    </div>
    <div v-else class="acti-card">
      <ActivitySearchCard
        v-for="(activity, index) in dataArray"
        :key="index"
        :activityData="activity"
        :date="date"
        :deleteActivity="deleteActivity"
        @click.native="selectPin(activity)"
        imgSrc="https://img-19.ccm2.net/8vUCl8TXZfwTt7zAOkBkuDRHiT8=/1240x/smart/b829396acc244fd484c5ddcdcb2b08f3/ccmcms-commentcamarche/20494859.jpg"
      />
    </div>
  </div>
</template>

<script>
import ActivitySearchCard from "../components/ActivitySearchCard.vue";
import TransportSearchCard from "../components/TransportSearchCard.vue";

export default {
  name: "TripSection",
  components: { ActivitySearchCard, TransportSearchCard },
  data() {
    return {
      nameCorresp: {
        hotel: 'Hotel',
        bar: 'Bar',
        restaurant: 'Restaurant',
        tourist_attraction: "Cultural activity",
        transport: "Transport",
      },
    }
  },
  props: {
    name: {
      required: true,
      type: String,
    },
    dataArray: {
      required: true,
      type: Array,
    },
    date: {
      required: true,
      type: String,
    },
    deleteActivity: {
      type: Function,
      default: () => {},
    },
    selectPin: {
      type: Function,
      default: () => {},
    }
  },
}
</script>

<style scoped>
  .trip-section {
    padding: 20px;
  }
  .acti-card {
    width: 80%;
  }
  .separator {
    width: 400px;
    margin-bottom: 20px;
    border: 0;
    height: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  }
</style>