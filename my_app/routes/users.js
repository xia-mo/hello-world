// 用户集合（users）
var express = require('express');
var router = express.Router();

const { login, register, deletes, getUsers, getUsersByPage, revise, validate } = require("../server/usersServer");

//用户登录
router.post('/login', async function (req, res, next) {
    const data = await login(req.body);
    res.send(data);
});

// 注册
router.post('/register', async (req, res, next) => {
    console.log(req.body);
    const data = await register(req.body);
    res.send(data);
});

//删除
router.post('/deletes', async (req, res, next) => {
    const data = await deletes(req.body);
    res.send(data);
});

//全部获取
router.get('/getUsers', async (req, res, next) => {
    const data = await getUsers(req.query);
    res.send(data);
});

// 分页获取用户数据
router.get('/getUsersByPage', async (req, res, next) => {
    const data = await getUsersByPage(req.query);
    res.send(data);
});

// 修改
router.post('/revise', async (req, res, next) => {
    const data = await revise(req.body);
    res.send(data);
});

// 验证用户是否已经存在
router.get("/validate", async (req, res, next) => {
    const data = await validate(req.query);
    res.send(data);
})
module.exports = router;
