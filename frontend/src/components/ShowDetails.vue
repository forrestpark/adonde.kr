<template>
    <div>
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
        <div id="map" style="width:100%;height:350px;"></div>
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
            cityDetails: ''
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
                
                
            }catch(err){
                console.log(err)
            }
        }
    }
}
</script>