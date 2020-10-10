<template>
  <div>
    <el-form class="editor-form" label-position="right" label-width="80px">
      <el-form-item label="博文名字" class="editor-form-username">
        <el-input type="text" v-model="form.title" autocomplete="off" placeholder="Title"></el-input>
      </el-form-item >
      <el-form-item class="editor-form-button">
        <el-button @click="(dialogFormVisible = true)" :plain="true">提交</el-button>
        
        <el-dialog title="添加其他信息" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="标签">
              <el-checkbox-group v-model="form.typeGroup">
                <el-checkbox v-for="value in labels" :key="value" :label="value" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="类型">
              <el-radio-group v-model="form.typeRadio">
                <el-radio label="Learning"></el-radio>
                <el-radio label="Foods & Culture"></el-radio>
                <el-radio label="Life"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="(dialogFormVisible = false)">取 消</el-button>
            <el-button type="primary" @click="(dialogFormVisible = false), submitForm()">确 定</el-button>
          </div>
        </el-dialog>
      </el-form-item>
    </el-form>
    
    <mavon-editor v-model="form.text" :toolbars="toolbars" codeStyle="atom-one-dark"
                  :ishljs="true" ref=md @imgAdd="imgAdd" class="editorBox"/>
  </div>
</template>

<script>
  import { mavonEditor } from 'mavon-editor'
  // import 'mavon-editor/dist/css/index.css'
  import { dataFormat } from 'common/utils'
  
  export default {
    name: 'MarkDown',
    data() {
      return {
        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          typeGroup: [],
          typeRadio: '',
          text: '',
          title: ''
        },
        formLabelWidth: '120px',
        labels: [],
        toolbars: {
          bold: true, // 粗体
          italic: true, // 斜体
          header: true, // 标题
          underline: true, // 下划线
          strikethrough: true, // 中划线
          mark: true, // 标记
          superscript: true, // 上角标
          subscript: true, // 下角标
          quote: true, // 引用
          ol: true, // 有序列表
          ul: true, // 无序列表
          link: true, // 链接
          imagelink: true, // 图片链接
          code: true, // code
          table: true, // 表格
          fullscreen: true, // 全屏编辑
          readmodel: true, // 沉浸式阅读
          htmlcode: true, // 展示html源码
          help: true, // 帮助
          undo: true, // 上一步
          redo: true, // 下一步
          trash: true, // 清空
          save: false, // 保存（触发events中的save事件）
          navigation: true, // 导航目录
          alignleft: true, // 左对齐
          aligncenter: true, // 居中
          alignright: true, // 右对齐
          subfield: true, // 单双栏模式
          preview: true // 预览
        },
        img_file: {}
      }
    },
    components: {
      mavonEditor
    },
    created() {
      this.$store.dispatch('getNormalData', {
        url: '/api/labels',
        method: 'post'
      }).then(res => {
        this.labels = res
      }).catch(err => {
        console.log(err);
      })
    },
    methods: {
      submitForm() {
        if (this.form.text && this.form.title && this.form.typeGroup.length && this.form.typeRadio) {
          this.message = '正在保存中，请稍后！'
          this.$message(this.message);
          this.$store.dispatch('setNormalData', {
            url: '/api/article',
            method: 'post',
            data: {
              id: this.$route.query.id || 0,
              title: this.form.title,
              content: this.form.text,
              date: dataFormat('yyyy-MM-dd hh:mm:ss'),
              label: this.form.typeGroup,
              type: this.form.typeRadio
            }
          }).then((res) => {
            if (res.isDown) {
              this.form.text = this.form.title = this.form.typeRadio = ''
              this.form.typeGroup = []
              this.message = '保存成功！'
              this.$message(this.message);
            } else {
              this.message = '保存失败，请重新尝试！'
              this.$message(this.message);
            }
          }).catch(err => {
            console.log(err);
            this.message = '网络不稳定或其他原因，保存失败！'
            this.$message(this.message);
          })
        } else {
          this.dialogFormVisible = false
          this.message = '保存的信息有误或信息不完整，请检查后再提交！'
          this.$message(this.message);
        }
      },
      imgAdd(pos, $file) {
        // 第一步.将图片上传到服务器.
        const formdata = new FormData();
        formdata.append('image', $file);
        this.$store.dispatch('setNormalData', {
          url: '/api/img',
          method: 'post',
          data: formdata,
          headers: { 'Content-Type': 'multipart/form-data' }
        }).then((res) => {
          // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
          // $vm.$img2Url 详情见本页末尾
          this.$refs.md.$img2Url(pos, res.personPicture);
        })
      }
    },
    watch: {
      $route: {
        handler: function() {
          if (this.$route.query.id) {
            this.$store.dispatch('getNormalData', {
              url: '/api/reedit',
              method: 'post',
              data: {
                id: this.$route.query.id
              }
            }).then(res => {
              this.form.text = res.content
              this.form.title = res.title
              this.form.typeGroup = res.articleContentTags
              if (res.sort === 'learning') {
                this.form.typeRadio = 'Learning'
              } else if (res.sort === 'foodsandculture') {
                this.form.typeRadio = 'Foods & Culture'
              } else {
                this.form.typeRadio = 'Life'
              }
            })
          }
        },
        // 深度观察监听
        deep: true
      }
    }
  }
</script>

<style scoped lang = "scss">
  .editor-form {
    display: flex;
    
    .editor-form-username {
      flex: 4;
    }
    
    .editor-form-button {
      flex: 1;
      margin: 0 auto;
    }
  }
  
  .editorBox {
    img {
      display: inline-block;
      width: 80%;
    }
  }
</style>
