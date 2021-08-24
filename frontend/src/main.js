import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueKakaoSdk from 'vue-kakao-sdk'
import i18n from './i18n'
import router from './router'
import store from './store'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'
import VueCascaderSelect from 'vue-cascader-select';

import VGoogleTranslate from "v-google-translate";
Vue.config.productionTip = false;
Vue.use(VGoogleTranslate)

Vue.component('modal', {
  template: '#modal-template'
})


Vue.use(VueCascaderSelect);

Vue.component('VueSlider', VueSlider)

Vue.config.productionTip = false

const apiKey = '0b3e12f49e69284bc5e44c27065a9f7b'

window.Kakao.init(apiKey)

Vue.use(VueKakaoSdk, { apiKey })

new Vue({
  data: {
    showModal: false
  },
  VueCascaderSelect,
  store,
  vuetify,
  i18n,
  router,
  render: h => h(App)
}).$mount('#app')
