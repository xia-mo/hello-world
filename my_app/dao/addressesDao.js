const mongoose = require("mongoose");
//添加
module.exports.addAddresses = async addresses => await mongoose.model("addressesModel").create(addresses);

//获取
module.exports.getAddresses = async () => await mongoose.model("addressesModel").find();