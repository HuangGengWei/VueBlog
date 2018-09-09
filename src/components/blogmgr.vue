<template>
  <div style="width: 100%;height:100%">
    <section class="content" >
      <div class="box box-primary" v-if="SHOW_TABLE">
        <div class="box-header with-border">
          <h3 class="box-title">管理博客</h3>
        </div>
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
            <div class="col-md-6" v-for="(item,index) in SearchArray">
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
                <button class="btn btn-info" type="submit" @click="ShowAllBlog()">开始搜索</button>
                <button class="btn btn-default" type="submit" @click="RetSetSearch()">重置搜索</button>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <el-table :data="BlogTable" border stripe style="width: 100%;">
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
        </div>
      </div>
      <div class="box box-primary" v-if="SHOW_EDIT">
        <div class="box-header with-border">
          <h3 class="box-title">修改博客</h3>
        </div>
        <div class="box-body">
          <div class="row">
            <div class="col-md-12">
              <form action="#" method="post">
            <div class="form-group">
              <input type="text" class="form-control" name="title" placeholder="标题" v-model="title">
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
                            style="height:auto;margin-bottom: 30px;">
              </quill-editor>
            </div>
              </form>
            </div>
          </div>
        </div>
        <div class="box-footer clearfix">
          <el-button class="pull-right" @click="UpdateBlog">保存</el-button>
          <el-button class="pull-left"  @click="ChangeShow">取消</el-button>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  import { quillEditor } from 'vue-quill-editor'
  export default {
    data() {
      return {
        SearchArray:[{column:'title',text:'',conne:'AND'}],
        //SearchArray:'',
        column:'title',
        text:'',

        start_day:'',
        end_day:'',

        BlogTable: [],
        currentPage:1,
        pageSize:10,
        total:'',
        ConfirmDeleDialog: false,

        SHOW_TABLE:true,
        SHOW_EDIT:false,

        //富文本编辑器
        id:'',
        title:'',
        content: '<h2>正文</h2>',
        editorOption: {
          // something config
        }
      }
    },
    methods:{
      addSearchCondition(){
        this.SearchArray.push({"conne":"AND","column":"title","text":""});
      },
      removeSearchCondition(index){
        this.SearchArray.splice(index, 1);
      },
      RetSetSearch(){
        this.column='title';
        this.text='';
        this.SearchArray=[{column:'title',text:'',conne:'AND'}];
        this.start_day = '';
        this.end_day = '';
        this.ShowAllBlog();
      },
      //富文本
      onEditorChange({ editor, html, text }) {
        //console.log('editor change!', editor, html, text)
        this.content = html
      },
      handleSizeChange: function (size) {
        this.pageSize = size;
        this.ShowAllBlog();
      },
      handleCurrentChange: function(currentPage){
        this.currentPage = currentPage;
        this.ShowAllBlog();
      },
      ShowAllBlog: function () {
        let _this = this;

        //let filter = {};
        let AndArray = [];//AND数组
        let OrArray = [];//Or数组

        //dev_stock_api_server的写法
        // if (_this.column && _this.text!='') {
        //   AndArray.push({"key":_this.column,"value":_this.text});
        // }
        // for (var i in _this.SearchArray) {
        //   if (_this.SearchArray[i].conne=='AND' && _this.SearchArray[i].text!='') {
        //     AndArray.push({"key":_this.SearchArray[i].column,"value":_this.SearchArray[i].text});
        //   }
        //   if (_this.SearchArray[i].conne=='OR' && _this.SearchArray[i].text!='') {
        //     OrArray.push({"key":_this.SearchArray[i].column,"value":_this.SearchArray[i].text});
        //   }     
        // }
        // if (AndArray.length>0){
        //   filter['AND'] = AndArray;
        // }
        // if (OrArray.length>0){
        //   filter['OR'] = OrArray;
        // }

        if (_this.SearchArray.length>0) {
          for (var i in _this.SearchArray) {
            if (_this.SearchArray[i].conne=='AND' && _this.SearchArray[i].text!='') {
              AndArray.push({"key":_this.SearchArray[i].column,"value":_this.SearchArray[i].text});
            }
            if (_this.SearchArray[i].conne=='OR' && _this.SearchArray[i].text!='') {
              OrArray.push({"key":_this.SearchArray[i].column,"value":_this.SearchArray[i].text});
            }

            if (_this.SearchArray[i].text=='' && _this.column && _this.text!='') {
              AndArray.push({"key":_this.column,"value":_this.text});
            }
          }
        }else{
          AndArray.push({"key":_this.column,"value":_this.text});
        }


        this.$axios({
          url:'/api/ApiBlog/ShowAllBlog',
          method: 'post',
          data:{
            pageNumber:this.currentPage,
            pageSize:this.pageSize,
            And:AndArray,
            Or:OrArray,
            startDay:this.start_day,
            endDay:this.end_day
          }
        }).then(res=>{
          let data = res.data;
          _this.BlogTable =data.rows;
          _this.total = data.total;
        }).catch(function(err){
          console.log(err)
        });
      },
      ShowBlog:function(index,row){
        this.ClearInput();
        this.ChangeShow();

        let _this = this;
        _this.$axios({
          method:'post',
          url:'/api/ApiBlog/Blog',
          data:{
            id:row._id
          }
        }).then(res=>{
          let rst = res.data;
          //console.log('ShowBlog',rst);
          if (rst.STS=='OK'){
            _this.title = rst.row[0].title;
            _this.content = rst.row[0].content;
            _this.id = rst.row[0]._id;
          }else{
            _this.$message.error(rst.errmsg);
          }
        }).catch(function(err){
          console.log(err)
        });

        //console.log('row',row);
        // this.title = row.title;
        // this.content = row.content;
        // this.id = row._id;
      },
      ChangeShow:function(){
        this.SHOW_TABLE==true?this.SHOW_TABLE=false:this.SHOW_TABLE=true;
        this.SHOW_EDIT==true?this.SHOW_EDIT=false:this.SHOW_EDIT=true;
      },
      ClearInput:function(){
        this.title = '';
        this.content = '';
        this.id = '';
      },
      DeleteArticle: function (index, row) {
        let _this = this;
        this.$confirm('确定要删除该博客内容吗？', '提示', {
          comfirmButtonTest: '确定',
          cancelButtonTest: '取消'
        }).then(function(){
          _this.$axios({
            method:'post',
            url:'/api/ApiBlog/DeleteBlog',
            data:{
              id:row._id
            }
          }).then(res=>{
            let rst = res.data;
            //console.log(rst);
            if (rst.STS=='OK'){
              _this.$message({message: '删除成功',type: 'success'});
              _this.ShowAllBlog();
            }else{
              _this.$message.error(rst.errmsg);
            }
          })
        }).catch(function(){
          _this.$message({message:'取消操作',type:'info'});
        });
      },
      UpdateBlog:function(){
        //console.log('content',this.content);
        if (!this.title) {
          this.$message.error('标题不能为空');
        }
        if (!this.content) {
          this.$message.error('正文不能为空');
        }
        if (!this.id){
          this.$message.error('ID不能为空');
        }

        if (this.title && this.content && this.id){
          this.$axios({
            method: 'post',
            url: '/api/ApiBlog/UpdateBlog',
            data:{
              id:this.id,
              title: this.title,
              content: this.content,
            }
          }).then(response=>{
            let rst = response.data;
            //console.log(rst);
            if (rst.STS=='OK'){
              this.$message({message: '更新成功', type: 'success'});
              this.ChangeShow();
              this.ShowAllBlog();
            }else{
              this.$message.error(rst.errmsg);
            }
          }).catch(function(err){
            console.log(err)
          });
        }
      }
    },
    mounted(){
      this.ShowAllBlog();
    },
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
</style>

