<template>
  <vs-row class="card-content" vs-justify="center">
    <vs-row vs-justify="center" class="input-row">
      <vs-input
        :disabled="true"
        :success="usernameSuccess"
        :danger="usernameError"
        danger-text="The username must be at least 3 characters"
        label-placeholder="Username"
        v-model="user.username"
        @change="isUsernameValid"
        type="email"
      />
    </vs-row>
    <vs-row vs-justify="center" class="input-row">
      <vs-input
        :success="emailSuccess"
        :danger="emailError"
        danger-text="The email is invalid"
        label-placeholder="Email"
        v-model="user.email"
        @change="isEmailValid"
      />
    </vs-row>
    <vs-row vs-justify="center" class="input-row">
      <vs-input
        :success="passwordSuccess"
        :danger="passwordError"
        danger-text="The password must be at least 6 characters"
        label-placeholder="Password"
        v-model="user.password"
        @change="isPasswordValid"
        type="password"
      />
    </vs-row>
    <vs-button
      type="relief"
      class="button"
      @click.prevent="update"
    >
      Save
    </vs-button>
    <vs-row class="form-error" vs-justify="center">{{ formError }}</vs-row>
    <vs-row class="form-success" vs-justify="center">{{ formSuccess }}</vs-row>
  </vs-row>
</template>

<script>
import Cookies from 'js-cookie';
import { getUserByToken, updateUser } from "../api_wrapper/users";

export default {
  name: "ProfileModal",
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
      },
      formError: "",
      formSuccess: "",
      emailSuccess: false,
      emailError: false,
      usernameError: false,
      usernameSuccess: false,
      passwordError: false,
      passwordSuccess: false,
    };
  },
  async mounted() {
    const user = await getUserByToken(Cookies.get("token"));
    this.user.username = user.username;
    this.user.email = user.email;
    this.user.password = user.password_hash;
  },
  methods: {
    async update() {
      this.formError = '';
      const res = await updateUser(this.user);
      if (res.error) this.formError = res.error;
      else this.formSuccess = "Your data has been updated !";
    },
    isEmailValid() {
      if (
        this.user.email.match(
          /([a-zA-Z0-9\.\-\_]*)@[a-zA-Z0-9\.\-]*\.[a-zA-Z]{1,3}/g
        )
      ) {
        this.emailSuccess = true;
        this.emailError = false;
      } else {
        this.emailError = true;
        this.emailSuccess = false;
      }
    },
    isUsernameValid() {
      if (this.user.username.length > 2) {
        this.usernameSuccess = true;
        this.usernameError = false;
      } else {
        this.usernameSuccess = false;
        this.usernameError = true;
      }
    },
    isPasswordValid() {
      if (this.user.password.length > 5) {
        this.passwordSuccess = true;
        this.passwordError = false;
      } else {
        this.passwordSuccess = false;
        this.passwordError = true;
      }
    },
    isFormValid() {
      return this.user.username && this.user.password && this.user.email 
        && this.emailSuccess && this.usernameSuccess && this.passwordSuccess;
    },
  }
}
</script>

<style scoped>
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

.input-row {
  font-family: Avenir !important;
  margin-bottom: 20px;
}

.button {
  width: 150px;
}
</style>