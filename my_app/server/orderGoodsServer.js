const { addOrderGoods, getOrderGoods } = require("../dao/orderGoodsDao");

module.exports.addOrderGoods = async orderGoods => {
    const data = await addOrderGoods(orderGoods);
    if (data._id) {
        return [true, data._id];
    }
    return false;
}


//全部获取
module.exports.getOrderGoods = async () => await getOrderGoods();