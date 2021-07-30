<template>
    <v-container>
      <v-row dense>
        <v-col cols="12">
          <v-card
            color="#385F73"
            dark
          >
          <v-img
      class="white--text align-end"
      height="200px"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    >
      <v-card-title>Top 10 Australian beaches</v-card-title>
    </v-img>
            <v-card-title class="text-h5">
              Unlimited 
            </v-card-title>

            <v-card-subtitle>Listen to your favorite artists and albums whenever and wherever, online and offline.</v-card-subtitle>

            <v-card-actions>
                   <v-btn
        color="orange lighten-2"
        text
      >
        Explore
      </v-btn>
        <v-spacer></v-spacer>
        <v-btn icon>
                <v-icon>mdi-heart</v-icon>
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


        <v-col
          v-for="(item, i) in items"
          :key="i"
          cols="12"
        >
          <v-card
            :color="item.color"
            dark
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title
                  class="text-h5"
                  v-text="item.title"
                ></v-card-title>

                <v-card-subtitle v-text="item.artist"></v-card-subtitle>

                
              </div>

              <v-avatar
                class="ma-3"
                size="125"
                tile
              >
                <v-img :src="item.src"></v-img>
              </v-avatar>
            </div>

            
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
  export default {
    data: () => ({
        show: false,
        items: [
            {
            color: '#1F7087',
            src: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg',
            title: 'title',
            artist: 'subtitle',
            },
            {
            color: '#952175',
            src: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg',
            title: 'hi',
            artist: 'hihi',
            }
            ,
            {
            color: '#952175',
            src: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg',
            title: 'hi',
            artist: 'hihi',
            }
            ,
            {
            color: '#952175',
            src: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg',
            title: 'hi',
            artist: 'hihi',
            }
            ,
            {
            color: '#952175',
            src: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg',
            title: 'hi',
            artist: 'hihi',
            }
        
      ],
    }),
  }
</script>