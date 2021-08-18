<template>
   <div>
       <v-row
            class="homeItem">
           <v-col
                class="filter">
                <div   
                    style="height:850px; position: relative;">
                    <show-filter style="overflow: auto;height: 100%"></show-filter> 
                </div> 
            </v-col>
            <v-col
                class="map">
                <show-map></show-map>
            </v-col>   
            <v-col
                class="resultList">
                <div    
                    style="height:850px; position:relative;">
                    <result-list 
                        style="overflow: auto; width:100px height: 100%"></result-list>
                </div>
            </v-col>    
        </v-row> 
   </div>
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

<style scoped>
.homeItem .filter{flex-grow: 1;}
.homeItem .map{flex-grow: 2;}
.homeItem .resultList{flex-grow: 1;}
</style>

