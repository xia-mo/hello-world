// 用户集合（users） 
const mongoose = require("mongoose");

const usersSchame = new mongoose.Schema({
	username: String, // 用户名
	password: String, // 密码
	name: String, // 真实姓名
	phone: String, // 联系电话
	image: String // 用户头像
})

mongoose.model("usersModel", usersSchame, "users");
