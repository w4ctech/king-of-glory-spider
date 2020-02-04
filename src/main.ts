import Vue from 'vue'
// @ts-ignore
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
// @ts-ignore
import api from './axios/api'
// @ts-ignore
import http from './axios/http'
import './axios/axios.js'
// @ts-ignore
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$http = http
Vue.prototype.bus = new Vue
Vue.use(ElementUI)
Vue.use(preview)
// @ts-ignore
// @ts-ignore
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
