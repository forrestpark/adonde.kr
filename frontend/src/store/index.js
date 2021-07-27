import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        //data
        startpoint:""
    },
    mutations:{
    updateStart(state, start){
        state.startpoint = start
    }
        //데이터를 실질적으로 바꿔줌
    },
    actions:{
        //methods
        //비동기적인 함수
        //server 의 db update
    },
    getters:{
        //computed
        //computed와 비슷하다
    }
});