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
// import axios from "axios";
// import { BASE_URL } from "@/api.js";
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
      try {
        // 더미 유저 데이터 사용
        const dummyUser = {
          id: this.id,
          email: "test@example.com",
          nickname: "테스트",
          profile_image:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
          date_of_birth: "1990-01-01",
          stored_cities: [],
        };

        console.log("user:", JSON.stringify(dummyUser));
        sessionStorage.setItem("user", JSON.stringify(dummyUser));
        setTimeout(() => {
          this.$router.push({ path: "/" });
        }, 2000);
      } catch (err) {
        console.log(err);
      }
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
