<template>
  <v-app>
    <v-card
      :class="{'bar': invisibleBar }"
      color="grey lighten-4"
      flat
    >
      <v-app-bar
        class="app_bar"
        color="green"
        dark
        elevate-on-scroll
        scroll-target="#scrolling-techniques-7"
      >
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
      
      <v-main>
        <div>
          <div 
            :class="{'sideBar' : invisibleSideBar}"
            style="float: left; top: 20px">
            <v-list-item>
        <v-list-item-avatar>
           <v-icon 
            v-if="user == undefined"
            >
            mdi-account
          </v-icon>
          <img
              v-else
              :src="user.profile_image" />
        </v-list-item-avatar>

        <v-list-item-content>
          <div
            v-if="user == undefined">
            로그인 해주세요 :)
          </div>
          <div
            v-else>
            <v-list-item-title>{{user.nickname}} 님 :)</v-list-item-title>
          </div>
        </v-list-item-content>
      </v-list-item>

      <v-divider />

      <v-list >
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
        <v-divider />     
        <div style="position: fixed; bottom: 0;">
          <v-list-item
          v-for="(icon, idx) in iconItems"
          :key="idx">
       <v-btn
          :href="icon.link"
          class="mx-4"
          icon
        >
          <v-icon  
            size="24px">
            {{ icon.icon }}
          </v-icon>
        </v-btn>
        </v-list-item>
        </div>
        
        
      </v-list>
          </div>
          <div>
            <router-view></router-view>
          </div>
        </div>
        
      </v-main>
      
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
  components:{
    Login
  },
  name: 'App',
  computed:{
    user(){
      // console.log("computed session user: ", JSON.parse(sessionStorage.getItem('user')))
      // console.log("computed store user: ", this.$store.state.user)
      return this.$store.state.user || JSON.parse(sessionStorage.getItem('user'))
    },
    sessionUser() {
      if (JSON.parse(sessionStorage.getItem('user')) != null) {
        console.log("session user email: ", JSON.parse(sessionStorage.getItem('user')).email)
      }
      console.log("session user:", JSON.parse(sessionStorage.getItem('user')))
      return JSON.parse(sessionStorage.getItem('user'))
    }
 
  },
  watch:{
    //로그인시 drawer에 login 이 logout으로 바뀌도록함
    user: function(){
      // console.log("watch session email: ", JSON.parse(sessionStorage.getItem('user')).email )
      // if there exists user info in session storage, then we update user info in store with that
      if (JSON.parse(sessionStorage.getItem('user')) != undefined) {
        console.log("mypage disabled false")
        this.items[2].disabled = false
        this.items[1].title = 'Logout'
      } else {
        this.items[2].disabled = true
        this.items[1].title = 'Login'
      }
      console.log("local store user: ", this.$store.state.user)
    },
    sessionUser: function() {
      this.$store.state.user = JSON.parse(sessionStorage.getItem('user'))
    }
  },
  mounted(){
      //상세페이지로 갔을 경우 overlay가 보이지 않도록 파일이 시작될때 확인해주고, sidebar 숨김
      if (this.$route.name == 'details'){
        console.log("라우터",this.$route.query.name)
        this.overlay = false
        this.invisibleSideBar = true
      }
      if(this.$route.name == 'intro'){
        this.invisibleSideBar = true
        this.invisibleBar = true
      }


      if(JSON.parse(sessionStorage.getItem('user')) != null) {
        console.log("session user is not null in mounted")
        console.log("store user in mounted: ", this.$store.state.user)
        if (this.$store.state.user == '') {
          console.log("update store user with session user in mounted")
          this.$store.commit("updateUser", JSON.parse(sessionStorage.getItem('user')))
          this.$store.commit("updateUserStoredCities", JSON.parse(sessionStorage.getItem('user')).storedCities)
        }
        console.log("mypage disabled false")
        this.items[2].disabled = false
        this.items[1].title = 'Logout'
      }
  },
  data: () => ({
    invisibleSideBar:false,
    invisibleBar:false,
    absolute: true,
    opacity: 1,
    overlay: true,
    lang:['ko','en'],
    // drawer: false,
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
        // this.drawer = false
        //this.$router.push({path:'/intro'})
      }else if(title == "Logout"){
        this.kakaoLogout()
        //this.drawer = false
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

<style scoped>
.bar{
  display: none;
}
.sideBar{
  display: none;
}
.to-home.router-link-exact-active{
    display: none;
  }
</style>