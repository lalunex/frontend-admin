<template>
  <div>
    <div v-if="isShowOrNot && $store.state.isLogin">
      <div class="app-header">
        <el-radio-group v-model="isCollapse">
          <el-radio-button :label="false">展开</el-radio-button>
          <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>
        <el-button type="primary" style="float: right" @click="signOut">退出登录</el-button>
      </div>
      <div class="appBody">
        <div class="appBody-left">
          <el-menu class="el-menu-vertical-demo" :collapse="isCollapse">
            <el-menu-item @click="changePath(0)" index="0">
              <i class="el-icon-edit-outline"></i>
              <span slot="title">写博客</span>
            </el-menu-item>
            <el-menu-item @click="changePath(1)" index="1">
              <i class="el-icon-chat-line-round"></i>
              <span slot="title">查看评论</span>
            </el-menu-item>
            <el-menu-item @click="changePath(2)" index="2">
              <i class="el-icon-service"></i>
              <span slot="title">查看留言</span>
            </el-menu-item>
            <el-menu-item @click="changePath(3)" index="3">
              <i class="el-icon-user"></i>
              <span slot="title">查看朋友信息</span>
            </el-menu-item>
            <el-menu-item @click="changePath(4)" index="4">
              <i class="el-icon-document-copy"></i>
              <span slot="title">查看博客</span>
            </el-menu-item>
          </el-menu>
        </div>
        
        <keep-alive>
          <router-view class="appBody-right"/>
        </keep-alive>
      </div>
    </div>

    <router-view v-else-if="!isShowOrNot"/>
  </div>

</template>

<script>
  export default {
    name: 'AppComponents',
    data() {
      return {
        isShowOrNot: true,
        isCollapse: true
      }
    },
    methods: {
      backLogin() {
        this.$alert('请登陆后再进入控制台', '提示', {
          confirmButtonText: '确定',
          callback: () => {
            this.$message({
              type: 'info',
              message: '已回到登陆界面，请登陆！'
            });
            this.$router.push({ path: '/admin' })
          }
        });
        this.$store.state.isLogin = false
      },
      signOut() {
        this.$confirm('此操作将退出登陆, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '退出成功!'
          });
          this.$store.state.isLogin = false
          this.$router.push({ path: '/admin' })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          });
        });
      },
      changePath(value) {
        if (value === 0) {
          this.$router.push({ path: '/article' })
        } else if (value === 1) {
          this.$router.push({ path: '/comments' })
        } else if (value === 2) {
          this.$router.push({ path: '/contact' })
        } else if (value === 3) {
          this.$router.push({ path: '/friends' })
        } else {
          this.$router.push({ path: '/reedit' })
        }
      }
    },
    watch: {
      $route: {
        handler: function() {
          this.isShowOrNot = true
          if ((/^\/admin$/).exec(this.$route.fullPath)) {
            this.isShowOrNot = false
          }
          if (!this.$store.state.isLogin && this.isShowOrNot) {
            this.backLogin()
          }
        },
        // 深度观察监听
        deep: true
      }
    }
  }
</script>

<style scoped lang = "scss">
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .app-header {
    margin-bottom: .8rem;
    padding: 1rem;
    background-color: #cccccc;
    border-bottom: 1px solid rgba(50, 50, 50, .2);
    box-shadow: 0 0 5px 5px rgba(50, 50, 50, .15);
  }
  
  .appBody {
    display: flex;
    
    .appBody-right {
      flex: 1;
    }
  }
</style>
