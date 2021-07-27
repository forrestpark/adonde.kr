<template>
   <v-container grid-list-xl>
       <v-layout row wrap>
           <v-flex>
               <show-map></show-map>
           </v-flex>
           <v-flex>
               <show-filter></show-filter>
           </v-flex>
       </v-layout>

   </v-container>
</template> 

<script>
import ShowMap from '@/components/ShowMap.vue'
import ShowFilter from '@/components/ShowFilter.vue'
//import LayTest from '@/componentsxw/LayoutTest.vue'
export default {
    components: {
        ShowMap,
        ShowFilter
        //LayTest

    }
}
</script>

<style scoped>
div{
    float: left;
}
</style>