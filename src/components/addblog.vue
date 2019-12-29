<template>
  <div>
    <section class="content">
      <div class="box box-primary">
        <div class="box-header with-border">
          <h3 class="box-title">发布博客</h3>
          <!-- tools box -->
          <div class="pull-right box-tools">

          </div>
          <!-- /. tools -->
        </div>
        <div class="box-body">
          <form action="#" method="post">
            <!--<div class="form-group">-->
              <!--<input type="email" class="form-control" name="emailto" placeholder="Email to:">-->
            <!--</div>-->
            <div class="form-group">
              <input type="text" class="form-control" name="title" v-model="title">
            </div>
            <div>
              <!-- use with components - bidirectional data binding（双向数据绑定） -->
              <quill-editor ref="myTextEditor"
                            v-model="content"
                            :config="editorOption"
                            @blur="onEditorBlur($event)"
                            @focus="onEditorFocus($event)"
                            @ready="onEditorReady($event)"
                            @change="onEditorChange($event)"
                            style="height:auto;margin-bottom: 30px;"
                            >
              </quill-editor>
            </div>
            <!--原创or转载-->
            <el-radio v-model="source" label="1">原创</el-radio>
            <el-radio v-model="source" label="2">转载</el-radio>
          </form>
        </div>
        <div class="box-footer clearfix">
          <el-button class="pull-right" @click="addblog">Send
            <i class="fa fa-arrow-circle-right"></i></el-button>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { quillEditor } from 'vue-quill-editor'

// editor option example:
export default {
  data () {
    return {
      title: '',
      content: '',
      source: 0,
      editorOption: {
        // something config
      }
    }
  },
  // if you need to manually control the data synchronization, parent component needs to explicitly emit an event instead of relying on implicit binding
  // 如果需要手动控制数据同步，父组件需要显式地处理changed事件
  methods: {
    onEditorBlur (editor) {
      //console.log('editor blur!', editor)
    },
    onEditorFocus (editor) {
      //console.log('editor focus!', editor)
    },
    onEditorReady (editor) {
      //console.log('editor ready!', editor)
    },
    onEditorChange ({ editor, html, text }) {
      //console.log('editor change!', editor, html, text)
      this.content = html
    },
    addblog () {
      if (!this.title) {
        this.$message.error('标题不能为空')
      }
      if (!this.content) {
        this.$message.error('正文不能为空')
      }

      if (this.title && this.content) {
        this.$axios({
          method: 'post',
          url: '/api/ApiBlog/AddBlog',
          data: {
            title: this.title,
            content: this.content,
            source: this.source
          }
        }).then(response => {
          let rst = response.data
          // console.log(rst);
          if (rst.STS === 'OK') {
            this.$message({ message: '发布成功', type: 'success' })
            this.$router.push({path: './blogmgr'})
          } else {
            this.$message.error(rst.errmsg)
          }
        }).catch(function (err) {
          //console.log(err)
        })
      }
    }
  },
  // if you need to get the current editor object, you can find the editor object like this, the $ref object is a ref attribute corresponding to the dom redefined
  // 如果你需要得到当前的editor对象来做一些事情，你可以像下面这样定义一个方法属性来获取当前的editor对象，实际上这里的$refs对应的是当前组件内所有关联了ref属性的组件元素对象
  computed: {
    editor () {
      return this.$refs.myTextEditor.quillEditor
    }
  },
  mounted () {
    // you can use current editor object to do something(editor methods)
    //console.log('this is my editor', this.editor)
    // this.editor to do something...
  }
}
</script>
