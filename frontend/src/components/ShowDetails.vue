<template>
    <div 
        height="900px"
        style="background-color: #08844E">
        <v-progress-linear
        :active="loading"
        :indeterminate="loading"
        striped
        color="blue"
        rounded
        height="6"
      ></v-progress-linear>
        <v-row>
            <v-col>
                <h1 class="name">{{cityDetails.sido_sgg}}</h1>
                <v-img 
                    style="border-radius: 10px; left: 30px"
                    :src="cityDetails.image_src"
                    class="white--text align-end"
                    width="900"
                    height="500">
                
                </v-img>
                <h2 class="description">
                    {{cityDetails.description}}
                </h2>
                <h2 class="population">
                    
                    {{`인구수: ${cityDetails.population} (명)`}}
                    
                </h2>

                <h2 class="link">
                    
                    <a :href="cityDetails.tourism_link"
                        target='_blank'
                    >
                    {{cityDetails.tourism_link}}
                    </a>
                </h2>

                <div
                    style="background-color: white;
                    border-radius: 10px;"
                    >
                    <h2 style="text-align: center; ">
                        Places
                    </h2>
                    <div  
                    v-for="(place, index) in places"
                    :key="index">
                    <v-slide-group
                    class="places"
                        v-if="place.length != 0"
                        show-arrows
                        multiple
                        >
                        {{index}}
                        <v-slide-item
                            v-for="item in place"
                            :key="item.name"
                            v-slot="{ active, toggle }"
                        >
                            <v-btn
                            :href="item.link"
                            target="_blank"
                            class="mx-2"
                            :input-value="active"
                            active-class="purple white--text"
                            depressed
                            rounded
                            @click="toggle"
                            >
                            {{item.name}}
                            </v-btn>
                        </v-slide-item>
                    </v-slide-group>
                </div> 
                </div>
            </v-col>
            <v-col>
                <div id="map" style="width:100%;height:1000px;" ></div>
            </v-col>
        </v-row>

        <!-- <Translator /> -->
    </div>
</template>

<script>
// import { Translator } from 'vue-google-translate';
import axios from 'axios'
import {BASE_URL} from '@/api.js'
export default {
    //  components: {
    //     Translator
    // },
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
            places:''
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
                this.cityDetails = Details.data
                this.latitude = Details.data.latitude
                this.longitude = Details.data.longitude
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
        }


    }
}
</script>

<style scoped>
.name {
    color: white;
    text-align: center; 
}
.description {
    color: wheat;
    text-align: center; 
}
.population {
    color: white;
    text-align: center; 
}
.link{
    background-color: palegoldenrod;
    border-radius: 10px;
    text-align: center; 
}
.places {
    left: 20px;

}

</style>