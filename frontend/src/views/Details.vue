<template>
    <div>
        <ShowDetails/>
    <ShowMap/>
    </div>

</template>

<script>
import ShowMap from '@/components/ShowMap.vue'
import ShowDetails from '@/components/ShowDetails.vue'
  export default {
      components:{
          ShowDetails,
          ShowMap
      },
    
   
  }
</script>