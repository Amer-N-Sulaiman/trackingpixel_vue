<template>
  <h1>See Who Opened Your Emails</h1>
  
  <div class="container">
    <div class="row text-center">
        <div id="mainCol" class="col-lg-6 col-md-8 col-xs-11r">
            <h2>Enter an Id and corresponding password below to list the opens</h2>
            <form>
                <div class="form-group">
                    <label for="IdInput">Id</label>
                    <input v-model="temp_user_id" class="form-control" id="IdInput" placeholder="Enter You Id">
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input v-model="temp_password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                </div>
                <p class="btn btn-primary mt-3" @click="getOpensListBySubmit">Submit</p>
            </form>
    
            <p v-if="user_id.length>0">Displaying Results for Id: {{ user_id }}</p>
            <OpensList v-if="user_id.length>0" :opensListVar="opensList"/>
        </div>
    </div>
    
  </div>
  
</template>

<script>

import OpensList from '../components/OpensList.vue'


export default {
    components: {OpensList},
    data() {
        return {
            temp_user_id: '',
            temp_password: '',
            opensList: [],
            submitted: false,
            error: false,
            errorMessage: ''
        }
    },
    computed: {
        user_id(){
            const ref = this.temp_user_id
            const user_id_temp = this.$cookies.get('user_id')
            if (user_id_temp === null){
                return ''
            } else return this.$cookies.get('user_id')
        },
        password(){
            const ref = this.temp_password
            const password_temp = this.$cookies.get('password')
            if (password_temp === null){
                return ''
            } else return this.$cookies.get('password')
        }
    },
    methods: {
        async getOpensList(){
            const body = JSON.stringify({ 
                "user_id": this.$cookies.get("user_id"),
                "password": this.$cookies.get("password") 
            })
            console.log("body *********")
            console.log(body)
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: body
            };
            const response = await fetch("https://amersulaimantrackingpixel.pythonanywhere.com/opens", requestOptions);
            const data = await response.json();
            console.log(data)
            if (data.e===undefined){
                this.error = false
            } else {
                this.error = true
                this.errorMessage = data.e
                return []
            }
            this.opensList = data
            return data
        },
        async getOpensListBySubmit(){
            this.$cookies.set('user_id', this.temp_user_id)
            this.$cookies.set('password', this.temp_password)
            console.log('password incoming***********')
            console.log(this.temp_user_id)
            console.log(this.temp_password)
            const body = JSON.stringify({ 
                "user_id": this.temp_user_id,
                "password": this.temp_password 
            })
            console.log(body)
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: body
            };
            fetch("https://amersulaimantrackingpixel.pythonanywhere.com/opens", requestOptions).then((response)=>{
                response.json().then((data)=>{
                    console.log(data)
                    if (data.e===undefined){
                        this.error = false
                    } else {
                        this.error = true
                        this.errorMessage = data.e
                        return []
                    }
                    this.opensList = data
                    return data
                })
                
            })
            

        }
    },
    created(){
        console.log("created the page")
        this.getOpensList().then((results) => {
            console.log('************')
            console.log(results)
        })
    }
}
</script>

<style>
    #mainCol {
        margin: 0 auto;
    }
</style>