import Vue from 'vue'
import Vuex from 'vuex'

//vuex进行数据状态管理和操作
Vue.use(Vuex)
import axios from 'axios';
export default new Vuex.Store({
  	// state: {
	// 	orderData: [{
	// 		foods: '',
	// 		price: '',
	// 		add: ''
	// 	}],
	// 	accountData: [{
	// 		nums: '',
	// 		foods: '',
	// 		price: ''
	// 	}],
	//   },
	// getters: {

	// },
  	// mutations: {
	// 	getFoods(state,data){  //action修改数据改变
	// 		state.orderData=data;
	// 	}
  	// },
  	// actions: {
	// 	getFoods(state,data){//获取所有菜品
	// 		axios
	// 			.post("/foods/getFoods",{
	// 			})
	// 			.then(res=>{	
	// 				console.log("123");							
	// 				data.state.orderData=res.data;
	// 				console.log("===store",data.state.orderData);
	// 			})
	// 	}
  	// }
})
