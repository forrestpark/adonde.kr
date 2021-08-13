<template>
    <div>
        mypage
    </div>
</template>

<script>
  export default {
    computed:{
        user(){
            return this.$store.state.user
        }
    },
    mounted(){
        if(this.user.email == undefined){
            alert('로그인을 해야 사용할 수 있습니다!')
            this.$router.push({path:'/home'})
        }
    }
  }
</script>