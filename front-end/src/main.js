import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Routes from './router'
import VueResource from 'vue-resource'


Vue.use(VueRouter)
Vue.use(VueResource)

const router = new VueRouter({
  routes: Routes,
  mode:'history'
})

new Vue({
  render: (h) => h(App),
  router:router
}).$mount('#app')
