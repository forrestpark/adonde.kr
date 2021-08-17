<template>
    <div>
        <v-row>
            <v-col>
                <h1>{{cityDetails.sido_sgg}}</h1>
        <v-img 
            :src="cityDetails.image_src"
            class="white--text align-end"
            width="900"
            height="500">
         
        </v-img>
        <h2>
            설명 : 
            {{cityDetails.description}}
        </h2>
        <h3>
            인구수 : 
            {{cityDetails.population}}
            (명)
        </h3>
        <a :href="cityDetails.tourism_link"
            target='_blank'
            >
            관광청 링크
        </a>
            </v-col>
            <v-col>
                <h1>
                    위치
                </h1>
                <div id="map" style="width:100%;height:700px;"></div>
            </v-col>
        </v-row>

        
    </div>
</template>

<script>
import axios from 'axios'
import {BASE_URL} from '@/api.js'
export default {
    mounted(){
        this.getCityDetail()

       

    },
    data(){
        return{
            sido_sgg : this.$route.query.name,
            cityDetails: '',
            latitude:'',
            longitude:''
        }
    },
    methods:{
        async getCityDetail(){
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