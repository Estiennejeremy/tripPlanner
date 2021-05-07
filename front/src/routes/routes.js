import Connexion from '../pages/Connexion.vue';
import Home from '../pages/Home.vue';

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
    component: Home,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: Home,
      },
    ],
  },
  //   { path: '*', component: NotFound },
];

export default routes;
