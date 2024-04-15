<template>
  
  

  <div class="container">
    <h1>Create A New Tracking Pixel</h1>
    
    <div class="text-center">
      <div class="col col-sm-12 col-md-6">
        <div id="generate-id-input" class="input-group mb-3">
          <input v-model="password" type="password" class="form-control" placeholder="Enter a password" aria-describedby="button-addon2">
          <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="createId">Create a new tracking pixel</button>
        </div>
      </div>
      
      <div class="card tp-card col-md-8 col-lg-6" v-if="user_id">
                <h5 class="card-header">
                    The following is your tracking pixel
                </h5>
                
                 <br> 
                 <div style="padding:0 10px">https://amersulaimantrackingpixel.pythonanywhere.com/{{user_id}}/[recepient_name]/getpixel.png</div>
                 <div style="height:15px"></div>

                <router-link to="/opens" class="btn btn-primary mb-0" style="border-radius:5px;border-top-left-radius: 0;border-top-right-radius: 0;">
                    Track opens of this pixel
                </router-link>
      </div>
      <!-- <p>Click here to learn how to use it</p> -->

      
    </div>
    
  </div>
  

</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  
  name: 'CreateTP',
  data() {
    return {
      password: '',
      newId: true,
      opensListVar: [['amersulaiman10@gmail.com', '3-4-2023']],
      refreshKey: 0,
    }
  },
  computed: {
    user_id(){
      const a = this.refreshKey;
      try{
        if (this.$cookies.get('user_id')===null){
          return ''
        }
        return this.$cookies.get('user_id')
      }
      catch{
        return ''
      }
    }
  },
  methods: {
    async createId(){
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: this.password })
      };
      const response = await fetch("https://amersulaimantrackingpixel.pythonanywhere.com/createId", requestOptions);
      const data = await response.json();
      this.user_id = data.user_id;
      this.$cookies.set("user_id", data.user_id)
      this.$cookies.set("password", this.password)
      this.refreshKey ++;
      console.log('username incoming')
      console.log(this.$cookies.get("user_id"))
    },

    
  },

  created() {

  }
}
</script>

<style scoped>
#generate-id-input{
  margin-top: 20px
}
.col{
  margin: 0px auto;
}
#generate-id-input{
  margin: "0 auto"
}

#navbar {
  margin-bottom: 20px
}

.card {
  padding: 0
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}

.tp-card {
  margin:20px auto
}
</style>
