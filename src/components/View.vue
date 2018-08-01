<template>
  <div>
    <div id="id-article" class="article-wrapper">
      <div class="article" style="overflow: hidden">
        <div class="article-header">
          <h1 class="title">{{title}}</h1>
          <div class="time">
            <i class="icon-calendar"></i>
            <span class="txt">{{create_time}}</span>
          </div>
        </div>
        <div class="article-content">
          <div class="desc views" id="content_view">

          </div>
        </div>
        <div class="article-info clearfix">
          <div class="icon">
            <i class="icon-price-tag"></i>
          </div>
          <ul class="tags clearfix">
            <!--<li class="tag">-->
              <!--<a href="#" style="background: rgb(92, 148, 102);"><i class="before" style="border-right-color: rgb(92, 148, 102);"></i>冷笑话</a>-->
            <!--</li>-->
          </ul>
        </div>
      </div>
      <div class="article-nav clearfix">
        <div class="nav article-next">
          <router-link to="/BlogList">
            返回<i class="arrow icon-arrow-outline-left"></i></router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        id:this.$route.query.id,
        title:'',
        create_time:'',
      }
    },
    methods:{
      Blog:function(){
        let _this = this;
        _this.$axios({
          method:'post',
          url:'/api/ApiBlog/Blog',
          data:{
            id:_this.id,
          }
        }).then(response=>{
          let rst = response.data;
          console.log(rst);
          if (rst.STS=='OK'){
            _this.title = rst.data[0].b_title;
            _this.create_time = rst.data[0].create_time;
            $('#content_view').html(rst.data[0].b_content).text();
          }else{
            _this.$message.error(rst.errmsg);
          }
        }).catch(function(err){
          console.log(err)
        });
      }
    },
    mounted(){
      this.Blog();
    }
  }
</script>
