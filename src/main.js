// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//引入flexible.js文件
import './assets/js/flexible'
//引入reset.css文件
import './assets/css/reset.css'
// 引入插件
import VueSweetalert2 from './assets/js/vue-sweetalert2'
// 使用插件
Vue.use(VueSweetalert2)

//引入vant
import vant from 'vant'
import 'vant/lib/index.css'
Vue.use(vant)
//引入mint-ui
import Mint from 'mint-ui'; 
import 'mint-ui/lib/style.css'
Vue.use(Mint); 

//引入swiper
import '../node_modules/swiper/css/swiper.min.css'
//引入axiox并挂载到vue原型上
import axios from 'axios'
Vue.prototype.$http=axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
