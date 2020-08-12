import Vue from 'vue'
import VueRouter from "vue-router";

//1.安装插件
Vue.use(VueRouter)

const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Cart = () => import('../views/cart/Cart')
const Profile = () => import('../views/profile/Profile')

export default new VueRouter({
  mode:"history",//路径不会出现#号
  routes: [
    {
      path:'',
      redirect:'/home'
    },
    {
      path: '/home',
      component: Home
    },
    {
      path:'/category',
      component: Category
    },
    {
      path:'/cart',
      component: Cart
    },
    {
      path:'/profile',
      component: Profile
    }
  ]
})
