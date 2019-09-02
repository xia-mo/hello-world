var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//=================================================== 
var indexRouter = require('./routes/index');
var addressesRouter = require('./routes/addresses');
var adminsRouter = require('./routes/admins');
var applyRouter = require('./routes/apply');
var goodsRouter = require('./routes/goods');
var allotsRouter = require('./routes/allots');
var orderGoodsRouter = require('./routes/orderGoods');
var ordersRouter = require('./routes/orders');
var shopsRouter = require('./routes/shops');
var usersRouter = require('./routes/users');
var shoppingCartRouter = require('./routes/shoppingCart');


//===================================================
require("./dao/database");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//===================================================
app.use('/', indexRouter);

app.use('/addresses', addressesRouter);
app.use('/admins', adminsRouter);
app.use('/apply', applyRouter);
app.use('/goods', goodsRouter);
app.use('/allots', allotsRouter);
app.use('/orderGoods', orderGoodsRouter);
app.use('/orders', ordersRouter);
app.use('/shops', shopsRouter);
app.use('/users', usersRouter);
app.use('/shoppingCart', shoppingCartRouter);

//===================================================
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// module.exports = app;
app.listen("3001", function() {
  console.log("3001 端口已启动！");
})
