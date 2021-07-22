<template>
  <v-app>
    <v-app-bar
      app
      color="green"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Logo"
          contain
          :src="require(`./assets/logo.png`)"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>

    
    </v-app-bar>

    <v-main>

          <ShowMap/>
        <VueTest/>

      

    </v-main>
  </v-app>
</template>

<script>
import ShowMap from './components/ShowMap.vue'
import VueTest from './components/VueTest.vue'
//import LayoutTest from './components/LayoutTest.vue'
export default {
  name: 'App',

  components: {
      ShowMap,
      VueTest
  },

  data: () => ({
    //
  }),
 
};
</script>
