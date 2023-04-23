import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'bulma/css/bulma.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import "./assets/css/home.css";
// import "./assets/css/login.css";
// import "./assets/css/contact.css";
// import "./assets/css/history.css";

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
