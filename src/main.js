// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// import $ from 'jquery'

// import './lib/jquery-vender.js'
import 'bootstrap'
import 'admin-lte'
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'
import 'admin-lte/dist/css/AdminLTE.min.css'
import 'admin-lte/dist/css/skins/_all-skins.min.css'

// import './assets/js/main.js'
// import './assets/js/star.js'

import axios from 'axios'

// import  VueQuillEditor from 'vue-quill-editor'
// Vue.use(VueQuillEditor)

// //require styles 引入样式
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'

// --------------------------移除mavonEditor
// import with ES6
// import mavonEditor from 'mavon-editor'
// import 'mavon-editor/dist/css/index.css'
// Vue.use(mavonEditor)

// 导入 vue-resource，并使用
import VueResource from 'vue-resource'

// 相册功能
import VuePreview from 'vue-preview'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.interceptors.response.use(function (response) {
  // console.log('axios.interceptors.response',response)
  // token 已过期，重定向到登录页面
  if (response.data.errcode === 444 && response.data.STS === 'KO') {
    // localStorage.clear()
    // router.replace({
    //   path: '/signin',
    //   query: {redirect: router.currentRoute.fullPath}
    // })
    // this.$store.commit('ChangeLoginStatus',false);
    router.push({path: './login'})
  }
  return response
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})

Vue.prototype.$axios = axios
Vue.use(VueResource)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
// defalut install
Vue.use(VuePreview)
// with parameters install
Vue.use(VuePreview, {
  mainClass: 'pswp--minimal--dark',
  barsSize: {top: 0, bottom: 0},
  captionEl: false,
  fullscreenEl: false,
  shareEl: false,
  bgOpacity: 0.85,
  tapToClose: true,
  tapToToggleControls: false
})
