<template>
  
  

  <div class="container">
    <h1>Create A New ID</h1>
    <h2>To Use It In Your Tracking Pixel</h2>
    <div class="row">
      <div class="col col-sm-12 col-md-6">
        <div id="generate-id-input" class="input-group mb-3">
          <input v-model="password" type="text" class="form-control" placeholder="Enter a password" aria-label="Recipient's username" aria-describedby="button-addon2">
          <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="createId">Create a new Id</button>
        </div>
      </div>
      <p>This is your id (Save it with your password, you can't retrieve them later):</p>
      <p v-if="user_id!==null">{{ user_id }}</p>
      <p>Click here to learn how to use it</p>

      
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

<style>
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



#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
</style>
