// 订单集合（orders）
const mongoose = require("mongoose");

const ordersSchame = new mongoose.Schema({
    userId: {// 订单所属用户 id
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usersModel'
    },
    orderGoodsId: {// 订单商品 id
        type: mongoose.Schema.Types.ObjectId,
        ref: 'orderGoodsModel'
    },
    time: String, // 下单时间
    state: String, // 订单状态（待付款/待收货/待评价...）
})

mongoose.model("ordersModel", ordersSchame, "orders");
