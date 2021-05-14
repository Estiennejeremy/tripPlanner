<template>
    <vs-row class="card-content" vs-justify="center">
      <vs-row vs-justify="center" class="input">
        <vs-input
          :success="nameSuccess"
          :danger="nameError"
          label="Name"
          v-model="trip.name"
        />
      </vs-row>
      <vs-row vs-justify="center" class="input">
        <vs-input
          :success="startDateSuccess"
          :danger="startDateError"
          danger-text="Start date must be before end date"
          label="Start date"
          v-model="trip.startDate"
          type="date"
        />
      </vs-row>
      <vs-row vs-justify="center" class="input">
        <vs-input
          :success="endDateSuccess"
          :danger="endDateError"
          danger-text="End date must be after start date"
          label="End date"
          v-model="trip.endDate"
          type="date"
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
export default {
  name: "CreateTripModal",
  data() {
    return {
      formSuccess: '',
      formError: '',
      trip: {
        startDate: '',
        endDate: '',
        name: '',
      },
      nameSuccess: false,
      nameError: false,
      startDateSuccess: false,
      startDateError: false,
      endDateSuccess: false,
      endDateError: false,
    }
  },
  methods: {
    isNameValid() {
      if (this.trip.name.length > 2) {
        this.nameSuccess = true;
        this.nameError = false;
      } else {
        this.nameSuccess = false;
        this.nameError = true;
      }
    },
    addTrip() {
      this.formError = '';
      if (!this.trip.name || !this.trip.startDate || !this.trip.endDate) {
        this.formError = "Missing informations"
        this.nameError = true;
        return;
      }
      this.nameSuccess = true;
      const startDate = new Date(this.trip.startDate)
      const endDate = new Date(this.trip.endDate)
      if (startDate > endDate) {
        this.startDateError = true;
        this.startDateSuccess = false;
        this.endDateError = true;
        this.endDateSuccess = false;
      }
      if (startDate <= endDate) {
        this.startDateError = false;
        this.startDateSuccess = true;
        this.endDateError = false;
        this.endDateSuccess = true;
      }
    },
  }
}
</script>

<style scoped>
.input {
  font-family: Avenir;
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
</style>