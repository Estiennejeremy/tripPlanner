import Connexion from "../pages/Connexion.vue";
import Home from "../pages/Home.vue";

const routes = [
  {
    path: "/connexion",
    name: "Connexion",
    component: Connexion,
  },
  {
    path: "/",
    component: Home,
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "Home",
        component: Home,
      },
    ],
  },
  //   { path: '*', component: NotFound },
];

export default routes;
