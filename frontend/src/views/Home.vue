<template>
   <v-container>
       <v-layout style="">    
        <show-map></show-map>
        <div style="width:400px; height:800px; position: relative; background-color: yellowgreen;">
            <result-list style="overflow: auto; height: 100%"></result-list>
        </div>
        <div style="width:400px; height:800px; position: relative; background-color: yellow;">
            <show-filter style="overflow: auto"></show-filter> 
        </div>  
       </v-layout>
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

