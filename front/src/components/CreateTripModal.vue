<template>
    <vs-row class="card-content" vs-justify="center">
      <vs-row vs-justify="center" class="input">
        <vs-input
          :danger="nameError"
          label="Name"
          v-model="trip.name"
          maxlength="38"
          name="tripName"
        />
      </vs-row>
      <vs-row vs-justify="center" class="input">
        <div class="vs-component vs-con-input-label vs-input vs-input-primary">
          <label for="" class="vs-input--label">From</label>
          <mapbox-geocoder
            access-token="pk.eyJ1IjoidGlmYWluZWsiLCJhIjoiY2tvbzl5ODZqMDlqOTJ5bnVxb3Z0dWNtNyJ9.EsQKq2Ll_f7hmDaY_DCflA"
            @mb-created="instance => control = instance"
            types="place"
            @mb-result="res => {getFromLocation(res)}"
            :limit="2"
            id="fromLocation"
          />
        </div>
      </vs-row>
      <vs-row vs-justify="center" class="input">
        <vs-input
          :danger="startDateError"
          danger-text="Start date must be before end date"
          label="Start date"
          v-model="trip.startDate"
          type="date"
          name="fromDate"
        />
      </vs-row>
      <vs-row vs-justify="center" class="input">
        <div class="vs-component vs-con-input-label vs-input vs-input-primary">
          <label for="" class="vs-input--label">To</label>
          <mapbox-geocoder 
            access-token="pk.eyJ1IjoidGlmYWluZWsiLCJhIjoiY2tvbzl5ODZqMDlqOTJ5bnVxb3Z0dWNtNyJ9.EsQKq2Ll_f7hmDaY_DCflA"
            @mb-created="instance => control = instance"
            types="place"
            :limit="2"
            @mb-result="res => {getToLocation(res)}"
            id="toLocation"
          />
        </div>
      </vs-row>
      <vs-row vs-justify="center" class="input">
        <vs-input
          :danger="endDateError"
          danger-text="End date must be after start date"
          label="End date"
          v-model="trip.endDate"
          type="date"
          name="toDate"
        />
      </vs-row>
      <vs-button
        type="relief"
        class="button"
        @click.prevent="addTrip()"
      >
        Save
      </vs-button>
      <vs-row class="form-error" vs-justify="center">{{ formError }}</vs-row>
      <vs-row class="form-success" vs-justify="center">{{ formSuccess }}</vs-row>
  </vs-row>
</template>

<script>
import '@mapbox/mapbox-gl-geocoder/lib/mapbox-gl-geocoder.css';
import { createTrip } from '../api_wrapper/travels';
import { getUserByToken } from '../api_wrapper/users';
import Cookies from 'js-cookie';

export default {
  name: "CreateTripModal",
  components: {  },
  data() {
    return {
      formSuccess: '',
      formError: '',
      trip: {
        startDate: '',
        endDate: '',
        name: '',
        from: {},
        to: {},
      },
      nameError: false,
      startDateError: false,
      endDateError: false,
    }
  },
  methods: {
    getFromLocation(res) {
      this.trip.from = {lat: res.result.center[1] , lon: res.result.center[0], name: res.result.text}
    },
    getToLocation(res) {
      this.trip.to = {lat: res.result.center[1] , lon: res.result.center[0], name: res.result.text}
    },
    isEmpty(object) {
    return Object.keys(object).length === 0;
    },
    async addTrip() {
      this.formError = '';
      if (!this.trip.name || !this.trip.startDate || !this.trip.endDate || this.isEmpty(this.trip.from) || this.isEmpty(this.trip.to)) {
        this.formError = "Missing informations"
        this.nameError = !!!this.trip.name;
        return;
      }
      const startDate = new Date(this.trip.startDate)
      const endDate = new Date(this.trip.endDate)
      if (startDate > endDate) {
        this.startDateError = true;
        this.endDateError = true;
        return;
      }
      if (startDate <= endDate) {
        this.startDateError = false;
        this.endDateError = false;
      }
      const user = await getUserByToken(Cookies.get('token'));
      const tripRes = await createTrip({
        name: this.trip.name,
        dates: {
          start: this.trip.startDate,
          end: this.trip.endDate,
        },
        to: this.trip.to,
        from: this.trip.from,
        userId: user.id,
      });
      if (tripRes.error) this.formError = tripRes.error;
      else {
        this.formSuccess = "Trip successfully created !";
        this.$emit("updateData");
      } 
    },
  }
}
</script>

<style scoped>
.input {
  font-family: Avenir !important;
  margin-bottom: 10px;
}
.form-error {
  color: rgba(var(--vs-danger),1) !important;
  font-size: .65rem;
  margin-top: 8px;
  font-family: Avenir;
}

.form-success {
  color: rgba(var(--vs-success),1) !important;
  font-size: .65rem;
  margin-top: 8px;
  font-family: Avenir;
}
.button {
  width: 150px;
}
</style>

<style>
  .mapboxgl-ctrl-geocoder {
    font-family: Avenir;
    font-size: .9em;
    box-shadow: none;
    min-width: unset;
  }

  .mapboxgl-ctrl-geocoder--input {
    border: 1px solid rgba(0, 0, 0, 0.2);
    padding: .4rem;
    border-radius: 5px;
    box-sizing: border-box;
    transition: all .3s ease;
    width: 200px;
    height: 32px;
    background-color: transparent;
  }
  .mapboxgl-ctrl-geocoder--input::placeholder {
    color: transparent;
    background-color: transparent;
  }

  .mapboxgl-ctrl-geocoder--input:focus {
    border: 1px solid #00A6A6;
    outline: none;
    box-shadow: 0 3px 10px 0 rgba(0, 0, 0, .15);
  }

  .mapboxgl-ctrl-geocoder--icon {
    display: none;
  }

  .suggestions {
    width: 250px !important;
  }
</style>
