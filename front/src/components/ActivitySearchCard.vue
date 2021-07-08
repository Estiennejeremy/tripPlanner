<template>
  <div class="card-content">
    <vs-row>
      <vs-icon
        v-if="isAddDisplay"
        icon="add"
        size="small"
        class="add-icon"
        @click.prevent="openModal()"
      ></vs-icon>
      <vs-icon
        v-else
        icon="delete"
        size="small"
        class="add-icon"
        @click.prevent="deleteActivity(activityData.planningId)"
      ></vs-icon>
      <vs-col vs-w="4" vs-justify="center" vs-align="center" vs-type="flex">
        <img :src="backgroundImg" class="img-slot" />
      </vs-col>
      <vs-col vs-w="8" class="activity-infos">
        <vs-row
          vs-align="center"
          class="card-header"
        >
          <h2>{{ activityData.name }}</h2>
        </vs-row>
        <vs-row class="description">
          <p id="font">{{activityData.address}}</p>
        </vs-row>
        <vs-row id="font" class="card-footer" vs-align="flex-end">
          <vs-col vs-type="flex" vs-align="center" vs-w="5"
            >
            <i class="fas fa-money-bill"></i>
            Price : {{activityData.price}}€</vs-col
          >
          <vs-col vs-type="flex" vs-align="center" vs-w="5">
            <div class="type-tag tag-color" :class="activityData.type[0]">
              {{typesCorresp[activityData.type[0]]}}
            </div>
          </vs-col>
        </vs-row>
      </vs-col>
    </vs-row>
    <vs-popup
      title="Add this activity to a trip"
      :active.sync="openTripModal"
      style="z-index: 10"
    >
      <AddToTripModal :close="closeModal" :activityId="activityData.id" :date="date"/>
    </vs-popup>
  </div>
</template>

<script>
import "material-icons/iconfont/material-icons.css";
import AddToTripModal from "./AddToTripModal.vue";
import poiImg from '../assets/poi.png';
import hotelImg from '../assets/hotel.png';
import restaurantImg from '../assets/restaurant.png';
import barImg from '../assets/bar.png';

export default {
  name: "ActivitySearchCard",
  components: { AddToTripModal },
  props: {
    activityData: {
      type: Object,
      required: true,
    },
    imgSrc: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    deleteActivity: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      openTripModal: false,
      typesCorresp: {
        hotel: 'Hotel',
        bar: 'Bar',
        restaurant: 'Restaurant',
        tourist_attraction: "Cultural activity",
      },
      actiType: '',
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
    },
    backgroundImg() {
      switch (this.activityData.type[0]) {
        case 'tourist_attraction':
          return poiImg;
        case 'hotel':
          return hotelImg;
        case 'bar':
          return barImg;
        case 'restaurant':
          return restaurantImg;
        default:
          return poiImg;
      }
    }
  }
};
</script>

<style scoped>
.description {
  padding: 5px 5px 25px 5px;
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
  padding: 10px;
  position: relative;
}
.card-footer {
  padding: 5px;
  position: absolute;
  bottom: 5%;
  max-width: 330px;
}

.click {
  cursor: pointer;
}
.activity-infos {
  padding-left: 10px;
}
.type-tag {
  display: flex;
  justify-content: center;
  border-radius: 25px;
  padding: 1px 10px;
  color: white;
}
.tag-color.restaurant {
    background-color: #D17B88;
}
.tag-color.bar {
    background-color: #F0B96A;
}
.tag-color.tourist_attraction {
    background-color: #6BAB90;
}
.tag-color.hotel {
    background-color: #837CB6;
}

</style>
