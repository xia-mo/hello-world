const { addShops, getShopsByPage, deletes,upData,getShops } = require("../dao/shopsDao");

module.exports.addShops = async shops => {
    const data = await addShops(shops);
    if (data._id) {
        return [true,data._id];
    }
    return false;
}

//修改m门店
module.exports.upData = async shops => {
    const data = await upData(shops);
    if (data.n == 1) {
        return true;//已修改
    } else {
        return false;
    }
}

//删除
module.exports.deletes = async id => {
    const data = await deletes(id);
    if (data.n == 1) {
        return true;//已删除
    } else {
        return false;
    }
}
//全部获取门店
module.exports.getShops = async (adminId) => await getShops(adminId);
//全部获取
module.exports.getShopsByPage = async (Shops) => await getShopsByPage(Shops);