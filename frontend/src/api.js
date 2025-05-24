import axios from "axios";
import dummyData from "./dummyData";

const BASE_URL = "https://adonde-kr.herokuapp.com";

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

    const cityData = dummyData.cities.find((i) => i.sido_sgg === city);
    const places = cityData?.places;

    console.log("places", places, city);

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
  //   if (url.includes("/user/deleteStoredCity ")) {
  //     return { data: dummyData.cities };
  //   }
  return originalAxios.apply(this, arguments);
};

export { BASE_URL };
