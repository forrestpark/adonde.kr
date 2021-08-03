<template>
    <div>
        <div v-for="(user, index) in users"
            :key="index">
            <h2>{{user.first_name}}</h2>
            <img :src="`${user.avatar}`" alt />
        </div>
        <Paging :totalPage="totalPage" @movePage="movePage" />
    </div>

</template>

<script>
import axios from 'axios'
import Paging from './Paging.vue'

export default {
    components:{
        Paging
    },
    data(){
        return {
            users: null,
            totalPage: null,
            pageNum: 1
        }
    },
    methods:{
        fetchData(pageNum){
            axios
                .get("https://reqres.in/api/users?page=" + pageNum)
                .then(res =>{
                    this.users = res.data.data;
                    this.totalPage = res.data.total_pages;
                })
                .catch(err => {
                    console.log(err);
                })
        },
        movePage(page){
            this.fetchData(page)
        }
    },
    created(){
        this.fetchData(this.pageNum)
    }
}
</script>

