<template>
    <v-container>
      <v-row dense>
        <v-col
            v-for="item in searchResults"
            :key="item.sido_sgg"
            cols="12"
        >   
        <v-hover v-slot="{ hover }">
          <v-card 
            :id="item.sido_sgg"
            :color="'#1F7087'"
            dark
            >
            <v-img 
                @click="select($event)"
                :id="item.sido_sgg" 
                :src="item.image_src"
                class="white--text align-end"
                height="200px">
                <v-card-title
                  class="text-h5"
                  v-text="item.sido_sgg"
                  
                ></v-card-title>
                <v-expand-transition>
                <div v-if="hover"
                    class="d-flex transition-fast-in-fast-out orange v-card--reveal text-h2 white--text"
                    style="height: 100%;">
                    <v-card-text>
                        {{item.description.split('.')[0]}}.
                    </v-card-text>
                </div>
        </v-expand-transition>
            </v-img>
            <v-card-actions>
            
            <card-component
                :key="item.sido_sgg"
                :sido_sgg="item.sido_sgg"
            ></card-component>
           </v-card-actions>  
          </v-card>
          </v-hover>
        </v-col>
      </v-row>
     
    </v-container>
</template>

<script>
import CardComponent from './CardComponent.vue'
import { mapState , mapMutations} from 'vuex'
export default {
    components:{
        CardComponent
    },
    computed:{
        ...mapState([
            'searchResults',
            'clickItemNum'  ,
            'userStoredCities',
            'user'
        ])
    },
   
    data(){
        return{
            sido_sgg:''
        }
    },
    methods:{
        ...mapMutations([
            'updateClickItemNum'
        ]),
        changeCenter(){
            alert('changeCenter')
        },
        select(event){
            this.updateClickItemNum(event.currentTarget.id)
            alert(event.currentTarget.id)
        },
        checkHeart(){
            // //특별시일 경우 *2 해서 다시 저장
            var sido_sgg_value=""
            var pattern = /\s/g;
            if(this.sido_sgg.match(pattern))
            {
            //특별시가 아님
            sido_sgg_value = this.sido_sgg
            //this.$set(this.finalValue, 'origin', this.sido_sgg)
            }
            else{
            //특별시
            sido_sgg_value = this.sido_sgg + " " + this.sido_sgg
            //this.$set(this.finalValue, 'origin', this.sido_sgg)
            
            }

            if(this.userStoredCities.includes(sido_sgg_value)){   
                console.log('갖고있음', sido_sgg_value)
                this.heart = true
            }
           
        }
    }
  }
</script>