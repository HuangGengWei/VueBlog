import Vue from 'vue'
import Router from 'vue-router'

// import admin from '@/components/admin'
const admin = r => require.ensure([],()=>r(require('@/components/admin')),'admin')

// import blogmgr from '@/components/blogmgr'
const blogmgr = r => require.ensure([],()=>r(require('@/components/blogmgr')),'blogmgr')

// import addblog from '@/components/addblog'
const addblog = r => require.ensure([],()=>r(require('@/components/addblog')),'addblog')

//import login from '@/components/login'
const login = r => require.ensure([],()=>r(require('@/components/login')),'login')

// import profile from '@/components/profile'
const profile = r => require.ensure([],()=>r(require('@/components/profile')),'profile')

import index from '@/components/index'
//const index = r => require.ensure([],()=>r(require('@/components/index')),'index')

//import view from '@/components/view'
const view = r => require.ensure([],()=>r(require('@/components/view')),'view')

//import bloglist from '@/components/bloglist'
const bloglist = r => require.ensure([],()=>r(require('@/components/bloglist')),'bloglist')

//import aboutme from '@/components/aboutme'
const aboutme = r => require.ensure([],()=>r(require('@/components/aboutme')),'aboutme')

// import image from '@/components/image'
const image = r => require.ensure([],()=>r(require('@/components/image')),'image')
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

