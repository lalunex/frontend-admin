<template>
  <div class="contact">
    <table-message :mainHead="contactObj" :tableData="contactTable"/>
  </div>
</template>

<script>
  import TableMessage from 'components/common/table/TableMessage'
  export default {
    name: 'Contact',
    data() {
      return {
        contactObj: {
          text: '留言',
          isShow: false
        },
        contactTable: []
      }
    },
    created() {
      this.$store.dispatch('getNormalData', {
        url: '/api/contact',
        method: 'post'
      }).then(res => {
        this.contactTable = res
      })
    },
    components: {
      TableMessage
    }
  }
</script>

<style scoped lang = "scss">
  .contact {
    padding: 1rem;
    width: 100%;
    overflow: auto;
  }
</style>
