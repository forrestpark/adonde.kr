<template>
  <v-app style="background-color: #08844e">
    <v-progress-linear
      :active="loading"
      :indeterminate="loading"
      striped
      color="blue"
      rounded
      height="6"
    ></v-progress-linear>

    <div style="padding: 50px">
      <v-flex xs12 sm12 md12 lg12 xl12>
        <v-row>
          <v-col>
            <v-card>
              <v-card-text>
                <v-row>
                  <v-card-title>
                    <h1 class="name">{{ sido_sgg_title }}</h1>
                  </v-card-title>
                  <v-card-text>
                    <v-img
                      style="border-radius: 10px"
                      :src="cityDetails.image_src"
                      class="white--text align-end"
                      height="500"
                    >
                    </v-img>
                  </v-card-text>
                  <v-card-text>
                    <h2 class="description">
                      {{ cityDetails.description }}
                    </h2>
                  </v-card-text>
                  <v-divider class="mx-4"></v-divider>

                  <v-card-title class="population">
                    <h2>인구수 : &nbsp;</h2>
                    <h2>
                      {{ population }}
                    </h2>
                    <h2>(명)</h2>
                  </v-card-title>

                  <v-card-text>
                    <h2 class="link">
                      <a
                        :href="cityDetails.tourism_link"
                        target="_blank"
                        style="color: #ffbe59; font-size: 15px"
                      >
                        {{ cityDetails.tourism_link }}
                      </a>
                    </h2>
                  </v-card-text>
                </v-row>

                <v-row class="places">
                  <div
                    v-for="(place, index) in places"
                    :key="index"
                    style="padding: 8px"
                  >
                    <v-sheet
                      v-if="place.length != 0"
                      elevation="10"
                      rounded="xl"
                    >
                      <v-sheet
                        v-if="place.length != 0"
                        class="pa-3 orange text-center"
                        dark
                        rounded="t-xl"
                      >
                        {{ index }}
                      </v-sheet>

                      <div class="pa-4">
                        <v-chip-group
                          active-class="primary--text"
                          column
                          v-if="place.length != 0"
                          show-arrows
                          multiple
                        >
                          <v-chip
                            v-for="item in place"
                            :key="item.name"
                            :href="item.link"
                            target="_blank"
                          >
                            {{ item.name }}
                          </v-chip>
                        </v-chip-group>
                      </div>
                    </v-sheet>
                  </div>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col>
            <div
              class="map"
              id="map"
              style="border-radius: 10px; height: 1000px"
            ></div>
          </v-col>
        </v-row>
      </v-flex>
    </div>
  </v-app>
</template>

<script>
// import axios from "axios";
// import { BASE_URL } from "@/api.js";
export default {
  mounted() {
    this.getCityDetail();

    this.getPlace();
  },
  data() {
    return {
      loading: false,
      sido_sgg: this.$route.query.name,
      cityDetails: {
        image_src: "",
        description: "",
        tourism_link: "",
        latitude: 0,
        longitude: 0,
        population: 0,
      },
      latitude: "",
      longitude: "",
      model: null,
      beaches: [],
      mountains: [],
      rivers: [],
      valleys: [],
      places: {},
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
      sido_sgg_title: "",
      population: "",
      dummyData: {
        서울: {
          image_src:
            "https://tong.visitkorea.or.kr/cms/resource/80/746580_image2_1.jpg",
          description:
            "대한민국의 수도이자 최대 도시로, 현대적인 도시와 전통적인 문화가 공존하는 곳입니다. 남산타워, 경복궁, 명동 등 다양한 관광지가 있습니다.",
          tourism_link: "https://english.visitseoul.net/index",
          latitude: 37.566534999999995,
          longitude: 126.9779692,
          population: 9565990,
          places: {
            산: [
              {
                name: "북한산",
                link: "https://map.naver.com/v5/search/서울 산/place/11491416",
              },
              {
                name: "도봉산",
                link: "https://map.naver.com/v5/search/서울 산/place/13491821",
              },
              {
                name: "인왕산",
                link: "https://map.naver.com/v5/search/서울 산/place/11491503",
              },
            ],
            계곡: [
              {
                name: "진관사계곡",
                link: "https://map.naver.com/v5/search/서울 계곡/place/18693189",
              },
              {
                name: "백사실계곡",
                link: "https://map.naver.com/v5/search/서울 계곡/place/13400646",
              },
            ],
            강: [
              {
                name: "한강",
                link: "https://map.naver.com/v5/search/서울 강/place/13491889",
              },
              {
                name: "청계천",
                link: "https://map.naver.com/v5/search/서울 강/place/13491093",
              },
            ],
          },
        },
        부산: {
          image_src:
            "https://tong.visitkorea.or.kr/cms/resource/21/2364321_image2_1.jpg",
          description:
            "대한민국 제2의 도시이자 최대 항구도시로, 아름다운 해변과 맛있는 해산물로 유명합니다. 해운대, 광안대교, 자갈치시장 등이 대표적인 관광지입니다.",
          tourism_link: "https://www.visitbusan.net/index.do",
          latitude: 35.17955429999999,
          longitude: 129.07564159999998,
          population: 3364358,
          places: {
            산: [
              {
                name: "백양산",
                link: "https://map.naver.com/v5/search/부산 산/place/13491615",
              },
              {
                name: "봉래산",
                link: "https://map.naver.com/v5/search/부산 산/place/16742104",
              },
              {
                name: "장산",
                link: "https://map.naver.com/v5/search/부산 산/place/16993282",
              },
            ],
            해변: [
              {
                name: "다대포해수욕장",
                link: "https://map.naver.com/v5/search/부산 해변/place/13491855",
              },
              {
                name: "임랑해수욕장",
                link: "https://map.naver.com/v5/search/부산 해변/place/13491880",
              },
            ],
            계곡: [
              {
                name: "대천천계곡",
                link: "https://map.naver.com/v5/search/부산 계곡/place/13490869",
              },
            ],
          },
        },
        제주: {
          image_src:
            "https://tong.visitkorea.or.kr/cms/resource/04/2658504_image2_1.jpeg",
          description:
            "한국의 아름다운 섬, 제주도는 아름다운 자연과 독특한 문화를 가진 섬입니다. 한라산, 성산일출봉, 우도 등 다양한 관광지가 있습니다.",
          tourism_link: "https://www.visitjeju.net/en",
          latitude: 33.4996213,
          longitude: 126.5311884,
          population: 492627,
          places: {
            산: [
              {
                name: "한라산",
                link: "https://map.naver.com/v5/search/제주 산/place/11491422",
              },
              {
                name: "성산일출봉",
                link: "https://map.naver.com/v5/search/제주 산/place/13491629",
              },
            ],
            해변: [
              {
                name: "협재해수욕장",
                link: "https://map.naver.com/v5/search/제주 해변/place/13491855",
              },
              {
                name: "월정리해변",
                link: "https://map.naver.com/v5/search/제주 해변/place/13491880",
              },
            ],
            계곡: [
              {
                name: "천지연폭포",
                link: "https://map.naver.com/v5/search/제주 계곡/place/13490869",
              },
              {
                name: "정방폭포",
                link: "https://map.naver.com/v5/search/제주 계곡/place/13490869",
              },
            ],
          },
        },
        인천: {
          image_src:
            "https://tong.visitkorea.or.kr/cms/resource/66/2512766_image2_1.jpg",
          description:
            "서해안의 관문, 인천은 대한민국의 제3의 도시로, 국제공항과 항만이 있는 중요한 교통 중심지입니다. 차이나타운, 월미도, 송도 센트럴파크 등이 대표적인 관광지입니다.",
          tourism_link: "https://www.incheon.go.kr/en/index",
          latitude: 37.4562557,
          longitude: 126.70520619999999,
          population: 2936367,
          places: {
            산: [
              {
                name: "계양산",
                link: "https://map.naver.com/v5/search/인천 계양산/place/11491422",
              },
              {
                name: "무의도 산",
                link: "https://map.naver.com/v5/search/인천 무의도 산/place/13491629",
              },
            ],
            해변: [
              {
                name: "월미도 해변",
                link: "https://map.naver.com/v5/search/인천 월미도 해변/place/13491855",
              },
              {
                name: "무의도 해변",
                link: "https://map.naver.com/v5/search/인천 무의도 해변/place/13491880",
              },
            ],
            계곡: [
              {
                name: "계양산 계곡",
                link: "https://map.naver.com/v5/search/인천 계양산 계곡/place/13490869",
              },
              {
                name: "무의도 계곡",
                link: "https://map.naver.com/v5/search/인천 무의도 계곡/place/13490869",
              },
            ],
          },
        },
        대구: {
          image_src:
            "https://tong.visitkorea.or.kr/cms/resource/62/219162_image2_1.jpg",
          description:
            "대한민국의 중심 도시, 대구는 경상북도의 중심지로, 전통시장과 현대적인 도시가 어우러진 곳입니다. 동성로, 팔공산, 수성못 등이 대표적인 관광지입니다.",
          tourism_link: "https://www.daegu.go.kr/english/index.do",
          latitude: 35.871435399999996,
          longitude: 128.60144499999998,
          population: 2397646,
          places: {
            산: [
              {
                name: "팔공산",
                link: "https://map.naver.com/v5/search/대구 팔공산/place/11491422",
              },
              {
                name: "비슬산",
                link: "https://map.naver.com/v5/search/대구 비슬산/place/13491629",
              },
            ],
            해변: [
              {
                name: "수성못 해변",
                link: "https://map.naver.com/v5/search/대구 수성못 해변/place/13491855",
              },
              {
                name: "달성공원 해변",
                link: "https://map.naver.com/v5/search/대구 달성공원 해변/place/13491880",
              },
            ],
            계곡: [
              {
                name: "팔공산 계곡",
                link: "https://map.naver.com/v5/search/대구 팔공산 계곡/place/13490869",
              },
              {
                name: "비슬산 계곡",
                link: "https://map.naver.com/v5/search/대구 비슬산 계곡/place/13490869",
              },
            ],
          },
        },
      },
    };
  },
  methods: {
    async getCityDetail() {
      this.loading = true;
      try {
        const sido = this.split_sido_sgg(this.sido_sgg)["sido"];
        const cityData = this.dummyData[sido] || this.dummyData["서울"]; // 기본값으로 서울 데이터 사용

        this.cityDetails = {
          image_src: cityData.image_src,
          description: cityData.description,
          tourism_link: cityData.tourism_link,
          latitude: cityData.latitude,
          longitude: cityData.longitude,
          population: cityData.population,
        };

        this.population = this.comma(this.cityDetails.population);
        this.latitude = this.cityDetails.latitude;
        this.longitude = this.cityDetails.longitude;
        this.sido_sgg_title = this.checkIsSpecialCity(this.sido_sgg);

        if (window.kakao && window.kakao.maps) {
          this.initMap();
        } else {
          this.addScript();
        }
      } catch (err) {
        console.log(err);
      }
      this.loading = false;
    },
    async getPlace() {
      try {
        const sido = this.split_sido_sgg(this.sido_sgg)["sido"];
        const cityData = this.dummyData[sido] || this.dummyData["서울"]; // 기본값으로 서울 데이터 사용

        this.places = cityData.places;
      } catch (err) {
        console.log(err);
      }
    },
    checkIsSpecialCity(sido_sgg) {
      //결과값중 특별시가 있는경우는 서울 서울 -> 서울 로 바꿔줌
      var sido = this.split_sido_sgg(sido_sgg)["sido"];

      if (this.checkSpecialCity(sido)) {
        // not special city
        return sido_sgg;
      } else {
        //특별시
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
    async initMap() {
      var container = document.getElementById("map");
      var options = {
        center: new kakao.maps.LatLng(this.latitude, this.longitude),
        level: 10,
      };
      var map = new kakao.maps.Map(container, options);
      //마커추가하려면 객체를 아래와 같이 하나 만든다.
      var marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(this.latitude, this.longitude),
      });
      await marker.setMap(map);
    },
    addScript() {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=0b3e12f49e69284bc5e44c27065a9f7b";
      document.head.appendChild(script);
    },
    comma(val) {
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
};
</script>

<style scoped>
.name {
  font-family: "GmarketSansLight";
  text-align: center;
}
.description {
  font-size: 15px;
  font-family: "GmarketSansMedium";
  letter-spacing: 2px;
}
.population {
  text-align: center;
  font-family: "GmarketSansLight";
}
.link {
  border-radius: 10px;
  background-color: #42ac5e;
  font-family: "GmarketSansLight";
  text-align: center;
}
.places {
  font-family: "GmarketSansBold";
}
</style>
