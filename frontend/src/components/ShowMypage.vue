<template>
    <v-container>
      <v-row dense>
        <v-col
            v-for="item in userStoredDetails"
            :key="item.sido_sgg"
            cols="12"
        >   
          <v-card 
            :id="item.sido_sgg"
            :color="'#1F7087'"
            dark
            >
            <v-img 
                :id="item.sido_sgg" 
                :src="item.image_src"
                class="white--text align-end"
                height="200px">
                <v-card-title
                  class="text-h5"
                  v-text="item.sido_sgg"
                  
                ></v-card-title>
            </v-img>
           
            <v-card-subtitle 
                :id="item.sido_sgg" 
                v-text="item.description">
            </v-card-subtitle>
            <v-card-actions>

            <heart-component
                :sido_sgg="item.sido_sgg">
            </heart-component>
            <v-btn
            color="orange lighten-2"
            text
            @click="clickParams(item.sido_sgg)"
            >
            showDetails
            </v-btn>
           </v-card-actions>  
          </v-card>
        </v-col>
      </v-row>
     
    </v-container>
</template>

<script>
import HeartComponent from './HeartComponent.vue'
import {mapState, mapMutations} from 'vuex'
import axios from 'axios'
import {BASE_URL} from '@/api.js'
export default {
    components:{
        HeartComponent
    },
    data(){
        return{
            heart : true,
            sido_sgg:''
            
        }
    },
    computed:{
        ...mapState([
            'user',
            'userStoredCities',
            'userStoredDetails'
        ])
    },
    methods:{
        ...mapMutations([
            'updateUserStoredCities',
            'updateUserStoredDetails'
        ]),
        async getStoredCitiesDetail(){
            try{
            const citiesDetails = await axios.post(
                `${BASE_URL}/user/getStoredCitiesDetail`,
                {
                    storedCities: this.userStoredCities
                })
                this.updateUserStoredDetails(citiesDetails.data)
                console.log("userStoredCities: ",this.userStoredCities)
                console.log("userstroeddetails: ", this.userStoredDetails)
                
            }catch(err){
                console.log(err)
            }
        },
        clickParams (sido_sgg) {
                let routeData = this.$router.resolve({name: 'details', query: {name: sido_sgg}});
                window.open(routeData.href, '_blank');

        },
        
    },
    mounted(){
        if(this.user.email == undefined){
            alert('로그인을 해야 사용할 수 있습니다!')
            this.$router.push({path:'/home'})
        }else{
           this.getStoredCitiesDetail()
            
        }
    },
    watch:{
        userStoredCities :function(){
            this.getStoredCitiesDetail()
        }
    }
    
}
</script>


