<template>
    <div>
        <v-btn
            icon
            @click="[changeHeart()]"  
            >
            <v-icon>{{ heart ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
        </v-btn>
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
    data(){
        return{
            heart: true
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
        changeHeart(){
            this.heart = false
            console.log("heart sido_sgg",this.sido_sgg)
            this.apiDeleteStored()  
        },
        async apiDeleteStored(){
            if(this.heart == false){
                try{
                const cities = await axios.put(
                    `${BASE_URL}/user/deleteStoredCity`,
                    {
                        id : this.user.id,
                        sido_sgg: this.sido_sgg
                    })
                    console.log("deletecities:", cities.data)
                    this.updateUserStoredCities(cities.data)
                    console.log("after delete: ",this.userStoredCities)
                }catch(err){
                console.log(err)
                }
            }
        },
    }
}
</script>