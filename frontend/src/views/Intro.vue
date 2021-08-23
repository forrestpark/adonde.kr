<template>
    <v-app style="background-color: #44AD5E;">
        <div>
        <div class="i18n">
          <v-img 
          alt="Logo"
          contain
          :src="require(`../assets/logo.png`)"
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
    </div>
    </v-app>
</template>

<script>
import Login from '@/components/Login.vue'
export default {
    
    components:{
    Login
  },
  data(){
      return{
          lang:['ko','en']
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
.v-main {
    background-color: #44AD5E;
}
</style>