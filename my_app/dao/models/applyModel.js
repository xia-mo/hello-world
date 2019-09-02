// 申请集合 apply
const mongoose = require("mongoose");

const applySchame = new mongoose.Schema({
	type: String, // 申请类型（门店管理员申请/新门店申请/注销门店申请）
	status: Number, // 申请状态（申请中/已通过/未通过）
	adminId: {// 门店管理员 id
        type: mongoose.Schema.Types.ObjectId,
        ref: 'adminsModel'
    }, 
	shopId: {// 门店 id
        type: mongoose.Schema.Types.ObjectId,
        ref: 'shopsModel'
    }, 
})

mongoose.model("applyModel", applySchame, "apply");
