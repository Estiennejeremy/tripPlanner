<template>
  <div class="card-content">
    <vs-row id="font">
      <vs-icon
      v-if="isAddDisplay"
        icon="add"
        size="small"
        class="add-icon"
        @click="openModal()"
      ></vs-icon>
      <vs-icon
        v-else
        icon="delete"
        size="small"
        class="add-icon"
        @click.prevent="deleteActivity(transportData.planningId)"
      ></vs-icon>
      <vs-row
        vs-type="flex"
        vs-justify="flex-start"
        vs-align="center"
        class="row-content"
      >
        <h3>{{title}}</h3>
      </vs-row>
      <vs-row
        vs-type="flex"
        vs-justify="flex-start"
        vs-align="center"
        class="row-content"
      >
        {{transportData.distance}} km
      </vs-row>
      <vs-row
        vs-type="flex"
        vs-justify="flex-start"
        vs-align="center"
        class="row-content"
      >
        {{transportData.duration}} h
      </vs-row>
    </vs-row>
    <vs-popup
      title="Add this transportion to a trip"
      :active.sync="openTripModal"
      style="z-index: 10"
    >
      <AddToTripModal :close="closeModal" :transportId="transportId" :date="date"/>
    </vs-popup>
  </div>
</template>

<script>
import "material-icons/iconfont/material-icons.css";
import AddToTripModal from "./AddToTripModal.vue";
import { getOrCreateTransport } from '../api_wrapper/transport';
import {getLocationById} from '../api_wrapper/locations';

export default {
  name: "TransportSearchCard",
  components: { AddToTripModal },
  props: {
    transportData: {
      type: Object,
      required: true,
    },
    fromId: {
      type: String,
      default: '',
    },
    toId: {
      type: String,
      default: '',
    },
    date: {
      type: String,
      defult: '',
    },
    deleteActivity: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      openTripModal: false,
      transportId: null,
      title: '',
    };
  },
  methods: {
    openModal() {
      this.openTripModal = true;
    },
    closeModal() {
      this.openTripModal = false;
    },
  },
  computed: {
    isAddDisplay() {
      return this.$route.name !== "Trip";
    }
  },
  async mounted() {
    this.from = await getLocationById(this.fromId);
    this.to = await getLocationById(this.toId);
    this.title = `From ${this.from.name} to ${this.to.name}`;
    const transport = await getOrCreateTransport({fromId: this.fromId, toId: this.toId, duration: this.transportData.duration, distance: this.transportData.distance});
    this.transportId = transport.id;
  }
};
</script>

<style scoped>
.row-content {
  padding: 5px;
}
</style>
