<template>
  <vs-card class="class">
    <h4
      slot="header"
      class="card-title"
      id="card-title"
      v-if="connexion == true"
    >
      Connection
    </h4>
    <h4
      slot="header"
      class="card-title"
      id="card-title"
      v-if="connexion == false"
    >
      Registration
    </h4>

    <form>
      <vs-row v-if="!connexion" class="row">
        <vs-col vs-offset="3" vs-w="8">
          <vs-input
            :success="emailSuccess"
            :danger="emailError"
            danger-text="The email is invalid"
            placeholder="Email"
            v-model="user.email"
            @change="isEmailValid"
          />
        </vs-col>
      </vs-row>

      <vs-row class="row">
        <vs-col vs-offset="3" vs-w="8">
          <vs-input
            :success="usernameSuccess"
            :danger="usernameError"
            danger-text="The username must be at least 3 characters"
            placeholder="Username"
            v-model="user.username"
            @change="isUsernameValid"
            type="email"
          />
        </vs-col>
      </vs-row>
      <vs-row class="row">
        <vs-col vs-offset="3" vs-w="8">
          <vs-input
            :success="passwordSuccess"
            :danger="passwordError"
            danger-text="The password must be at least 6 characters"
            placeholder="Password"
            v-model="user.password"
            @change="isPasswordValid"
            type="password"
          />
        </vs-col>
      </vs-row>
      <p class="form-error text-center">{{ formError }}</p>
      <vs-button
        type="relief"
        :disabled="!isSigninFormValid"
        @click.prevent="signIn"
        v-if="connexion"
      >
        Connection
      </vs-button>

      <vs-button
        type="relief"
        :disabled="!isSignupFormValid"
        @click.prevent="signUp"
        v-else
      >
        Create Profile
      </vs-button>
      <div class="msg" v-if="connexion">
        Want to create an account ?
        <p @click.prevent="redirectSigninSignup" class="link">Sign up here</p>
      </div>
      <div class="msg" v-else>
        Already have an account ?
        <p @click.prevent="redirectSigninSignup" class="link">Sign in here</p>
      </div>
    </form>
  </vs-card>
</template>

<script>
export default {
  name: "AuthCard",
  components: {},
  props: {
    connexionProp: {
      type: Boolean,
    },
  },
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
      },
      formError: "",
      connexion: this.connexionProp,
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
    redirectSigninSignup() {
      this.connexion = !this.connexion;
    },
    signUp() {
      this.$router.push("home");
    },
    signIn() {
      this.$router.push("home");
    },
  },
  computed: {
    isSigninFormValid() {
      return this.usernameSuccess && this.passwordSuccess;
    },
    isSignupFormValid() {
      return this.usernameSuccess && this.emailSuccess && this.passwordSuccess;
    },
  },
};
</script>
<style>
.row {
  text-align: left;
  padding: 5px;
}
.class {
  width: 30%;
  position: absolute;
  top: 30%;
  text-align: center;
  font-size: 20px;
}
#card-title {
  margin-top: 20px;
}
.msg {
  padding: 20px;
}
.link {
  cursor: pointer;
  color: #1dc7ea;
}
.link:hover {
  text-decoration: underline;
}
</style>
