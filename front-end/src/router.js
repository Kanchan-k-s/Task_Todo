import dashboard from './components/dashboard.vue'
import Index from './components/index.vue'
import register from './components/register.vue'
import getTask from './components/getAll.vue'
import allUser from './components/allUser.vue'
import allTask from './components/alltask.vue'
import oneUser from './components/oneUser.vue'
import setting from './components/setting.vue'
import error from './components/error.vue'
import deleteUser from './components/allDeleteUser.vue'

export default[
    {path:'/',component:Index},
    {path:'/login',component:Index},
    {path:'/register',component:register},
    {path:'/dashboard',component:dashboard},
    {path:'/allTask',component:allTask},
    {path:'/allUser',component:allUser},
    {path:'/user/dashboard/:id',component:getTask},
    {path:'/user/:id',component:oneUser},
    {path:'/setting/:id',component:setting},
    {path:'/error',component:error},
    {path:'/deletedUser',component:deleteUser},
    {path:'/*',component:error}
]