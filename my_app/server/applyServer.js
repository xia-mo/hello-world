const { addApply, getApplyByPage, revise, deletes, getApply, queryApply } = require("../dao/applyDao");

module.exports.addApply = async apply => {
    const data = await addApply(apply);
    if (data._id) {
        return true;
    }
    return false;
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

//全部获取
module.exports.getApplyByPage = async (apply) => await getApplyByPage(apply);

//修改申请状态
module.exports.revise = async apply => {
    const data = await revise(apply);
    if (data.n == 1) {
        return true;//已修改
    } else {
        return false;
    }
}

//全部获取申请
module.exports.getApply = async (adminId) => await getApply(adminId);

//查询申请是否存在
module.exports.queryApply = async datas => {
    const data = await queryApply(datas);
    if (data.length > 0) {
        return true;
    }
    return false;
}
