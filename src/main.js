// 引入 createApp方法用于注册全局组件
import { createApp } from "vue";
// 引入 App.vue
import App from "./App.vue";
// 引入路由器
import router from "./router";
// 状态仓库
import store from "./store";
// 引入Element Plus
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
// 国际化
import locale from 'element-plus/lib/locale/lang/zh-cn'
import 'dayjs/locale/zh-cn'

// createApp(App) => 注册App.vue为全局组件
// .use(store) => 使用状态仓库
// .use(router) => 整个vue实例都支持引入的路由器实例
// .use(ElementPlus) => 整个vue实例都支持Element UI 模板的使用
// .mount("#app") => 整个vue实例都挂载到 public/index.html 文件上
createApp(App).use(store).use(router).use(ElementPlus, {locale}).mount("#app");
