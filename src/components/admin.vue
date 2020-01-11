<template>
  <div class="wrapper">
    <!-- Main Header -->
    <header class="main-header">
      <!-- Logo -->
      <a href="#" class="logo">
        <!-- mini logo for sidebar mini 50x50 pixels -->
        <span class="logo-mini"><b>Blog</b></span>
        <!-- logo for regular state and mobile devices -->
        <span class="logo-lg"><b>黄耿伟</b>の技术博客</span>
      </a>
      <!-- Header Navbar -->
      <nav class="navbar navbar-static-top" role="navigation">
        <!-- Sidebar toggle button-->
        <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
          <span class="sr-only">Toggle navigation</span>
        </a>
        <!-- Navbar Right Menu -->
        <div class="navbar-custom-menu">
          <ul class="nav navbar-nav">
            <!-- Messages: style can be found in dropdown.less-->
            <!--<li class="dropdown messages-menu">-->
              <!--&lt;!&ndash; Menu toggle button &ndash;&gt;-->
              <!--<a href="#" class="dropdown-toggle" data-toggle="dropdown">-->
                <!--<i class="fa fa-envelope-o"></i>-->
                <!--<span class="label label-success">4</span>-->
              <!--</a>-->
              <!--<ul class="dropdown-menu">-->
                <!--<li class="header">You have 4 messages</li>-->
                <!--<li>-->
                  <!--&lt;!&ndash; inner menu: contains the messages &ndash;&gt;-->
                  <!--<ul class="menu">-->
                    <!--<li>&lt;!&ndash; start message &ndash;&gt;-->
                      <!--<a href="#">-->
                        <!--<div class="pull-left">-->
                          <!--&lt;!&ndash; User Image &ndash;&gt;-->
                          <!--<img src="../assets/minren.jpg" class="img-circle" alt="User Image">-->
                        <!--</div>-->
                        <!--&lt;!&ndash; Message title and timestamp &ndash;&gt;-->
                        <!--<h4>-->
                          <!--Support Team-->
                          <!--<small><i class="fa fa-clock-o"></i> 5 mins</small>-->
                        <!--</h4>-->
                        <!--&lt;!&ndash; The message &ndash;&gt;-->
                        <!--<p>Why not buy a new awesome theme?</p>-->
                      <!--</a>-->
                    <!--</li>-->
                    <!--&lt;!&ndash; end message &ndash;&gt;-->
                  <!--</ul>-->
                  <!--&lt;!&ndash; /.menu &ndash;&gt;-->
                <!--</li>-->
                <!--<li class="footer"><a href="#">See All Messages</a></li>-->
              <!--</ul>-->
            <!--</li>-->
            <!-- /.messages-menu -->

            <!-- Notifications Menu -->
            <!--<li class="dropdown notifications-menu">-->
              <!--&lt;!&ndash; Menu toggle button &ndash;&gt;-->
              <!--<a href="#" class="dropdown-toggle" data-toggle="dropdown">-->
                <!--<i class="fa fa-bell-o"></i>-->
                <!--<span class="label label-warning">10</span>-->
              <!--</a>-->
              <!--<ul class="dropdown-menu">-->
                <!--<li class="header">You have 10 notifications</li>-->
                <!--<li>-->
                  <!--&lt;!&ndash; Inner Menu: contains the notifications &ndash;&gt;-->
                  <!--<ul class="menu">-->
                    <!--<li>&lt;!&ndash; start notification &ndash;&gt;-->
                      <!--<a href="#">-->
                        <!--<i class="fa fa-users text-aqua"></i> 5 new members joined today-->
                      <!--</a>-->
                    <!--</li>-->
                    <!--&lt;!&ndash; end notification &ndash;&gt;-->
                  <!--</ul>-->
                <!--</li>-->
                <!--<li class="footer"><a href="#">View all</a></li>-->
              <!--</ul>-->
            <!--</li>-->
            <!-- Tasks Menu -->
            <!--<li class="dropdown tasks-menu">-->
              <!--&lt;!&ndash; Menu Toggle Button &ndash;&gt;-->
              <!--<a href="#" class="dropdown-toggle" data-toggle="dropdown">-->
                <!--<i class="fa fa-flag-o"></i>-->
                <!--<span class="label label-danger">9</span>-->
              <!--</a>-->
              <!--<ul class="dropdown-menu">-->
                <!--<li class="header">You have 9 tasks</li>-->
                <!--<li>-->
                  <!--&lt;!&ndash; Inner menu: contains the tasks &ndash;&gt;-->
                  <!--<ul class="menu">-->
                    <!--<li>&lt;!&ndash; Task item &ndash;&gt;-->
                      <!--<a href="#">-->
                        <!--&lt;!&ndash; Task title and progress text &ndash;&gt;-->
                        <!--<h3>-->
                          <!--Design some buttons-->
                          <!--<small class="pull-right">20%</small>-->
                        <!--</h3>-->
                        <!--&lt;!&ndash; The progress bar &ndash;&gt;-->
                        <!--<div class="progress xs">-->
                          <!--&lt;!&ndash; Change the css width attribute to simulate progress &ndash;&gt;-->
                          <!--<div class="progress-bar progress-bar-aqua" style="width: 20%" role="progressbar"-->
                               <!--aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">-->
                            <!--<span class="sr-only">20% Complete</span>-->
                          <!--</div>-->
                        <!--</div>-->
                      <!--</a>-->
                    <!--</li>-->
                    <!--&lt;!&ndash; end task item &ndash;&gt;-->
                  <!--</ul>-->
                <!--</li>-->
                <!--<li class="footer">-->
                  <!--<a href="#">View all tasks</a>-->
                <!--</li>-->
              <!--</ul>-->
            <!--</li>-->
            <!-- User Account Menu -->
            <li class="dropdown user user-menu">
              <!-- Menu Toggle Button -->
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                <!-- The user image in the navbar-->
                <img src="../assets/minren.jpg" class="user-image" alt="User Image">
                <!-- hidden-xs hides the username on small devices so only the image appears. -->
                <span class="hidden-xs">HuangGengWei</span>
              </a>
              <ul class="dropdown-menu">
                <!-- The user image in the menu -->
                <li class="user-header">
                  <img src="../assets/minren.jpg" class="img-circle" alt="User Image">

                  <!--<p>-->
                    <!--Alexander Pierce - Web Developer-->
                    <!--<small>Member since Nov. 2012</small>-->
                  <!--</p>-->
                </li>
                <!-- Menu Body -->
                <!--<li class="user-body">-->
                  <!--<div class="row">-->
                    <!--<div class="col-xs-4 text-center">-->
                      <!--<a href="#">Followers</a>-->
                    <!--</div>-->
                    <!--<div class="col-xs-4 text-center">-->
                      <!--<a href="#">Sales</a>-->
                    <!--</div>-->
                    <!--<div class="col-xs-4 text-center">-->
                      <!--<a href="#">Friends</a>-->
                    <!--</div>-->
                  <!--</div>-->
                  <!--&lt;!&ndash; /.row &ndash;&gt;-->
                <!--</li>-->
                <!-- Menu Footer-->
                <li class="user-footer">
                  <div class="pull-left">
                    <!--<a href="#" class="btn btn-default btn-flat">profile</a>-->
                    <router-link to="/" class="btn btn-default btn-flat">前台</router-link>
                  </div>
                  <div class="pull-right">
                    <a href="#" class="btn btn-default btn-flat" @click="SignOut">Sign Out</a>
                  </div>
                </li>
              </ul>
            </li>
            <!-- Control Sidebar Toggle Button -->
            <li>
              <a href="#" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
    <!-- Left side column. contains the logo and sidebar -->
    <aside class="main-sidebar">
      <!-- sidebar: style can be found in sidebar.less -->
      <section class="sidebar">
        <!-- Sidebar user panel (optional) -->
        <div class="user-panel">
          <div class="pull-left image">
            <img src="../assets/minren.jpg" class="img-circle" alt="User Image">
          </div>
          <div class="pull-left info">
            <p>Welcome</p>
            <!-- Status -->
            <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
          </div>
        </div>
        <!-- search form (Optional) -->
        <form action="#" method="get" class="sidebar-form">
          <div class="input-group">
            <input type="text" name="q" class="form-control" placeholder="Search...">
            <span class="input-group-btn">
              <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i>
              </button>
            </span>
          </div>
        </form>
        <!-- /.search form -->
        <!-- Sidebar Menu -->
        <ul class="sidebar-menu" data-widget="tree" id="nky">
          <li class="header">HEADER</li>
           <!--Optionally, you can add icons to the links-->
          <li class="active"><router-link to="/blogmgr" id="firstActive"><i class="fa fa-list"></i> <span>管理博客</span></router-link></li>
          <!-- <li><router-link to="/addblog"><i class="fa fa-file-text-o"></i> <span>发布博客</span></router-link></li> -->
          <!-- <li><router-link to="/profile"><i class="fa fa-user"></i><span>个人资料</span></router-link></li> -->
        </ul>
        <!-- /.sidebar-menu -->
      </section>
      <!-- /.sidebar -->
    </aside>
    <!-- Content Wrapper. Contains page content -->
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <router-view></router-view>
      <!-- /.content -->
    </div>
    <!-- /.content-wrapper -->
    <!-- Main Footer -->
    <footer class="main-footer">
      <!-- To the right -->
      <div class="pull-right hidden-xs">
        <b> >_ </b>
      </div>
      <!-- Default to the left -->
      <strong>Copyright &copy; 2018 <a href="https://github.com/HuangGengWei">HuangGengWei</a>.</strong>
    </footer>
    <!-- Control Sidebar -->
    <aside class="control-sidebar control-sidebar-dark">
      <!-- Create the tabs -->
      <ul class="nav nav-tabs nav-justified control-sidebar-tabs">
        <li class="active"><a href="#control-sidebar-home-tab" data-toggle="tab"><i class="fa fa-home"></i></a></li>
        <li><a href="#control-sidebar-settings-tab" data-toggle="tab"><i class="fa fa-gears"></i></a></li>
      </ul>
      <!-- Tab panes -->
      <div class="tab-content">
        <!-- Home tab content -->
        <div class="tab-pane active" id="control-sidebar-home-tab">
          <h3 class="control-sidebar-heading">Recent Activity</h3>
          <ul class="control-sidebar-menu">
            <li>
              <a href="javascript:;">
                <i class="menu-icon fa fa-birthday-cake bg-red"></i>

                <div class="menu-info">
                  <h4 class="control-sidebar-subheading">Langdon's Birthday</h4>

                  <p>Will be 23 on April 24th</p>
                </div>
              </a>
            </li>
          </ul>
          <!-- /.control-sidebar-menu -->
          <h3 class="control-sidebar-heading">Tasks Progress</h3>
          <ul class="control-sidebar-menu">
            <li>
              <a href="javascript:;">
                <h4 class="control-sidebar-subheading">
                  Custom Template Design
                  <span class="pull-right-container">
                    <span class="label label-danger pull-right">70%</span>
                  </span>
                </h4>

                <div class="progress progress-xxs">
                  <div class="progress-bar progress-bar-danger" style="width: 70%"></div>
                </div>
              </a>
            </li>
          </ul>
          <!-- /.control-sidebar-menu -->

        </div>
        <!-- /.tab-pane -->
        <!-- Stats tab content -->
        <div class="tab-pane" id="control-sidebar-stats-tab">Stats Tab Content</div>
        <!-- /.tab-pane -->
        <!-- Settings tab content -->
        <div class="tab-pane" id="control-sidebar-settings-tab">
          <form method="post">
            <h3 class="control-sidebar-heading">General Settings</h3>

            <div class="form-group">
              <label class="control-sidebar-subheading">
                Report panel usage
                <input type="checkbox" class="pull-right" checked>
              </label>

              <p>
                Some information about this general settings option
              </p>
            </div>
            <!-- /.form-group -->
          </form>
        </div>
        <!-- /.tab-pane -->
      </div>
    </aside>
    <!-- /.control-sidebar -->
    <!-- Add the sidebar's background. This div must be placed
    immediately after the control sidebar -->
    <div class="control-sidebar-bg"></div>
  </div>
</template>
<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    SignOut: function () {
      this.$axios({
        method: 'post',
        url: '/api/ApiUser/LoginOut'
      }).then(response => {
        let data = response.data
        if (data.STS === 'OK') {
          // this.$store.commit('mutationsChangeLoginStatus',false);
          this.$router.push({path: './login'})
        }
      }).catch(function (err) {
        console.log(err)
      })
    }
  },
  mounted () {
    document.getElementById('firstActive').click() // 既触发了a标签的点击事件，又触发了页面跳转
    $(function () {
      $('#nky li').click(function () {
        // 把之前已有的active去掉
        $('.active').removeClass('active')
        // 当前点击的li加上class
        $(this).addClass('active')
      })
    })

    $(window).resize(function () {
      // 获取浏览器窗口高度
      var winHeight = 0
      if (window.innerHeight) { winHeight = window.innerHeight } else if ((document.body) && (document.body.clientHeight)) { winHeight = document.body.clientHeight }
      // 通过深入Document内部对body进行检测，获取浏览器窗口高度
      if (document.documentElement && document.documentElement.clientHeight) { winHeight = document.documentElement.clientHeight }
      // DIV高度为浏览器窗口的高度
      document.getElementById('app').style.height = winHeight + 'px'
      // DIV高度为浏览器窗口高度的一半
      // document.getElementById("app").style.height= winHeight/2 +"px";
    })
  }
}

</script>
