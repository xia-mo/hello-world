const {addShoppingCart, deletes, getShoppingCart, revise, validate } = require("../dao/shoppingCartDao");

// 新增
module.exports.addShoppingCart = async datas => {
    const data = await addShoppingCart(datas);
    if (data._id) {
        return true;
    }
    return false;
}

//获取
module.exports.getShoppingCart = async (data) => await getShoppingCart(data);

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
module.exports.revise = async datas => {
    const data = await revise(datas);
    if (data.n == 1) {
        return true;//已修改
    } else {
        return false;
    }
}

// 验证是否已经存在
module.exports.validate = async (datas) => {
    const data = await validate(datas);
    if (data.length > 0) {
        return true
    }
    else {
        return false
    }
}