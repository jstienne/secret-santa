import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm'
import Vue from 'vue'
import App from './App.vue'
import store from './store'
// import router from './router';

Vue.config.productionTip = false
Vue.use(BootstrapVue)

new Vue({
  render: h => h(App),
  store: store,
  // router: router // NOT WORKING
}).$mount('#app')

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'