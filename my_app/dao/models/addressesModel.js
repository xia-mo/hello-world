// 收货地址集合（addresses） 
const mongoose = require("mongoose");

const addressesSchame = new mongoose.Schema({
	name: String, // 收件人名称
	phone: String, // 收件人联系电话
	address: String, // 收件人地址
	userId: {// 所属用户 id
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usersModel'
    }, 
})

mongoose.model("addressesModel", addressesSchame, "addresses");
