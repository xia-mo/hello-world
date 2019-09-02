const mongoose = require("mongoose");
//添加
module.exports.addOrderGoods = async orderGoods => await mongoose.model("orderGoodsModel").create(orderGoods);

//获取
module.exports.getOrderGoods = async () => await mongoose.model("orderGoodsModel").find();