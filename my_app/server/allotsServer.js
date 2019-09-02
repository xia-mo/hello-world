const {allotGoodstoShops} = require("../dao/allotsDao");

;

//商品新增到门店
module.exports.allotGoodstoShops = async allots => {
    const data = await allotGoodstoShops(allots);
    if (data._id) {
        return true;
    }
    return false;
}