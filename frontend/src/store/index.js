import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
// import axios from 'axios'
// import {BASE_URL} from '@/api.js'
export default new Vuex.Store({
    state:{
        //user
        user :'',
        userStoredCities:'',
        userStoredDetails:'',

        //data
        loading:false,
        isSubmitValueChange:false,
        searchDisabled:true,
        disabled:true,
        checkCurrentDisabled: true,

        submitValue:null,
        currentAdd:"",
        clickItemNum: null,
        searchResults: [],

        //map
        map: '',
        isSetMarker: false,

        //translate
        originEntoKo_unify: {
        "Seoul": "서울", "Busan": "부산", "Daegu": "대구", 
        "Incheon": "인천", "Gwangju": "광주", "Daejeon": "대전", 
        "Ulsan": "울산", "Sejong": "세종",
        "Suwon, Gyeonggi Province": "경기도 수원",
        "Seongnam, Gyeonggi Province": "경기도 성남",
        "Uijeongbu, Gyeonggi Province": "경기도 의정부",
        "Anyang, Gyeonggi Province": "경기도 안양",
        "Bucheon, Gyeonggi Province": "경기도 부천",
        "Gwangmyeong, Gyeonggi Province": "경기도 광명",
        "Pyeongtaek, Gyeonggi Province": "경기도 평택",
        "Dongducheon, Gyeonggi Province": "경기도 동두천",
        "Ansan, Gyeonggi Province": "경기도 안산",
        "Goyang, Gyeonggi Province": "경기도 고양",
        "Gwacheon, Gyeonggi Province": "경기도 과천",
        "Guri, Gyeonggi Province": "경기도 구리",
        "Namyangju, Gyeonggi Province": "경기도 남양주",
        "Osan, Gyeonggi Province": "경기도 오산",
        "Siheung, Gyeonggi Province": "경기도 시흥",
        "Gunpo, Gyeonggi Province": "경기도 군포",
        "Uiwang, Gyeonggi Province": "경기도 의왕",
        "Hanam, Gyeonggi Province": "경기도 하남",
        "Yongin, Gyeonggi Province": "경기도 용인",
        "Paju, Gyeonggi Province": "경기도 파주",
        "Icheon, Gyeonggi Province": "경기도 이천",
        "Ansung, Gyeonggi Province": "경기도 안성",
        "Gimpo, Gyeonggi Province": "경기도 김포",
        "Hwaseong, Gyeonggi Province": "경기도 화성",
        "Kwangju, Gyeonggi Province": "경기도 광주",
        "Yangju, Gyeonggi Province": "경기도 양주",
        "Pocheon, Gyeonggi Province": "경기도 포천",
        "Yeoju, Gyeonggi Province": "경기도 여주",
        "Yeoncheon, Gyeonggi Province": "경기도 연천",
        "Gapyeong, Gyeonggi Province": "경기도 가평",
        "Yangpyeong, Gyeonggi Province": "경기도 양평",
        "Chuncheon, Gangwon Province": "강원도 춘천",
        "Wonju, Gangwon Province": "강원도 원주",
        "Gangneung, Gangwon Province": "강원도 강릉",
        "Donghae, Gangwon Province": "강원도 동해",
        "Taebaek, Gangwon Province": "강원도 태백",
        "Sokcho, Gangwon Province": "강원도 속초",
        "Samcheok, Gangwon Province": "강원도 삼척",
        "Hongcheon, Gangwon Province": "강원도 홍천",
        "Hoengseong, Gangwon Province": "강원도 횡성",
        "Yeongwol, Gangwon Province": "강원도 영월",
        "Pyeongchang, Gangwon Province": "강원도 평창",
        "Jeongseon, Gangwon Province": "강원도 정선",
        "Cheorwon, Gangwon Province": "강원도 철원",
        "Hwacheon, Gangwon Province": "강원도 화천",
        "Yanggu, Gangwon Province": "강원도 양구",
        "Inje, Gangwon Province": "강원도 인제",
        "Gosung, Gangwon Province": "강원도 고성",
        "Yangyang, Gangwon Province": "강원도 양양",
        "Cheongju, Chungcheongbuk Province": "충청북도 청주",
        "Chungju, Chungcheongbuk Province": "충청북도 충주",
        "Jecheon, Chungcheongbuk Province": "충청북도 제천",
        "Boeun, Chungcheongbuk Province": "충청북도 보은",
        "Okcheon, Chungcheongbuk Province": "충청북도 옥천",
        "Yeongdong, Chungcheongbuk Province": "충청북도 영동",
        "Jeungpyeong, Chungcheongbuk Province": "충청북도 증평",
        "Jincheon, Chungcheongbuk Province": "충청북도 진천",
        "Goesan, Chungcheongbuk Province": "충청북도 괴산",
        "Eumseong, Chungcheongbuk Province": "충청북도 음성",
        "Danyang, Chungcheongbuk Province": "충청북도 단양",
        "Dangjin, Chungcheongnam Province": "충청남도 당진",
        "Cheonan, Chungcheongnam Province": "충청남도 천안",
        "Gongju, Chungcheongnam Province": "충청남도 공주",
        "Boryeong, Chungcheongnam Province": "충청남도 보령",
        "Asan, Chungcheongnam Province": "충청남도 아산",
        "Seosan, Chungcheongnam Province": "충청남도 서산",
        "Nonsan, Chungcheongnam Province": "충청남도 논산",
        "Gyeryong, Chungcheongnam Province": "충청남도 계룡",
        "Geumsan, Chungcheongnam Province": "충청남도 금산",
        "Buyeo, Chungcheongnam Province": "충청남도 부여",
        "Seocheon, Chungcheongnam Province": "충청남도 서천",
        "Cheongyang, Chungcheongnam Province": "충청남도 청양",
        "Hongseong, Chungcheongnam Province": "충청남도 홍성",
        "Yesan, Chungcheongnam Province": "충청남도 예산",
        "Taean, Chungcheongnam Province": "충청남도 태안",
        "Mokpo, Jeollanam Province": "전라남도 목포",
        "Yeosu, Jeollanam Province": "전라남도 여수",
        "Suncheon, Jeollanam Province": "전라남도 순천",
        "Naju, Jeollanam Province": "전라남도 나주",
        "Gwangyang, Jeollanam Province": "전라남도 광양",
        "Damyang, Jeollanam Province": "전라남도 담양",
        "Gokseong, Jeollanam Province": "전라남도 곡성",
        "Gurye, Jeollanam Province": "전라남도 구례",
        "Goheung, Jeollanam Province": "전라남도 고흥",
        "Bosung, Jeollanam Province": "전라남도 보성",
        "Hwasun, Jeollanam Province": "전라남도 화순",
        "Jangheung, Jeollanam Province": "전라남도 장흥",
        "Gangjin, Jeollanam Province": "전라남도 강진",
        "Haenam, Jeollanam Province": "전라남도 해남",
        "Yeongam, Jeollanam Province": "전라남도 영암",
        "Muan, Jeollanam Province": "전라남도 무안",
        "Hampyeong, Jeollanam Province": "전라남도 함평",
        "Yeonggwang, Jeollanam Province": "전라남도 영광",
        "Jangseong, Jeollanam Province": "전라남도 장성",
        "Wando, Jeollanam Province": "전라남도 완도",
        "Jindo, Jeollanam Province": "전라남도 진도",
        "Sinan, Jeollanam Province": "전라남도 신안",
        "Jeonju, Jeollabuk Province": "전라북도 전주",
        "Gunsan, Jeollabuk Province": "전라북도 군산",
        "Iksan, Jeollabuk Province": "전라북도 익산",
        "Jeongeup, Jeollabuk Province": "전라북도 정읍",
        "Namwon, Jeollabuk Province": "전라북도 남원",
        "Gimje, Jeollabuk Province": "전라북도 김제",
        "Wanju, Jeollabuk Province": "전라북도 완주",
        "Jinan, Jeollabuk Province": "전라북도 진안",
        "Muju, Jeollabuk Province": "전라북도 무주",
        "Jangsu, Jeollabuk Province": "전라북도 장수",
        "Imsil, Jeollabuk Province": "전라북도 임실",
        "Sunchang, Jeollabuk Province": "전라북도 순창",
        "Gochang, Jeollabuk Province": "전라북도 고창",
        "Buan, Jeollabuk Province": "전라북도 부안",
        "Pohang, Gyeongsangbuk Province": "경상북도 포항",
        "Gyeongju, Gyeongsangbuk Province": "경상북도 경주",
        "Gimcheon, Gyeongsangbuk Province": "경상북도 김천",
        "Andong, Gyeongsangbuk Province": "경상북도 안동",
        "Gumi, Gyeongsangbuk Province": "경상북도 구미",
        "Yeongju, Gyeongsangbuk Province": "경상북도 영주",
        "Yeongcheon, Gyeongsangbuk Province": "경상북도 영천",
        "Sangju, Gyeongsangbuk Province": "경상북도 상주",
        "Mungyeong, Gyeongsangbuk Province": "경상북도 문경",
        "Gyeongsan, Gyeongsangbuk Province": "경상북도 경산",
        "Gunwi, Gyeongsangbuk Province": "경상북도 군위",
        "Uiseong, Gyeongsangbuk Province": "경상북도 의성",
        "Cheongsong, Gyeongsangbuk Province": "경상북도 청송",
        "Yeongyang, Gyeongsangbuk Province": "경상북도 영양",
        "Yeongdeok, Gyeongsangbuk Province": "경상북도 영덕",
        "Cheongdo, Gyeongsangbuk Province": "경상북도 청도",
        "Goryeong, Gyeongsangbuk Province": "경상북도 고령",
        "Seongju, Gyeongsangbuk Province": "경상북도 성주",
        "Chilgok, Gyeongsangbuk Province": "경상북도 칠곡",
        "Yecheon, Gyeongsangbuk Province": "경상북도 예천",
        "Bonghwa, Gyeongsangbuk Province": "경상북도 봉화",
        "Uljin, Gyeongsangbuk Province": "경상북도 울진",
        "Ulleong, Gyeongsangbuk Province": "경상북도 울릉",
        "Changwon, Gyeongsangnam Province": "경상남도 창원",
        "Jinju, Gyeongsangnam Province": "경상남도 진주",
        "Tongyeong, Gyeongsangnam Province": "경상남도 통영",
        "Sacheon, Gyeongsangnam Province": "경상남도 사천",
        "Gimhae, Gyeongsangnam Province": "경상남도 김해",
        "Milyang, Gyeongsangnam Province": "경상남도 밀양",
        "Geoje, Gyeongsangnam Province": "경상남도 거제",
        "Yangsan, Gyeongsangnam Province": "경상남도 양산",
        "Uiryeong, Gyeongsangnam Province": "경상남도 의령",
        "Haman, Gyeongsangnam Province": "경상남도 함안",
        "Changnyeong, Gyeongsangnam Province": "경상남도 창녕",
        "Gosung, Gyeongsangnam Province": "경상남도 고성",
        "Namhae, Gyeongsangnam Province": "경상남도 남해",
        "Hadong, Gyeongsangnam Province": "경상남도 하동",
        "Sancheong, Gyeongsangnam Province": "경상남도 산청",
        "Hamyang, Gyeongsangnam Province": "경상남도 함양",
        "Geochang, Gyeongsangnam Province": "경상남도 거창",
        "Hapcheon, Gyeongsangnam Province": "경상남도 합천",
        "Masan, Gyeongsangnam Province": "경상남도 마산",
        "Jinhae, Gyeongsangnam Province": "경상남도 진해",
        "Jeju, Jeju Province": "제주도 제주",
        "Seogwipo, Jeju Province": "제주도 서귀포"}
    },
    
    mutations:{
    updateCurrentAdd(state, start){
        state.currentAdd = start
    },
    updateClickItemNum(state , val){
        state.clickItemNum = val
    },
    updateSubmitValue(state , val){
        state.isSubmitValueChange = true
        console.log('update submit value: ', val)
        state.submitValue = val
    },
    updateSearchResults(state, val){
        state.searchResults = val
    },
    updateCheckCurrentDisabled(state, val){
        state.checkCurrentDisabled = val
    },
    updateDisabled(state, val){
        state.disabled = val
    },
    updateSearchDisabled(state, val){
        state.searchDisabled = val
    },
    updateSearchLoading(state, val){
        state.searchLoading = val
    },
    updateisSubmitValueChange(state, val){
        state.isSubmitValueChange = val
    },
    updateLoading(state, val){
        state.loading = val
    },
    //map
    updateMap(state,val){
        state.map = val
    },
    updateIsSetMarker(state, val){
        state.isSetMarker = val
    },
    //user
    updateUser(state, val){
        console.log("update user val: ", val)
        state.user = val
        console.log("state.user: ", state.user)
    },
    updateSessionUser(state, val) {
        sessionStorage.setItem('user', JSON.stringify(val))
        console.log("session user email: ", JSON.parse(sessionStorage.getItem('user')).email)
    },
    updateUserStoredCities(state, val){
        state.userStoredCities = val
    },
    updateUserStoredDetails(state, val){
        state.userStoredDetails = val
    }
     //데이터를 실질적으로 바꿔줌
    },
    actions:{
        //methods
        //비동기적인 함수
        //server 의 db update
        
    },
    // getters:{
    //     //computed
    //     //computed와 비슷하다
    //     getSubmitValue(state){
    //         return state.submitValue
    //     }
    // }
});