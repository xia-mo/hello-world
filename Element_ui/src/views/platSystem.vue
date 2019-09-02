<template>
  <div>
    <div class="header">
      <div>
        <marquee behavior direction class="marq" scrollAmount="8">★ 欢迎光临宠物之家管理系统------平台管理员管理 ★</marquee>
      </div>
      <div id="userName">
        <el-dropdown>
          <span class="el-dropdown-link">
            {{usersName}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" @click.native.prevent="QuitUser">
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="root">
      <!--导航栏标签  -->
      <el-row class="tac">
        <el-col :span="12">
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @select="handleSelect"
            background-color="#fff"
            font-size="bold"
            color="#398BFB"
            active-text-color="#398BFB"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-truck"></i>
                <span>平台门店管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="platAdmins">
                  <i class="el-icon-finished"></i>平台管理员
                </el-menu-item>
                <el-menu-item index="storeAdmins">
                  <i class="el-icon-plus"></i>门店管理员
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-coffee-cup"></i>
                <span slot="title">用户管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="usersList">
                  <i class="el-icon-finished"></i>用户信息
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-shopping-cart-full"></i>
                <span slot="title">统计处理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="storeDistribute">
                  <i class="el-icon-finished"></i>门店分布
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-s-custom"></i>
                <span slot="title">申请处理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="accountApply">
                  <i class="el-icon-plus"></i>帐号申请
                </el-menu-item>
                <el-menu-item index="addstore">
                  <i class="el-icon-plus"></i>新增门店申请
                </el-menu-item>
                <el-menu-item index="storeApply">
                  <i class="el-icon-plus"></i>注销门店申请
                </el-menu-item>
                <el-menu-item index="storeDelete">
                  <i class="el-icon-plus"></i>删除注销的门店
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-s-custom"></i>
                <span slot="title">门店管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="storeList">
                  <i class="el-icon-plus"></i>门店信息
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-row>
      <!-- 右边显示内容 -->
      <el-main style="margin: 0;padding: 0;">
        <router-view></router-view>
      </el-main>
    </div>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      activeIndex: "1",
      usersName: ""
    };
  },
  created() {
    this.usersName = localStorage.getItem("username").split('"')[1];
  },
  methods: {
    handleSelect(key, keyPath) {
      //选择导航选项
      this.$router.push(`/platSystem/${key}`); //切换到System下的子组件
    },
    QuitUser() {
      localStorage.clear();
      this.$router.push(`/login`);
    }
  }
};
</script>

<style >
.el-submenu__title span {
  color: #000;
  font-size: 16px;
  font-weight: 600;
}
.marq {
  height: 80px;
  width: 100%;
  background-color: #398bfb;
  padding: 20px;
  font-size: 35px;
  color: white;
}
.header {
  height: 100px;
  width: 100%;
  position: relative;
  overflow: hidden;
}
.el-dropdown-link {
  font-size: 15px;
}
.root {
  display: flex;
}
.tac {
  width: 202px;
  height: 556px;
  border: 1px solid lightgray;
  border-right: none;
}
.el-main {
  border: 1px solid lightgray;
  overflow-y: scroll;
}
.el-col-12 {
  width: 100%;
}
.el-menu-demo {
  position: relative;
}
.el-submenu__title {
  height: 60px;
  line-height: 60px;
  font-size: 40px;
}
.el-submenuis-opened :hover {
  background-color: #fff;
}
#userName {
  position: absolute;
  right: 15px;
  bottom: 2px;
  font-size: 25px;
}
</style>
