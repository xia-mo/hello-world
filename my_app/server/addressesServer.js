const {addAddresses, getAddresses} = require("../dao/addressesDao");

module.exports.addAddresses = async addresses => {
    const data = await addAddresses(addresses);
    if (data._id) {
        return true;
    }
    return false;
}


//全部获取
module.exports.getAddresses = async () => await getAddresses();