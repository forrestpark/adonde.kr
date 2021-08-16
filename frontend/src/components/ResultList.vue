<template>
    <v-container>
      <v-row dense>
        <v-col
            v-for="(item, i) in searchResults"
            :key="i"
            cols="12"
        >   
          <v-card 
            :id="i"
            :color="'#1F7087'"
            dark
            >
            <v-img 
                @click="select($event)"
                :id="i" 
                :src="item.image_src"
                class="white--text align-end"
                height="200px">
                <v-card-title
                  class="text-h5"
                  v-text="item.sido_sgg"
                  
                ></v-card-title>
            </v-img>
           
            <v-card-subtitle 
                @click="select($event)"
                :id="i" 
                v-text="item.description">
            </v-card-subtitle>
            <v-card-actions>
            
            <card-component
                :key="i"
                :detail="item.description"
                :num="i"
                :sido_sgg="item.sido_sgg"

            ></card-component>
           </v-card-actions>  
          </v-card>
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
            'userStoredCities'
        ])
    },
   
    data(){
        return{
            detail:''   ,
            num:'',
            sido_sgg:'',

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