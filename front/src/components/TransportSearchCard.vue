<template>
  <div class="card-content">
    <vs-row id="font">
      <vs-icon
        icon="add"
        size="small"
        class="add-icon"
        @click="openModal()"
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
        {{distance}} km
      </vs-row>
      <vs-row
        vs-type="flex"
        vs-justify="flex-start"
        vs-align="center"
        class="row-content"
      >
        {{time}} h
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

export default {
  name: "TransportSearchCard",
  components: { AddToTripModal },
  props: {
    time: {
      type: Number,
      default: 0,
    },
    distance: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
      default: '',
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
    }
  },
  data() {
    return {
      openTripModal: false,
      transportId: null,
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
  async mounted() {
    const transport = await getOrCreateTransport({fromId: this.fromId, toId: this.toId, duration: this.time, distance: this.distance});
    this.transportId = transport.id;
  }
};
</script>

<style scoped>
.row-content {
  padding: 5px;
}
</style>
