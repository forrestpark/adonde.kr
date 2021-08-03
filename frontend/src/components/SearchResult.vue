<template>
    <div>
        <v-progress-linear
        :active="loading"
        :indeterminate="loading"
        striped
        color="yellow"
        rounded
        height="6"
    ></v-progress-linear>
    <br>
        <div>
        <v-btn 
        :disabled="searchDisabled"
          color="primary"
          @click="showRandom"
          >
        <span>random</span>
      </v-btn>
        <v-btn 
        :disabled="searchDisabled"
        color="primary"
        @click="showAll"
        > 
        ShowAll
    </v-btn>
        </div>

    
    <br>
    제출한 결과값
    <br>
    {{submitValue}}
    
    </div>
</template>

<script>
import { mapState , mapMutations } from 'vuex'
import axios from 'axios'
import {BASE_URL} from '@/api.js'
export default {
    data(){
        return{
            loading: false,
            filteredResult: '',
        }
    },
    computed:{
        ...mapState([
            'submitValue'   ,
            'searchResults',
            'checkCurrentDisabled',
            'disabled',
            'searchDisabled'
        ])
    },
    methods:{
        ...mapMutations([
            'updateSearchResults',
            'updateSearchDisabled'
        ]),
        async getFilteredResult() {
            this.loading= true
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
            
            console.log("res : " ,res.data)
            this.filteredResult = res.data
            //await this.updateSearchResults(res.data)

            console.log("searchresults: ",this.filteredResult)

            this.loading = false

            
        },
        showAll(){
            this.updateSearchResults(this.filteredResult)
        },
        showRandom(){
            const randNum = Math.floor(Math.random() * this.filteredResult.length);
            this.updateSearchResults([this.filteredResult[randNum]])
        }
    },
    watch:{
        searchDisabled: function(newval){
            if(!newval){
                this.getFilteredResult()       
            }
        }
    }
}
</script>