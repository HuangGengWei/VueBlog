import Vue from 'vue'
import Router from 'vue-router'
import admin from '@/components/admin'
import blogmgr from '@/components/blogmgr'
import addblog from '@/components/addblog'
import login from '@/components/login'
import profile from '@/components/profile'
import index from '@/components/index'
import view from '@/components/view'
import bloglist from '@/components/bloglist'
import aboutme from '@/components/aboutme'
import image from '@/components/image'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/admin',
      name: 'admin',
      component: admin,
      children:[
        { path: '/blogmgr', component: blogmgr},
        { path: '/addblog', component: addblog},
        { path: '/profile', component: profile},
      ]
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
        {path:'/bloglist',component:bloglist},
        {path:'/view',component:view},
        {path:'/image',component:image},
        {path:'/aboutme',component:aboutme}
      ]
    },

  ]
})

