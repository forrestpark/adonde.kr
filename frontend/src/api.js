import axios from "axios";

const BASE_URL = "https://adonde-kr.herokuapp.com";
// const BASE_URL = 'http://localhost:3000'

// 더미 데이터
const dummyData = {
  cities: [
    {
      id: 1,
      sido_sgg: "서울",
      population: 9565990,
      latitude: 37.566534999999995,
      longitude: 126.9779692,
      description:
        "대한민국의 수도이자 최대 도시로, 현대적인 도시와 전통적인 문화가 공존하는 곳입니다. 남산타워, 경복궁, 명동 등 다양한 관광지가 있습니다.",
      image_src:
        "https://tong.visitkorea.or.kr/cms/resource/80/746580_image2_1.jpg",
      tourism_link: "https://english.visitseoul.net/index",
    },
    {
      id: 2,
      sido_sgg: "부산",
      population: 3364358,
      latitude: 35.17955429999999,
      longitude: 129.07564159999998,
      description:
        "대한민국 제2의 도시이자 최대 항구도시로, 아름다운 해변과 맛있는 해산물로 유명합니다. 해운대, 광안대교, 자갈치시장 등이 대표적인 관광지입니다.",
      image_src:
        "https://tong.visitkorea.or.kr/cms/resource/21/2364321_image2_1.jpg",
      tourism_link: "https://www.visitbusan.net/index.do",
    },
    {
      id: 3,
      sido_sgg: "제주",
      population: 492627,
      latitude: 33.4996213,
      longitude: 126.5311884,
      description:
        "한국의 아름다운 섬, 제주도는 아름다운 자연과 독특한 문화를 가진 섬입니다. 한라산, 성산일출봉, 우도 등 다양한 관광지가 있습니다.",
      image_src:
        "https://tong.visitkorea.or.kr/cms/resource/04/2658504_image2_1.jpeg",
      tourism_link: "https://www.visitjeju.net/en",
    },
    {
      id: 4,
      sido_sgg: "인천",
      population: 2936367,
      latitude: 37.4562557,
      longitude: 126.70520619999999,
      description:
        "서해안의 관문, 인천은 대한민국의 제3의 도시로, 국제공항과 항만이 있는 중요한 교통 중심지입니다.",
      image_src:
        "https://tong.visitkorea.or.kr/cms/resource/66/2512766_image2_1.jpg",
      tourism_link: "https://www.incheon.go.kr/en/index",
    },
    {
      id: 5,
      sido_sgg: "대구",
      population: 2397646,
      latitude: 35.871435399999996,
      longitude: 128.60144499999998,
      description:
        "대한민국의 중심 도시, 대구는 경상북도의 중심지로, 전통시장과 현대적인 도시가 어우러진 곳입니다.",
      image_src:
        "https://tong.visitkorea.or.kr/cms/resource/62/219162_image2_1.jpg",
      tourism_link: "https://www.daegu.go.kr/english/index.do",
    },
  ],
  places: {
    beaches: [
      { name: "해운대 해수욕장", link: "https://www.visitbusan.net/index.do" },
      { name: "광안리 해수욕장", link: "https://www.visitbusan.net/index.do" },
      { name: "월정리 해변", link: "https://www.visitjeju.net/en" },
      { name: "협재 해변", link: "https://www.visitjeju.net/en" },
    ],
    mountains: [
      { name: "한라산", link: "https://www.visitjeju.net/en" },
      { name: "성산일출봉", link: "https://www.visitjeju.net/en" },
      { name: "북한산", link: "https://english.visitseoul.net/index" },
      { name: "도봉산", link: "https://english.visitseoul.net/index" },
    ],
    rivers: [
      { name: "한강", link: "https://english.visitseoul.net/index" },
      { name: "서천강", link: "https://www.visitjeju.net/en" },
      { name: "낙동강", link: "https://www.visitbusan.net/index.do" },
      { name: "금강", link: "https://www.visitjeju.net/en" },
    ],
    valleys: [
      { name: "천지연폭포", link: "https://www.visitjeju.net/en" },
      { name: "정방폭포", link: "https://www.visitjeju.net/en" },
      { name: "용두암", link: "https://www.visitjeju.net/en" },
      { name: "만장굴", link: "https://www.visitjeju.net/en" },
    ],
  },
  express: [
    { name: "인천국제공항", distance: 50 },
    { name: "김포국제공항", distance: 30 },
  ],
  suburbs: [
    { name: "수원", distance: 30 },
    { name: "성남", distance: 20 },
    { name: "용인", distance: 40 },
  ],
  train: [
    { name: "서울역", distance: 5 },
    { name: "용산역", distance: 3 },
  ],
};

// API 호출 가로채기
const originalAxios = axios.post;
axios.post = async function (url, data) {
  if (url.includes("/city/findOne")) {
    console.log("요청된 도시:", data.sido_sgg);
    const city = dummyData.cities.find((c) => {
      console.log("비교:", c.sido_sgg, data.sido_sgg);
      return c.sido_sgg === data.sido_sgg;
    });

    if (!city) {
      console.log("도시를 찾지 못함, 기본값(서울) 반환");
      return { data: dummyData.cities[0] };
    }
    console.log("찾은 도시:", city.sido_sgg);
    return { data: city };
  }
  if (url.includes("/place/findBySidoSggAndTheme")) {
    // 도시별로 다른 장소 정보 반환
    const city = data.sido_sgg;
    let places = { ...dummyData.places };

    if (city === "서울") {
      places = {
        mountains: dummyData.places.mountains.filter((p) =>
          p.link.includes("seoul")
        ),
        rivers: dummyData.places.rivers.filter((p) => p.link.includes("seoul")),
        beaches: [],
        valleys: [],
      };
    } else if (city === "부산") {
      places = {
        beaches: dummyData.places.beaches.filter((p) =>
          p.link.includes("busan")
        ),
        rivers: dummyData.places.rivers.filter((p) => p.link.includes("busan")),
        mountains: [],
        valleys: [],
      };
    } else if (city === "제주") {
      places = {
        beaches: dummyData.places.beaches.filter((p) =>
          p.link.includes("jeju")
        ),
        mountains: dummyData.places.mountains.filter((p) =>
          p.link.includes("jeju")
        ),
        valleys: dummyData.places.valleys.filter((p) =>
          p.link.includes("jeju")
        ),
        rivers: dummyData.places.rivers.filter((p) => p.link.includes("jeju")),
      };
    }

    return { data: places };
  }
  if (url.includes("/search/")) {
    return { data: dummyData.cities };
  }
  if (url.includes("/express/findAny")) {
    return { data: dummyData.express };
  }
  if (url.includes("/suburbs/findAny")) {
    return { data: dummyData.suburbs };
  }
  if (url.includes("/train/findOne")) {
    return { data: dummyData.train };
  }
  return originalAxios.apply(this, arguments);
};

export { BASE_URL };
