<template>
  <vs-card>
    <h4
      slot="header"
      class="card-title"
      v-if="connexion == true"
    >
      Connection
    </h4>
    <h4
      slot="header"
      class="card-title"
      v-if="connexion == false"
    >
      Create an account
    </h4>
    <vs-row class="card-content" vs-justify="center">
      <vs-row vs-justify="center" class="input-row" v-if="!connexion">
        <vs-input
          :success="emailSuccess"
          :danger="emailError"
          danger-text="The email is invalid"
          placeholder="Email"
          v-model="user.email"
          @change="isEmailValid"
        />
      </vs-row>
      <vs-row vs-justify="center" class="input-row">
        <vs-input
          :success="usernameSuccess"
          :danger="usernameError"
          danger-text="The username must be at least 3 characters"
          placeholder="Username"
          v-model="user.username"
          @change="isUsernameValid"
          type="email"
        />
      </vs-row>
      <vs-row vs-justify="center" class="input-row">
        <vs-input
          :success="passwordSuccess"
          :danger="passwordError"
          danger-text="The password must be at least 6 characters"
          placeholder="Password"
          v-model="user.password"
          @change="isPasswordValid"
          type="password"
        />
      </vs-row>
      <vs-button
        type="relief"
        v-if="connexion"
        @click.prevent="signIn"
        class="button"
      >
        Connection
      </vs-button>
      <vs-button
        type="relief"
        @click.prevent="signUp"
        v-else
        class="button"
      >
        Create
      </vs-button>
      <vs-row class="form-error" vs-justify="center">{{ formError }}</vs-row>
      <vs-row class="msg" v-if="connexion" vs-justify="center">
        <vs-row vs-justify="center">Want to create an account ?</vs-row>
        <p vs-justify="center" @click.prevent="redirectSigninSignup" class="link">Sign up here</p>
      </vs-row>
      <vs-row class="msg" v-else vs-justify="center">
        <vs-row vs-justify="center">Already have an account ?</vs-row>
        <p vs-justify="center" @click.prevent="redirectSigninSignup" class="link">Sign in here</p>
      </vs-row>
    </vs-row>
  </vs-card>
</template>

<script>
import { createUser, loginUser } from '../api_wrapper/users.js';
import Cookies from 'js-cookie';

export default {
  name: "AuthCard",
  components: {},
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
      },
      formError: "",
      connexion: false,
      emailSuccess: false,
      emailError: false,
      usernameError: false,
      usernameSuccess: false,
      passwordError: false,
      passwordSuccess: false,
    };
  },
  methods: {
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
    isSignupFormValid() {
      return this.user.username && this.user.password && this.user.email 
        && this.emailSuccess && this.usernameSuccess && this.passwordSuccess;
    },
    isSigninFormValid() {
      return this.user.username && this.user.password
        && this.usernameSuccess && this.passwordSuccess;
    },
    redirectSigninSignup() {
      this.connexion = !this.connexion;
    },
    async signUp() {
      this.formError = "";
      if (!this.isSignupFormValid()) {
        this.formError = "You must correctly fill all fields";
        return;
      }
      const createRes = await createUser(this.user);
      if (createRes.error) {
        this.formError = "An error occured while creating your account";
        return;
      }
      this.signIn();
    },
    async signIn() {
      this.formError = "";
      if (!this.isSigninFormValid()) {
        this.formError = "You must fill all fields";
        return;
      }
      const loginRes = await loginUser(this.user);
      if (loginRes.error) {
        this.formError = "An error occured while trying to sign you up";
        return;
      }
      Cookies.set("token", loginRes.userToken);
      this.$router.push("home");
    },
  },
};
</script>
<style>
.input-row {
  margin-bottom: 15px;
}
.button {
  margin-top: 10px;
  width: 100px;
}
.card-title {
  margin: 10px 0 10px 0;
  text-align: center;
}
.link {
  cursor: pointer;
  color: #00A6A6;
}
.link:hover {
  text-decoration: underline;
}
.msg {
  padding: 20px;
}
.card-content {
  padding-top: 20px;
}
.form-error {
  color: rgba(var(--vs-danger),1) !important;
  font-size: .65rem;
  margin-top: 8px;
}
</style>
