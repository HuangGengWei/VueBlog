<template>
  <div>
      <div class="article">
        <div class="article-header">
          <h1 class="title">博客列表</h1>
        </div>
        <div class="article-content clearfix" v-for="(item,index) in data" v-bind:key="index">
            <h4 class="title">
              <!-- <router-link :to="{path:'/View',query:{id:item._id}}">{{item.title}}</router-link> -->
              <a @click="GoToView(item._id)" style="cursor:pointer;">{{item.title}}</a>
              <div class="blue_tag" v-show="item.source==2">转载</div>
              <div class="green_tag" v-show="item.source==1">原创</div>
            </h4>
            <div class="time">
              <span class="txt">{{item.create_time}}</span>
            </div>
            <hr/>
        </div>
        <div class="article-info">
          <ol class="pagination" id="pagelist"></ol>
        </div>
      </div>
  </div>
</template>
<style>
  .clearfix{
      content: "";
      display: block;
      clear: both;
  }
  .blue_tag{
    float: right;
    width: 70px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 10px;
    border: 1px solid #46799b;
    background: #e0eaf1;
    color: #46799b;
    cursor: pointer;
  }
  .green_tag{
    float: right;
    width: 70px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 10px;
    border: 1px solid #45872c;
    background: #e1f3da;
    color: #45872c;
    cursor: pointer;
  }
  .bg_box{
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.5);
			position: fixed;
			left: 0px;
			top: 0px;
			z-index: 50;
  }
  .ball-pulse{
    width: 100px;
    line-height: 50px;
    height: 50px;
    text-align: center;
    font-size: 25px;
    position:fixed;
    left:50%;
    top:50%;
    margin-top:-30px;
    margin-left:-25px;
    z-index: 51;
  }
  .ball-pulse > div {
    background-color: rgba(0, 0, 0, 0.5);
  }

</style>
<script>
import { Pagination } from 'csdwheels'
export default {
  data () {
    return {
      data: '',
      //pageNumber: 1,
      pageSize: 10,
      //total: ''
    }
  },
  methods: {
    BlogList: function () {
      let _this = this
      _this.$axios({
        method: 'post',
        url: '/api/ApiBlog/BlogList',
        data: {
          //pageNumber: _this.pageNumber,
          pageNumber: _this.$store.state.curr,
          pageSize: _this.pageSize
        }
      }).then(res => {
        let rst = res.data
        if (rst.STS == 'OK') {
          _this.data = rst.rows
          _this.total = rst.total
        } else {
          _this.$message.error(rst.errmsg)
        }
      }).catch(function (err) {
        //console.log(err)
      })
    },
    InitPagination:function(){
      let _this = this
      _this.$axios({
        method: 'post',
        url: '/api/ApiBlog/BlogTotal'
      }).then(res => {
        //_this.total = res.data.total;
        //console.log('curr',this.$store.state.curr)
        let _this = this;
        // 分页元素ID（必填）
        var selector = '#pagelist'
        // 分页配置
        var pageOption = {
          // 每页显示数据条数（必填）
          limit: 10,
          // 数据总数（一般通过后端获取，必填）
          //count: _this.total,
          count:res.data.total,
          // 当前页码（选填，默认为1）
          curr: this.$store.state.curr,
          // 是否显示省略号（选填，默认显示）
          ellipsis: true,
          // 当前页前后两边可显示的页码个数（选填，默认为2）
          pageShow: 2,
          // 开启location.hash，并自定义hash值 （默认关闭）
          // 如果开启，在触发分页时，会自动对url追加：#!hash值={curr} 利用这个，可以在页面载入时就定位到指定页
          hash: false,
          // 页面加载后默认执行一次，然后当分页被切换时再次触发
          callback: function (obj) {//点击分页器触发的函数
            // obj.curr：获取当前页码
            // obj.limit：获取每页显示数据条数
            // obj.isFirst：是否首次加载页面，一般用于初始加载的判断
            //console.log('分页',obj);
            // _this.pageNumber = obj.curr
            _this.$store.commit('SaveCurr',obj.curr)
            _this.pageSize = obj.limit;
            _this.BlogList()
            window.scrollTo(0,0);
            // 首次不执行
            if (!obj.isFirst) {
              // do something
            }
          }
        }
        // console.log('count',pageOption.count);
        // 初始化分页器
        new Pagination(selector, pageOption)
      }).catch(function (err) {
        //console.log(err)
      })
    },
    GoToView:function(id){
      this.$store.commit('SavePosition',document.documentElement.scrollTop)
      // console.log('保存滚动条位置',this.$store.state.position)
      this.$router.push({path:'/View',query:{id:id}})
    }
  },
  mounted () {
    this.InitPagination()
  }
}
</script>
