<template>
   <v-app>
       
       <div>
           <ShowMap />
       </div>
       <!-- <div>
           <ShowFilter/>
       </div> -->
       <LayTest/>
   </v-app>
</template> 

<script>
import ShowMap from '@/components/ShowMap.vue'
//import ShowFilter from '@/components/ShowFilter.vue'
import LayTest from '@/components/LayoutTest.vue'
export default {
    components: {
        ShowMap,
        //ShowFilter,
        LayTest

    }
}
</script>

<style scoped>
div{
    float: left;
}
</style>