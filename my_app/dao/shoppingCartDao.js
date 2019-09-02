const mongoose = require("mongoose");

// 新增
module.exports.addShoppingCart = async data => await mongoose.model("shoppingCartModel").create(data);

//全部获取
module.exports.getShoppingCart = async (data) => {
    const { userId } = data;
    return await mongoose.model("shoppingCartModel")
        .find({ userId: userId })
        .populate("goodsId")
        .populate("userId");
}

//删除
module.exports.deletes = async (id) => {
    const data = await mongoose.model("shoppingCartModel").deleteOne(id);
    return data;
}

//修改
module.exports.revise = async (datas) => {
    const { _id, number } = datas;
    const data = await mongoose.model("shoppingCartModel").update({ _id }, { number });
    return data;
}

// 验证是否已经存在
module.exports.validate = async (data) => await mongoose.model("shoppingCartModel").find(data);