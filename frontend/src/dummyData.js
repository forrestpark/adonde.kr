const dummyData = {
  dummyUserDetails: {
    id: 1,
    email: "test@gmail.com",
    nickname: "지선",
    profile_image:
      "https://firebasestorage.googleapis.com/v0/b/adonde-app.appspot.com/o/users%2F818CFE5D-6BF0-4194-8D9C-D316489B1FFC_1_105_c.jpeg?alt=media&token=c21007a7-bdb4-4c0f-ba41-183449a7681f",
    dateofbirth: "1999-03-22",
    storedCities: ["서울", "인천", "대구", "부산", "제주"],
  },

  cities: [
    {
      id: 1,
      sido_sgg: "서울 서울",
      population: 9565990,
      latitude: 37.566535,
      longitude: 126.9779692,
      description:
        "대한민국의 수도인 서울을 지방자치단체인 특별시로 부르는 명칭이다. 한반도 중앙에 있으며 한강을 사이에 두고 남북으로 펼쳐져 있다. 북쪽 끝은 도봉구 도봉동, 동쪽 끝은 강동구 상일동, 남쪽 끝은 서초구 원지동, 서쪽 끝은 강서구 오곡동이다. 시청은 중구 을지로1가(태평로1가 31)에 있다.",
      image_src:
        "https://tong.visitkorea.or.kr/cms/resource/80/746580_image2_1.jpg",
      tourism_link: "https://www.visitseoul.net/index",
      places: {
        산: [
          {
            name: "인왕산",
            link: "https://map.naver.com/v5/search/서울 산/place/11491503",
          },
          {
            name: "용마산",
            link: "https://map.naver.com/v5/search/서울 산/place/13490940",
          },
          {
            name: "도봉산",
            link: "https://map.naver.com/v5/search/서울 산/place/13491821",
          },
          {
            name: "응봉산",
            link: "https://map.naver.com/v5/search/서울 산/place/11491502",
          },
          {
            name: "우면산",
            link: "https://map.naver.com/v5/search/서울 산/place/11491484",
          },
          {
            name: "서대문 안산",
            link: "https://map.naver.com/v5/search/서울 산/place/13491439",
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
          {
            name: "삼천사계곡",
            link: "https://map.naver.com/v5/search/서울 계곡/place/13496669",
          },
          {
            name: "벽운계곡",
            link: "https://map.naver.com/v5/search/서울 계곡/place/18645990",
          },
          {
            name: "긴고랑계곡",
            link: "https://map.naver.com/v5/search/서울 계곡/place/38331672",
          },
        ],
        강: [
          {
            name: "청계천",
            link: "https://map.naver.com/v5/search/서울 강/place/13491093",
          },
          {
            name: "양재천",
            link: "https://map.naver.com/v5/search/서울 강/place/12375874",
          },
          {
            name: "한강",
            link: "https://map.naver.com/v5/search/서울 강/place/13491889",
          },
          {
            name: "중랑천",
            link: "https://map.naver.com/v5/search/서울 강/place/34581338",
          },
          {
            name: "불광천",
            link: "https://map.naver.com/v5/search/서울 강/place/13544494",
          },
          {
            name: "홍제천",
            link: "https://map.naver.com/v5/search/서울 강/place/13544486",
          },
        ],
        해변: [],
      },
    },
    {
      id: 6,
      sido_sgg: "부산 부산",
      population: 3364358,
      latitude: 35.17955429999999,
      longitude: 129.07564159999998,
      description:
        "대한민국 제2의 도시이자 제1의 무역항이다. 동쪽과 남쪽은 바다에 면하고 서쪽은 김해시 장유동과 창원시 진해구, 북쪽은 양산시 물금읍과 김해시 대동면, 동쪽은 울산광역시 서생면·온양읍에 접한다. 대한민국 남동단의 관문으로 서울특별시에서 남동쪽으로 약 450km, 대한해협을 끼고 일본 시모노세키[下關]와 약 250km 떨어져 있다. 1군 15구로 이루어져 있으며, 면적은 765.94㎢이다. 시청 소재지는 부산광역시 연제구 연산5동 1000번지이다.",
      image_src:
        "https://tong.visitkorea.or.kr/cms/resource/21/2364321_image2_1.jpg",
      tourism_link: "https://www.visitbusan.net/kr/index.do",
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
            name: "승학산",
            link: "https://map.naver.com/v5/search/부산 산/place/13490923",
          },
          {
            name: "황령산",
            link: "https://map.naver.com/v5/search/부산 산/place/13491303",
          },
          {
            name: "장산",
            link: "https://map.naver.com/v5/search/부산 산/place/16993282",
          },
          {
            name: "윤산",
            link: "https://map.naver.com/v5/search/부산 산/place/13491147",
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
        강: [
          {
            name: "수영강",
            link: "https://map.naver.com/v5/search/부산 강/place/16991621",
          },
        ],
      },
    },
    {
      id: 4,
      sido_sgg: "대구 대구",
      population: 2397646,
      latitude: 35.8714354,
      longitude: 128.60144499999998,
      description:
        "북쪽으로 경상북도 칠곡군·군위군, 동쪽으로 경상북도 경산시·청도군, 남쪽으로 경상남도 창녕군, 서쪽으로 경상북도 고령군·성주군과 접한다. 영남지방의 중앙에서 서쪽으로 치우친 대구분지의 중앙부, 낙동강(洛東江)과 금호강(琴江)의 합류지점 동쪽 금호강 연안에 있다.",
      image_src:
        "https://tong.visitkorea.or.kr/cms/resource/62/219162_image2_1.jpg",
      tourism_link: "http://tour.daegu.go.kr/",
      places: {
        산: [
          {
            name: "비슬산",
            link: "https://map.naver.com/v5/search/대구 산/place/11491422",
          },
          {
            name: "최정산",
            link: "https://map.naver.com/v5/search/대구 산/place/13491629",
          },
          {
            name: "앞산",
            link: "https://map.naver.com/v5/search/대구 산/place/16329264",
          },
          {
            name: "주암산",
            link: "https://map.naver.com/v5/search/대구 산/place/13491719",
          },
          {
            name: "함지산",
            link: "https://map.naver.com/v5/search/대구 산/place/16348176",
          },
          {
            name: "성암산",
            link: "https://map.naver.com/v5/search/대구 산/place/21435699",
          },
        ],
        계곡: [
          {
            name: "안지랭이",
            link: "https://map.naver.com/v5/search/대구 계곡/place/37780900",
          },
          {
            name: "머구실",
            link: "https://map.naver.com/v5/search/대구 계곡/place/37788948",
          },
          {
            name: "사라전",
            link: "https://map.naver.com/v5/search/대구 계곡/place/37780901",
          },
        ],
        강: [
          {
            name: "유곡천",
            link: "https://map.naver.com/v5/search/대구 강/place/16222551",
          },
          {
            name: "신천",
            link: "https://map.naver.com/v5/search/대구 강/place/16320481",
          },
        ],
        해변: [],
      },
    },
    {
      id: 2,
      sido_sgg: "인천 인천",
      population: 2936367,
      latitude: 37.4562557,
      longitude: 126.7052062,
      description:
        "동경 124°36′~ 126°47′, 북위 36°55′~ 37°58′에 있다. 동서거리 192.23km, 남북거리 117.60km에 달한다. 북쪽으로 개풍군·황해도 연백군, 동쪽으로 서울특별시·김포시·부천시·시흥시·안산시, 남쪽으로 충청남도 서산시에 접하고, 서쪽으로 서해에 면한다. 2014년 현재 가구수는 113만 6,280가구이며, 행정구역은 8구 2군 1읍 19면 129개동으로 이루어져 있다. 시청은 남동구 구월동에 있다.",
      image_src:
        "https://tong.visitkorea.or.kr/cms/resource/66/2512766_image2_1.jpg",
      tourism_link: "http://itour.incheon.go.kr/",
      places: {
        산: [
          {
            name: "계양산",
            link: "https://map.naver.com/v5/search/인천 산/place/13490870",
          },
          {
            name: "가현산",
            link: "https://map.naver.com/v5/search/인천 산/place/16994149",
          },
          {
            name: "마니산",
            link: "https://map.naver.com/v5/search/인천 산/place/13491129",
          },
          {
            name: "소래산",
            link: "https://map.naver.com/v5/search/인천 산/place/13491246",
          },
          {
            name: "해명산",
            link: "https://map.naver.com/v5/search/인천 산/place/16647239",
          },
          {
            name: "고려산",
            link: "https://map.naver.com/v5/search/인천 산/place/13491502",
          },
        ],
        해변: [
          {
            name: "을왕리해수욕장",
            link: "https://map.naver.com/v5/search/인천 해변/place/13444291",
          },
          {
            name: "동막해변",
            link: "https://map.naver.com/v5/search/인천 해변/place/13491056",
          },
          {
            name: "왕산해수욕장",
            link: "https://map.naver.com/v5/search/인천 해변/place/13491823",
          },
          {
            name: "민머루해수욕장",
            link: "https://map.naver.com/v5/search/인천 해변/place/11491705",
          },
          {
            name: "십리포해수욕장",
            link: "https://map.naver.com/v5/search/인천 해변/place/11491745",
          },
        ],
        계곡: [],
        강: [],
      },
    },
    {
      id: 39,
      sido_sgg: "제주 제주",
      population: 492627,
      latitude: 33.4996213,
      longitude: 126.5311884,
      description:
        "한국·중국·일본 등 극동 지역의 중앙부에 있어 지정학적으로도 중요하며, 도 전체가 바다로 둘러싸였다. 수리적(數理的)으로는 동경 126°08'∼126°58', 북위 33°06'∼34°00'에 위치한다. 북단은 북위 34°00'의 제주시 추자면 대서리이며, 남단은 북위 33°06'의 서귀포시 대정읍 마라도다. 한국 최남단에 있는 도로서, 제주도를 포함해 9개의 유인도와 55개의 무인도로 이루어졌다. 이 가운데 유인도는 우도·상추자도·하추자도·비양도·횡간도·추포도·가파도·마라도이다. 남북 간의 거리가 약 31㎞, 동서간의 거리가 약 73㎞로 동서로 가로놓인 모양이다. 러시아·중국 등의 대륙과 일본·동남아 등지를 연결하는 요충지이며, 천혜의 자연경관이 수려한 세계적인 휴양관광지다.",
      image_src:
        "https://tong.visitkorea.or.kr/cms/resource/04/2658504_image2_1.jpeg",
      tourism_link: "https://ijto.or.kr/korean/",
      places: {
        해변: [
          {
            name: "산호해수욕장",
            link: "https://map.naver.com/v5/search/제주도 제주 해변/place/13491787",
          },
          {
            name: "중문색달해수욕장",
            link: "https://map.naver.com/v5/search/제주도 서귀포 해변/place/11491786",
          },
          {
            name: "표선해수욕장",
            link: "https://map.naver.com/v5/search/제주도 서귀포 해변/place/13491363",
          },
          {
            name: "황우지해안",
            link: "https://map.naver.com/v5/search/제주도 서귀포 해변/place/38238625",
          },
          {
            name: "광치기해변",
            link: "https://map.naver.com/v5/search/제주도 서귀포 해변/place/38466341",
          },
          {
            name: "사계해안",
            link: "https://map.naver.com/v5/search/제주도 서귀포 해변/place/17083214",
          },
          {
            name: "신양섭지해수욕장",
            link: "https://map.naver.com/v5/search/제주도 서귀포 해변/place/11491743",
          },
        ],
        강: [
          {
            name: "제주당",
            link: "https://map.naver.com/v5/entry/place/1692888727?c=14083474.603685688%2C3926576.581743233%2C15%2C0%2C0%2C0%2Cdh&placePath=%3Fentry%3Dplt",
          },
          {
            name: "강정천",
            link: "https://map.naver.com/v5/search/제주도 서귀포 강/place/20725402",
          },
          {
            name: "고지천",
            link: "https://map.naver.com/v5/search/제주도 서귀포 강/place/17061608",
          },
        ],
        산: [
          {
            name: "송악산",
            link: "https://map.naver.com/v5/search/제주도 서귀포 산/place/11491447",
          },
        ],
        계곡: [
          {
            name: "엉덩물계곡",
            link: "https://map.naver.com/v5/search/제주도 서귀포 계곡/place/1372279326",
          },
        ],
      },
    },
  ],

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

export default dummyData;
