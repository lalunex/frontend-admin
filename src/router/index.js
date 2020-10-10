// import Vue from 'vue'
// import VueRouter from 'vue-router'

const Comments = () => import('views/Comments')
const Article = () => import('views/Article')
const Friends = () => import('views/Friends')
const Login = () => import('views/Login')
const Contact = () => import('views/Contact')
const ReEdit = () => import('views/ReEdit')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/admin'
  },
  {
    path: '/admin',
    name: 'Login',
    component: Login
  },
  {
    path: '/article',
    name: 'Article',
    component: Article
  },
  {
    path: '/friends',
    name: 'Friends',
    component: Friends
  },
  {
    path: '/comments',
    name: 'Comments',
    component: Comments
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/reedit',
    name: 'ReEdit',
    component: ReEdit
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
