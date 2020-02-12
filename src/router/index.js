import Vue from 'vue'
import Router from 'vue-router'
//引入一级路由文件
// import Index from '@/components/index'
// import Login from '@/components/login'
// import Register from '@/components/register'
// import Detail from '@/components/detail'
//路由懒加载
const Index=()=>import('../components/index')
const Login=()=>import('../components/login')
const Register=()=>import('../components/register')
const Detail=()=>import('../components/detail')
//引入二级路由文件
import Home from '@/components/pages/home'
import Sort from '@/components/pages/sort'
import Car from '@/components/pages/car'
import Mine from '@/components/pages/mine'



Vue.use(Router)

const router=new Router({
  routes: [
    {
      path: '/index',
      component: Index,
      children: [
        {
          path: '/home',
          component:Home
        },
        {
          path: '/sort',
          component: Sort
        },
        {
          path: '/car',
          component: Car
        },
        {
          path: '/mine',
          component: Mine
        },
        {
          path:'*',
          redirect:'/home'
        }
      ]
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/detail',
      component: Detail
    },
    {
      path:'*',
      redirect:'/home'
    }
  ],
 
})
export default router
