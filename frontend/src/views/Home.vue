<template>
   <div>
       <v-row
            class="homeItem">
           <v-col
                class="filter">
                <div   
                    style="height:600px; position: relative;">
                    <show-filter style="overflow: auto;height: 100%"></show-filter> 
                </div> 
            </v-col>
            <v-col
                class="map">
                <show-map></show-map>
            </v-col>      
        </v-row> 
        <v-row>
            <v-col>
                <result-list ></result-list>
           
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
.homeItem .map{flex-grow: 1;}

</style>

