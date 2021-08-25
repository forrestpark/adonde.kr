<template>
    <div>
        <v-slide-group
        class="resultListTitle"
        v-model="model"
        center-active
        show-arrows
        >
            <v-slide-item
                height="250px"
                v-for="item in searchResults"
                :key="item.sido_sgg"
                v-slot="{ active, toggle }"
            >
             <v-hover v-slot="{ hover }">
                <v-card
                :color="active ? undefined : 'grey lighten-1'"
                class="ma-4"
                height="250"
                width="250"
                @click="toggle"
                >
                    <v-img 
                        :id="item.sido_sgg" 
                        :src="item.image_src"
                        class="white--text align-end"
                        height="200px">
                        <v-card-title
                            class="resultListTitle"
                            v-text="item.sido_sgg"
                        ></v-card-title>
                        <v-expand-transition>
                            <div v-if="hover"
                                class="d-flex transition-fast-in-fast-out orange v-card--reveal text-h2 white--text"
                                style="height: 100%;">
                                <v-card-text
                                    class="resultListDescription">
                                    {{item.description.split('.')[0]}}.
                                </v-card-text>
                            </div>
                        </v-expand-transition>
                    </v-img>
                    

                    <v-card-actions style="background-color: #C1C1B0">
                        <card-component
                            :key="item.sido_sgg"
                            :sido_sgg="item.sido_sgg"
                        ></card-component>
                    </v-card-actions>   
                    <v-row
                        class="fill-height"
                        align="center"
                        justify="center"
                    >
                    </v-row>
                </v-card>
            </v-hover>
        </v-slide-item> 
        </v-slide-group>
    </div>
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
            sido_sgg:'',
            model: null
        }
    },
    methods:{
        ...mapMutations([
            'updateClickItemNum'
        ]),
        changeCenter(){
            alert('changeCenter')
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

<style scoped>
.resultListTitle{
    font-family: "GmarketSansMedium";
}
.resultListDescription{
    font-family: "GmarketSansMedium";
}
</style>