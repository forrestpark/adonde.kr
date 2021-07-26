<template>
  <v-app>
    
    <v-app-bar
      app
      color="green"
      dark
    >
      <router-link to="/login"
      class="catalog">
        login
      </router-link>
      <router-link to="/mypage"
      class="catalog">
        mypage
      </router-link>
      <div class="d-flex align-center">
        <router-link to="/">
          <v-img 
          alt="Logo"
          contain
          :src="require(`./assets/logo.png`)"
          transition="scale-transition"
          width="40"
        />
        </router-link>

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>
      메뉴?
      <v-spacer></v-spacer>

      메뉴?
     <div class="i18n">
        <v-select v-model="$i18n.locale"
                  :items="lang">{{lang}}
        </v-select>

      </div> 

    </v-app-bar>

    <v-main>

      <router-view></router-view>

      
    </v-main>
  </v-app>
</template>

<script>
//import ShowMap from './components/ShowMap.vue'
//import VueTest from './components/VueTest.vue'
//import LayoutTest from './components/LayoutTest.vue'
export default {
  name: 'App',

  components: {
    
  },

  data: () => ({
    lang:['ko','en']
  }),
 
 
};
</script>

<style scoped>
.catalog.router-link-active{
  background: white;
  color: green;
}
</style>