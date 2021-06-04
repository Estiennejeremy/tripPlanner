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
        Prix
      </vs-row>
      <vs-row
        vs-type="flex"
        vs-justify="flex-start"
        vs-align="center"
        class="row-content"
      >
        Type de transport
      </vs-row>
      <vs-row
        vs-type="flex"
        vs-justify="flex-start"
        vs-align="center"
        class="row-content"
      >
        Temps de trajet
      </vs-row>
    </vs-row>
    <vs-popup
      title="Add this transportion to a trip"
      :active.sync="openTripModal"
      style="z-index: 10"
    >
      <AddToTripModal :close="closeModal" />
    </vs-popup>
  </div>
</template>

<script>
import "material-icons/iconfont/material-icons.css";
import AddToTripModal from "./AddToTripModal.vue";

export default {
  name: "TransportSearchCard",
  components: { AddToTripModal },
  data() {
    return {
      openTripModal: false,
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
};
</script>

<style scoped>
.row-content {
  padding: 5px;
}
</style>
