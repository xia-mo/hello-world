const mongoose = require("mongoose");

//商品新增到门店
module.exports.allotGoodstoShops = async allots => {
    return  await mongoose.model("allotsModel").create(allots);
}
