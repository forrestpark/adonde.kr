<template>
    <v-app style="background-color: #44AD5E;">
        <v-flex 
            xs4 sm4 md4 lg4 xl4
            class="i18n"
            style="margin: auto;">
          <v-img 
          alt="Logo"
          contain
          :src="require(`../assets/logo.png`)"
          transition="scale-transition"
          width="500"
          style="margin: auto;"
        />

        <!-- <v-select 
            style="margin: auto;"
            v-model="$i18n.locale"
                :items="lang">{{lang}}
        </v-select> -->
        <div>
            <v-btn
            style="margin: auto;"
            width="100%"
            color="orange lighten-2"
            @click="clickStart"
            >
            Start!
            </v-btn>
        </div>
 
          <br>
          <Login/>
       
          <Translator   
          @on-country-click="customEvent"   
          :countries="arrayOfCountries" />
           
          
        </v-flex>       
    </v-app>
</template>

<script>
import { Translator } from 'vue-google-translate';
import Login from '@/components/Login.vue'
export default {
    components:{
    Login,
    Translator
  },
  data(){
      return{
          lang:['ko','en'],
          arrayOfCountries: [
  {
    code: 'ko|af',
    title: 'Afrikaans',
  },
  {
    code: 'ko|sq',
    title: 'Albanian',
  },
  {
    code: 'ko|ar',
    title: 'Arabic',
  },
  {
    code: 'ko|hy',
    title: 'Armenian',
  },
  {
    code: 'ko|az',
    title: 'Azerbaijani',
  },
  {
    code: 'ko|eu',
    title: 'Basque',
  },
  {
    code: 'ko|be',
    title: 'Belarusian',
  },
  {
    code: 'ko|bg',
    title: 'Bulgarian',
  },
  {
    code: 'ko|ca',
    title: 'Catalan',
  },
  {
    code: 'ko|zh-CN',
    title: 'Chinese (Simplified)',
  },
  {
    code: 'ko|zh-TW',
    title: 'Chinese (Traditional)',
  },
  {
    code: 'ko|hr',
    title: 'Croatian',
  },
  {
    code: 'ko|cs',
    title: 'Czech',
  },

  {
    code: 'ko|da',
    title: 'Danish',
  },
  {
    code: 'ko|nl',
    title: 'Dutch',
  },
  {
    code: 'ko|en',
    title: 'English',
  },
  {
    code: 'ko|et',
    title: 'Estonian',
  },
  {
    code: 'ko|tl',
    title: 'Filipino',
  },
  {
    code: 'ko|fi',
    title: 'Finnish',
  },
  {
    code: 'ko|fr',
    title: 'French',
  },

  {
    code: 'ko|de',
    title: 'German',
  },
  {
    code: 'ko|el',
    title: 'Greek',
  },
  {
    code: 'ko|hu',
    title: 'Hungarian',
  },
  {
    code: 'ko|id',
    title: 'Indonesian',
  },
  {
    code: 'ko|ga',
    title: 'Irish',
  },
  {
    code: 'ko|it',
    title: 'Italian',
  },
  {
    code: 'ko|ja',
    title: 'Japanese',
  },
  {
    code: 'ko|ko',
    title: 'Korean',
  },
  {
    code: 'ko|lt',
    title: 'Lithuanian',
  },
  {
    code: 'ko|ms',
    title: 'Malay',
  },
  {
    code: 'ko|no',
    title: 'Norwegian',
  },
  {
    code: 'ko|pl',
    title: 'Polish',
  },
  {
    code: 'ko|pt',
    title: 'Portuguese',
  },
  {
    code: 'ko|ro',
    title: 'Romanian',
  },
  {
    code: 'ko|ru',
    title: 'Russian',
  },
  {
    code: 'ko|es',
    title: 'Spanish',
  },
  {
    code: 'ko|sv',
    title: 'Swedish',
  },
  {
    code: 'ko|th',
    title: 'Thai',
  },
  {
    code: 'ko|tr',
    title: 'Turkish',
  },
  {
    code: 'ko|uk',
    title: 'Ukrainian',
  }
]
      }
  },
  mounted(){
      // if user info is not in session storage, that means user never logged in
      if(JSON.parse(sessionStorage.getItem('user')) != null) {
        console.log("session user is not null in mounted")
        console.log("store user in mounted: ", this.$store.state.user)
        // if user info is not in store, then user either never logged in
        // or refreshed the page
        if (this.$store.state.user == '') {
          // in this case, the user did log in but refreshed the page
          console.log("update store user with session user in mounted")
          // so we update user info in store with user info in session storage
          this.$store.commit("updateUser", JSON.parse(sessionStorage.getItem('user')))
          this.$store.commit("updateUserStoredCities", JSON.parse(sessionStorage.getItem('user')).storedCities)
        }
        // console.log("mypage disabled false")
        // this.items[2].disabled = false
        // this.items[1].title = 'Logout'
      }
  },
//   computed:{
//     user(){
//       // console.log("computed session user: ", JSON.parse(sessionStorage.getItem('user')))
//       // console.log("computed store user: ", this.$store.state.user)
//       return this.$store.state.user || JSON.parse(sessionStorage.getItem('user'))
//     },
//     sessionUser() {
//       if (JSON.parse(sessionStorage.getItem('user')) != null) {
//         console.log("session user email: ", JSON.parse(sessionStorage.getItem('user')).email)
//       }
//       console.log("session user:", JSON.parse(sessionStorage.getItem('user')))
//       return JSON.parse(sessionStorage.getItem('user'))
//     }
//     // sessionUser() {
//     //   return sessionStorage
//     // }
//   },
//   watch:{
//     //로그인시 drawer에 login 이 logout으로 바뀌도록함
//     user: function(){
//       console.log("watch session email: ", JSON.parse(sessionStorage.getItem('user')).email )
//     //   if there exists user info in session storage, then we update user info in store with that
//       if (JSON.parse(sessionStorage.getItem('user')) != undefined) {
//         console.log("mypage disabled false")
//         this.items[2].disabled = false
//         this.items[1].title = 'Logout'
//       } else {
//         this.items[2].disabled = true
//         this.items[1].title = 'Login'
//       }
//      console.log("local store user: ", this.$store.state.user)
//     },
//     sessionUser: function() {
//       this.$store.state.user = JSON.parse(sessionStorage.getItem('user'))
//     },
//   },
  methods:{
      clickStart(){
      this.$router.push({path:'/'})
     
    }
  }
    
}
</script>

<style scoped>
.vg-body{
        display: grid;
        grid-template-columns: auto auto auto;
        padding: 10px;
        background: lightgrey;
    }

    .vg-container{
        padding: 20px;
        font-size: 30px;
        text-align: center;


    }
    .vg-text{
        color: black;
        padding-left:10px
    }

    .vg-items{
        display:flex;
        align-items:center;

    }

    .vg-flag{
        height:40px;
    }
</style>
