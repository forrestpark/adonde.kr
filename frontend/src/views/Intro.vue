<template>
    <v-app style="background-color: #44AD5E;">
        <v-flex 
            xs6 sm6 md3 lg3 xl3
            style="position: relative; margin: auto;">
          <v-img 
          alt="Logo"
          contain
          :src="require(`../assets/logo.png`)"
          transition="scale-transition"
          width="500"
          style="margin: auto;"
        />

        <br>

        <!-- <v-select 
            style="margin: auto;"
            v-model="$i18n.locale"
                :items="lang">{{lang}}
        </v-select> -->
        
        <!-- <v-img
            style="margin: auto"
            v-else
            @click="kakaoLogin"
            alt="user"
            contain
            :src="require(`@/assets/en_large.png`)"
            transition="scale-transition"
            width="400px"
            /> -->
            
    
            <v-img
                width=400
                :src="require(`@/assets/start_orange2.png`)"    
                style="margin: auto;"
                @click="clickStart"
            />
   
            
        <!-- <div 
            class="language">
            <v-btn 
                dark    
                outlined
                width=400
                @click="modal = true">
                <v-icon>mdi-translate</v-icon>
                Language Setting
            </v-btn>

            <translate-modal
            @close="modal = false" v-if="modal">
            <h3 slot="header">
                언어를 고르세요
                <i class="has ha-times closeModalBtn"
                @click="modal = false"></i>
            </h3>
            </translate-modal>
        </div> -->
        <div class="language">
                <v-img
                    width=400
                    :src="require(`@/assets/lang_setting2.png`)"
                    style="margin: auto;"
                    @click="modal = true"
                />
                <translate-modal
                @close="modal = false" v-if="modal">
                <h3 slot="header">
                    언어를 고르세요
                    <i class="has ha-times closeModalBtn"
                    @click="modal = false"></i>
                </h3>
                </translate-modal>
            </div>
        <v-img
                width=400
                :src="require(`@/assets/login_signup13.png`)"    
                style="margin: auto;"
                @click="overlay = !overlay"
            />
        
        <!-- <v-btn
          color="orange lighten-2"
          width=100%
          height=35
          @click="overlay = !overlay"
        >
        login
        </v-btn> -->

        <v-overlay
          color="white"
          :opacity="opacity"
          :value="overlay"
        >
            <div style="position: realative">
                    <div style="position: absolute; position: fixed; top:30px;right:100px">
                    <v-btn
                        fab
                        
                        color="#44AD5E"
                        @click="overlay = false"
                    >
                    <v-icon>mdi-close</v-icon>
                    </v-btn>
                </div>

                <Login v-on:close="overlay = false, welcomeImg = true"/>
            </div>
        </v-overlay>

        <v-img
            style="margin: auto"
            v-if="welcomeImg"
            :src="require(`@/assets/welcome.png`)">
        </v-img>
        

          
        </v-flex>       
    </v-app>
</template>

<script>
import TranslateModal from '@/components/TranslateModal.vue'
import Login from '@/components/Login.vue'
export default {
    components:{
    Login,
    TranslateModal
  },
  data(){
      return{
        modal: false,
        lang:['ko','en'],
        opacity: 0.9,
        overlay: false,
        welcomeImg: false
    
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
      }
  },

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
