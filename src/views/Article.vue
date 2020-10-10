<template>
  <div class="article">
    <mark-down/>
  </div>
</template>

<script>
  import MarkDown from 'components/common/markDown/MarkDown';
  
  export default {
    name: 'Article',
    components: {
      MarkDown
    }
  }
</script>

<style scoped lang = "scss">
  .article {
    overflow: auto;
    padding: 1rem;
  }
</style>
