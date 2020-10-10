<template>
  <div class="friends">
    <el-table
            :data="tableData"
            stripe
            height="500"
            v-loading="loading"
            class="table-message">
      <el-table-column label='ID' prop="friendId" width="100"></el-table-column>
      <el-table-column label='朋友名' prop="friendname"></el-table-column>
      <el-table-column label='朋友网站' prop="friendweb"></el-table-column>
      <el-table-column label='操作' width="200">
        <template slot-scope="scope">
          <el-button
                  size="mini"
                  @click="deleteColumn(scope.$index, scope.row)">删除</el-button>
          <el-button
                  size="mini"
                  @click="dialogFormVisible = true">添加</el-button>
          <el-dialog title="添加朋友" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-form-item label="朋友名字" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="朋友网站" :label-width="formLabelWidth">
                <el-input v-model="form.web" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false, (form.web = form.name = '')">取 消</el-button>
              <el-button type="primary" @click="dialogFormVisible = false, addFriend()">确 定</el-button>
            </div>
          </el-dialog>
        </template>
        
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'Friends',
    data() {
      return {
        loading: false,
        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          name: '',
          web: ''
        },
        formLabelWidth: '120px',
        tableData: []
      }
    },
    created() {
      this.$store.dispatch('setNormalData', {
        url: '/api/friends',
        method: 'post'
      }).then(res => {
        this.tableData = res
      })
    },
    methods: {
      addFriend() {
        if (this.form.name && this.form.web) {
          this.loading = true
          this.tableData.push({
            friendId: this.tableData.length + 1,
            friendname: this.form.name,
            friendweb: this.form.web
          })
          this.$store.dispatch('setNormalData', {
            url: '/api/friends',
            method: 'post',
            data: {
              web: this.form.web,
              id: this.tableData.length,
              name: this.form.name
            }
          }).then(res => {
            this.form.web = this.form.name = ''
            this.loading = false
            if (res.isDown) {
              this.$message({
                type: 'success',
                message: '添加成功!'
              })
            } else {
              this.$message({
                type: 'error',
                message: '添加失败!'
              })
            }
          }).catch(() => {
            this.form.web = this.form.name = ''
            this.$message({
              type: 'error',
              message: '添加失败!'
            })
          })
        } else {
          this.message = '名字或者网站错误或为空，请重新输入！'
          this.$message(this.message);
          this.form.name = this.form.web = ''
        }
      },
      deleteColumn(index, item) {
        this.$confirm('此操作将永久删除该留言, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loading = true
          this.tableData.splice(index, 1)
          this.$store.dispatch('setNormalData', {
            url: '/api/friends',
            method: 'post',
            data: {
              id: item.friendId
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
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '由于某种原因删除失败，请重试！'
            });
          });
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
  .friends {
    width: 100%;
    padding: 1rem 1rem 1rem 1rem;
    overflow: auto;
  }
</style>
