// 购物车集合（shoppingCart）
const mongoose = require("mongoose");

const shoppingCartSchame = new mongoose.Schema({
    userId: {// 订单所属用户 id
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usersModel'
    },
    goodsId: {// 商品 id
        type: mongoose.Schema.Types.ObjectId,
        ref: 'goodsModel'
    },
    spec: String,//规格
    number: Number,//数量
    selected: Boolean//是否选择
})

mongoose.model("shoppingCartModel", shoppingCartSchame, "shoppingCart");
