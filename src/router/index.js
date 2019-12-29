import Vue from 'vue'
import Router from 'vue-router'

import index from '@/components/index'

// import admin from '@/components/admin'
const admin = r => require.ensure([], () => r(require('@/components/admin')), 'admin')

// import blogmgr from '@/components/blogmgr'
const blogmgr = r => require.ensure([], () => r(require('@/components/blogmgr')), 'blogmgr')

// import login from '@/components/login'
const login = r => require.ensure([], () => r(require('@/components/login')), 'login')

// const index = r => require.ensure([],()=>r(require('@/components/index')),'index')
// import view from '@/components/view'
const view = r => require.ensure([], () => r(require('@/components/view')), 'view')

// import bloglist from '@/components/bloglist'
const bloglist = r => require.ensure([], () => r(require('@/components/bloglist')), 'bloglist')

// import aboutme from '@/components/aboutme'
const aboutme = r => require.ensure([], () => r(require('@/components/aboutme')), 'aboutme')

// import image from '@/components/image'
const image = r => require.ensure([], () => r(require('@/components/image')), 'image')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/admin',
      name: 'admin',
      component: admin,
      children: [
        { path: '/blogmgr', component: blogmgr }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/',
      name: 'index',
      component: index,
      children: [
        {path: '/bloglist', component: bloglist},
        {path: '/view', component: view},
        {path: '/image', component: image},
        {path: '/aboutme', component: aboutme}
      ]
    }

  ]
})
