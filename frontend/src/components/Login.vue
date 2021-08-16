<template>
    <section class="Intro">
        <div class="intro">

        <v-img 
        @click="kakaoLogin"
        alt="user"
        contain
        :src="require(`@/assets/kakao_Login.png`)"
        transition="scale-transition"
        width="300px"
        />
        
        <v-btn
            @click="kakaoLogout">
        logout
        </v-btn>

        <h2>{{user.nickname}}</h2>
            <img :src="`${user.profile_image}`" alt />
   

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
            test:''
        }
    },
    computed:{
        ...mapState([
            'user'
        ])
    },
    methods:{
        ...mapMutations([
            'updateUser'
        ]),
        async login(email, nickname, profile_image, dateofbirth) {
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
            console.log("res.data: ", res.data)
        },
  
        kakaoLogin(){
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

                        vm.$router.push({path:'/home'})
                    }
                })
                
                }
            })
        },
        kakaoLogout() {
            window.Kakao.Auth.logout((response) => {
                console.log(response);
                this.$store.commit("updateUser", {})
                alert("로그아웃");
                this.$router.push({path:'/home'})
            });
        } 
    }
}
</script>


