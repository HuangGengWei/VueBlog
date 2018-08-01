<template>
  <div class="hello">
    <!--<h1><i class='fa fa-fw fa-amazon'></i>{{ msg }}</h1>-->
      <!--<input type="text" name="username" v-model="userName"> <br>-->
      <!--<input type="text" name="age" v-model="age"> <br>-->
      <!--<a href="javascript:;" @click="addUser">提交</a>-->

        <header class="main-header">
          <!-- Logo -->
          <!--<a href="#" class="logo" @click="CheckLogin">-->
            <router-link to="/starter" class="logo">
            <!-- logo for regular state and mobile devices -->
            <span class="logo-lg"><b>黄耿伟</b>の技术博客</span>
            </router-link>
          <!--</a>-->
          <!-- Header Navbar: style can be found in header.less -->
          <nav class="navbar">

          </nav>
        </header>
        <!-- Main content -->
        <section class="content">
          <!-- Main row -->

          <!-- /.row (main row) -->
        </section>
        <!-- /.content -->
  </div>
</template>
<script>
  export default {
    name: 'hello',
    data () {

    },
    methods: {
      // CheckLogin(){
      //   console.log('CheckLogin');
      //   this.$axios({
      //     method: 'post',
      //     url: '/api/ApiUser/CheckLogin',
      //     // data:{
      //     //   name: this.name,
      //     //   password: this.password,
      //     // }
      //   }).then(response=>{
      //     let rst = response.data;
      //     console.log(rst);
      //     if (rst.STS=='OK'){
      //       this.$router.push({path:'./starter'});
      //     }else{
      //       this.$router.push({path:'./login'});
      //     }
      //   }).catch(function(err){
      //     //console.log(err)
      //   });
      // }
    }
  }
</script>
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

