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
          <!-- <div class="desc views" id="content_view"></div> -->
          <vue-markdown v-highlight :source="content"></vue-markdown>
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
          <hr>
        </div>
        <!--评论显示区-->
        <div class="article-content">
          <ul class="list-inline">
            <li>
              <a href="#" class="link-black text-sm"><i class="fa fa-comments-o margin-r-5"></i> 全部评论</a>
            </li>
          </ul>
          <div class="tab-pane" id="timeline">
            <!-- The timeline -->
            <ul class="timeline timeline-inverse" v-for="(item,index) in comment" v-bind:key="index">
              <!-- timeline item -->
              <li>
                <div class="timeline-item">
                  <span class="time"><i class="fa fa-clock-o"></i> {{item.create_time}}</span>
                  <h4><a href="#" style="margin-left: 10px;">{{item.ip}}</a></h4>
                  <h3 class="timeline-header no-border">{{item.comment}}
                  </h3>
                </div>
              </li>
              <!-- END timeline item -->
            </ul>
          </div>
        </div>
        <!--评论编辑框-->
        <div class="article-info clearfix" style="margin-bottom: 20px;">
          <ul class="list-inline">
            <li>
              <a href="#" class="link-black text-sm"><i class="fa fa-comments-o margin-r-5"></i> 畅所欲言</a></li>
          </ul>
          <div class="Main2">
            <div class="Input_Box">
              <div contenteditable="true" class="Input_text"></div>
              <div class="Input_Foot">
                <a class="imgBtn" href="javascript:void(0);">'◡'</a><a class="postBtn" @click="AddComment">发表</a>
              </div>
            </div>
            <div class="faceDiv">
              <section class="emoji_container">
              </section>
              <section class="emoji_tab"></section>
            </div>
          </div>
        </div>

      </div>
      <div class="article-nav clearfix">
        <div class="nav article-next">
          <router-link to="/bloglist">返回<i class="arrow icon-arrow-outline-left"></i></router-link>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import '../assets/css/myemojiPl.css'

import VueMarkdown from 'vue-markdown'
import hljs from 'highlight.js'
import 'highlight.js/styles/googlecode.css'
Vue.directive('highlight',function (el) {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block)=>{
    hljs.highlightBlock(block)
  })
})
// import hljs from 'highlight.js/lib/highlight';
// import 'highlight.js/styles/github.css';

export default {
  data () {
    return {
      id: this.$route.query.id,
      title: '',
      create_time: '',
      comment: '',
      content:''
    }
  },
  components:{
    VueMarkdown
  },
  methods: {
    Blog: function () {
      let _this = this
      _this.$axios({
        method: 'post',
        url: '/api/ApiBlog/Blog',
        data: {
          id: _this.id
        }
      }).then(res => {
        let rst = res.data
        // console.log(rst);
        if (rst.STS === 'OK') {
          _this.title = rst.row[0].title
          _this.create_time = rst.row[0].create_time
          //$('#content_view').html(rst.row[0].content).text()
          _this.content=rst.row[0].content;
        } else {
          _this.$message.error(rst.errmsg)
        }
      }).catch(function (err) {
        //console.log(err)
      })
    },
    AddComment: function () {
      this.$message.error('暂停评论功能')
      // let _this = this
      // if ($('.Input_text').html() !== '') {
      //   _this.$axios({
      //     method: 'post',
      //     url: '/api/ApiBlog/AddComment',
      //     data: {
      //       comment: $('.Input_text').html(),
      //       blogid: _this.id
      //     }
      //   }).then(res => {
      //     let rst = res.data
      //     // console.log(rst);
      //     if (rst.STS === 'OK') {
      //       $('.Input_text').html('')
      //       _this.ShowComment()
      //     } else {
      //       _this.$message.error(rst.errmsg)
      //     }
      //   }).catch(function (err) {
      //     console.log(err)
      //   })
      // } else {
      //   _this.$message.error('你啥也没说呢')
      // }
    },
    ShowComment: function () {
      let _this = this
      _this.$axios({
        method: 'post',
        url: '/api/ApiBlog/ShowComment',
        data: {
          blogid: _this.id
        }
      }).then(res => {
        let rst = res.data
        // console.log(rst);
        if (rst.STS === 'OK') {
          _this.comment = rst.row
        } else {
          _this.$message.error(rst.errmsg)
        }
      }).catch(function (err) {
        //console.log(err)
      })
    }
  },
  mounted () {
    this.Blog()
    this.ShowComment()
    // $('.Main2').myEmoji();
  }
}
</script>
