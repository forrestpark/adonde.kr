<template>
    <section class="Intro">
        <div class="intro">

        <v-img 
        v-if="$i18n.locale == 'ko'"
        @click="kakaoLogin"
        alt="user"
        contain
        :src="require(`@/assets/ko_large.png`)"
        transition="scale-transition"
        width="400px"
        />
        <v-img
            v-else
            @click="kakaoLogin"
            alt="user"
            contain
            :src="require(`@/assets/en_large.png`)"
            transition="scale-transition"
            width="400px"
            />

        <v-progress-circular
            indeterminate
            v-if="loading"
            color="amber"
        ></v-progress-circular>
        
        <!-- <v-btn
            @click="kakaoLogout">
        logout
        </v-btn> -->

        <h2>{{user.nickname}}</h2>
        <img
            width="100px" 
            :src="`${user.profile_image}`" alt />
   

        </div>
        
    </section>
</template>

<script>
import { mapState, mapMutations} from 'vuex'
import axios from 'axios'
import {BASE_URL} from '@/api.js'

export default {
    data(){
        return{
            test:'',
            loading: false
        }
    },
    computed:{
        ...mapState([
            'user'
        ])
    },
    methods:{
        ...mapMutations([
            'updateUser',
            'updateUserStoredCities'
        ]),
        async login(email, nickname, profile_image, dateofbirth) {
            //this.loading = true
            const res = await axios.post(
                `${BASE_URL}/user/login`,
                {
                    email : email,
                    nickname: nickname,
                    profile_image: profile_image,
                    dateofbirth: dateofbirth
                }
            )
            console.log("res:",res)
            this.updateUser(res.data)
            this.findOneById(res.data.id)
            console.log("res.data: ", res.data)

            this.loading = false
        },
  
        kakaoLogin(){
            this.loading = true
            var vm = this
            window.Kakao.Auth.login({
                scope: 'profile_nickname, profile_image, account_email, birthday',
                success: function(authObj) {
                    console.log('authobj', authObj)
                    window.Kakao.API.request({
                    url:'/v2/user/me',
                    success: res => {
                        const kakao_account = res.kakao_account;
                        console.log(kakao_account)
                        console.log("email:" ,kakao_account.email)
                        console.log("birthday:",kakao_account.birthday)
                        console.log("nickname:", kakao_account.profile.nickname)
                        console.log("img",kakao_account.profile.profile_image_url)  

                        vm.login(kakao_account.email, kakao_account.profile.nickname,
                        kakao_account.profile.profile_image_url,
                        kakao_account.birthday)

                        

                        vm.$router.push({path:'/'})
                    }
                })
                
                }
            })
        },
        // kakaoLogout() {
        //     window.Kakao.Auth.logout((response) => {
        //         console.log(response);
        //         this.$store.commit("updateUser", {})
        //         alert("로그아웃");
        //         this.$router.push({path:'/'})
        //     });
        // } ,
        async findOneById(id){
            try{
            const userDetails = await axios.post(
                `${BASE_URL}/user/findOneById`,
                {
                    id
                })
                
                console.log("userdetails:",userDetails.data.storedCities)
                this.updateUserStoredCities(userDetails.data.storedCities)
            }catch(err){
            console.log(err)
            }
        },
    }
}
</script>


