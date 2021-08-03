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
        {{currentAdd}}
        <v-btn  @click="setCurrentAsOrigin"
                :disabled="checkCurrentDisabled"
        >
        현위치를 출발지로
        </v-btn>
      </v-flex>
      
      <br>
      <v-divider></v-divider>
      <br>
      <!-- 버튼 -->
      <div class="text-center d-flex pb-4">
        <v-btn @click="all"
        :disabled="disabled">
          모두 펼치기
        </v-btn>
        <v-btn @click="none"
        :disabled="disabled">
          모두 접기
        </v-btn>
        
        <v-btn @click="filterReset"
        :disabled="disabled">
          필터 초기화
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
                          {{population}}
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
                <v-btn @click="popuTozero">선택안해</v-btn>
                {{population}}
              </v-expansion-panel-content>
          </v-expansion-panel>

          <!-- 거리 필터 -->
          <v-expansion-panel>
            <v-expansion-panel-header>
              <template v-slot:default="{ open }">
                <v-row no-gutters>
                  <v-col cols="4">
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
                        {{distance}}
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
                <v-btn @click="distanceTozero">선택안해</v-btn>
                {{distance}}
              </v-flex>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <!--접근성 필터 -->
          <v-expansion-panel>
            <v-expansion-panel-header>
              <template v-slot:default="{ open }">
                <v-row no-gutters>
                  <v-col cols="4">
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
                  :items="$t('AccessItems')"
                  v-model="access"
                  item-disabled="customDisabled"
                  multiple
                ></v-select>
              </v-flex>
            </v-expansion-panel-content>
          </v-expansion-panel>

        </v-expansion-panels>
      </v-flex>

      <!-- 버튼모음 -->
      <v-btn
        :disabled="disabled"
        @click="initData"
        color="pink"
      >
      <span>submit</span>
      <v-icon>
          mdi-send
      </v-icon>
      </v-btn>

      <v-btn 
        :disabled="refreshDisabled"
        @click="refresh"
        >
        다시 선택하기
        <v-icon>
            mdi-sync
        </v-icon>
      </v-btn>
        <br>
        
      <br>
      <v-divider></v-divider>
      <br>
      
      <search-result></search-result>
      <!-- 확인해보기 위함 -->
      <br>
      {{value}}{{theme}}{{population}}{{distance}}{{access}}
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
            'disabled'
        ]),
        
    },
    data () {
      return {
        
        //출발지 select
        sido_sgg: '',
        label: '',
        value: '' ,
        sido_unify : { "경기": "경기도", "강원": "강원도", "충북": "충청북도", 
                      "충남": "충청남도", "경북": "경상북도", "경남": "경상남도", 
                      "전북": "전라북도", "전남": "전라남도", 
                      "제주특별자치도": "제주도", "제주": "제주도"},

        //filter
        // disabled: true,
        panel: [],

        theme:'',
        distance:'',
        population: [0,0],
        options:{
          max: 300,
          step: 10,
        },
        access:'',
        accessItems:'',
        //refresh_btn
        refreshDisabled:true,
        //최종결과값
        finalValue:{}
        }
    },
    methods: {
      ...mapMutations([
          'updateSubmitValue',
          'updateDisabled',
          'updateSearchDisabled'
      ]),
      async changeAccItemStatus(){
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

          // console.log("express.data: " ,express_res.data)
          // console.log("sub.data: " , suburbs_res.data)
          // console.log("train.data: " ,train_res.data)

          //ko.json에서 복재 ->.data가 null인 경우 disabled 해줌
          this.setAccItemStatus(express_res.data,suburbs_res.data,train_res.data)

          //filter, submit, 다시 선택하기 btn 보이도록함
          this.updateDisabled(false)

          this.refreshDisabled = false
        }catch(err){
          console.log(err)
        }
      },
      setAccItemStatus(express, suburbs, train){
          this.accessItems = this.$i18n.t('AccessItems')
          if(express == null){
            this.accessItems[0].customDisabled = true
          }
          if(suburbs == null){
            this.accessItems[1].customDisabled = true
          }
          if(train == null){
            this.accessItems[2].customDisabled = true
          }
      },
      
      // Create an array the length of our items
      // with all values as true
      all () {
        this.panel = [0,1,2,3,4]
        
      },
      none(){
        this.panel = []
      },
      //Reset the panel
      filterReset() {
        this.panel = [],
        this.theme='',
        this.distance='',
        this.population=[0,0],
        this.access=''
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
            // if(this.population[0] == 0 && this.population[1] ==0){
            //     this.population = ''
            //     this.finalValue['population'] = this.population
            // }
            // else{
            //     this.finalValue['population'] = this.population
            // }
            this.finalValue['population'] = this.population

            if(this.distance == 0){
                this.distance = ''
                this.finalValue['distance'] = this.distance
            }
            else{
                this.finalValue['distance'] = this.distance
            }
            this.finalValue['transportation'] = (this.access)

            //출발지도 저장해준다.
            this.$set(this.finalValue, 'origin', this.sido_sgg)

            console.log("this.finalValue: ", this.finalValue)

            for(var i= 0; i<5;i++){
                console.log(Object.keys(this.finalValue)[i])
                console.log(Object.values(this.finalValue)[i])
            }
           
            //store에 저장해줌
            this.updateSubmitValue(this.finalValue)
            
            alert('제출!')

            this.updateSearchDisabled(false)
            }
        
      },
      //다시 선택하기 버튼 클릭시 필터가 다시 선택할 수 있도록 바뀐다
      refresh(){
          this.updateDisabled(false)
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
    },
    watch:{
      value: function(newOrigin){
        //특별시일 경우 *2 해서 다시 저장
        var pattern = /\s/g;
        if(newOrigin.match(pattern))
        {
          //특별시가 아님
          this.sido_sgg = newOrigin
          this.$set(this.finalValue, 'origin', this.sido_sgg)
        }
        else{
          //특별시
          this.sido_sgg = newOrigin + " " + newOrigin
          this.$set(this.finalValue, 'origin', this.sido_sgg)
          
        }
        console.log("this.value: ",this.value + "this.sido_sgg : ", this.sido_sgg)

        this.changeAccItemStatus()
      }
      
    }
  }
</script>

<style>
.vcs__picker input,
.vcs__select-menu {
  background: #282b34;
  color:black;
  border-color: #282b34;
}

.vcs__picker input::placeholder {
  color: #bbb;
}

.vcs__option--active {
  background: #bbcf78;
}

.vcs__option:hover {
  background: #677cb6;
}
</style>