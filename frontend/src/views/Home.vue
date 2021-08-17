<template>
   <v-container>
       <v-row>
           <v-col>
                    <div style="width:400px; height:900px; position: relative; background-color: grey;">
            <show-filter style="overflow: auto;height: 100%"></show-filter> 
        </div> 
                </v-col>
            <v-col>
                <show-map></show-map>
                </v-col>   
                <v-col>
                     <div style="width:400px; height:900px; position: relative;">
            <result-list style="overflow: auto; height: 100%"></result-list>
        </div>
                </v-col>
                
        </v-row>   

        
       
         
       
   </v-container>
</template> 

<script>
import ShowMap from '@/components/ShowMap.vue'
import ShowFilter from '@/components/ShowFilter.vue'
import ResultList from '@/components/ResultList.vue'

export default {
    components: {
        ShowMap,
        ShowFilter,
        ResultList
    }
}
</script>

