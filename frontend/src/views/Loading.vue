<template>
    <v-app style="background-color : #44AD5E;">
        <v-container fill-height fluid>
            
            <v-row align="center"
                justify="center">
        
                    <transition name="fade">
                        <p v-if="show">
                            <v-img
                                
                                elevation="24"
                                :src="require(`@/assets/welcome.png`)">
                            </v-img>
                        </p>
                    </transition>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
import axios from 'axios'
import {BASE_URL} from '@/api.js'
export default {
    data(){
        return{
            id:this.$route.query.userId,
            show: false
        }
    },
    mounted(){
        this.loginRedirect()
        this.show = true
    },
    methods:{
        async loginRedirect(){
            try{
            const user = await axios.post(
                `${BASE_URL}/user/findOneById`,
                {
                    id : this.id
                })
                
                console.log("user:", JSON.stringify(user.data))
                sessionStorage.setItem('user', JSON.stringify(user.data))
                setTimeout(() => {
                    this.$router.push({path: '/'})
                }, 2000)

            }catch(err){
            console.log(err)
            }
        }
    }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>