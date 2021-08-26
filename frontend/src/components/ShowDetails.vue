<template>
    <v-app
        style="background-color: #08844E">
        <v-progress-linear
            :active="loading"
            :indeterminate="loading"
            striped
            color="blue"
            rounded
            height="6"
        ></v-progress-linear>
        
        <div 
            style="padding: 50px">
            <v-flex
            xs12 sm12 md12 lg12 xl12>
            <v-row>
                <v-col>
                    <v-card>
                    <v-card-text>
                        <v-row>
                            <v-card-title>
                                <h1 class="name">{{sido_sgg_title}}</h1>
                            </v-card-title>
                        <v-card-text>
                            <v-img 
                            style="border-radius: 10px;"
                            :src="cityDetails.image_src"
                            class="white--text align-end"
                            height="500">
                        </v-img>
                        </v-card-text>
                        <v-card-text>
                            <h2 class="description">
                            {{cityDetails.description}}
                        </h2>
                        </v-card-text>
                        <v-divider class="mx-4"></v-divider>
                        

                        <v-card-title class="population">
                            <h2>인구수 : &nbsp; </h2> 
                            <h2>
                            {{population}}
                        </h2>
                        <h2>(명) </h2> 
                        </v-card-title>

                        <v-card-text>
                            <h2 class="link">
                            <a :href="cityDetails.tourism_link"
                                target='_blank'
                                style="color: #FFBE59; font-size: 15px"
                            >
                            {{cityDetails.tourism_link}}
                            </a>
                        </h2>
                        </v-card-text>     
                    </v-row> 
                    
                    <v-row
                        class="places">
                        <div  
                        v-for="(place, index) in places"
                        :key="index"
                        style="padding:8px;">

                        <v-sheet
                            v-if="place.length != 0"
                            elevation="10"
                            rounded="xl"
                            >
                            <v-sheet
                            v-if="place.length != 0"
                            class="pa-3 orange text-center"
                            dark
                            rounded="t-xl"
                            >
                            {{index}}
                            </v-sheet>

                            <div class="pa-4">
                                <v-chip-group
                                active-class="primary--text"
                                column
                                v-if="place.length != 0"
                                show-arrows
                                multiple
                                >
                                
                                <v-chip
                                    v-for="item in place"
                                    :key="item.name"
                                    :href="item.link"
                                    target="_blank"
                                >
                                    {{item.name}}
                                </v-chip>
                            </v-chip-group>
                            </div>
                        </v-sheet>       
                        </div>  
                    </v-row> 
                    </v-card-text>

                    </v-card>
                    
                </v-col>
           
                <v-col>
                    <div class="map" id="map" style="border-radius: 10px; height:1000px;" ></div>
                </v-col>
            </v-row>
        </v-flex>
        </div>
       
    </v-app>
</template>

<script>

import axios from 'axios'
import {BASE_URL} from '@/api.js'
export default {
    mounted(){
        this.getCityDetail()

        this.getPlace()
    },
    data(){
        return{
            loading: false,
            sido_sgg : this.$route.query.name,
            cityDetails: '',
            latitude:'',
            longitude:'',
            model: null,
            beaches:'',
            mountains:'',
            rivers:'',
            valleys:'',
            places:'',
            sido_unify : { "경기": "경기도", "강원": "강원도", "충북": "충청북도", 
                      "충남": "충청남도", "경북": "경상북도", "경남": "경상남도", 
                      "전북": "전라북도", "전남": "전라남도", 
                      "제주특별자치도": "제주도", "제주": "제주도"},
            sido_sgg_title:'',
            population:''
                      
        }
    },
    methods:{
        async getCityDetail(){
            this.loading = true
            try{
            const Details = await axios.post(
                `${BASE_URL}/city/findOne`,
                {
                    sido_sgg :this.sido_sgg
                })
                console.log("cityDetails ",Details)
                this.population = this.comma(Details.data.population)
                this.cityDetails = Details.data
                this.latitude = Details.data.latitude
                this.longitude = Details.data.longitude
                
                this.sido_sgg_title = this.checkIsSpecialCity(this.sido_sgg)

                
                console.log('population : ', this.population)
                
                //지도 표시해주기
                window.kakao && window.kakao.maps ? this.initMap() : this.addScript();
                
            }catch(err){
                console.log(err)
            }
            this.loading = false
        },
        async getPlace(){
            try{
            const place = await axios.post(
                `${BASE_URL}/place/findBySidoSggAndTheme`,
                {
                    sido_sgg :this.sido_sgg
                })
                console.log("palces ",place.data)
                console.log("palces ",Object.keys(place.data))
                this.places = place.data
                
                this.beaches = place.data.beaches
                this.mountains = place.data.mountains
                this.rivers = place.data.rivers
                this.valleys = place.data.valleys
                
            }catch(err){
                console.log(err)
            }
        },
        checkIsSpecialCity(sido_sgg){
            //결과값중 특별시가 있는경우는 서울 서울 -> 서울 로 바꿔줌
            var sido = this.split_sido_sgg(sido_sgg)['sido']

            if (this.checkSpecialCity(sido)) {
                // not special city
                return sido_sgg
            } else {
                //특별시
                return sido
            }   
        },
        split_sido_sgg(sido_sgg) {
            var sido_sgg_split = sido_sgg.split(' ')
            return {"sido": sido_sgg_split[0], "sgg":sido_sgg_split[1]}
        },
        checkSpecialCity(sido) {
            if (Object.values(this.sido_unify).includes(sido)) {
                return true
            } else {
                return false
            }
        },
        async initMap() { 
            var container = document.getElementById('map'); 
            var options = { center: new kakao.maps.LatLng(this.latitude, this.longitude), level: 10 };
            var map = new kakao.maps.Map(container, options); 
            //마커추가하려면 객체를 아래와 같이 하나 만든다. 
            var marker = new kakao.maps.Marker({ position: map.getCenter() }); 
            await marker.setMap(map); 
        },  
        addScript() { 
            const script = document.createElement('script'); 
            /* global kakao */ 
            script.onload = () => kakao.maps.load(this.initMap); 
            script.src = 'http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=0b3e12f49e69284bc5e44c27065a9f7b'; 
            document.head.appendChild(script); 
        },
        comma(val){
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
    }
}
</script>

<style scoped>

.name {
    font-family: "GmarketSansLight";
    text-align: center; 
}
.description {
    font-size: 15px;
    font-family: "GmarketSansMedium";
    letter-spacing: 2px;
}
.population {
    text-align: center; 
    font-family: "GmarketSansLight";
}
.link{
    border-radius: 10px;
    background-color: #42AC5E;
    font-family: "GmarketSansLight";
    text-align: center; 
}
.places{
    font-family: "GmarketSansBold";
}


</style>