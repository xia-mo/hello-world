const mongoose = require("mongoose");

//添加
module.exports.addOrders = async orders => await mongoose.model("ordersModel").create(orders);

//后台删除订单
module.exports.delOrders = async _id => await mongoose.model("ordersModel").deleteOne(_id);

//后台修改订单
// module.exports.changeOrders = async _id => await mongoose.model("ordersModel").update({_id},{});
//修改付款状态
module.exports.alterOrders = async id => {
    const { _id, state, time } = id;
    return await mongoose.model("ordersModel").update({ _id }, { state, time });
}

module.exports.changeOrders = async ({ _id, state }) => {
    return await mongoose.model("ordersModel").updateOne({ _id }, { state });           //??????????
}

//获取
module.exports.getOrders = async (data) => {
    const { state, userId } = data;
    console.log(data);
    return await mongoose.model("ordersModel")
        .find({ state: state, userId: userId })
        .populate({
            path: "orderGoodsId",
            populate: {
                path: "goodId",
            }
        })
        .populate("userId");
}

module.exports.getOrdersByPage = async ({ currentPage, pageSize }) => {
    //总数据
    const total = await mongoose.model("ordersModel").find();
    // 获取总条数
    const totalCount = await mongoose.model("ordersModel").countDocuments();
    // 获取总页数
    const totalPages = Math.ceil(totalCount / pageSize);
    // 获取每页数据
    const pageMsg = await mongoose.model("ordersModel")
        .find()
        .populate({
            path: "orderGoodsId",
            populate: {
                path: "goodId",
            }
        })
        .populate("userId")
        .skip((currentPage - 1) * pageSize)
        .limit(pageSize - 0)
    return {
        totalCount, totalPages, pageMsg, total
    }
}


