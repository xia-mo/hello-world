// 分配商品到门店的
const mongoose = require("mongoose");

const allotsSchame = new mongoose.Schema({
	adminId: {// 门店管理员 id
        type: mongoose.Schema.Types.ObjectId,
        ref: 'adminsModel'
    }, 
	shopId: {// 门店 id
        type: mongoose.Schema.Types.ObjectId,
        ref: 'shopsModel'
    }, 
    goodsId:{  //商品Id
        type: mongoose.Schema.Types.ObjectId,
        ref: 'goodsModel'
    }
})

mongoose.model("allotsModel", allotsSchame, "allots");
