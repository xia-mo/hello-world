// 门店集合（shops）
const mongoose = require("mongoose");

const shopsSchame = new mongoose.Schema({
	name: String, // 名称
	address: String, // 地址
	telephone: String, // 电话
	date:String, //日期
	type:Array,  //宠物类型
	desc: String, // 门店描述
	adminId: {  // 所属门店管理员 id
        type: mongoose.Schema.Types.ObjectId,
        ref: 'adminsModel'
    }
})

mongoose.model("shopsModel", shopsSchame, "shops");