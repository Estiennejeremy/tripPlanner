import Connexion from '../pages/Connexion.vue';
import Home from '../pages/Home.vue';
import TripsPage from '../pages/TripsPage.vue';
import TripPage from '../pages/TripPage.vue';
import SearchPage from '../pages/Search.vue';

import Cookies from 'js-cookie';

function authGuard(to, from, next) {
  if (!Cookies.get('token')) {
    next();
  } else {
    next('/');
  }
}

function nonAuthGuard(to, from, next) {
  if (Cookies.get('token')) {
    next();
  } else {
    next('/connection');
  }
}

const routes = [
  {
    path: '/connection',
    name: 'Connection',
    beforeEnter: authGuard,
    component: Connexion,
  },
  {
    path: '/',
    name: 'Home',
    beforeEnter: nonAuthGuard,
    component: Home,
  },
  {
    path: '/trips',
    name: 'Trips',
    beforeEnter: nonAuthGuard,
    component: TripsPage,
  },
  {
    path: '/trip',
    name: 'Trip',
    beforeEnter: nonAuthGuard,
    component: TripPage,
  },
  {
    path: '/search/activity',
    name: 'SearchActivity',
    beforeEnter: nonAuthGuard,
    component: SearchPage,
  },
  {
    path: '/search/transport',
    name: 'SearchTransport',
    beforeEnter: nonAuthGuard,
    component: SearchPage,
  },
  {
    path: '/search',
    beforeEnter: nonAuthGuard,
    redirect: '/search/activity',
  },
  // {
  //   path: '/',
  //   component: Home,
  //   redirect: '/home',
  //   children: [
  //     {
  //       path: '/home',
  //       name: 'Home',
  //       component: Home,
  //     },

  // ],
  // },
  //   { path: '*', component: NotFound },
];

export default routes;
