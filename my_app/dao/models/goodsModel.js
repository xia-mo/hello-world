// 商品集合（goods） 
const mongoose = require("mongoose");

const goodsSchame = new mongoose.Schema({
	name: String, // 名称
	classify: String, // 商品种类（主粮/零食/玩具/日常用品/药品...）
	pet: String, // 适用宠物（全部/猫/狗/其他）
	price: String, // 价格
	weight: String, // 重量
	production: String, // 生产日期
	shelfLife: String, // 保质期
	producer: String, // 产地
	images: Array, // 商品图片（列表图/详情图...）
	desc: String, // 商品描述
	adminId: {// 所属门店管理员 id
        type: mongoose.Schema.Types.ObjectId,
        ref: 'adminsModel'
    }, 
	shopId: { // 所属门店 id
        type: mongoose.Schema.Types.ObjectId,
        ref: 'shopsModel'
    }
})

mongoose.model("goodsModel", goodsSchame, "goods");
