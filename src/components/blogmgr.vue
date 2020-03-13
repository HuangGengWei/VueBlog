<template>
  <div style="width: 100%;height:100%">
    <section class="content" >
      <div class="box box-primary">
        <div class="box-header with-border">
          <h3 class="box-title" v-show="SHOW_WHAT_DIV=='TABLE'">管理博客</h3>
          <h3 class="box-title" v-show="SHOW_WHAT_DIV=='EDIT'">编辑博客</h3>
          <h3 class="box-title" v-show="SHOW_WHAT_DIV=='ADD'">发布博客</h3>
        </div>
        <div v-if="SHOW_WHAT_DIV=='TABLE'">
          <!-- /.box-header -->
          <div class="box-body">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <div class="input-group col-xs-12">
                      <div class="input-group-btn">
                          <select v-model="column" name="type" class="form-control" style="width: auto;">
                              <option value="author">作者</option>
                              <option value="title">标题</option>
                          </select>
                      </div>
                      <input v-model="text" type="text" name="keyword" id="keyword" class="form-control" placeholder="请您输入关键词">
                  </div>
                </div>
              </div>
              <div class="col-md-6" v-for="(item,index) in SearchArray" v-bind:key="index">
                  <div class="form-group">
                    <div class="input-group col-xs-12">
                        <div class="input-group-btn">
                            <select v-model="item.conne" name="type" class="form-control" style="width: auto;">
                                <option value="AND">和</option>
                                <option value="OR">或</option>
                            </select>
                        </div>
                        <div class="input-group-btn">
                            <select v-model="item.column" name="type" class="form-control" style="width: auto;">
                                <option value="author">作者</option>
                                <option value="title">标题</option>
                            </select>
                        </div>
                        <input v-model="item.text" type="text" name="keyword" id="keyword" class="form-control" placeholder="请您输入关键词">
                        <span class="input-group-btn">
                            <button class="btn btn-danger" id="search_submit" type="submit" @click="removeSearchCondition(index)">删除</button>
                        </span>
                    </div>
                  </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <div class="input-group col-xs-12">
                      <el-date-picker type="date" placeholder="开始时间" v-model="start_day" value-format="yyyy-MM-dd" style="width: 100%;" ></el-date-picker>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <div class="input-group col-xs-12">
                      <el-date-picker type="date" placeholder="结束时间" v-model="end_day" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                  </div>
                </div>
              </div>
              <div class="col-md-12" style="margin-bottom:10px;float:left;">
                  <!-- <button class="btn btn-default" type="submit" @click="addSearchCondition()">添加搜索条件</button> -->
                  <button class="btn btn-info" type="submit" @click="Search()">开始搜索</button>
                  <button class="btn btn-default" type="submit" @click="RetSetSearch()">重置搜索</button>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <el-table :data="BlogTable" border stripe style="min-height: 600px">
                  <el-table-column prop="author" label="作者"></el-table-column>
                  <el-table-column prop="title" label="博客标题"></el-table-column>
                  <el-table-column prop="comment" label="评论数"></el-table-column>
                  <el-table-column prop="pv" label="浏览量"></el-table-column>
                  <el-table-column prop="create_time" label="创建日期"></el-table-column>
                  <el-table-column prop="update_time" label="更新日期"></el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <el-button size="mini" @click="ShowBlog(scope.$index, scope.row)">编辑</el-button>
                      <el-button size="mini" type="danger" @click="DeleteArticle(scope.$index, scope.row)">删除 </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <!-- /.row -->
          </div>
          <!-- /.box-body -->
          <div class="box-footer">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              style="float:left;">
            </el-pagination>
            <button class="btn btn-info pull-right" @click="GoToPublic()">去发布</button>
          </div>
        </div>
        <div v-if="SHOW_WHAT_DIV=='EDIT' || SHOW_WHAT_DIV=='ADD'">
            <div class="box-body">
              <div class="row">
                <div class="col-md-12">
                  <form action="#" method="post">
                    <div class="form-group">
                      <input type="text" class="form-control" name="title" placeholder="标题" v-model="title">
                    </div>
                    <div class="form-group">
                      <!-- <mavon-editor v-model="content" ref="md" @change="change" style="min-height: 600px"/> -->
                      <div class="quill-editor-example" style="min-height:600px">
                       <!-- bidirectional data binding（双向数据绑定） -->
                        <quill-editor v-model="content"
                                      ref="myQuillEditor"
                                      :options="editorOption"
                                      >
                                      <!-- @focus="onEditorFocus($event)"
                                      @blur="onEditorBlur($event)"
                                      @ready="onEditorReady($event)" -->
                        </quill-editor>
                        <!-- Or manually control the data synchronization（或手动控制数据流） -->
                        <!-- <quill-editor :content="content"
                                      :options="editorOption"
                                      @change="onEditorChange($event)">
                        </quill-editor> -->
                        <div class="quill-code">
                          <!-- <div class="title">Code</div> -->
                          <!-- <code class="xml" v-html="content"></code> -->
                        </div>
                      </div>

                    </div>
                    <!--原创or转载-->
                    <!-- <el-radio v-model="source" label="1">原创</el-radio> -->
                    <!-- <el-radio v-model="source" label="2">转载</el-radio> -->
                  </form>
                </div>
              </div>
            </div>
            <div class="box-footer clearfix">
              <el-button class="pull-right" @click="UpdateBlog">保存</el-button>
              <el-button class="pull-left"  @click="SHOW_WHAT_DIV = 'TABLE'">取消</el-button>
            </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

//import 'highlight.js/styles/googlecode.css'
import 'highlight.js/styles/github.css';
import hljs from 'highlight.js'
import { quillEditor } from 'vue-quill-editor'

// 图片调整大小
import { ImageDrop } from 'quill-image-drop-module'
import ImageResize from 'quill-image-resize-module'
Quill.register('modules/imageDrop', ImageDrop)
Quill.register('modules/imageResize', ImageResize)
export default {
  data () {
    return {
      SearchArray: [{column: 'title', text: '', conne: 'AND'}],
      column: 'title',
      text: '',
      source: 0,
      start_day: '',
      end_day: '',

      BlogTable: [],
      currentPage: 1,
      pageSize: 10,
      total: '',
      ConfirmDeleDialog: false,

      SHOW_WHAT_DIV: 'TABLE',

      // 富文本编辑器
      id: '',
      title: '',
      content: '',

      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'font': [] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            ['clean'],
            ['link', 'image', 'video']
          ],
          syntax: {
            highlight: text => {
              return hljs.highlightAuto(text).value // 这里就是代码高亮需要配置的地方
            }
          },
          history: {
            delay: 1000,
            maxStack: 50,
            userOnly: false
          },
          imageDrop: true,
          imageResize: {
            displayStyles: {
              backgroundColor: 'black',
              border: 'none',
              color: 'white'
            },
            modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
          }
        }
      }
    }
  },
  components: {
    quillEditor
  },
  methods: {
    addSearchCondition () {
      this.SearchArray.push({'conne': 'AND', 'column': 'title', 'text': ''})
    },
    removeSearchCondition (index) {
      this.SearchArray.splice(index, 1)
    },
    Search () {
      this.currentPage = 1
      this.pageSize = 10
      this.ShowAllBlog()
    },
    RetSetSearch () {
      this.column = 'title'
      this.text = ''
      this.SearchArray = [{column: 'title', text: '', conne: 'AND'}]
      this.start_day = ''
      this.end_day = ''
      this.currentPage = 1
      this.pageSize = 10
      this.ShowAllBlog()
    },
    // 分页器
    handleSizeChange: function (size) {
      this.pageSize = size
      this.ShowAllBlog()
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
      this.ShowAllBlog()
    },
    ShowAllBlog: function () {
      let _this = this

      let AndArray = []// AND数组
      let OrArray = []// Or数组

      if (_this.SearchArray.length > 0) {
        for (var i in _this.SearchArray) {
          if (_this.SearchArray[i].conne === 'AND' && _this.SearchArray[i].text !== '') {
            AndArray.push({'key': _this.SearchArray[i].column, 'value': _this.SearchArray[i].text})
          }
          if (_this.SearchArray[i].conne === 'OR' && _this.SearchArray[i].text !== '') {
            OrArray.push({'key': _this.SearchArray[i].column, 'value': _this.SearchArray[i].text})
          }

          if (_this.SearchArray[i].text === '' && _this.column && _this.text !== '') {
            AndArray.push({'key': _this.column, 'value': _this.text})
          }
        }
      } else {
        AndArray.push({'key': _this.column, 'value': _this.text})
      }

      this.$axios({
        url: '/api/ApiBlog/ShowAllBlog',
        method: 'post',
        data: {
          pageNumber: this.currentPage,
          pageSize: this.pageSize,
          And: AndArray,
          Or: OrArray,
          startDay: this.start_day,
          endDay: this.end_day
        }
      }).then(res => {
        let data = res.data
        _this.BlogTable = data.rows
        _this.total = data.total
      }).catch(function (err) {
        console.log(err)
      })
    },
    // 展示待编辑的博客
    ShowBlog: function (index, row) {
      let _this = this
      _this.$axios({
        method: 'post',
        url: '/api/ApiBlog/Blog',
        data: {
          id: row._id
        }
      }).then(res => {
        let rst = res.data
        if (rst.STS === 'OK') {
          _this.SHOW_WHAT_DIV = 'EDIT'
          _this.ClearInput()
          _this.title = rst.row[0].title
          _this.content = rst.row[0].content
          _this.id = rst.row[0]._id
        } else {
          _this.$message.error(rst.errmsg)
        }
      }).catch(function (err) {
        console.log(err)
      })
    },
    DeleteArticle: function (index, row) {
      let _this = this
      this.$confirm('确定要删除该博客内容吗？', '提示', {
        comfirmButtonTest: '确定',
        cancelButtonTest: '取消'
      }).then(function () {
        _this.$axios({
          method: 'post',
          url: '/api/ApiBlog/DeleteBlog',
          data: {
            id: row._id
          }
        }).then(res => {
          let rst = res.data
          // console.log(rst);
          if (rst.STS === 'OK') {
            _this.$message({message: '删除成功', type: 'success'})
            _this.ShowAllBlog()
          } else {
            _this.$message.error(rst.errmsg)
          }
        })
      }).catch(function () {
        _this.$message({message: '取消操作', type: 'info'})
      })
    },
    UpdateBlog: function () {
      let URL = '/api/ApiBlog/AddBlog'
      let param = {
        title: this.title,
        content: this.content,
        source: this.source
      }
      let errMsg = ''
      if (this.SHOW_WHAT_DIV === 'EDIT') {
        URL = '/api/ApiBlog/UpdateBlog'
        if (!this.id) {
          // this.$message.error('ID不能为空')
          errMsg = 'ID不能为空'
        }
        param.id = this.id
      }
      if (!param.title) {
        // this.$message.error('标题不能为空')
        errMsg = '标题不能为空'
      }
      if (!param.content) {
        // this.$message.error('正文不能为空')
        errMsg = '正文不能为空'
      }

      if (errMsg === '') {
        this.$axios({
          method: 'post',
          url: URL,
          data: param
        }).then(response => {
          let rst = response.data
          if (rst.STS === 'OK') {
            this.$message({message: '更新成功', type: 'success'})
            this.SHOW_WHAT_DIV = 'TABLE'
            this.ClearInput()
            this.ShowAllBlog()
          } else {
            this.$message.error(rst.errmsg)
          }
        }).catch(function (err) {
          console.log(err)
        })
      } else {
        this.$message.error(errMsg)
      }
    },
    ClearInput: function () {
      this.title = ''
      this.content = ''
      this.id = ''
    },
    GoToPublic: function () {
      this.ClearInput()
      this.SHOW_WHAT_DIV = 'ADD'
    }
  },
  mounted () {
    this.ShowAllBlog()
  }
}
</script>
<style>
  .content {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .quill-editor,
  .quill-code {
    height:550px;
    /* width: 50%; */
    /* float: left; */
  }
  .quill-code {
    height: auto;
    border: none;
  }
  .quill-code .title {
      border: 1px solid #ccc;
      border-left: none;
      height: 3em;
      line-height: 3em;
      text-indent: 1rem;
      font-weight: bold;
    }
  .quill-code code {
      width: 100%;
      margin: 0;
      padding: 1rem;
      border: 1px solid #ccc;
      border-top: none;
      border-left: none;
      border-radius: 0;
      height: 30rem;
      overflow-y: auto;
    }
</style>
