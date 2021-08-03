<template>
    <div>
        <v-btn @click="getFilteredResult()">
        search
    </v-btn>
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
            'searchResults'
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
                    theme : Object.values(this.submitValue)[0],
                    population : Object.values(this.submitValue)[1],
                    distance : Object.values(this.submitValue)[2],
                    transportation :Object.values(this.submitValue)[3],
                    origin: Object.values(this.submitValue)[4]
                }
            )
            console.log("res : " ,res.data)

            await this.updateSearchResults(res.data)

            console.log("searchresults: ",this.searchResults)
        },
    }
}
</script>