const { deletes, addAdmins, getAdminsByPage, getAdminByPage, revise, revises, login, register, validate,validateB } = require("../dao/adminsDao");

//删除
module.exports.deletes = async id => {
    const data = await deletes(id);
    if (data.n == 1) {
        return true;//已删除
    } else {
        return false;
    }
}

module.exports.addAdmins = async admins => {
    const data = await addAdmins(admins);
    if (data._id) {
        return true;
    }
    return false;
}

//获取申请中的管理员信息
module.exports.getAdminsByPage = async (admins) => await getAdminsByPage(admins);

//获取管理员信息
module.exports.getAdminByPage = async (admins) => await getAdminByPage(admins);

//修改申请状态
module.exports.revise = async admins => {
    const data = await revise(admins);
    if (data.n == 1) {
        return true;//已修改
    } else {
        return false;
    }
}

//修改
module.exports.revises = async admins => {
    const data = await revises(admins);
    if (data.n == 1) {
        return true;//已修改
    } else {
        return false;
    }
}

//管理员登录
module.exports.login = async datas => {
    const data = await login(datas);
    if (data.length > 0) {
        return [true, data[0].status, data[0].position, data[0]._id,data[0].name];
    }
    return false;
};

//注册
module.exports.register = async admins => {
    const data = await register(admins);
    if (data._id) {
        return true;
    }
    return false;
}

//验证管理员是否存在
module.exports.validate = async datas1 => {
    const data = await validate(datas1);
    if (data.length > 0) {
        return [true, data[0].account]
    }
    else {
        return false
    }
}
//验证平台管理员是否存在
module.exports.validateB = async datas1 => {
    const data = await validateB(datas1);
    if (data.length > 0) {
        return [true, data[0].account]
    }
    else {
        return false
    }
}