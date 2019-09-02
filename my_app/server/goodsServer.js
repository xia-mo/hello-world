const { addGoods, getGoods, delGoods, queryGoods, queryGood, modGoods, queryGoodsByPage, getGoodsByPage, addGoodstoShops } = require("../dao/goodsDao");


//新增商品
module.exports.addGoods = async goods => {
    const data = await addGoods(goods);
    if (data._id) {
        return true;
    }
    return false;
}


//全部获取
module.exports.getGoods = async (goods) => await getGoods(goods);

//获取排片列表
module.exports.getGoodsByPage = async page => {
    const data = await getGoodsByPage(page);
    return data;
};

//删除商品
module.exports.delGoods = async _id => {
    const data = await delGoods(_id);
    if (data.ok === 1) {
        return true;
    }
    return false;
}

//修改的id查询
module.exports.queryGoods = async (_id) => await queryGoods(_id);

//更改商品信息
module.exports.modGoods = async goods => {
    console.log("2-1")
    const data = await modGoods(goods);
    if (data.n == 1) {
        console.log("2-2", data)
        return true;
    }
    return false;
};

//类型分页查询
module.exports.queryGoodsByPage = async (_id) => await queryGoodsByPage(_id);

//用户搜索
module.exports.queryGood = async (data) => await queryGood(data);

//商品新增到门店
module.exports.addGoodstoShops = async goods => {
    const data = await addGoodstoShops(goods);
    if (data._id) {
        return true;
    }
    return false;
}