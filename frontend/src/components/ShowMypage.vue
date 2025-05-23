<template>
  <v-app style="background-color: #d7f0d9">
    <v-progress-linear
      v-if="loading"
      :active="loading"
      :indeterminate="loading"
      striped
      color="yellow"
      rounded
      height="6"
    ></v-progress-linear>

    <v-alert
      v-if="isStoreEmpty == true"
      dismissible
      type="info"
      border="left"
      elevation="2"
      icon="mdi-bell-ring-outline"
    >
      저장된 도시가 없습니다. 홈으로 가서 도시를 저장해주세요!
    </v-alert>

    <v-slide-group v-model="model" class="pa-4" center-active show-arrows>
      <v-slide-item
        class="mypageItem"
        v-for="item in userStoredDetails"
        :key="item.sido_sgg"
        v-slot="{ active, toggle }"
      >
        <v-card
          :color="active ? undefined : 'grey lighten-1'"
          class="ma-4"
          height="700"
          width="350"
          @click="toggle"
        >
          <v-img
            :id="item.sido_sgg"
            :src="item.image_src"
            class="white--text align-end"
            height="300"
          >
            <v-card-title
              class="mypageItemTitle"
              v-text="checkIsSpecialCity(item.sido_sgg)"
            ></v-card-title>
          </v-img>
          <v-card-subtitle :id="item.sido_sgg" v-text="item.description">
          </v-card-subtitle>

          <v-card-actions>
            <div style="position: fixed; bottom: 30px">
              <div style="float: left">
                <heart-component
                  :sido_sgg="item.sido_sgg"
                  @click.native="removeCity(item.sido_sgg)"
                ></heart-component>
              </div>
              <div style="float: left">
                <v-btn
                  class="mypageItemBtn"
                  color="#FCCE67"
                  text
                  @click="gotoDetailPage(item.sido_sgg)"
                >
                  Details
                </v-btn>
              </div>
            </div>
          </v-card-actions>

          <v-row class="fill-height" align="center" justify="center"> </v-row>
        </v-card>
      </v-slide-item>
    </v-slide-group>
  </v-app>
</template>

<script>
import HeartComponent from "./HeartComponent.vue";
import { mapState, mapMutations } from "vuex";

export default {
  components: {
    HeartComponent,
  },
  data() {
    return {
      loading: false,
      heart: true,
      sido_sgg: "",
      model: null,
      sido_unify: {
        경기: "경기도",
        강원: "강원도",
        충북: "충청북도",
        충남: "충청남도",
        경북: "경상북도",
        경남: "경상남도",
        전북: "전라북도",
        전남: "전라남도",
        제주특별자치도: "제주도",
        제주: "제주도",
      },
      isStoreEmpty: false,
      userStoredDetails: [
        {
          id: 1,
          sido_sgg: "서울",
          population: 9565990,
          description:
            "대한민국의 수도이자 최대 도시로, 현대적인 도시와 전통적인 문화가 공존하는 곳입니다.",
          image_src:
            "https://tong.visitkorea.or.kr/cms/resource/80/746580_image2_1.jpg",
        },
        {
          id: 2,
          sido_sgg: "부산",
          population: 3364358,
          description:
            "대한민국 제2의 도시이자 최대 항구도시로, 아름다운 해변과 맛있는 해산물로 유명합니다.",
          image_src:
            "https://tong.visitkorea.or.kr/cms/resource/21/2364321_image2_1.jpg",
        },
        {
          id: 3,
          sido_sgg: "제주",
          population: 492627,
          description:
            "한국의 아름다운 섬, 제주도는 아름다운 자연과 독특한 문화를 가진 섬입니다.",
          image_src:
            "https://tong.visitkorea.or.kr/cms/resource/04/2658504_image2_1.jpeg",
        },
      ],
    };
  },
  computed: {
    ...mapState(["user", "userStoredCities"]),
  },
  methods: {
    ...mapMutations(["updateUserStoredCities", "updateUserStoredDetails"]),
    gotoDetailPage(sido_sgg) {
      let routeData = this.$router.resolve({
        name: "details",
        query: { name: sido_sgg },
      });
      window.open(routeData.href, "_blank");
    },
    checkIsSpecialCity(sido_sgg) {
      var sido = this.split_sido_sgg(sido_sgg)["sido"];
      if (this.checkSpecialCity(sido)) {
        return sido_sgg;
      } else {
        return sido;
      }
    },
    split_sido_sgg(sido_sgg) {
      var sido_sgg_split = sido_sgg.split(" ");
      return { sido: sido_sgg_split[0], sgg: sido_sgg_split[1] };
    },
    checkSpecialCity(sido) {
      if (Object.values(this.sido_unify).includes(sido)) {
        return true;
      } else {
        return false;
      }
    },
    removeCity(sido_sgg) {
      this.userStoredDetails = this.userStoredDetails.filter(
        (city) => city.sido_sgg !== sido_sgg
      );
      if (this.userStoredDetails.length === 0) {
        this.isStoreEmpty = true;
      }
    },
  },
  mounted() {
    if (JSON.parse(sessionStorage.getItem("user")).email == undefined) {
      alert("로그인을 해야 사용할 수 있습니다!");
      this.$router.push({ path: "/" });
    }
  },
};
</script>

<style scoped>
.mypageItem {
  font-family: "GmarketSansMedium";
}
.mypageItemTitle {
  font-family: "GmarketSansMedium";
}
.mypageItemBtn {
  font-family: "GmarketSansBold";
}
</style>
