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
    next('/home');
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
    component: Home,
  },
  {
    path: '/trips',
    name: 'Trips',
    component: TripsPage,
  },
  {
    path: '/trip',
    name: 'Trip',
    component: TripPage,
  },
  {
    path: '/search/activity',
    name: 'SearchActivity',
    component: SearchPage,
    props: true
  },
  {
    path: '/search/transport',
    name: 'SearchTransport',
    component: SearchPage,
    props: true
  },
  {
    path: '/search',
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
