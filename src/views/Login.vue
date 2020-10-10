<template>
  <div class="login">
    <el-form class="login-form" v-loading="loading" @keyup.enter.native="keySubmit">
      <el-form-item label="账号" class="login-form-username">
        <el-input type="username" v-model="username" autocomplete="off" placeholder="Username"></el-input>
      </el-form-item >
      <el-form-item label="密码" class="login-form-password">
        <el-input type="password" v-model="password" autocomplete="off" placeholder="Password"></el-input>
      </el-form-item>
      <el-form-item class="login-form-button">
        <el-button type="primary" @click="submitForm()" :plain="true">提交</el-button>
        <el-button @click="resetForm()" :plain="true">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data() {
      return {
        username: '',
        password: '',
        message: '',
        loading: false
      }
    },
    methods: {
      keySubmit() {
        this.submitForm()
      },
      submitForm() {
        if (!(this.password && this.username)) {
          this.message = '您的用户名或者密码未填写，请填写后再进行操作！'
          this.sendMessage()
        } else {
          this.loading = true
          this.message = '正在提交，请稍后！'
          this.sendMessage()
          this.$store.dispatch('setNormalData', {
            url: '/api/admin',
            method: 'post',
            data: {
              username: this.username,
              password: this.password
            }
          }).then(res => {
            this.loading = false
            if (res.isLogin) {
              this.message = '您已成功登陆！'
              this.sendMessage()
              this.$store.state.isLogin = true
              this.$router.push({
                path: '/article'
              })
            } else {
              this.$store.state.isLogin = false
              this.message = '您的用户名或者密码错误，请重新输入！'
              this.sendMessage()
              this.password = this.username = ''
            }
          }).catch(err => {
            console.log(err);
            this.$store.state.isLogin = false
            this.message = '您的网络不佳，请换一个良好的网络环境再重新输入！'
            this.sendMessage()
            this.password = this.username = ''
          })
        }
      },
      resetForm() {
        if (!(this.password || this.username)) {
          this.message = '您的用户名和密码已经置为空，请勿重复操作！'
          this.sendMessage()
        } else {
          this.password = this.username = ''
          this.message = '您的用户名和密码已经置为空！'
          this.sendMessage()
        }
      },
      sendMessage() {
        this.$message(this.message);
      }
    }
  }
</script>

<style scoped lang = "scss">
  .login {
    width: 100%;
    
    .login-form {
      border-radius: 1rem;
      width: 40%;
      margin: 15% auto;
      padding: 2rem;
      border: 1px solid rgba(100, 100, 100, .5);
      box-shadow: 0 0 5px 5px rgba(0, 0, 0, .15);
      
      .login-form-button {
        text-align: center;
        
        button {
          margin: 0 2rem;
        }
      }
    }
  }
</style>
