<template>
  <ul class="list-group">
    <li class="list-group-item">Your email opens</li>
    <li v-for="open in opensListVar" v-bind:key="open[1]" class="list-group-item">{{ open[0] }} has opened your email at {{ open[1] }}</li>
  </ul>
</template>

<script>
export default {
  name: 'OpensList',
  props: ['opensListVar'],
  computed: {
    opensListFinal(){
      var opensListNew = Object.keys(opensListVar).map((key) => [key, opensListVar[key]]);
      opensListNew.reverse()
      return opensListNew
    }
  },
  created() {
    console.log(this.opensListVar)
  }
}
</script>

<style>

</style>