const mongoose = require("mongoose");

//删除
module.exports.deletes = async (_id) => {
    const data = await mongoose.model("adminsModel").deleteOne(_id);
    return data;
}

//添加
module.exports.addAdmins = async admins => await mongoose.model("adminsModel").create(admins);

// 分页获取申请中的管理员信息
module.exports.getAdminsByPage = async ({ currentPage, pageSize, position, status }) => {
    // 获取总条数
    const totalCount = await mongoose.model("adminsModel").countDocuments();
    // 获取总页数
    const totalPages = Math.ceil(totalCount / pageSize);

    // 获取查询的总条数
    const arrData = await mongoose.model("adminsModel").find({ position: position, status: status })
    const length = await arrData.length;

    // 获取数据
    const admins = await mongoose.model("adminsModel")
        .find({ position: position, status: status })
        .skip((currentPage - 1) * pageSize)
        .limit(pageSize - 0);
    return {
        currentPage, pageSize, totalCount, totalPages, admins, length
    }
}
// 分页获取管理员信息
module.exports.getAdminByPage = async ({ currentPage, pageSize, position }) => {
    // 获取总条数
    const totalCount = await mongoose.model("adminsModel").countDocuments();
    // 获取总页数
    const totalPages = Math.ceil(totalCount / pageSize);
    // 获取查询的总条数
    const arrData = await mongoose.model("adminsModel").find({ position: position })
    const length = await arrData.length;

    // 获取数据
    const admins = await mongoose.model("adminsModel")
        .find({ position: position })
        .skip((currentPage - 1) * pageSize)
        .limit(pageSize - 0);
    return {
        currentPage, pageSize, totalCount, totalPages, admins, length
    }
}

//修改申请状态
module.exports.revise = async (admins) => {
    const { status, adminsId } = admins;
    const data = await mongoose.model("adminsModel").update({ _id: adminsId }, { status });
    return data;
}

//修改
module.exports.revises = async (admins) => {
    const { _id, account, password, name, age, gender, phone, position, status } = admins;
    const data = await mongoose.model("adminsModel").update({ _id: _id }, { account, password, name, age, gender, phone, position, status });
    return data;
}

//管理员登录
module.exports.login = async datas => {
    const { account, password } = datas;
    return await mongoose.model("adminsModel").find({ account: account, password: password });
}

//门店管理员注册
module.exports.register = async admins => await mongoose.model("adminsModel").create(admins);

//验证管理员是否存在
module.exports.validate = async datas1 => {
    const { account } = datas1;
    return await mongoose.model("adminsModel").find({ account: account });
}
//验证平台管理员是否存在
module.exports.validateB = async datas1 => {
    const { account, position } = datas1;
    return await mongoose.model("adminsModel").find({ account: account, position: position });
}