const mongoose = require("mongoose");
//添加
module.exports.addApply = async apply => await mongoose.model("applyModel").create(apply);

// 分页获取数据
module.exports.getApplyByPage = async ({ currentPage, pageSize, status, type }) => {
    // 获取总条数
    const totalCount = await mongoose.model("applyModel").countDocuments();
    // 获取总页数
    const totalPages = Math.ceil(totalCount / pageSize);

    // 获取查询的总条数
    const arrData = await mongoose.model("applyModel").find({ status: status, type: type })
    const length = await arrData.length;

    // 获取数据
    const apply = await mongoose.model("applyModel")
        .find({ status: status, type: type })
        .populate("adminId")
        .populate("shopId")
        .skip((currentPage - 1) * pageSize)
        .limit(pageSize - 0);
    return {
        currentPage, pageSize, totalCount, totalPages, apply, length
    }
}

//修改申请状态
module.exports.revise = async (apply) => {
    const { status, applyId } = apply;
    const data = await mongoose.model("applyModel").update({ _id: applyId }, { status });
    return data;
}

//删除
module.exports.deletes = async (_id) => {
    const data = await mongoose.model("applyModel").deleteOne(_id);
    return data;
}

//全部获取申请
module.exports.getApply = async (admin) => {
    const { adminId, type } = admin
    return await mongoose.model("applyModel").find({ adminId: adminId, type: type }).populate('adminId').populate('shopId');
}
//查询申请是否存在
module.exports.queryApply = async (data) => {
    const { type, status, adminId, shopId } = data
    return await mongoose.model("applyModel").find({ type: type, status: status, adminId: adminId, shopId: shopId });
}