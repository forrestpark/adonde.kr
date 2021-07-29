<template>
    <div>
   
        <v-flex xs6>
            <vue-cascader-select style="z-index:2;"
            :options="$t('StartItems')"
            @clear="(val) => value = ''"
            @select="(selected) => value = selected.value"
            :value="value"   
        />
        </v-flex>
        {{value}}

    </div>
</template>

<script>
export default {
    data(){
        return{
            label: '',
            value: ''     
        }
    },
   
}
</script>

<style scoped>
.vcs__picker input,
.vcs__select-menu {
  background: yellow;
  color: white;
  border-color: yellow;
}

.vcs__picker input::placeholder {
  color: #bbb;
}

.vcs__option--active {
  background: #41444e;
}

.vcs__option:hover {
  background: #474b56;
}
</style>


