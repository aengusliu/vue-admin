import { createRouter, createWebHashHistory } from "vue-router";
// views下面的一个vue文件对应一个路由
// 引入组件方式1
  // 引入登录组件
import Login from "../views/Login.vue"  

// 定义一些路由
const routes = [
  {
    path: "/",
    name: "Main",
    component: () => import("../views/Main"),
    // 重定向
    redirect: "/login"
  },
  // 每个路由都映射到一个组件
  {
    path: "/login",
    name: "Login",
    component: Login,
  }
];

// 创建路由器实例，并将定义的路由放进去
const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

export default router;
