<template>
   <v-app style="background-color: #D7F0D9">
       <v-progress-linear
        v-if="loading"
        :active="loading"
        :indeterminate="loading"
        striped
        color="yellow"
        rounded
        height="8"
      ></v-progress-linear>
       <v-row
            class="homeItem">
           <v-col
                class="filter">
                <div   
                    style="height:650px; position: relative; ">
                    <show-filter style="overflow: auto;height: 100%"></show-filter> 
                </div> 
            </v-col>
            <v-col 
                class="map">
                <show-map></show-map>
            </v-col>      
        </v-row> 
        <v-row>
            <v-col style="padding: 0px">
                <result-list></result-list>
            </v-col>
        </v-row>
   </v-app>
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
    },
    computed:{
        loading(){
            return this.$store.state.loading
        }
    }

   
}
</script>

<style scoped>
.homeItem .filter{
    flex-grow: 1;
    padding-right: 0;
    padding-bottom: 0;
}
.homeItem .map{
    flex-grow: 1.5;
    padding-bottom: 0;
}

</style>

