const mongoose = require("mongoose");
//添加
module.exports.addShops = async shops => await mongoose.model("shopsModel").create(shops);

// 分页获取数据
module.exports.getShopsByPage = async ({ currentPage, pageSize, admin_Id }) => {
    // 获取总条数
    const totalCount = await mongoose.model("shopsModel").countDocuments();
    // 获取总页数
    const totalPages = Math.ceil(totalCount / pageSize);

    // 获取查询的总条数
    const arrData = await mongoose.model("shopsModel").find({ adminId: admin_Id })
    const length = await arrData.length;

    // 获取数据
    const shops = await mongoose.model("shopsModel")
        .find({ adminId: admin_Id })
        .populate("adminId")
        .skip((currentPage - 1) * pageSize)
        .limit(pageSize - 0);
    return {
        currentPage, pageSize, totalCount, totalPages, shops, length
    }
}

//删除
module.exports.deletes = async (_id) => {
    const data = await mongoose.model("shopsModel").deleteOne(_id);
    return data;
}

//获取门店
module.exports.getShops = async (adminId) => {
    return await mongoose.model("shopsModel").find(adminId).populate('adminId');
}

//修改门店
module.exports.upData = async (shops) => {
    const { _id, num, name, address, telephone, date, type, desc } = shops;
    const data = await mongoose.model("shopsModel").update({ _id }, {
        num, name, address, telephone, date, type, desc
    });
    return data;
}