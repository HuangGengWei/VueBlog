import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import starter from '@/components/starter'
import BlogMgr from '@/components/BlogMgr'
import AddBlog from '@/components/AddBlog'
import login from '@/components/login'
import Profile from '@/components/Profile'
import index from '@/components/index'
import View from '@/components/View'
import BlogList from '@/components/BlogList'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/starter',
      name: 'starter',
      component: starter,
      children:[
        { path: '/BlogMgr', component: BlogMgr},
        { path: '/AddBlog', component: AddBlog},
        { path: '/Profile', component: Profile},
      ]
    },
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:'/login',
      name:'login',
      component:login
    },
    {
      path:'/',
      name:'index',
      component:index,
      children:[
        {path:'/BlogList',component:BlogList},
        {path:'/View',component:View},
      ]
    }
  ]
})

