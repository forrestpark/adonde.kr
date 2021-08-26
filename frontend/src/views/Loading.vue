<template>
    <div>
        hi
    </div>
</template>

<script>
import axios from 'axios'
import {BASE_URL} from '@/api.js'
export default {
    data(){
        return{
            id:this.$route.query.userId
        }
    },
    mounted(){
        this.loginRedirect()
    },
    methods:{
        async loginRedirect(){
            try{
            const user = await axios.post(
                `${BASE_URL}/user/findOneById`,
                {
                    id : this.id
                })
                
                console.log("user:", JSON.stringify(user.data))
                sessionStorage.setItem('user', JSON.stringify(user.data))
                setTimeout(() => {

                }, 2500)
                this.$router.push({path: '/intro'})

            }catch(err){
            console.log(err)
            }
        }
    }
}
</script>