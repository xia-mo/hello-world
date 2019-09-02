// 管理员集合（admins） 
const mongoose = require("mongoose");

const adminsSchame = new mongoose.Schema({
	account: String, // 账号
	password: String, // 密码
	name: String, // 姓名
	age: String, // 年龄
	gender: String, // 性别
	phone: String, // 手机号
	position: String, // 职位（平台管理员/门店管理员）
	status: String // 状态（申请中/已通过/未通过）
})

mongoose.model("adminsModel", adminsSchame, "admins");
