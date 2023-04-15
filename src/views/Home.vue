<template>
  <div class="home">
    <h1>Welcome to the tracking pixel creator</h1>
    <h3 class="mt-3">How to create and use a tracking pixel?</h3>
    <p class="mt-3">1. Go to Create Pixel Id page</p>
    <p class="mt-3">2. Choose a password and create an id (save them both)</p>
    <p class="mt-3">3. Go to the Track Pixel Id page</p>
    <p class="mt-3">4. Imbed an image of the following form in the emails you want to track:
      <br>
      
      {{'<img src="https://amersulaimantrackingpixel.pythonanywhere.com/{yourid}/'}}<br>{{'{recepientemailaddress}/getpixel.png">'}}
        <br>
        Don't forget to replace {yourid} with the id you create, and {recepientemailaddress} with the recepient's email address.
    </p>
    <p class="mt-3">5. Go to Track Your Tracking Pixel Id</p>
    <p class="mt-3">6. If you can't see your Id displayed there, enter it and your password and click submit</p>
    <p class="mt-3">7. See who opened you email and at what time</p>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
