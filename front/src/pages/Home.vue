<template>
  <div class="content">
    <img src="../../public/landscape5.jpg" alt="" id="img" />
    <vs-card class="card" id="font">
      <vs-tabs alignment="center">
        <vs-tab label="What to do there" id="font">
          <vs-row vs-justify="space-evenly" vs-lg="12" vs-sm="12">
            <vs-col
              vs-type="flex"
              vs-lg="3"
              vs-sm="3"
              vs-xs="10"
              vs-justify="center"
              id="font"
            >
              <v-row>
                <label class="vs-input--label">City</label>
                <mapbox-geocoder
                  access-token="pk.eyJ1IjoidGlmYWluZWsiLCJhIjoiY2tvbzl5ODZqMDlqOTJ5bnVxb3Z0dWNtNyJ9.EsQKq2Ll_f7hmDaY_DCflA"
                  @mb-created="(instance) => (control = instance)"
                  types="place"
                  :limit="2"
                  @mb-result="
                    (res) => {
                      getCity(res);
                    }
                  "
                  class="places-input"
                />
              </v-row>
            </vs-col>
            <vs-col
              vs-type="flex"
              vs-lg="3"
              vs-sm="3"
              vs-xs="10"
              vs-justify="center"
            >
              <vs-select v-model="selectedType" label="Activity">
                <vs-select-item
                  :key="index"
                  :value="item.value"
                  :text="item.text"
                  v-for="(item, index) in activityTypes"
                />
              </vs-select>
            </vs-col>
            <vs-col
              vs-type="flex"
              vs-lg="3"
              vs-sm="3"
              vs-xs="10"
              vs-justify="center"
            >
              <vs-input
                type="date"
                :min="getDate"
                :value="getDate"
                label="Date"
                v-model="selectedDate"
              />
            </vs-col>
          </vs-row>
          <vs-row vs-justify="center">
            <vs-button type="relief" id="font" v-on:click="searchActivity()">
              Search
            </vs-button>
          </vs-row>
        </vs-tab>
        <vs-tab label="How to get there" id="font">
          <vs-row vs-justify="space-evenly" vs-lg="12" vs-sm="12">
            <vs-col
              vs-type="flex"
              vs-lg="3"
              vs-sm="3"
              vs-xs="10"
              vs-justify="center"
              id="font"
            >
              <v-row>
                <label class="vs-input--label">From</label>
                <mapbox-geocoder
                  access-token="pk.eyJ1IjoidGlmYWluZWsiLCJhIjoiY2tvbzl5ODZqMDlqOTJ5bnVxb3Z0dWNtNyJ9.EsQKq2Ll_f7hmDaY_DCflA"
                  @mb-created="(instance) => (control = instance)"
                  types="place"
                  :limit="2"
                  @mb-result="
                    (res) => {
                      getFromLocation(res);
                    }
                  "
                  class="places-input"
                />
              </v-row>
            </vs-col>
            <vs-col
              vs-type="flex"
              vs-lg="3"
              vs-sm="3"
              vs-xs="10"
              vs-justify="center"
              id="font"
            >
              <v-row>
                <label class="vs-input--label">To</label>
                <mapbox-geocoder
                  access-token="pk.eyJ1IjoidGlmYWluZWsiLCJhIjoiY2tvbzl5ODZqMDlqOTJ5bnVxb3Z0dWNtNyJ9.EsQKq2Ll_f7hmDaY_DCflA"
                  @mb-created="(instance) => (control = instance)"
                  types="place"
                  :limit="2"
                  @mb-result="
                    (res) => {
                      getToLocation(res);
                    }
                  "
                  class="places-input"
                />
              </v-row>
            </vs-col>
            <vs-col
              vs-type="flex"
              vs-lg="3"
              vs-sm="3"
              vs-xs="10"
              vs-justify="center"
            >
              <vs-select v-model="selectedType" label="Transportation">
                <vs-select-item
                  :key="index"
                  :value="item.value"
                  :text="item.text"
                  v-for="(item, index) in transportTypes"
                />
              </vs-select>
            </vs-col>
            <vs-col
              vs-type="flex"
              vs-lg="3"
              vs-sm="3"
              vs-xs="10"
              vs-justify="center"
            >
              <vs-input
                type="date"
                :min="getDate"
                :value="getDate"
                id="date"
                label="Date"
                v-model="selectedDate"
              />
            </vs-col>
          </vs-row>
          <vs-row vs-justify="center">
            <vs-button type="relief" id="font" v-on:click="searchTransport()">
              Search
            </vs-button>
          </vs-row>
        </vs-tab>
      </vs-tabs>
    </vs-card>
    <Footer />
  </div>
</template>

<script>
import "@mapbox/mapbox-gl-geocoder/lib/mapbox-gl-geocoder.css";
import Footer from "../components/Footer.vue";

export default {
  name: "Home",
  components: { Footer },
  data() {
    return {
      activityTypes: [
        { value: "restaurant", text: "Restaurant" },
        { value: "hotel", text: "Hotel" },
        { value: "bar", text: "Bar" },
      ],
      transportTypes: [
        { value: "train", text: "Train" },
        { value: "bus", text: "Bus" },
        { value: "plane", text: "Plane" },
      ],
      selectedType: "",
      place: "",
      to: "",
      from: "",
      selectedDate: "",
    };
  },
  computed: {
    getDate() {
      return new Date().toISOString().split("T")[0];
    },
  },
  methods: {
    searchActivity() {

    },
    searchTransport() {

    },
    getFromLocation(res) {
      this.from = {
        lat: res.result.center[1],
        lon: res.result.center[0],
        name: res.result.text,
      };
    },
    getToLocation(res) {
      this.to = {
        lat: res.result.center[1],
        lon: res.result.center[0],
        name: res.result.text,
      };
    },
    getCity(res) {
      this.place = {
        lat: res.result.center[1],
        lon: res.result.center[0],
        name: res.result.text,
      };
    },
  },
};
</script>

<style>
.nabarx {
  display: flex;
  justify-content: center;
  height: 60px;
}

#img {
  background-color: #494949;
  top: 60px;
  height: auto;
  width: auto;
  max-width: 100vw;
  min-width: 100vw;
  max-height: 100vh;
  min-height: 100vh;
  object-fit: cover;
  display: block;
  position: fixed;
  opacity: 0.9;
}

.card {
  min-width: 80vw;
  width: 1000px;
}

#font {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: medium;
}

.places-input {
  margin-bottom: 3px;
  background-color: white;
  border-radius: 6px;
}
</style>
