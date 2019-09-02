const { login, register, deletes, getUsers, getUsersByPage, revise, validate } = require("../dao/usersDao");

//用户登录
module.exports.login = async (user) => {
    const data = await login(user);
    if (data.length > 0) {
        return [true,data];
    }
    return false;
};

// 注册
module.exports.register = async user => {
    const data = await register(user);
    if (data._id) {
        return true;
    }
    return false;
}

//全部获取
module.exports.getUsers = async () => await getUsers();

// 分页获取用户数据
module.exports.getUsersByPage = async page => await getUsersByPage(page);

//删除
module.exports.deletes = async id => {
    const data = await deletes(id);
    if (data.n == 1) {
        return true;//已删除
    } else {
        return false;
    }
}

//修改
module.exports.revise = async user => {
    const data = await revise(user);
    if (data.n == 1) {
        return true;//已修改
    } else {
        return false;
    }
}

// 验证用户是否已经存在
module.exports.validate = async (username) => {
    const data = await validate(username);
    if (data.length > 0) {
        return true
    }
    else {
        return false
    }
}