const mongoose = require("mongoose");
//添加
module.exports.addGoods = async goods => await mongoose.model("goodsModel").create(goods);

//获取
module.exports.getGoods = async (goods) => await mongoose.model("goodsModel").find(goods);

//分页获取所有数据
module.exports.getGoodsByPage = async ({ currentPage, pageSize,adminId }) => {
    // // 获取总条数
    const totalCount = await mongoose.model("goodsModel").countDocuments();
    // 获取数据
    const goods = await mongoose.model("goodsModel").find({adminId:adminId})
        .populate("adminId")
        .skip((currentPage - 1) * pageSize)
        .limit(pageSize - 0);
    return {
        currentPage,
        pageSize,
        totalCount,
        goods,
    }
}
//删除
module.exports.delGoods = async _id => await mongoose.model("goodsModel").deleteOne(_id);


//修改商品查询id
module.exports.queryGoods = async (_id) => {
    return await mongoose.model("goodsModel").find(_id)
}


//更改
module.exports.modGoods = async goods => {
    console.log("3-1", goods)
    const { _id, name, classify, pet, price, weight, production, shelfLife, producer, images, desc } = goods.params;
    const data = await mongoose.model("goodsModel").update({ _id: _id }, { name, classify, pet, price, weight, production, shelfLife, producer, images, desc });
    console.log("3-2", data)
    return data;
};


//类型分页查询
module.exports.queryGoodsByPage = async ({ currentPage, pageSize, name, classify, pet }) => {
    // // 获取总条数
    const totalCount = await mongoose.model("goodsModel").countDocuments();
    // 获取排片数据
    const goods = await mongoose.model("goodsModel").find({
        $or: [
            { name: name },
            { classify: classify },
            { pet: pet }
        ]
    })
        // .populate("cinemaId").populate("theaterId").populate("movieId")
        .skip((currentPage - 1) * pageSize)
        .limit(pageSize - 0);
    return {
        currentPage,
        pageSize,
        totalCount,
        goods,
    }
}
//用户搜索
module.exports.queryGood= async ({ name }) => {
    // 获取数据
    const goods = await mongoose.model("goodsModel").find({$or: [{ name:{$regex:name} }]})
    return goods
}

//商品新增到门店
module.exports.addGoodstoShops = async goods => await mongoose.model("goodsModel").create(goods);
