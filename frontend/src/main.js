import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueKakaoSdk from 'vue-kakao-sdk'

Vue.config.productionTip = false

const apiKey = '0b3e12f49e69284bc5e44c27065a9f7b'
Vue.use(VueKakaoSdk, { apiKey })

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
