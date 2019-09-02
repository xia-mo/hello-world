import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/login.vue'
import Register from './views/register.vue'



Vue.use(Router)

export default new Router({
	routes: [
	
		{
			path: '/login',
			name: 'login',
			alias:"/",//匹配路径
			component: Login
		},
		{
			path: '/register',
			name: 'register',
			component: Register
		},
		{   //门店管理系统
			path: '/System',
			name: 'System',
			props:true,
			component: () => import('./views/System.vue'),
			beforeEnter: (to, from, next) => {//路由独享守卫
                if (localStorage.adminId) {
                    next();
                } else {
                    alert('请先登录。');
                    next('/login');
                } 
            },
			children: [
				{
					path: "home",
					name:"home",
					component: () => import("./components/System/home.vue")
				},
				{
					path: "addStore",
					component: () => import('./components/System/addStore.vue')
				},
				{
					path: "storeList", 
					component: () => import('./components/System/storeList.vue')
				},
				{
					path: "addGoods",
					component: () => import('./components/System/addGoods.vue')
				},
				{
					path: "goodsList",
					component: () => import('./components/System/goodsList.vue')
				},
				{
					path: "orderList",
					component: () => import('./components/System/orderList.vue')
				},
				{
					path: "applyLimit",
					component: () => import('./components/System/applyLimit.vue')
				},

			]
		},
		{   //平台管理系统
			path: '/platSystem',
			name: 'platSystem',
			props:true,
			component: () => import('./views/platSystem.vue'),
			beforeEnter: (to, from, next) => {//路由独享守卫
                if (localStorage.admin_Id) {
                    next();
                } else {
                    alert('请先登录。');
                    next('/login');
                } 
            },
			children: [
				{
					path: "home",
					name:"home",
					component: () => import("./components/System/home.vue")
				},
				{
					path: "accountApply",
					component: () => import('./components/platSystem/accountApply.vue')
				},
				{
					path: "platAdmins", 
					component: () => import('./components/platSystem/platAdmins.vue')
				},
				{
					path: "storeAdmins",
					component: () => import('./components/platSystem/storeAdmins.vue')
				},
				{
					path: "addstore",
					component: () => import('./components/platSystem/addstore.vue')
				},
				{
					path: "storeApply",
					component: () => import('./components/platSystem/storeApply.vue')
				},
				{
					path: "storeDelete",
					component: () => import('./components/platSystem/storeDelete.vue')
				},
				{
					path: "storeDistribute",
					component: () => import('./components/platSystem/storeDistribute.vue')
				},
				{
					path: "storeList",
					component: () => import('./components/platSystem/storeList.vue')
				},
				{
					path: "usersList",
					component: () => import('./components/platSystem/usersList.vue')
				},

			]
		},

	]
})