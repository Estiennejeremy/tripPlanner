<template>
  <div class="card-content">
    <vs-row>
      <vs-icon
        icon="add"
        size="small"
        class="add-icon"
        @click.prevent="openModal()"
      ></vs-icon>
      <vs-col vs-w="4" vs-justify="center" vs-align="center" vs-type="flex">
        <img :src="imgSrc" class="img-slot" />
      </vs-col>
      <vs-col vs-w="8">
        <vs-row
          vs-type="flex"
          vs-justify="center"
          vs-align="center"
          class="card-header"
        >
          <h3>{{ title }}</h3>
        </vs-row>
        <vs-row class="description">
          <p id="font">Description</p>
        </vs-row>
        <vs-row id="font" class="card-footer" vs-align="flex-end">
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6"
            >Prix</vs-col
          >
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6"
            >Type de lieu</vs-col
          >
        </vs-row>
      </vs-col>
    </vs-row>
    <vs-popup title="Add this activity to a trip" :active.sync="openTripModal" style="z-index: 10">
      <AddToTripModal :close="closeModal"/>
    </vs-popup>
  </div>
</template>

<script>
import "material-icons/iconfont/material-icons.css";
import AddToTripModal from "./AddToTripModal.vue";

export default {
  name: "ActivitySearchCard",
  components: { AddToTripModal },
  props: {
    title: {
      type: String,
      required: true,
    },
    imgSrc: {
      type: String,
      required: true,
    },
  },
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
.description {
  padding: 5px;
  width: 100%;
}
.img-slot {
  width: 100%;
  border-radius: 5px;
}
.card-header {
  padding: 5px;
}
.card-content {
  width: 100%;
  height: fit-content;
  background: #fff;
  border-radius: 8px;
  margin-bottom: 20px;
  -webkit-box-shadow: 0 4px 25px 0 rgb(0 0 0 / 10%);
  box-shadow: 0 4px 25px 0 rgb(0 0 0 / 10%);
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  padding-top: 0px;
  padding: 5px;
}

.click {
  cursor: pointer;
}
</style>
