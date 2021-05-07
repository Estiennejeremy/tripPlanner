<template>
  <div class="content">
    <Header title="Trip planner" />
    <img src="../assets/london.jpg" alt="" id="img" />
    <vs-card class="class card">
      <vs-tabs alignment="center">
        <vs-tab label="What to do there">
          <form>
            <vs-row vs-justify="space-evenly" vs-w="12">
              <vs-col vs-type="flex" vs-w="3">
                <vs-input placeholder="Address" />
              </vs-col>
              <vs-col vs-type="flex" vs-w="3">
                <vs-select v-model="selectedType" placeholder="Type" >
                  <vs-select-item
                    :key="index"
                    :value="item.value"
                    :text="item.text"
                    v-for="(item, index) in types"
                  />
                </vs-select>
              </vs-col>
              <vs-col vs-type="flex" vs-w="3">
                <vs-input type="date" :min=getDate :value=getDate id="date" />
              </vs-col>
            </vs-row>
          </form>
        </vs-tab>
        <vs-tab label="How to get there">
          <form>
            <vs-row vs-justify="space-evenly" vs-w="12">
              <vs-col vs-type="flex" vs-w="3">
                <vs-input placeholder="From" />
              </vs-col>
              <vs-col vs-type="flex" vs-w="3">
                <vs-input placeholder="To" />
              </vs-col>
              <vs-col vs-type="flex" vs-w="3">
                <vs-select v-model="selectedType" placeholder="Type" >
                  <vs-select-item
                    :key="index"
                    :value="item.value"
                    :text="item.text"
                    v-for="(item, index) in types"
                  />
                </vs-select>
              </vs-col>
              <vs-col vs-type="flex" vs-w="3">
                <vs-input type="date" :min=getDate :value=getDate id="date" />
              </vs-col>
            </vs-row>
          </form>
        </vs-tab>
          <vs-button type="relief">
            Search
          </vs-button>
      </vs-tabs>
    </vs-card>
    <footer id="footer">
      <h3>
        Le slogan du siècle 21
      </h3>
    </footer>
  </div>
</template>

<script>
import Header from "../components/Header.vue";

export default {
  name: "Home",
  components: { Header },
  data() {
    return {
      types: [
        { value: "restaurant", text: "restaurant" },
        { value: "hotel", text: "hotel" },
        { value: "bar", text: "bar" },
      ],
      selectedType: "",
    };
  },
  computed: {
    getDate() {
      return new Date().toISOString().split('T')[0];
    }
  }
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
  width: 800px;
}

.btn {
  margin-top: 10px;
}

#date {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

#footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  background-color: #141414;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
