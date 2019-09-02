<template>
  <div id="root2">
    <div id="BGimg2">
      <!-- <img src="../assets/home3.jpg" alt=""> -->
    </div>
    <el-form id="inputBox2" ref="generalAdmin" :rules="rules" :model="generalAdmin" status-icon>
      <div class="title">门店管理员注册</div>

      <el-form-item class="account">
        <el-input
          type="text"
          class="textarea1"
          placeholder="请输入要注册的账号"
          v-model="generalAdmin.account"
          @input="accountHint"
        />
        <el-alert
          title="账户已存在!"
          type="error"
          effect="dark"
          :closable="false"
          v-if="isName"
          style="height:10px;background:white;color:red;"
        ></el-alert>
        <el-alert
          title="账户格式不正确!"
          type="error"
          effect="dark"
          :closable="false"
          v-if="isName_ok"
          style="height:10px;background:white;color:red;"
        ></el-alert>
      </el-form-item>

      <el-form-item class="password" prop="password">
        <el-input
          type="password"
          class="textarea1"
          v-model="generalAdmin.password"
          placeholder="请输入密码"
        />
      </el-form-item>

      <el-form-item class="password2" prop="checkPassword">
        <el-input
          type="password"
          class="textarea1"
          placeholder="请再次输入密码"
          v-model="generalAdmin.checkPassword"
        />
      </el-form-item>

      <el-form-item class="name">
        <el-input type="text" class="textarea1" placeholder="请输入姓名" v-model="generalAdmin.name" />
      </el-form-item>

      <el-form-item class="age" prop="age">
        <el-input
          type="text"
          class="textarea1"
          placeholder="请输入年龄"
          v-model.number="generalAdmin.age"
        />
      </el-form-item>

      <el-form-item class="gender" label="性别：">
        <el-radio v-model="generalAdmin.gender" label="male">男</el-radio>
        <el-radio v-model="generalAdmin.gender" label="female">女</el-radio>
      </el-form-item>

      <el-form-item class="phone">
        <el-input
          type="text"
          class="textarea1"
          placeholder="请输入手机号"
          v-model.number="generalAdmin.phone"
        />
      </el-form-item>

      <el-form-item class="check">
        <el-checkbox type="checkbox" name id="rember" />
        <span>用户协议</span>
      </el-form-item>

      <el-form-item class="registerBtn">
        <el-button
          type="danger"
          value="注册"
          @click="registerBtn('generalAdmin')"
          id="register"
          plain
        >完成注册</el-button>
      </el-form-item>
      <el-form-item class="loginBox">
        <div>
          已有账号？去
          <router-link to="/login" style="text-decoration: none;color:red">登录</router-link>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      callback();
    };
    var verifyPWD = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.generalAdmin.checkPassword !== "") {
          this.$refs.generalAdmin.validateField("checkPassword");
        }
        callback();
      }
    };
    var verifyPWD2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.generalAdmin.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      isName: false,
      isName_ok: false,
      generalAdmin: {
        account: "",
        password: "",
        checkPassword: "",
        name: "",
        age: "",
        gender: "",
        phone: "",
        position: "门店管理员"
      },
      rules: {
        age: [{ validator: checkAge, trigger: "blur" }],
        password: [{ validator: verifyPWD, trigger: "blur" }],
        checkPassword: [{ validator: verifyPWD2, trigger: "blur" }]
      }
    };
  },
  methods: {
    registerBtn(formName) {
      this.$refs[formName].validate(valid => {
        if (valid && this.isName == false) {
          axios
            .post("/admins/register", {
              account: this.generalAdmin.account, //账户
              password: this.generalAdmin.password, //密码
              name: this.generalAdmin.name, //姓名
              age: this.generalAdmin.age, //年龄
              gender: this.generalAdmin.gender, //性别
              position: this.generalAdmin.position, //职位
              phone: this.generalAdmin.phone, //电话
              status: "申请中" //申请状态
            })
            .then(res => {
              alert("注册成功");
              if (res) {
                this.$router.push("/login");
              }
            });
        } else {
          alert("输入错误");
          return false;
        }
      });
    },
    //验证账号
    accountHint() {
      if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.generalAdmin.account)) {
        this.isName_ok = true;
        this.isName = false;
      } else {
        this.isName_ok = false;
        axios
        .post("/admins/validateB", {
          account: this.generalAdmin.account,
          position: "门店管理员"
        })
        .then(res => {
          if (res.data[0]) {
            this.isName = true;
          }else{
            this.isName = false;
          }
        });
      }
    }
  }
};
</script>

<style>
.el-input__icon {
  font-size: 15px;
}

.el-input__suffix {
  width: 35px;
}

[class*=" el-icon-"],
[class^="el-icon-"] {
  line-height: 41px !important;
}
</style>

<style scope>
#root2 {
  width: 100%;
  height: 100%;
  color: rgb(112, 112, 112);
}

#BGimg2 {
  width: 100%;
  height: 100%;
  position: fixed;
  background: url("../assets/home3.jpg");
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
  /* -webkit-filter: blur(10px);
  -moz-filter: blur(10px);
  -o-filter: blur(10px);
  -ms-filter: blur(10px);
  filter: blur(10px); */
}

#inputBox2 {
  width: 500px;
  height: 730px;
  position: absolute;
  left: 33%;
  top: 10%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: white;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  opacity: 0.8;
}

#inputBox2 > .title {
  width: 220px;
  font-size: 30px;
  font-weight: bold;
  margin: 50px auto 0 auto;
  text-align: center;
}

#inputBox2 > .account {
  width: 350px;
  margin: 30px auto 20px auto;
  height: 40px;
}

#inputBox2 > .password,
.password2,
.name,
.age {
  width: 350px;
  margin: 0 auto 20px auto;
}

#inputBox2 > .phone,
.gender {
  width: 350px;
  margin: 0 auto !important;
}

.check {
  font-size: 15px;
  height: 30px;
  width: 350px;
  margin: 20px auto 5px auto !important;
}

#register {
  width: 350px;
}
.registerBtn {
  width: 350px;
  height: 50px;
  margin: 0 auto 5px auto !important;
}

.loginBox {
  width: 350px;
  margin: 0 auto 15px auto;
  font-size: 15px;
}
</style>
