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
    
      </v-app-bar>
      
    </v-card>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      >
      <v-list-item>
        <v-list-item-avatar>
           <v-icon 
            v-if="user.email == undefined"
            >
            mdi-account
          </v-icon>
          <img
              v-else
              :src="user.profile_image" />
        </v-list-item-avatar>

        <v-list-item-content>
          <div
            v-if="user.email == undefined">
            로그인 해주세요 :)
          </div>
          <div
            v-else>
            <v-list-item-title>{{user.nickname}} 님 :)</v-list-item-title>
          </div>
        </v-list-item-content>
      </v-list-item>

      <v-divider />

      <v-list dense>
        <v-list-item
          v-for="item in items" 
          :disabled="item.disabled"
          :key="item.title"
          link
          :to="item.to"
          @click="isLogin(item.title)"
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

        <v-overlay
          color="green"
          :absolute="absolute"
          :opacity="opacity"
          :value="overlay"
        >
        
        <div class="i18n">
          <v-img 
          alt="Logo"
          contain
          :src="require(`./assets/logo.png`)"
          transition="scale-transition"
          width="500"
        />
          <v-select v-model="$i18n.locale"
                    :items="lang">{{lang}}
          </v-select>
        </div> 
      
          <v-btn
          width="500"
            color="orange lighten-2"
            @click="clickStart"
          >
            Start!
          </v-btn>
          
          <Login/>

        </v-overlay>

     

  </v-app>
</template>
 
<script>
import Login from '@/components/Login.vue'
export default {
  name: 'App',
  components:{
    Login
  },
  computed:{
    user(){
      return this.$store.state.user
    }
  },
  watch:{
    //로그인시 drawer에 login 이 logout으로 바뀌도록함
    user: function(){
      if(this.user.email != undefined){
        this.items[2].disabled = false
        this.items[1].title = 'Logout'
      }else{
        this.items[2].disabled = true
        this.items[1].title = 'Login'
      }
    },
  },
  mounted(){
      //상세페이지로 갔을 경우 overlay가 보이지 않도록 파일이 시작될때 확인해준다
      if(this.$route.query.name != undefined){
        console.log("라우터",this.$route.query.name)
        this.overlay = false
      }
  },
  data: () => ({
    absolute: true,
    opacity: 1,
    overlay: true,
    lang:['ko','en'],
    drawer: false,
    items: [
        {
          title: 'Home',
          icon: 'mdi-home',
          to: '/',
          disabled: false
        },
        {
          title: 'Login',
          icon: 'mdi-login',
          // to: '/login',
          disabled: false
        },
        {
          title: 'mypage',
          icon: 'mdi-account-heart-outline',
          to: '/mypage',
          disabled: true
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
  methods:{
    //drawer에 있는 로그인 관련 버튼을 눌렀을 경우 해당하는 경우에 따라서 다르게 처리해줌
    isLogin(title){
      if(title == "Login"){
        this.overlay = true
        this.drawer = false
      }else if(title == "Logout"){
        this.kakaoLogout()
        this.drawer = false
      }
    },
    kakaoLogout() {
            window.Kakao.Auth.logout((response) => {
                console.log(response);
                this.$store.commit("updateUser", {})
                alert("로그아웃");
                this.$router.push({path:'/'})
            });
    },
    clickStart(){
      this.overlay = false
      //this.$router.push({path:'/'})
     
    }
  }
};
</script>

<style lang="scss">
  .to-home.router-link-exact-active{
    display: none;
  }

</style>