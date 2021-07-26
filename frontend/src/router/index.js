import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Mypage from '@/views/Mypage.vue'


Vue.use(Router)

const routes = [
    {
      name: 'home',
       path: '/',
       component: Home
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'mypage',
      path: '/mypage',
      component: Mypage
    }
]

export default new Router({
  mode: 'history',
  routes

})
