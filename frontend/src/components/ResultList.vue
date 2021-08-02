<template>
    <v-container>
      <v-row dense>
        <v-col
          v-for="(item, i) in positions"
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
                :src="item.src"
                class="white--text align-end"
                height="200px">
                <v-card-title
                  class="text-h5"
                  v-text="item.title"
                ></v-card-title>
            </v-img>
            
            <v-card-subtitle 
                @click="select($event)"
                :id="i" 
                v-text="item.lat">
            </v-card-subtitle>
            
            <v-card-actions>
                <v-btn
                color="orange lighten-2"
                text
                >
                Explore
                </v-btn>
                <v-spacer></v-spacer>
           
                <v-btn
                    icon
                    @click="heart = !heart"  
                    >
                    <v-icon>{{ heart ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
                    </v-btn>
                <v-btn
                    icon
                    @click="show = !show"
                    >
                    <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
            </v-card-actions>

            <v-expand-transition>
                <div v-show="show">
                    <v-divider></v-divider>

                    <v-card-text>
                    I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
                    </v-card-text>
                </div>
            </v-expand-transition>
            
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import { mapState , mapMutations} from 'vuex'
export default {
    computed:{
        ...mapState([
            'positions',
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