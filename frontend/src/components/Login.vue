<template>
  <section class="Intro">
    <v-flex>
      <div class="intro">
        <!-- <v-img
          style="margin: auto"
          @click="kakaoLogin"
          alt="kakaoLogin"
          contain
          :src="require(`@/assets/en_large.png`)"
          transition="scale-transition"
          width="380"
        /> -->
        <v-img
          style="margin: auto"
          alt="googleLogin"
          @click="googleLogin"
          contain
          :src="require(`@/assets/google.png`)"
          transition="scale-transition"
          width="380"
        />
        <!-- <v-img
          style="margin: auto"
          alt="facebookLogin"
          @click="facebookLogin"
          contain
          :src="require(`@/assets/facebook.png`)"
          transition="scale-transition"
          width="380"
        /> -->
        <!-- <v-btn 
            class="facebookLogin"
            width=300
            @click="facebookLogin" 
            color="primary">
            <v-icon>
                mdi-facebook
            </v-icon>
            login with facebook
        </v-btn> -->
        <!-- <v-img
            style="margin: auto"
            v-else
            @click="kakaoLogin"
            alt="user"
            contain
            :src="require(`@/assets/en_large.png`)"
            transition="scale-transition"
            width="400px"
            /> -->

        <v-progress-circular
          indeterminate
          v-if="loading"
          color="amber"
        ></v-progress-circular>

        <!-- <v-img
            width=400
            style="margin: auto"
            v-if="user != ''"
            :src="require(`@/assets/welcome.png`)">
        </v-img> -->

        <!-- <h2>{{user.nickname}}</h2>
        <img
            width="100px" 
            :src="`${user.profile_image}`" alt /> -->
      </div>
    </v-flex>
  </section>
</template>

<script>
import { mapState, mapMutations } from "vuex";
// import axios from "axios";
// import { BASE_URL } from "@/api.js";

export default {
  data() {
    return {
      test: "",
      loading: false,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    ...mapMutations(["updateUser", "updateUserStoredCities"]),
    async login(email, nickname, profile_image, dateofbirth) {
      // 더미 사용자 데이터
      const dummyUser = {
        id: 1,
        email: email,
        nickname: nickname,
        profile_image: profile_image,
        dateofbirth: dateofbirth,
        storedCities: [],
      };

      this.updateUser(dummyUser);
      sessionStorage.setItem("user", JSON.stringify(dummyUser));
      this.loading = false;
      this.$emit("close");
      this.$router.push({ path: "/loading?userId=" + dummyUser.id });
    },

    async googleLogin() {
      // 더미 구글 로그인
      const dummyUser = {
        id: 1,
        email: "test@gmail.com",
        nickname: "지선",
        profile_image:
          "https://firebasestorage.googleapis.com/v0/b/adonde-app.appspot.com/o/users%2F818CFE5D-6BF0-4194-8D9C-D316489B1FFC_1_105_c.jpeg?alt=media&token=c21007a7-bdb4-4c0f-ba41-183449a7681f",
        dateofbirth: "1990-01-01",
        storedCities: [],
      };

      this.updateUser(dummyUser);
      sessionStorage.setItem("user", JSON.stringify(dummyUser));
      this.$router.push({ path: "/loading?userId=" + dummyUser.id });
    },

    facebookLogin() {
      window.location.href = "https://adonde-kr.herokuapp.com/auth/facebook";
      // console.log("login.vue session user: ", )
      // console.log("google login profile: ", profile)
    },

    kakaoLogin() {
      this.loading = true;
      var vm = this;
      window.Kakao.Auth.login({
        scope: "profile_nickname, profile_image, account_email, birthday",
        success: function (authObj) {
          console.log("authobj", authObj.access_token);
          // window.Kakao.Auth.setAccessToken(authObj.access_token)
          // fetch user data from Kakao Login API
          window.Kakao.API.request({
            url: "/v2/user/me",
            success: (res) => {
              const kakao_account = res.kakao_account;
              console.log(kakao_account);
              console.log("email:", kakao_account.email);
              console.log("birthday:", kakao_account.birthday);
              console.log("nickname:", kakao_account.profile.nickname);
              console.log("img", kakao_account.profile.profile_image_url);

              vm.login(
                kakao_account.email,
                kakao_account.profile.nickname,
                kakao_account.profile.profile_image_url,
                kakao_account.birthday
              );
            },
          });
        },
      });
    },
    // kakaoLogout() {
    //     window.Kakao.Auth.logout((response) => {
    //         console.log(response);
    //         this.$store.commit("updateUser", {})
    //         alert("로그아웃");
    //         this.$router.push({path:'/'})
    //     });
    // } ,
    async findOneById(id) {
      // 더미 사용자 상세 정보
      const dummyUserDetails = {
        id: id,
        email: "test@gmail.com",
        nickname: "지선",
        profile_image:
          "https://firebasestorage.googleapis.com/v0/b/adonde-app.appspot.com/o/users%2F818CFE5D-6BF0-4194-8D9C-D316489B1FFC_1_105_c.jpeg?alt=media&token=c21007a7-bdb4-4c0f-ba41-183449a7681f",
        dateofbirth: "1990-01-01",
        storedCities: [],
      };

      this.updateUserStoredCities(dummyUserDetails.storedCities);
    },
  },
};
</script>
