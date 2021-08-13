<template>
  <v-app>
    <v-card
      color="grey lighten-4"
      flat
    >
      <v-app-bar
        class="app_bar"
        color="green"
        dark
        dense
      >
        <v-app-bar-nav-icon @click="drawer = !drawer" />
        <v-toolbar-title>
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

        
      </div>
      
        </v-toolbar-title>
        <h2>
          어디든
        </h2>
        <v-spacer />

         <div class="i18n">
        <v-select v-model="$i18n.locale"
                  :items="lang">{{lang}}
        </v-select>

      </div> 
    
      </v-app-bar>
      
    </v-card>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list-item>
        <v-list-item-avatar>
          <v-icon>mdi-account</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>user name</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider />

      <v-list dense>
        <v-list-item
          v-for="item in items" 
          :key="item.title"
          link
          :to="item.to"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      
      <router-view></router-view>
       
    </v-main>

     <v-footer 
      prop
      dark
      padless
      >
    <v-card
      class="flex"
      flat
      tile
    >
      <v-card-title class="green">
        <strong class="subheading">Get connected with us on social networks!</strong>

        <v-spacer></v-spacer>

        <v-btn
          v-for="(icon, idx) in iconItems"
          :href="icon.link"
          :key="idx"
          class="mx-4"
          dark
          icon
        >
          <v-icon  
            size="24px">
            {{ icon.icon }}
          </v-icon>
        </v-btn>
      </v-card-title> 
    </v-card>
    </v-footer >

  </v-app>
</template>

<script>
export default {
    
  data: () => ({
    lang:['ko','en'],
    drawer: false,
    items: [
        {
          title: 'Home',
          icon: 'mdi-home',
          to: '/home'
        },
        {
          title: 'Login',
          icon: 'mdi-information',
          to: '/login'
        },
        {
          title: 'mypage',
          icon: 'mdi-home',
          to: '/mypage'
        }
      ],
    right: null,
    iconItems: [
        {
          link : "https://www.linkedin.com/in/jangwoopark/",
          icon : 'mdi-linkedin'
        },
        {
          link : "https://www.instagram.com/adonde.kr/",
          icon :'mdi-instagram'
        },
        {
          link : "https://github.com/forrestpark/adonde.kr",
          icon :'mdi-github'
        },
      ],
  }),
}
</script>