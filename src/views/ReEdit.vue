<template>
  <div class="reedit">
    <el-table
            :data="articlesData"
            stripe
            height="500"
            v-loading="loading"
            class="table-message">
      <el-table-column label="ID" prop="id" width="50"></el-table-column>
      <el-table-column label="日期" prop="date" width="150"></el-table-column>
      <el-table-column label="标题" prop="title"></el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    
  </div>
</template>

<script>
  export default {
    name: 'ReEdit',
    data() {
      return {
        articlesData: [],
        loading: false
      }
    },
    created() {
      this.getData()
    },
    methods: {
      getData() {
        this.loading = true
        this.$store.dispatch('getNormalData', {
          url: '/api/reedit',
          method: 'post'
        }).then(res => {
          this.articlesData = res.aData
          this.loading = false
          if (res.isDown) {
            this.$message({
              type: 'info',
              message: '已获得信息。'
            });
          } else {
            this.$message({
              type: 'info',
              message: '获得信息失败，请重试！'
            });
          }
        }).catch(err => {
          console.log(err);
          this.loading = false
          this.$message({
            type: 'info',
            message: '网络错误，无法获得消息！'
          });
        })
      },
      handleEdit(index, row) {
        this.$router.push({
          path: '/article',
          query: {
            id: row.id
          }
        })
      }
    },
    watch: {
      $route: {
        handler: function () {
          this.getData()
        },
        // 深度观察监听
        deep: true
      }
    }
  }
</script>

<style scoped lang = "scss">
  .reedit {
    padding: 1rem;
    width: 100%;
    overflow: auto;
  }
</style>
