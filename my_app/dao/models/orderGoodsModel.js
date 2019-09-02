// 订单商品（orderGoods）
const mongoose = require("mongoose");

const orderGoodsSchame = new mongoose.Schema({
	goodId: {// 所属订单的商品 id
        type: mongoose.Schema.Types.ObjectId,
        ref: 'goodsModel'
    }, 
	count: String, // 当前商品数量
})

mongoose.model("orderGoodsModel", orderGoodsSchame, "orderGoods");
