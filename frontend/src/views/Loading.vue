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
                
                console.log("user:",user.data)
                sessionStorage.setItem('user', user)
                this.$router.push({path: '/intro'})

            }catch(err){
            console.log(err)
            }
        }
    }
}
</script>