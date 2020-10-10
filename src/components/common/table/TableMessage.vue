<template>
  <el-table
          :data="tableData"
          stripe
          height="500"
          v-loading="loading"
          class="table-message">
    <el-table-column label='ID' prop="username" width="100"></el-table-column>
    <el-table-column :label='mainHead.text + "者Email"' prop="useremail" width="120"></el-table-column>
    <el-table-column v-if="mainHead.isShow" :label='mainHead.text + "对象"' prop="article" width="120"></el-table-column>
    <el-table-column :label='mainHead.text + "内容"' prop="content"></el-table-column>
    <el-table-column :label='mainHead.text + "日期"' prop="date" width="150"></el-table-column>
    <el-table-column label='操作' width="100">
      <template slot-scope="scope">
        <el-button
                size="mini"
                @click="deleteColumn(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: 'TableMessage',
    props: {
      mainHead: {
        type: Object,
        default() {
          return {}
        }
      },
      tableData: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        loading: false
      }
    },
    methods: {
      deleteColumn(index, item) {
        this.$confirm('此操作将永久删除该留言, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.tableData.splice(index, 1)
          this.loading = true
          const partPath = (/\/comments/).test(this.$route.fullPath) ? 'comments' : 'contact'
          this.$store.dispatch('setNormalData', {
            url: '/api/' + partPath,
            method: 'post',
            data: {
              id: item.commentId
            }
          }).then((res) => {
            this.loading = false
            if (res.isDown) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            } else {
              this.$message({
                type: 'error',
                message: '删除失败!'
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    }
  }
</script>

<style scoped lang = "scss">
  .table-message {
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  
</style>
