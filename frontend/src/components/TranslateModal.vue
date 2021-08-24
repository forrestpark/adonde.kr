<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wtapper">
        <div class="modal-container">
          <button class="modal-default-button"
                      @click="$emit('close')">
                      <v-icon>mdi-close</v-icon>
              </button>
          <div class="modal-header">
            <slot name="header">default header
              
            </slot>
            
          </div>

          <div class="modal-body">
            <v-card
              elevation="3">
              <v-card-text>
                <Translator :countries="countries" @on-country-click="[$emit('close')]"/>
              </v-card-text>
            </v-card>
            <slot name="body">
              
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
        
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { Translator } from 'vue-google-translate';
export default {
  components:{
    Translator
  },
  methods:{
    hideModal(){
      alert("hi")
    }
  },
  data(){
    return{
      countries: [
        {
          code: 'ko|zh-CN',
          title: 'Chinese (Simplified)',
        },
        {
          code: 'ko|en',
          title: 'English',
        },
        {
          code: 'ko|ja',
          title: 'Japanese',
        },
        {
          code: 'ko|ko',
          title: 'Korean',
        },
        {
          code: 'en|ru',
          title: 'Russian',
        },
        {
          code: 'en|es',
          title: 'Spanish',
        },
        {
          code: 'en|sv',
          title: 'Swedish',
        },
        {
          code: 'en|th',
          title: 'Thai',
        },
      ]
    }
  }
}
</script>


<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}


.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>