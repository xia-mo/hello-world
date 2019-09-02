// 连接数据库
const mongoose = require('mongoose');
const dbURI = 'mongodb://localhost/F60_CWXT';
mongoose.connect(dbURI, { useNewUrlParser: true });
mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + dbURI);
});

require("./models/addressesModel");
require("./models/adminsModel");
require("./models/applyModel");
require("./models/goodsModel");
require("./models/orderGoodsModel");
require("./models/ordersModel");
require("./models/shopsModel");
require("./models/usersModel");
require("./models/allotsModel");
require("./models/shoppingCartModel");




