import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import "element-ui/lib/theme-chalk/index.css"

Vue.config.productionTip = false;  //消息提示环境为开发者环境,不显示cannot apply update

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
