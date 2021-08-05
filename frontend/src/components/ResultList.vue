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
                >
                <v-card-title
                  class="text-h5"
                  v-text="item.sido_sgg"
                ></v-card-title>
            </v-img>
           
            <v-card-subtitle 
                @click="select($event)"
                :id="i" 
                v-text="item.latitude+item.longitude">
            </v-card-subtitle>
            <v-card-actions>
            
            <card-component></card-component>
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
            'clickItemNum'    
        ])
    },
    data(){
        return{
            heart: false,
            show: false      
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
        }
    }
  }
</script>