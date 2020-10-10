<template>
  <div id="app">
    <app-components/>
  </div>
</template>

<script>
  import AppComponents from './components/content/AppComponents'
  
  export default {
    name: 'App',
    components: {
      AppComponents
    }
  }
</script>

<style scoped lang="scss">
  @import "assets/css/base.css";
</style>
