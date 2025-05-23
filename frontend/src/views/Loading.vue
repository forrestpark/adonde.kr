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
        nickname: "지선",
        profile_image:
          "https://firebasestorage.googleapis.com/v0/b/adonde-app.appspot.com/o/users%2F818CFE5D-6BF0-4194-8D9C-D316489B1FFC_1_105_c.jpeg?alt=media&token=c21007a7-bdb4-4c0f-ba41-183449a7681f",
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
