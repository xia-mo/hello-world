// 管理理员集合（admins）
var express = require('express');
var router = express.Router();

const { deletes, addAdmins, getAdminsByPage, getAdminByPage, revise, revises, login, register, validate,validateB } = require("../server/adminsServer");

//删除
router.post('/deletes', async (req, res, next) => {
    const data = await deletes(req.body);
    res.send(data);
});

//新增
router.post('/addAdmins', async (req, res, next) => {
    const data = await addAdmins(req.body);
    res.send(data);
});

//获取申请中的管理员信息
router.get('/getAdminsByPage', async (req, res, next) => {
    const data = await getAdminsByPage(req.query);
    res.send(data);
});

//获取管理员信息
router.get('/getAdminByPage', async (req, res, next) => {
    const data = await getAdminByPage(req.query);
    res.send(data);
});

//修改申请状态
router.post('/revise', async (req, res, next) => {
    const data = await revise(req.body);
    res.send(data);
});

//修改
router.post('/revises', async (req, res, next) => {
    const data = await revises(req.body);
    res.send(data);
});

//管理员登录
router.post('/login', async function (req, res, next) {
    const data = await login(req.body);
    res.send(data);
});

//平台管理员注册
router.post('/register', async (req, res, next) => {
    const data = await register(req.body);
    res.send(data);
});

// 验证管理员是否已经存在
router.post("/validate", async (req, res, next) => {
    const data = await validate(req.body);
    res.send(data);
})
// 验证平台管理员是否已经存在
router.post("/validateB", async (req, res, next) => {
    const data = await validateB(req.body);
    res.send(data);
})

module.exports = router;