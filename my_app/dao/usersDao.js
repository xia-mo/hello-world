const mongoose = require("mongoose");

//用户登录
module.exports.login = async (user) => {
    const { phone, password } = user
    return await mongoose.model("usersModel").find({ phone: phone, password: password })
};

// 注册
module.exports.register = async user => await mongoose.model("usersModel").create(user);

//全部获取
module.exports.getUsers = async () => await mongoose.model("usersModel").find();

// 分页获取用户数据
module.exports.getUsersByPage = async ({ currentPage, pageSize }) => {
    //总数据
    const user = await mongoose.model("usersModel").find();
    // 获取总条数
    const totalCount = await mongoose.model("usersModel").countDocuments();
    // 获取总页数
    const totalPages = Math.ceil(totalCount / pageSize);
    // 获取数据
    const users = await mongoose.model("usersModel")
        .find()
        .skip((currentPage - 1) * pageSize)
        .limit(pageSize - 0);
    return {
        currentPage, pageSize, totalCount, totalPages, users, user
    }
}

//删除
module.exports.deletes = async (id) => {
    const data = await mongoose.model("usersModel").deleteOne(id);
    return data;
}

//修改
module.exports.revise = async (user) => {
    const { _id, username, name, phone, image } = user;
    const data = await mongoose.model("usersModel").update({ _id }, { username });
    return data;
}

// 验证用户是否已经存在
module.exports.validate = async (username) => await mongoose.model("usersModel").find(username);