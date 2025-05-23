<template>
  <v-app style="background-color: #44ad5e">
    <v-container fill-height fluid>
      <v-row align="center" justify="center">
        <transition name="fade">
          <p v-if="show">
            <v-img elevation="24" :src="require(`@/assets/welcome.png`)">
            </v-img>
          </p>
        </transition>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.query.userId,
      show: false,
    };
  },
  mounted() {
    this.loginRedirect();
    this.show = true;
  },
  methods: {
    async loginRedirect() {
      // 더미 사용자 데이터
      const dummyUser = {
        id: this.id,
        email: "test@gmail.com",
        nickname: "테스트 사용자",
        profile_image: "https://via.placeholder.com/150",
        dateofbirth: "1990-01-01",
        storedCities: [],
      };

      sessionStorage.setItem("user", JSON.stringify(dummyUser));
      setTimeout(() => {
        this.$router.push({ path: "/" });
      }, 2000);
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
