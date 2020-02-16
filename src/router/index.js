import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "ChatUI",
    component: () => import("../views/ChatUI.vue")
  },
  {
    path: "/auth",
    name: "Auth",
    component: () => import("../views/Auth.vue")
  },
  {
    path: "/track",
    name: "TrackOrder",
    component: () => import("../views/TrackOrder.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
