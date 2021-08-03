<template>
    <div>
        <v-btn 
        :disabled="searchDisabled"
          color="primary"
          >
        <span>random</span>
      </v-btn>
        <v-btn 
        :disabled="searchDisabled"
        color="primary"
        @click="getFilteredResult()"> 
       
        ShowAll
    </v-btn>
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
            'updateSearchResults'
        ]),
        async getFilteredResult() {
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

            await this.updateSearchResults(res.data)

            console.log("searchresults: ",this.searchResults)
        },
    }
}
</script>