<template>
  <div class="comments">
    <table-message :mainHead="commentsObj" :tableData="commentsTable"/>
  </div>
</template>

<script>
  import TableMessage from 'components/common/table/TableMessage'
  export default {
    name: 'Comments',
    data() {
      return {
        commentsObj: {
          text: '评论',
          isShow: true
        },
        commentsTable: []
      }
    },
    components: {
      TableMessage
    },
    created() {
      this.$store.dispatch('getNormalData', {
        url: '/api/comments',
        method: 'post'
      }).then(res => {
        this.commentsTable = res
      })
    }
  }
</script>

<style scoped lang = "scss">
  .comments {
    padding: 1rem;
    width: 100%;
    overflow: auto;
  }
</style>
