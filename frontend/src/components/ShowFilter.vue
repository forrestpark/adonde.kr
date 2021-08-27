<template>
  <v-container class="filter">
    <div class="filter">
      <!-- 출발지 선택 -->
      
      {{$t('originlabel')}}
      <v-flex>       
        <vue-cascader-select style="z-index:2; width:300px"
        :options="$t('originItems')"
        @clear="(val) => value = ''"
        @select="(selected) => value = selected.value"
        :value="value"   
        />   

        <v-icon>mdi-map-marker</v-icon>  
        현위치 : {{currentAdd}}
        
        <v-btn  
          rounded
          color="warning"
          @click="setCurrentAsOrigin"
          :disabled="checkCurrentDisabled"
        >
         현위치를 출발지로
         <v-icon>mdi-select-marker</v-icon>
        </v-btn> 
        <v-progress-circular
          v-if="currentAdd == ''"
          indeterminate
          color="orange"
        ></v-progress-circular>
         
      </v-flex>
      <br>
      <!-- 버튼 -->
      
      <v-card>
        <v-card-text>
          <div class="text-center d-flex pb-4" style="float: right;">
            <v-btn 
            class="mx-1"
            rounded
            @click="filterReset"
            :disabled="disabled">
              필터 초기화
            </v-btn>
            <v-btn 
              fab
              small
              outlined
              color="teal"
              class="mx-1"
              @click="filterOpen"
              :disabled="disabled">
              <v-icon>{{ isfilterOpen ? 'mdi-arrow-expand-down' : 'mdi-arrow-expand-up' }}</v-icon>
            </v-btn>
          </div>

      <!--필터 -->
      <v-flex> 
        <v-expansion-panels  
          v-model="panel"
          multiple
          :disabled="disabled"
        >
          <!-- 여행지 테마 필터-->
          <v-expansion-panel>
            <v-expansion-panel-header>
              <template v-slot:default="{ open }">
                <v-row no-gutters>
                  <v-col cols="4">
                    <v-icon>mdi-map</v-icon>
                    {{ $t('themeLabel') }}
                  </v-col>
                  <v-col
                    cols="8"
                    class="text--secondary"
                  >
                    <v-fade-transition leave-absolute>
                      <span
                        v-if="open"
                        key="0"
                      >
                        {{ $t('themeHint') }}
                      </span>
                      <span
                        v-else
                        key="1"
                      >
                      {{ `${theme}` }}
                      </span>
                    </v-fade-transition>
                  </v-col>
                </v-row>
              </template>
            </v-expansion-panel-header>

            <v-expansion-panel-content>
              <v-flex>
                <v-combobox
                :disabled="disabled"
                  v-model="theme"
                  :items="$t('themeItems')"
                  multiple
                  chips
                ></v-combobox>
              </v-flex>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <!-- 인구수 필터 -->
          <v-expansion-panel>
              <v-expansion-panel-header>
                <template v-slot:default="{ open }">
                  <v-row no-gutters>
                    <v-col cols="4">
                      <v-icon>mdi-human-greeting</v-icon>
                      {{ $t('popuLabel') }}
                    </v-col>
                    <v-col
                      cols="8"
                      class="text--secondary"
                    >
                    <v-fade-transition leave-absolute>
                      <span
                        v-if="open"
                        key="0"
                      >
                      {{ $t('popuHint') }} 
                      </span>
                      <span
                        v-else
                        key="1"
                      >
                      <div v-if="population != 0">
                          {{population[0]}} ~ {{population[1]}}
                      </div>
                      <div v-else>
                        {{ popuTozero() }}
                      </div>
                      </span>
                    </v-fade-transition>
                    </v-col>
                  </v-row>
                </template>
              </v-expansion-panel-header>

              <v-expansion-panel-content>
                <v-flex>
             
                  <vue-slider
                  :disabled="disabled"
                  v-model="population"
                  v-bind="options"
                  :enable-cross="false"
                  dotSize ="20"
                  ></vue-slider>

                </v-flex>
                <div>
                  {{population[0]}} ~ {{population[1]}}
                  <v-btn 
                  :disabled="disabled"
                  fab
                  small
                  style="float: right;"
                  @click="popuTozero">
                  <v-icon>mdi-pencil-remove-outline</v-icon>
                </v-btn>
                </div>
              </v-expansion-panel-content>
          </v-expansion-panel>

          <!-- 거리 필터 -->
          <v-expansion-panel>
            <v-expansion-panel-header>
              <template v-slot:default="{ open }">
                <v-row no-gutters>
                  <v-col cols="4">
                    <v-icon>mdi-map-marker-distance</v-icon>
                    {{ $t('distanceLabel') }}
                  </v-col>
                  <v-col
                    cols="8"
                    class="text--secondary"
                  >
                  <v-fade-transition leave-absolute>
                  <span
                    v-if="open"
                    key="0"
                  >
                    {{ $t('distanceHint')  }} 
                  </span>
                  <span
                    v-else
                    key="1"
                  >
                    <div v-if="distance != 0">
                        {{distance}} km
                    </div>
                    <div v-else>
                      {{ distanceTozero() }}
                    </div>
                  </span>
                  </v-fade-transition>
                  </v-col>
                </v-row>
              </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-flex>
                  <v-slider
                    :disabled="disabled"
                    v-model="distance"
                    step="10"
                    max="500"
                    thumb-label
                    ticks
                  ></v-slider>
              </v-flex>
              <div>
                  {{distance}} km
                  <v-btn 
                  fab
                  small
                  :disabled="disabled"
                  @click="distanceTozero"
                  style="float: right;">
                  <v-icon>mdi-pencil-remove-outline</v-icon>
                </v-btn>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <!--접근성 필터 -->
          <v-expansion-panel>
            <v-expansion-panel-header>
              <template v-slot:default="{ open }">
                <v-row no-gutters>
                  <v-col cols="4">
                    <v-icon>mdi-train</v-icon>
                    {{ $t('accessLabel') }}
                  </v-col>
                  <v-col
                    cols="8"
                    class="text--secondary"
                  >
                  <v-fade-transition leave-absolute>
                    <span
                      v-if="open"
                      key="0"
                    >
                      {{ $t('accessHint') }}
                    </span>
                    <span
                      v-else
                      key="1"
                    >
                      {{ `${access}` }}
                    </span>
                  </v-fade-transition>
                  </v-col>
                </v-row>
              </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content
              >
              <v-flex>
                <v-select
                  :disabled="disabled"    
                  :items="accessItems"
                  v-model="access"
                  item-disabled="customDisabled"
                  multiple
                ></v-select>
              </v-flex>
            </v-expansion-panel-content>
          </v-expansion-panel>

        </v-expansion-panels>
      </v-flex>
      <br>
          <!-- 버튼모음 -->
      <div style="text-align: center; ">
        <v-btn
          class="mx-1"
          :disabled="disabled"
          @click="initData"
          color="pink"
        >
        <v-icon>
            mdi-send
        </v-icon>
        submit
        </v-btn>

        <v-btn 
          class="mx-1"
          :disabled="refreshDisabled"
          @click="refresh"
          >
          <v-icon>
              mdi-refresh
          </v-icon>
          다시 선택하기
        </v-btn>
        </div>
      </v-card-text>
      </v-card>
          
      <search-result></search-result>
      <!-- 확인해보기 위함
      <br>
    제출한 결과값
    <br>
    {{submitValue}}
    <br>
    현재 선택값 실시간확인
    <br> 
    {{value}}{{theme}}{{population}}{{distance}}{{access}} -->
    </div>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import axios from 'axios'
import {BASE_URL} from '@/api.js'
import SearchResult from './SearchResult.vue'
export default {
    components:{
      SearchResult
    },
    computed:{
        ...mapState([
            'currentAdd',
            'checkCurrentDisabled',
            'disabled',
            'submitValue',
            'originEntoKo_unify',
            'loading'
        ]),  
        setAccItem(){
          return this.$t('AccessItems')
        },   
    },
    mounted(){
      //필터 검색 후 mypage이동 후 다시 home으로 돌아왔을때 resultlist는 남아있지만,
      //random과 showall btn은 누를 수 없도록 disabled 되어야 한다
      this.updateSearchDisabled(true)
    },
    data () {
      return {
        //loading: false,
        //출발지 select
        sido_sgg: '',
        label: '',
        value: '' ,
        sido_unify : { "경기": "경기도", "강원": "강원도", "충북": "충청북도", 
                      "충남": "충청남도", "경북": "경상북도", "경남": "경상남도", 
                      "전북": "전라북도", "전남": "전라남도", 
                      "제주특별자치도": "제주도", "제주": "제주도"},
        access_unify :{"직통 고속버스": "express_direct",
          "직통 시외버스": "suburbs_direct",
          "직통 기차" : "train_direct"
        },
        theme_unify :{"산":"mountains", "계곡": "valleys", 
          "바다":"beaches","강":"rivers"
        },
        //filter
        // disabled: true,
        isfilterOpen:true,
        panel: [],

        theme:'',
        distance:'',
        population: [0,0],
        options:{
          max: 1000,
          step: 10,
        },
        access:'',
        translateAccess:[],
        //ko.json에서 가져와서 저장
        accessItems : '',
        //refresh_btn
        refreshDisabled:true,
        //최종결과값
        finalValue:{}
        //submit_btn_click
        
        }
    },
    methods: {
      ...mapMutations([
          'updateSubmitValue',
          'updateDisabled',
          'updateSearchDisabled',
          'updateSearchResults',
          'updateLoading'
          
      ]),
      async changeAccItemStatus(){ 
        // console.log("json1:", this.$i18n.t('AccessItems'))
        this.accessItems = this.$i18n.t('AccessItems')
        //await console.log("inputDisabled")
        //this.accessItems = this.setAccItem
        
        this.inputAccItemCustomDisabled()

        // console.log("afterinputcustomdisabled", this.accessItems)
        // console.log("json2:", this.$i18n.t('AccessItems'))

        //초기화
        await this.resetAccItemDisabled()
        //로딩시작
        // this.loading = true
        this.updateLoading(true)

        //다시선택하기 버튼 안보임
        this.refreshDisabled = true

        //필터도 선택하지 못하게 막아줌
        this.updateDisabled(true)

        try{
          const express_res = await axios.post(`${BASE_URL}/express/findAny`,{
            // request body
            // key : value
            sido_sgg : this.sido_sgg
          })
          const suburbs_res = await axios.post(`${BASE_URL}/suburbs/findAny`,{
            sido_sgg : this.sido_sgg
          })
          const train_res = await axios.post(`${BASE_URL}/train/findOne`,{
            sido_sgg : this.sido_sgg
          })

          console.log("express.data: " ,express_res.data)
          console.log("sub.data: " , suburbs_res.data)
          console.log("train.data: " ,train_res.data)

          //.data가 null인 경우 Customdisabled = true 해줌
          this.setAccItemStatus(express_res.data,suburbs_res.data,train_res.data)

          //filter, submit, 다시 선택하기 btn 보이도록함
          this.updateDisabled(false)
          this.refreshDisabled = false

          //loading 끝
          // this.loading = false
          this.updateLoading(false)

        }catch(err){
          console.log(err)
        }
      },
      inputAccItemCustomDisabled(){
        for(var i = 0 ; i< this.access.length; i++){

          this.$set(this.accessItems, 'customDisabled', false)
        }
      },
      resetAccItemDisabled(){
        this.access=''
        //접근성필터 초기화
        for(var i = 0; i<3; i++){
          this.accessItems[i].customDisabled = false
        }
      },
      setAccItemStatus(express, suburbs, train){
          
          if(express == null){
            this.accessItems[0].customDisabled = true
          }
          if(suburbs == null){
            this.accessItems[1].customDisabled = true
          }
          if(train == null){
            this.accessItems[2].customDisabled = true
          }
          if(express == null && suburbs == null && train == null){
            alert('선택가능한 access 없음')
            
          }

      },
      
      // Create an array the length of our items
      // with all values as true
      filterOpen(){
        if(this.isfilterOpen == true){
          this.isfilterOpen= false
          this.panel = [0,1,2,3,4]
        }else{
          this.isfilterOpen= true
          this.panel = []
        }
      },
      //Reset the panel
      filterReset() {
        this.panel = [],
        this.theme='',
        this.distance='',
        this.population=[0,0],
        this.access='',
        this.isfilterOpen = true
      },
      //인구수와 거리 slider설정시 버튼을 누르면 초기화 된다
      popuTozero(){
          this.population=[0,0]
      },
      distanceTozero(){
          this.distance=''
      },
      //submit버튼 클릭시 출발지 선택여부를 판단하고, 데이터를 저장해줌
      initData(){
        if(this.value == "")
        {
            alert('출발지를 선택해주세요!')
        }
        else
        {
            this.updateDisabled(true)
            this.finalValue['theme'] = (this.theme)
            
            this.finalValue['population'] = this.population

            if(this.distance == 0){
                this.distance = ''
                this.finalValue['distance'] = this.distance
            }
            else{
                this.finalValue['distance'] = this.distance
            }

            //한글인 경우 영어로 바꿔줌
            this.translateAccessKoToEn()
            this.finalValue['transportation'] = (this.translateAccess)

            //출발지도 저장해준다.
            this.$set(this.finalValue, 'origin', this.sido_sgg)

            console.log("this.finalValue: ", this.finalValue)

            for(var i= 0; i<5;i++){
                console.log(Object.keys(this.finalValue)[i])
                console.log(Object.values(this.finalValue)[i])
            }
           
            //store에 저장해줌
            this.updateSubmitValue(this.finalValue)
            
            // this.updateSearchDisabled(false)
            }
        
      },
      //다시 선택하기 버튼 클릭시 필터가 다시 선택할 수 있도록 바뀐다
      refresh(){
          this.translateAccess = []
          this.updateDisabled(false)

          this.updateSearchDisabled(true)
          //search 목록초기화
          this.updateSearchResults([])
          
          window.scrollTo(0, 0)
      },
      
      //현위치를 출발지로 설정
      setCurrentAsOrigin(){
        //여기서 주소를 필터링 해주기..

        //다른지역 test
        // var name ="전남 영암군 금정면 안노리 498"
        // var addressSplit = name.split(' ')
        if(this.currentAdd != null){
          var addressSplit = this.currentAdd.split(' ')
      
          if(addressSplit[0] in this.sido_unify){
            //특별시아님
            var sgg = addressSplit[1].slice(0, -1)
            //console.log('sido: ' +this.sido_unify[addressSplit[0]] + 'sgg: ' + sgg)
            this.value = this.sido_unify[addressSplit[0]] + " " + sgg    
          }
          else{
            //특별시
            console.log('sido: ' + addressSplit[0])
            this.value = addressSplit[0]
          }
        }else{
          alert('현위치를 불러올 수 없습니다!')
        }
      }, 
      translateAccessKoToEn(){
        for(var i = 0 ; i<this.access.length; i++){
          if(!this.isAlpha(this.access[i])){
          this.translateAccess[i] = this.access_unify[this.access[i]]
          }
        }
      },
      isAlpha(str) {	
        var pattern_eng = /[a-zA-Z]/
        if(pattern_eng.test(str)){
          return true
        }else{
          return false
        }
      },
      translateOriginEntoKo(val){
        if(val in this.originEntoKo_unify){
          return this.originEntoKo_unify[val]
        }else
        {
          alert('originEntoKo_unify에 없습니다')
        }
      }
    },
    watch:{
      value: function(newOrigin){
        //showall까지한 다음에 다시 출발지를 설정할 경우 random 과 showall btn을 disabled=true
        //그래야 다시 ..처음부터 시작할 수 있음
        this.updateSearchDisabled(true)
        //목록 다시 초기화 해줌
        this.updateSearchResults([])

        // console.log("newOrigin: ", newOrigin)
        // console.log("isalpha",this.isAlpha(newOrigin))
        var temp_Sido_Sgg
        //출발지가 영어면 한국어로 바꿔줌
        if(this.isAlpha(newOrigin)){
          temp_Sido_Sgg = this.translateOriginEntoKo(newOrigin)
        }else{
          temp_Sido_Sgg = newOrigin
        }

        //console.log("한국어로: ",this.originEntoKo_unify[newOrigin])
        //특별시일 경우 *2 해서 다시 저장
        var pattern = /\s/g;
        if(temp_Sido_Sgg.match(pattern))
        {
          //특별시가 아님
          this.sido_sgg = temp_Sido_Sgg
          //this.$set(this.finalValue, 'origin', this.sido_sgg)
        }
        else{
          //특별시
          this.sido_sgg = temp_Sido_Sgg + " " + temp_Sido_Sgg
          //this.$set(this.finalValue, 'origin', this.sido_sgg)
          
        }
        console.log("this.value: ",this.value + "this.sido_sgg : ", this.sido_sgg)

        this.changeAccItemStatus()
      }
      
    }
  }
</script>

<style>
.filter{
  font-family: "GmarketSansMedium";
}
.vcs__picker input,
.vcs__select-menu {
  background: #282b34;
  color:black;
  border-color: #14151a;
}

.vcs__picker input::placeholder {
  color: rgb(17, 1, 1);
}

.vcs__option--active {
  background: #bbcf78;
}

.vcs__option:hover {
  background: #677cb6;
}
</style>