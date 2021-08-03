<template>
  
   <div>
       <v-progress-linear
        :active="loading"
        :indeterminate="loading"
        absolute
        bottom
        color="deep-purple accent-4"
      ></v-progress-linear>
    

    
        
            <v-btn
              color="primary"
              @click="loading = true"
            >
              Start loading
            </v-btn>
   </div>
         

</template>

<script>
  export default {
    data: () => ({
      loading: false,
    }),

    watch: {
      loading (val) {
        if (!val) return

        setTimeout(() => (this.loading = false), 3000)
      },
    },
  }
</script>