<template>
  <v-app>
    <!-- <div
      :class="{'bar': invisibleBar }"
      flat
    > -->
    <v-navigation-drawer
      width=170
      v-if="showNavDrawer"
      style=" background-color : #a0dcb0; font-family: GmarketSansMedium;"
      v-model="drawer"
      clipped
      app
    >
        <div 
          style="float: left; top: 20px;">
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
                  <v-list-item-title>
                    {{user.nickname}} 님 :)
                  </v-list-item-title>
                </div>
              </v-list-item-content>

            </v-list-item>

      <v-divider />

      <v-list style=" background-color : #a0dcb0">
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
        </v-list>
   
        <div style="position: absolute; bottom: 0">
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
      </div>
        
    </v-navigation-drawer>

    <v-app-bar
        app
        class="app_bar"
        color="#44AD5E"
        dark
        elevate-on-scroll
        clipped-left
        v-if="showAppBar"
      >
      <v-app-bar-nav-icon v-if="!drawer" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <router-link 
        to="/go">
        <v-toolbar-title>
          <div class="d-flex align-center">
            <v-img 
            alt="Logo"
            contain
            :src="require(`./assets/logo.png`)"
            transition="scale-transition"
            width="50"
            /> 
            <v-img 
            alt="maru"
            contain
            :src="require(`./assets/003.png`)"
            transition="scale-transition"
            width="100"
            /> 
          </div>
        </v-toolbar-title>
      </router-link>
        
        
      <v-spacer />

      <div class="languageBtn">
            <v-btn 
                outlined
                width=100%
                @click="modal = true">
                <v-icon>mdi-translate</v-icon>
                Language Setting
            </v-btn>
        </div>
    
    </v-app-bar>
    
    

    <!-- </div> -->
      
    <v-main>
      <div class="MenuBar" style="position: relative; background-color : #a0dcb0">
        <!-- <div 
          :class="{'sideBar' : invisibleSideBar}"
          style="float: left; top: 20px;">
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
                  <v-list-item-title>
                    {{user.nickname}} 님 :)
                  </v-list-item-title>
                </div>
              </v-list-item-content>

            </v-list-item>

      <v-divider />

      <v-list style=" background-color : #a0dcb0">
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
        </v-list>
   
        <div style="position: absolute; bottom: 0">
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
      </div> -->

      <translate-modal
            @close="modal = false" v-if="modal">
            <h3 slot="header">
                언어를 고르세요
                <i class="has ha-times closeModalBtn"
                @click="modal = false"></i>
            </h3>
      </translate-modal>

      <div>
        <router-view></router-view>
      </div>

      </div>
    </v-main>
  </v-app>
</template>
 
<script>
import TranslateModal from '@/components/TranslateModal.vue'
export default {
  name: 'App',
  components:{
    TranslateModal
  },
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
    },
    routerName(){
      return this.$route.name
    }
 
  },
  watch:{
    //로그인시 drawer에 login 이 logout으로 바뀌도록함
    user: function(){
      // console.log("watch session email: ", JSON.parse(sessionStorage.getItem('user')).email )
      // if there exists user info in session storage, then we update user info in store with that
      if (JSON.parse(sessionStorage.getItem('user')) != undefined) {
        console.log("mypage disabled false")
        this.items[1].disabled = false
        this.items[2].title = 'Logout'
      } else {
        this.items[1].disabled = true
        this.items[2].title = 'Login'
      }
      console.log("local store user: ", this.$store.state.user)
    },
    sessionUser: function() {
      this.$store.state.user = JSON.parse(sessionStorage.getItem('user'))
    },
    routerName(){
      //intro페이지에서 home으로 갈때 sidebar에서 
      if(this.$route.name == 'home'){
        // this.invisibleSideBar = false
        // this.invisibleBar = false

        //새로넣어줌
        this.showAppBar = true
        this.showNavDrawer= true
      }
      if(this.$route.name == 'loading'){
        //새로넣어줌
        this.showAppBar = false
        this.showNavDrawer= false
      }
      //home에서 다시 intro로 가서 로그인을 해야되는 경우
      if(this.$route.name == 'intro'){
        // this.invisibleSideBar = true
        // this.invisibleBar = true

        //새로넣어줌
        this.showAppBar = false
        this.showNavDrawer=false
      }
    }
  },
  mounted(){
      //상세페이지로 갔을 경우 overlay가 보이지 않도록 파일이 시작될때 확인해주고, sidebar 숨김
      if (this.$route.name == 'details'){
        // this.overlay = false
        // this.invisibleSideBar = true

        //새로넣어줌
        this.showNavDrawer = false
        this.drawer = true
        
      }
      if(this.$route.name == 'intro'){ 
        // this.invisibleSideBar = true
        // this.invisibleBar = true

        //새로넣어줌
        this.showAppBar = false
        this.showNavDrawer=false

      }
      if(this.$route.name == 'home'){
        // this.invisibleSideBar = false
        // this.invisibleBar = false

        //새로넣어줌
        this.showAppBar = true
        this.showNavDrawer= true
      }
      if(this.$route.name == 'loading'){
        //새로넣어줌
        this.showAppBar = false
        this.showNavDrawer= false
      }

      console.log("라우터",this.routerName)


      if(JSON.parse(sessionStorage.getItem('user')) != null) {
        console.log("session user is not null in mounted")
        console.log("store user in mounted: ", this.$store.state.user)
        if (this.$store.state.user == '') {
          console.log("update store user with session user in mounted")
          this.$store.commit("updateUser", JSON.parse(sessionStorage.getItem('user')))
          this.$store.commit("updateUserStoredCities", JSON.parse(sessionStorage.getItem('user')).storedCities)
        }
        console.log("mypage disabled false")
        this.items[1].disabled = false
        this.items[2].title = 'Logout'
      }
  },
  data: () => ({
    drawer:null,
    showAppBar:true,
    showNavDrawer:true,


    invisibleSideBar:false,
    invisibleBar:false,
    lang:['ko','en'],
    modal: false,
    // drawer: false,
    items: [
        {
          title: 'Home',
          icon: 'mdi-home',
          to: '/',
          disabled: false
        },
        {
          title: 'mypage',
          icon: 'mdi-account-heart-outline',
          to: '/mypage',
          disabled: true
        },
        {
          title: 'Login',
          icon: 'mdi-login',
          // to: '/login',
          disabled: false
        },
        
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
        //this.overlay = true
        // this.drawer = false
        this.$router.push({path:'/go'})
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
    // clickStart(){
    //   this.overlay = false
    //   //this.$router.push({path:'/'})
     
    // }
  }
};
</script>

<style>
@font-face {
  font-family: "GmarketSansBold";
  src: local("GmarketSansBold"),
   url(./fonts/GmarketSansOTF/GmarketSansBold.otf) format("opentype");
}
@font-face {
  font-family: "GmarketSansLight";
  src: local("GmarketSansLight"),
   url(./fonts/GmarketSansOTF/GmarketSansLight.otf) format("opentype");
}
@font-face {
  font-family: "GmarketSansMedium";
  src: local("GmarketSansMedium"),
   url(./fonts/GmarketSansOTF/GmarketSansMedium.otf) format("opentype");
}
.bar{
  display: none;
}
.MenuBar{
  font-family: "GmarketSansMedium";
}
.sideBar{
  display: none;
}
.to-home.router-link-exact-active{
    display: none;
  }
</style>