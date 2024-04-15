<template>
  <h1>See Who Opened Your Emails</h1>
  
  <div class="container">
    <div class="row">
        <div id="mainCol" class="col-lg-6 col-md-8 col-xs-11r">
            <div class="form-card card">
                <div class="card-header">
                    <h5>Fill the following fields</h5>

                </div>
                <div style="height:25px"></div>
                <form class="creds-form text-left">
                    <div class="form-group">
                        <label style="float:left" for="IdInput">Tracking Pixel Link</label>
                        <input v-model="temp_user_id" class="form-control" id="IdInput" placeholder="Tracking Pixel Link">
                    </div>
                    <div class="form-group">
                        <label style="float:left;margin-top:10px" for="exampleInputPassword1">Password</label>
                        <input v-model="temp_password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                    </div>
                    <p class="btn btn-primary mt-3" @click="getOpensListBySubmit">Submit</p>
                </form>
            </div>
    
            <div class="card" v-if="user_id.length>0">
                <p class="card-header">
                    Displaying results for the following tracking pixel
                </p>
                
                 <br> 
                 https://amersulaimantrackingpixel.pythonanywhere.com/{{user_id}}/[recepient_name]/getpixel.png
                 <div style="height:15px"></div>
            </div>
            <OpensList class="mt-3" v-if="!fetchingOpens&&user_id.length>0&&opensList.length>0" :opensListVar="opensList"/>
            <div v-if="fetchingOpens">
                <div class="spinner-border text-dark" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
                Fetching Opens ...
            </div>
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
            errorMessage: '',
            fetchingOpens: false,
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
            this.fetchingOpens = true
            const response = await fetch("https://amersulaimantrackingpixel.pythonanywhere.com/opens", requestOptions);
            const data = await response.json();
            this.fetchingOpens = false

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
            this.temp_user_id = this.temp_user_id.split('/')[3]
            
            this.$cookies.set('user_id', this.temp_user_id)
            this.$cookies.set('password', this.temp_password)
            
            const body = JSON.stringify({ 
                "user_id": this.temp_user_id,
                "password": this.temp_password 
            })
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: body
            };
            this.fetchingOpens = true
            fetch("https://amersulaimantrackingpixel.pythonanywhere.com/opens", requestOptions).then((response)=>{
                response.json().then((data)=>{
                    console.log(data)
                    if (data.e===undefined){
                        this.error = false
                    } else {
                        this.error = true
                        this.errorMessage = data.e
                        this.fetchingOpens = false
                        return []
                    }
                    this.fetchingOpens = false
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

    .creds-form{
        margin: 0 25px;
    }
    

    .form-card {
        /* padding: 30px; */
        margin: 30px;
    }

    
</style>