<template>
  <div id="root">
    <div id="BGimg1"></div>

    <div id="inputBox">
      <div class="title">登&nbsp;&nbsp;录</div>
      <div class="account">
        <el-input
          class="textarea"
          type="text"
          placeholder="请输入账号"
          v-model="loginAccount"
          clearable
          prefix-icon="el-icon-user"
        />
      </div>
      <div class="password">
        <el-input
          class="textarea"
          placeholder="请输入密码"
          type="text"
          v-model="pwd"
          prefix-icon="el-icon-lock"
          show-password
        />
      </div>
      <div class="rememberPWDBox">
        <el-checkbox type="radio" id="check" /> 记住密码
      </div>
      <div class="loginBtn">
        <el-button
          type="danger"
          value="登录"
          id="toSystem"
          @click="loginBtn"
          plain
          >登&nbsp;&nbsp;录</el-button
        >
      </div>
      <div class="registerBox">
        <!-- <div style="width:300px"></div> -->
        <div>
          没有账号？去
          <router-link to="/register" style="text-decoration: none;color:red"
            >注册</router-link
          >
        </div>
      </div>
    </div>

    <!-- 错误提示 -->
    <el-alert
      title="账号或密码错误"
      type="error"
      description="请仔细检查后再次输入。"
      show-icon
      v-if="isArr"
      style="width:60%;margin:10px auto"
    ></el-alert>
    <!-- 审核提示 -->
    <el-alert
      title="账号审核中，请等待或与管理员联系。"
      type="warning"
      description="审核中"
      show-icon
      v-if="isAudit"
      style="width:60%;margin:10px auto"
    ></el-alert>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      loginAccount: "",
      pwd: "",
      isArr: false, //错误提示
      isAudit: false // 审核中 提示
    };
  },
  methods: {
    loginBtn() {
      axios
        .post("/admins/login", {
          account: this.loginAccount,
          password: this.pwd
        })
        .then(res => {
          // console.log(res.data);
          if (res.data[0]) {
            // 是否在审核
            if (res.data[1] == "已通过") {
              // 平台管理员
              if (res.data[2] == "平台管理员") {
                // 存本地
                localStorage.admin_Id = JSON.stringify(res.data[3]);
                localStorage.username = JSON.stringify(res.data[4]);
                this.$message("登录成功！");
                this.$router.push("/platSystem/home");
              }
              // 门店管理员
              else if (res.data[2] == "门店管理员") {
                // 存本地
                localStorage.adminId = JSON.stringify(res.data[3]);
                localStorage.username = JSON.stringify(res.data[4]);

                this.$message("登录成功！");
                this.$router.push("/System/home");
              }
              // console.log(this.$store.state.pageCut);
            }
            // 账号审核中
            else {
              this.isAudit = true;
            }
          } else {
            // 登录失败提示
            this.isArr = true;
          }
        });
    }
  }
};
</script>

<style>
.textarea > .el-input__inner {
  height: 50px;
  font-size: 18px;
  line-height: 50px;
  padding: 0 50px !important;
}

.el-input__icon {
  font-size: 30px;
  width: 45px !important;
  line-height: 50px !important;
}

.el-button > span {
  font-size: 18px;
  line-height: 21px;
}
</style>

<style scope>
#root {
  width: 100%;
  height: 100%;
  color: rgb(112, 112, 112);
}

#inputBox {
  width: 500px;
  height: 500px;
  position: absolute;
  left: 33%;
  top: 20%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: white;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  opacity: 0.9;
}

#inputBox > .title {
  width: 100px;
  font-size: 30px;
  font-weight: bold;
  margin: 50px auto 0 auto;
  text-align: center;
}

#inputBox > .account {
  width: 400px;
  margin: 30px auto 15px auto;
}

#inputBox > .password {
  width: 400px;
  margin: 0 auto 15px auto;
}

#BGimg1 {
  width: 100%;
  height: 100%;
  position: fixed;
  background: url("../assets/home2.jpg");
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
  /* -webkit-filter: blur(10px);
  -moz-filter: blur(10px);
  -o-filter: blur(10px);
  -ms-filter: blur(10px);
  filter: blur(10px); */
}

.rememberPWDBox {
  font-size: 15px;
  height: 30px;
  width: 400px;
  margin: 0 auto 5px auto;
}

.loginBtn {
  width: 400px;
  height: 50px;
  margin: 70px auto 15px auto;
}

.registerBox {
  width: 400px;
  margin: 0 auto 15px auto;
  font-size: 15px;
}

#toSystem {
  width: 400px;
  height: 50px;
}
</style>
