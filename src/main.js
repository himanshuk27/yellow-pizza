require("dotenv").config();
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./quasar";
import axios from "axios";
import VueCookies from "vue-cookies";

Vue.config.productionTip = false;

Vue.use(VueCookies);

Vue.$cookies.config("1h");

Vue.use({
  install(Vue) {
    Vue.prototype.$api = axios.create({
      baseURL: "https://yellow-backend.herokuapp.com/"
    });
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
