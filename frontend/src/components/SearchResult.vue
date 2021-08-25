<template>
    <div>
        <!-- <v-progress-linear
        :active="loading"
        :indeterminate="loading"
        striped
        color="yellow"
        rounded
        height="6"
    ></v-progress-linear> -->
    <br>
        <div style="text-align: center; ">
        <v-btn 
            class="mx-2"
            x-large
            :disabled="searchDisabled"
            color="primary"
            @click="showRandom"
            >
            <v-icon>mdi-dice-5</v-icon>
            random
        </v-btn>
        <v-btn 
            class="mx-2"
            x-large
            :disabled="searchDisabled"
            color="primary"
            @click="showAll"
            > 
            <v-icon>mdi-map-search</v-icon>
            ShowAll
        </v-btn>
        </div>
    </div>
</template>

<script>
import { mapState , mapMutations} from 'vuex'
import axios from 'axios'
import {BASE_URL} from '@/api.js'
export default {
    data(){
        return{
            //loading: false,
            filteredResult: '',
            sido_unify : { "경기": "경기도", "강원": "강원도", "충북": "충청북도", 
                      "충남": "충청남도", "경북": "경상북도", "경남": "경상남도", 
                      "전북": "전라북도", "전남": "전라남도", 
                      "제주특별자치도": "제주도", "제주": "제주도"}        
        }
    },
    computed:{
        ...mapState([
            'submitValue'   ,
            'searchResults',
            'checkCurrentDisabled',
            'disabled',
            'searchDisabled',
            'isSubmitValueChange',
            'loading'
        ])
    },
    methods:{
        ...mapMutations([
            'updateSearchResults',
            'updateSearchDisabled',
            'updateisSubmitValueChange',
            'updateIsSetMarker',
            'updateLoading'
        ]),
        async getFilteredResult() {
            // this.loading= true
            this.updateLoading(true)
            const res = await axios.post(
                `${BASE_URL}/search/`,
                {
                    theme : this.submitValue['theme'],
                    population : this.submitValue['population'],
                    distance : this.submitValue['distance'],
                    transportation :this.submitValue['transportation'],
                    origin: this.submitValue['origin']
                }
            )
            
            this.checkIsSpecialCity(res.data)

            console.log("submitValue: ", this.submitValue)
            console.log("res : " ,res.data)
            if(res.data.length == 0){
                this.updateSearchDisabled(true)
                alert('결과값이 없습니다')
                this.filteredResult = ''
            }
            else{
                this.updateSearchDisabled(false)
                this.filteredResult = res.data
            }
            
            console.log("filterResult: ",this.filteredResult)

            // this.loading = false
            this.updateLoading(false)
            
            //search를 실행해준 다음 다시 isSubmitValuechnage를 false로 초기화해준다
            this.updateisSubmitValueChange(false)


        },
        showAll(){
            this.updateSearchResults(this.filteredResult)
            this.updateIsSetMarker(true)

            this.$nextTick(() => {
                window.scrollTo(0, document.body.scrollHeight)
            })
        },
        showRandom(){
            const randNum = Math.floor(Math.random() * this.filteredResult.length);
            this.updateSearchResults([this.filteredResult[randNum]])
            this.updateIsSetMarker(true)

            this.$nextTick(() => {
                window.scrollTo(0, document.body.scrollHeight)
            })
        },
        checkIsSpecialCity(cities){
            //결과값중 특별시가 있는경우는 서울 서울 -> 서울 로 바꿔줌
            for( var i = 0; i<cities.length; i++){

                var sido = this.split_sido_sgg(cities[i].sido_sgg)['sido']
 
                if (this.checkSpecialCity(sido)) {
                    continue
                } else {
                    //특별시 아님
                    cities[i].sido_sgg = sido
                }
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
        }
    },
    watch:{
        isSubmitValueChange : function(newval){
            if(newval){
                this.getFilteredResult()       
            }
        },
        // getSubmitValue:function(newval){
        //     console.log("watch submitvalue:", newval)
        //     this.getFilteredResult()
        // }
    }
}
</script>