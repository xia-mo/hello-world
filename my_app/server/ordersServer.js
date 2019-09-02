const { addOrders, getOrders, getOrdersByPage, delOrders, changeOrders, alterOrders } = require("../dao/ordersDao");

module.exports.addOrders = async orders => {
    const data = await addOrders(orders);
    if (data._id) {
        return [true,data._id];
    }
    return false;
}

// 分页获取用户数据
module.exports.getOrdersByPage = async page => await getOrdersByPage(page);

//全部获取
module.exports.getOrders = async (data) => await getOrders(data);

//后台删除订单
module.exports.delOrders = async _id => {
    const data = await delOrders(_id);
    console.log(data);
    if (data.n === 1) {
        return true;
    }
    return false;
}
//后台修改订单
module.exports.changeOrders = async _id => {
    const data = await changeOrders(_id);
    console.log(data);
    if (data.n === 1) {
        return true;
    }
    return false;
}
//后台修改订单
module.exports.alterOrders = async _id => {
    const data = await alterOrders(_id);
    if (data.n === 1) {
        return true;
    }
    return false;
}