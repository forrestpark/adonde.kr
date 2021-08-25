<template>
    <div>               
        <div>
            <v-btn
                icon
                style="float: left;"
                @click="[changeHeart(),storedMypage()]"  
                >
                <v-icon>{{ heart ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
            </v-btn>

            <v-btn
                style="font-family: GmarketSansBold;"
                color="#FCCE67"
                @click="gotoDetailPage()"
                text
                >
            Details
            </v-btn> 
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import axios from 'axios'
import {BASE_URL} from '@/api.js'
export default {
    props:{
        sido_sgg:String
     
    },
    mounted(){
            //특별시일 경우 *2 해서 다시 저장
            var pattern = /\s/g;
            if(this.sido_sgg.match(pattern))
            {
            //특별시가 아님
            this.checkSido_sgg = this.sido_sgg
            }
            else{
            //특별시
            this.checkSido_sgg = this.sido_sgg + " " + this.sido_sgg
            }

            if(this.userStoredCities.includes(this.checkSido_sgg)){   
                this.heart = true
            }
    },
    computed:{
        ...mapState([
            'searchResults'  ,
            'user',
            'userStoredCities'
        ])
    },
    data(){
        return{
            checkSido_sgg:'',
            heart: false,
            show: false,
            sido_sgg_value:'',
            storedCities:''
            
        }
    },
    methods:{
        ...mapMutations([
            'updateUserStoredCities'
        ]),
        changeHeart(){
            if(this.user.email == undefined){
                alert('로그인 후 사용해주세요')
            }else{
                this.heart = !this.heart
            }      
        },
        storedMypage(){    
                //특별시일 경우 *2 해서 다시 저장
                var pattern = /\s/g;
                if(this.sido_sgg.match(pattern))
                {
                //특별시가 아님
                this.sido_sgg_value = this.sido_sgg
                }
                else{
                //특별시
                this.sido_sgg_value = this.sido_sgg + " " + this.sido_sgg     
                }
            if(this.heart == true){
                console.log("heart: ",this.heart)
                console.log("id",this.user.id)
                console.log('sido_sigg',this.sido_sgg_value )
                this.apiAddStored()
            }else{
                //삭제
                this.apiDeleteStored()   
            }
            
        },
        async apiDeleteStored(){
            try{
            const cities = await axios.put(
                `${BASE_URL}/user/deleteStoredCity`,
                {
                    id : this.user.id,
                    sido_sgg: this.sido_sgg_value
                })
                console.log("deletecities:", cities.data)
                this.updateUserStoredCities(cities.data)
                console.log("after delete: ",this.userStoredCities)
            }catch(err){
            console.log(err)
            }
        },
        async apiAddStored(){
            try{
            const cities = await axios.put(
                `${BASE_URL}/user/addStoredCity`,
                {
                    id : this.user.id,
                    sido_sgg: this.sido_sgg_value
                })
                console.log("cities:", cities.data)
                this.updateUserStoredCities(cities.data)
                console.log("after add: ", this.userStoredCities)
            }catch(err){
            console.log(err)
            }
        },
        gotoDetailPage () {
            let routeData = this.$router.resolve({name: 'details', query: {name: this.checkSido_sgg}});
            window.open(routeData.href, '_blank');
        },
        
    }
}
</script>