<template>
  <div>
    <body class="hold-transition login-page">
    <div class="login-box">
      <div class="login-logo">
        <a href="#"><b>HuangGengWei</b>Blog</a>
      </div>
      <!-- /.login-logo -->
      <div class="login-box-body">
        <p class="login-box-msg"><b>Welcome</b></p>

        <form action="#" method="post">
          <div class="form-group has-feedback">
            <input type="name" class="form-control" placeholder="User Name" v-model="name">
            <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
          </div>
          <div class="form-group has-feedback">
            <input type="password" class="form-control" placeholder="Password" v-model="password">
            <span class="glyphicon glyphicon-lock form-control-feedback"></span>
          </div>
          <div class="row">
            <!--<div class="col-xs-8">-->
              <!--<div class="checkbox icheck">-->
                <!--<label>-->
                  <!--<input type="checkbox"> Remember Me-->
                <!--</label>-->
              <!--</div>-->
            <!--</div>-->
            <!-- /.col -->
            <div class="col-xs-12">
              <!--<a href="javascript:;" @click="Login">提交</a>-->
              <el-button class="btn btn-primary btn-block btn-flat" @click="Login" id="SignInBtn"><b>Sign In</b></el-button>
            </div>
            <!-- /.col -->
          </div>
        </form>

        <!--<div class="social-auth-links text-center">-->
          <!--<p>- OR -</p>-->
          <!--<a href="#" class="btn btn-block btn-social btn-facebook btn-flat"><i class="fa fa-facebook"></i> Sign in using-->
            <!--Facebook</a>-->
          <!--<a href="#" class="btn btn-block btn-social btn-google btn-flat"><i class="fa fa-google-plus"></i> Sign in using-->
            <!--Google+</a>-->
        <!--</div>-->
        <!-- /.social-auth-links -->

        <!--<a href="#">I forgot my password</a><br>-->
        <!--<a href="register.html" class="text-center">Register a new membership</a>-->

      </div>
      <!-- /.login-box-body -->
    </div>
    <!-- /.login-box -->
    </body>
  </div>
</template>
<script>
  // $(function () {
  //   $('input').iCheck({
  //     checkboxClass: 'icheckbox_square-blue',
  //     radioClass: 'iradio_square-blue',
  //     increaseArea: '20%' // optional
  //   });
  // });
  export default {
    name: 'HelloWorld',
    data () {
      return {
        // msg: 'Welcome to Your Vue.js App',
        name:'',
        password:'',
      }
    },
    methods:{
      Login:function(){
        if(!this.password){
          this.$message.error('密码不能为空');
        }
        if(!this.name){
          this.$message.error('用户名称不能为空');
        }
        if(this.name && this.password){
          this.$axios({
            method: 'post',
            url: '/api/ApiUser/Login',
            data:{
              name: this.name,
              password: this.password,
            }
          }).then(response=>{
            let rst = response.data;
            //console.log(rst);
            if (rst.STS=='OK'){
              this.$message({ message: '登陆成功', type: 'success' });
              this.$router.push({path:'./starter'});
            }else{
              this.$message.error(rst.errmsg);
            }
          }).catch(function(err){
            console.log(err)
          });
        }
      },
      //进入登录页面立刻检查一次是否是已登录状态
      checkLogin:function(){
        this.$axios({
          method: 'post',
          url: '/api/ApiUser/CheckLogin',
        }).then(response=>{
          console.log(response);
          let data = response.data;
          if (data.STS=='OK'){
            this.$message({ message: '用户已登陆,为您跳转至管理主页', type: 'success' });
            this.$router.push({path:'./starter'});
          }
        }).catch(function(err){
          console.log(err)
        });
      }
    },
    mounted(){
      this.checkLogin();
      //keydown事件
      let _this = this;
      document.onkeydown=function(event){
        var e = event || window.event || arguments.callee.caller.arguments[0];
        switch (e && e.keyCode){
          case 13:
              _this.Login();
            break;
        }
      };
    }
  }
</script>
