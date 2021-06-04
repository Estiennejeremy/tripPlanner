<template>
  <div class="trip-section">
    <h2>{{ name }}</h2>
  </div>
</template>

<script>
export default {
  name: "TripSection",
  props: {
    name: {
      required: true,
      type: String,
    },
  },
}
</script>

<style scoped>
  .trip-section {
    padding: 20px;
  }
</style>