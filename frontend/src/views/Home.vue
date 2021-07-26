<template>
    <div>
        home
        <ShowMap />
        <ShowFilter />
    </div>
</template> 

<script>
import ShowMap from '@/components/ShowMap.vue'
import ShowFilter from '@/components/ShowFilter.vue'
export default {
    components: {
        ShowMap,
        ShowFilter

    }
}
</script>