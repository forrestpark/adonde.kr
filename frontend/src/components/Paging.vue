<template>
  <ul class="paging">
    <li v-for="(page, idx) in totalPage" :key="idx" @click="movePage(page)">{{page}}</li>
  </ul>
</template>

<script>
export default {
  props: ["totalPage"],
  data() {
    return {};
  },
  methods:{
      movePage(page){
          this.$emit("movePage", page)
      }
  }
};
</script>