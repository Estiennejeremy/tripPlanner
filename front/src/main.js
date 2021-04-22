import Vue from 'vue';
import App from './App.vue';
import Vuesax from 'vuesax';
import VueRouter from 'vue-router';

import 'vuesax/dist/vuesax.css'; //Vuesax styles

import routes from './routes/routes';

Vue.config.productionTip = false;
Vue.use(Vuesax);
Vue.use(VueRouter);

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: 'nav-item active',
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  },
});

new Vue({
  el: '#app',
  render: h => h(App),
  router,
});
