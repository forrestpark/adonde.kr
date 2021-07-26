<template>
  <v-container>
      <div class="filter">
    <v-flex xs12 sm6 d-flex> 
        
       

        <v-select
          :items="$t('items1')"
          v-model="startname"
          :label="$t('label')"
          :disabled="disabled"

        ></v-select>
    </v-flex>
    <div class="text-center d-flex pb-4">
      <v-btn @click="all"
      :disabled="disabled">
        모두 펼치기
      </v-btn>
      <div>{{ panel }}</div>
      <v-btn @click="none"
      :disabled="disabled">
        초기화
      </v-btn>
    </div>
    
    <v-flex xs12 sm6 d-flex> 
    <v-expansion-panels
      v-model="panel"
      multiple
      :disabled="disabled"
    >
      <v-expansion-panel>
          <v-expansion-panel-header>
              <template v-slot:default="{ open }">
          <v-row no-gutters>
            <v-col cols="4">
                여행지 테마
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
                  여행지 테마를 선택하세요!
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
              <v-flex xs12 sm12>
        <v-combobox
        :disabled="disabled"
          v-model="thema"
          :items="items2"
          multiple
          chips
        ></v-combobox>
    </v-flex>
          </v-expansion-panel-content>
      </v-expansion-panel>

    <v-expansion-panel>
          <v-expansion-panel-header>
              <template v-slot:default="{ open }">
          <v-row no-gutters>
            <v-col cols="4">
                인구수(만명)
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
                  인구수를 를 선택하세요! 
                </span>
                <span
                  v-else
                  key="1"
                >
                  <div v-if="value != 0">
                      {{value}}
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
            <v-flex xs12 sm12 >
        
                <v-slider
                :disabled="disabled"
                v-model="value"
                step="10"
                max="300"
                thumb-label
                ticks
                ></v-slider>

            </v-flex>
          </v-expansion-panel-content>
      </v-expansion-panel>

    <v-expansion-panel>
          <v-expansion-panel-header>
              <template v-slot:default="{ open }">
          <v-row no-gutters>
            <v-col cols="4">
                거리 필터(km)
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
                  거리를 선택하세요! 
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
            <v-flex xs12 sm12 >
                <v-slider
                :disabled="disabled"
                v-model="distance"
                step="10"
                max="500"
                thumb-label
                ticks
                ></v-slider>

            </v-flex>
          </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
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
      </v-expansion-panel>


    <v-expansion-panel>
          <v-expansion-panel-header>
              <template v-slot:default="{ open }">
          <v-row no-gutters>
            <v-col cols="4">
                접근성
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
                  접근성을 선택하세요!
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
            <v-flex xs12 sm12>
                <v-combobox
                :disabled="disabled"
                v-model="access"
                :items="items4"
                multiple
                chips
                ></v-combobox>
            </v-flex>
          </v-expansion-panel-content>
      </v-expansion-panel>

    </v-expansion-panels>
    </v-flex>

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
        <v-btn color="primary"
                :disabled ="!disabled">
        <span>random</span>
    </v-btn>

    <v-btn color="primary"
        :disabled ="!disabled">
        <span>Show All</span>
    </v-btn>
    {{startname}}{{thema}}{{value}}{{distance}}{{honjabdo}}{{access}}

  </div>

  
  </v-container>
</template>
<script>
  export default {
    data () {
      return {
        
        disabled: false,
        panel: [],
        startname:'',
        thema:'',
        honjabdo:'',
        distance:'',
        value: '',
        access:'',
        items1: ['서울', '부산', '대구', '여수'],
        items2: ['산', '계곡', '바다'],
        items3:['여유', '보통', '혼잡'],
        items4:['직통버스','직통기차','항공사직항','버스경유', '기차경유','항공권경유'],
        finalValue:{}
        }
    },
    methods: {
      // Create an array the length of our items
      // with all values as true
      all () {
        this.panel = [0,1,2,3,4]
        //필터를 랜덤으로 골라주기이
        // this.thema = this.items2[Math.floor(Math.random()*2)],
        // this.honjabdo = this.items3[Math.floor(Math.random()*2)],
        // this.access = this.items4[Math.floor(Math.random()*5)],
        // console.log(this.thema),
        // console.log(this.honjabdo),
        // console.log(this.access),
        // this.value = Math.floor(Math.random()*300),
        // this.distance =Math.floor(Math.random()*500)
        
      },
      //Reset the panel
      none () {
        this.panel = [],
        this.startname='',
        this.thema='',
        this.honjabdo='',
        this.distance='',
        this.value='',
        this.access=''
      },
      //혼잡도 선택을 취소하고 싶을 시에
      nohonjab(){
          alert('선택안해!')
          this.honjabdo=''
      },
      //
      popuTozero(){
          this.value=''
      },
      distanceTozero(){
          this.distance=''
      },
      //submit버튼 클릭시 출발지 선택여부를 판단하고, 데이터를 저장해줌
      initData(){
        if(this.startname == "")
        {
            alert('출발지를 선택해주세요!')
        }
        else
        {
            this.disabled = true
            this.finalValue['테마'] = (this.thema)
            if(this.value == 0){
                this.value = ''
                this.finalValue['인구수'] = this.value
            }
            else{
                this.finalValue['인구수'] = this.value
            }
            if(this.distance == 0){
                this.distance = ''
                this.finalValue['거리'] = this.distance
            }
            else{
                this.finalValue['거리'] = this.distance
            }

            this.finalValue['혼잡도'] = this.honjabdo
            this.finalValue['접근성'] = (this.access)
            //출발지도 저장해준다.
            this.$set(this.finalValue, '출발지', this.startname)

            console.log(this.finalValue)
            for(var i= 0; i<6;i++){
                console.log(Object.keys(this.finalValue)[i])
                console.log(Object.values(this.finalValue)[i])
            }
            alert('선택완룡!')
            }
        
      },
      //다시 선택하기 버튼 클릭시 필터가 다시 선택할 수 있도록 바뀐다
      refresh(){
          this.disabled = false
      }
      
    }
  }
</script>

