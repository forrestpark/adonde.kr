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
        <v-btn @click="setCurrentAsOrigin">현위치를 출발지로</v-btn>
      </v-flex>
      
 
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
                    {{ $t('themaLabel') }}
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
                        {{ $t('themaHint') }}
                      </span>
                      <span
                        v-else
                        key="1"
                      >
                      {{ `${thema}` }}
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
                  v-model="thema"
                  :items="$t('ThemaItems')"
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

          <!-- <v-expansion-panel>
              <v-expansion-panel-header>
                  <template v-slot:default="{ open }">
              <v-row no-gutters>
                <v-col cols="4">
                    혼잡도
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
                      여행지 혼잡도를 선택하세요!
                    </span>
                    <span
                      v-else
                      key="1"
                    >
                      {{ `${honjabdo}` }}
                    </span>
                  </v-fade-transition>
                </v-col>
              </v-row>
            </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-flex xs12 sm12>
                    <v-select
                    :disabled="disabled"
                    v-model="honjabdo"
                    :items="items3"                
                    >
                        <template v-slot:prepend-item>
                        <div @click="nohonjab">선택하지 않음</div>
                        <v-divider class="mt-2"></v-divider>
                        </template>

                    </v-select>
                </v-flex>
              </v-expansion-panel-content>
          </v-expansion-panel> -->

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
            <v-expansion-panel-content>
              <v-flex>
                <v-combobox
                  :disabled="disabled"
                  v-model="access"
                  :items="$t('AccessItems')"
                  multiple
                  chips
                ></v-combobox>
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

      <v-btn @click="refresh">
        다시 선택하기
        <v-icon>
            mdi-sync
        </v-icon>
          
      </v-btn>
        <br>
        <v-btn 
          color="primary"
          :disabled ="!disabled">
        <span>random</span>
      </v-btn>

      <v-btn 
        color="primary"
        :disabled ="!disabled">
        <span>Show All</span>
      </v-btn>
      <!-- 확인해보기 위함 -->
      <br>
      {{value}}{{thema}}{{population}}{{distance}}{{access}}
    </div>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
  export default {
    computed:{
        ...mapState([
            'currentAdd'
        ])
    },
    data () {
      return {
        //출발지 select
        label: '',
        value: '' ,
        sido_unify : { "경기": "경기도", "강원": "강원도", "충북": "충청북도", 
                      "충남": "충청남도", "경북": "경상북도", "경남": "경상남도", 
                      "전북": "전라북도", "전남": "전라남도", 
                      "제주특별자치도": "제주도", "제주": "제주도"},

        //filter
        disabled: false,
        panel: [],

        thema:'',
        distance:'',
        population: [0,0],
        options:{
          max: 300,
          step: 10,
        },
        access:'',
        //최종결과값
        finalValue:{}
        }
    },
    methods: {
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
        this.thema='',
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
            this.disabled = true
            this.finalValue['테마'] = (this.thema)
            if(this.population[0] == 0 && this.population[1] ==0){
                this.population = ''
                this.finalValue['인구수'] = this.population
            }
            else{
                this.finalValue['인구수'] = this.population
            }
            if(this.distance == 0){
                this.distance = ''
                this.finalValue['거리'] = this.distance
            }
            else{
                this.finalValue['거리'] = this.distance
            }
            this.finalValue['접근성'] = (this.access)

            //출발지도 저장해준다.
            this.setValue(this.value)

            console.log(this.finalValue)

            for(var i= 0; i<5;i++){
                console.log(Object.keys(this.finalValue)[i])
                console.log(Object.values(this.finalValue)[i])
            }
            alert('제출!')
            }
        
      },
      //다시 선택하기 버튼 클릭시 필터가 다시 선택할 수 있도록 바뀐다
      refresh(){
          this.disabled = false
      },
      //현위치를 출발지로 설정
      setCurrentAsOrigin(){
        //여기서 주소를 필터링 해주기..

        //다른지역 test
        // var name ="전남 영암군 금정면 안노리 498"
        // var addressSplit = name.split(' ')

        var addressSplit = this.currentAdd.split(' ')
        
        if(addressSplit[0] in this.sido_unify){
          //특별시아님
          var sgg = addressSplit[1].slice(0, -1)
          console.log('sido: ' +this.sido_unify[addressSplit[0]] + 'sgg: ' + sgg)
          this.value = this.sido_unify[addressSplit[0]] + " " + sgg    
        }
        else{
          //특별시
          console.log('sido: ' + addressSplit[0])
          this.value = addressSplit[0]
        }
      },
      //시군구 체크후 출발지를 저장해준다
      setValue(val){
        //공백체크
        var pattern = /\s/g;
        if(val.match(pattern))
        {
          //특별시가 아님
          this.$set(this.finalValue, '출발지', val)
        }
        else{
          //특별시
          this.$set(this.finalValue, '출발지', val + " " + val)
          
        }
      }      
    }
  }
</script>

<style scoped>
.filter{
  height: 800px;
  background-color: rgb(179, 179, 173);
}
.vcs__picker input,
.vcs__select-menu {
  background: yellow;
  color: white;
  border-color: yellow;
}

.vcs__picker input::placeholder {
  color: #bbb;
}

.vcs__option--active {
  background: #41444e;
}

.vcs__option:hover {
  background: #474b56;
}
</style>

