<template>
    <v-container>
      <v-row dense>
        <v-col
            v-for="(item, i) in userStoredDetails"
            :key="i"
            cols="12"
        >   
          <v-card 
            :id="i"
            :color="'#1F7087'"
            dark
            >
            <v-img 
                @click="select($event)"
                :id="i" 
                :src="item.image_src"
                class="white--text align-end"
                height="200px">
                <v-card-title
                  class="text-h5"
                  v-text="item.sido_sgg"
                  
                ></v-card-title>
            </v-img>
           
            <v-card-subtitle 
                @click="select($event)"
                :id="i" 
                v-text="item.description">
            </v-card-subtitle>
            <v-card-actions>
            <v-btn
            color="orange lighten-2"
            text
            @click="clickParams(item.sido_sgg)"
            >
            showDetails
        </v-btn>
           
        
            <!-- <card-component
                :key="i"
                :detail="item.description"
                :num="i"
                :sido_sgg="item.sido_sgg"
                ></card-component> -->
           </v-card-actions>  
          </v-card>
        </v-col>
      </v-row>
     
    </v-container>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import axios from 'axios'
import {BASE_URL} from '@/api.js'
export default {
    data(){
        return{
            userStoredDetails:'',
            
        }
    },
    computed:{
        ...mapState([
            'user',
            'userStoredCities'
        ])
    },
    methods:{
        ...mapMutations([
            'updateUserStoredCities'
        ]),
        async getStoredCitiesDetail(){
            try{
            const citiesDetails = await axios.post(
                `${BASE_URL}/user/getStoredCitiesDetail`,
                {
                    storedCities: this.userStoredCities
                })
                this.userStoredDetails = citiesDetails.data
                console.log(this.userStoredCities)
                console.log("userstroeddetails:", this.userStoredDetails)
                
            }catch(err){
            console.log(err)
            }
        },
        async findOneById(){
            try{
            const userDetails = await axios.post(
                `${BASE_URL}/user/findOneById`,
                {
                    id: this.user.id
                })
                
                console.log("userdetails:",userDetails.data.storedCities)
                this.updateUserStoredCities(userDetails.data.storedCities)
                this.getStoredCitiesDetail()
            }catch(err){
            console.log(err)
            }
        },
        clickParams (sido_sgg) {
                this.$router.push({name: 'details', query: {name: sido_sgg}})
            }
    },
    mounted(){
        if(this.user.email == undefined){
            alert('로그인을 해야 사용할 수 있습니다!')
            this.$router.push({path:'/home'})
        }else{
           this.findOneById()
           //console.log(this.user.id)
            
        }
    }
    
}
</script>


