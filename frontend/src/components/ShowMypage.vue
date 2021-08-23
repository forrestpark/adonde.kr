<template>
    <v-app>
        <v-progress-linear
                v-if="loading"
                :active="loading"
                :indeterminate="loading"
                striped
                color="yellow"
                rounded
                height="6"
        ></v-progress-linear> 
        
        <v-slide-group
            v-model="model"
            class="pa-4"
            center-active
            show-arrows
            >
                <v-slide-item
                    v-for="item in userStoredDetails"
                    :key="item.sido_sgg"
                    v-slot="{ active, toggle }"
                >
                    <v-card
                    :color="active ? undefined : 'grey lighten-1'"
                    class="ma-4"
                    height="800"
                    width="350"
                    @click="toggle"
                    >
                    <v-img 
                        :id="item.sido_sgg" 
                        :src="item.image_src"
                        class="white--text align-end"
                        width="600"
                        height="500">
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
                            color="orange"
                            text
                            @click="gotoDetailPage(item.sido_sgg)"
                            >
                            showDetails
                        </v-btn>
                    </v-card-actions>  
                    <v-row
                        class="fill-height"
                        align="center"
                        justify="center"
                    >
                    </v-row>
                </v-card>
            </v-slide-item> 
        </v-slide-group>
    </v-app>
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
            loading: true,
            heart : true,
            sido_sgg:'',
            model: null,
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
            this.loading = true
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
            this.loading = false
        },
        gotoDetailPage (sido_sgg) {
            let routeData = this.$router.resolve({name: 'details', query: {name: sido_sgg}});
            window.open(routeData.href, '_blank');
        },
        
    },
    mounted(){
        console.log('마이페이지 마운티드')
        if(JSON.parse(sessionStorage.getItem('user')).email == undefined){
            alert('로그인을 해야 사용할 수 있습니다!')
            this.$router.push({path:'/'})
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


