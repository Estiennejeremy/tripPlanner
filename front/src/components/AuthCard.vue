<template>
  <card class="class">
    <h4
      slot="header"
      class="card-title"
      id="card-title"
    >
      Registration
    </h4>

    <form>
      <div class="row">
        <div class="col-md-6">
          <base-input
            type="email"
            label="Email"
            placeholder="Email"
            v-model="user.email"
          >
          </base-input>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <base-input
            type="text"
            label="Username"
            placeholder="Username"
            v-model="user.username"
          >
          </base-input>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <base-input
            type="password"
            label="Password"
            placeholder="Password"
            v-model="user.password"
          >
          </base-input>
        </div>
      </div>
    </form>
  </card>
</template>

<script>
export default {
  name: 'AuthCard',
  props: {},
  data() {
    return {
      user: {
        username: '',
        email: '',
        password: '',
      },
      formError: '',
    };
  },
  methods: {}
};
</script>
<style>
.row {
  display: flex;
  justify-content: center;
  text-align: start;
}
.class {
  min-width: 40%;
  margin: 0;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
#card-title {
  margin-top: 20px;
}
</style>