<template>
  <div>
    <div style="margin-top: 20px;">
      <el-table :data="adminsData.admins" style="width: 100%;" max-height="400" class="table">
        <el-table-column prop="account" label="账号" width="160"></el-table-column>
        <el-table-column prop="name" label="姓名" width="160"></el-table-column>
        <el-table-column prop="age" label="年龄" width="160"></el-table-column>
        <el-table-column prop="gender" label="性别" width="160"></el-table-column>
        <el-table-column prop="phone" label="手机号" width="160"></el-table-column>
        <el-table-column prop="status" label="状态" width="160"></el-table-column>

        <el-table-column fixed="right" label="操作" width="160">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="modification(adminsData.admins[scope.$index])"
              @click="dialogFormVisible = true"
              type="text"
              size="small"
            >修改</el-button>
            <el-button
              @click.native.prevent="deleteRowOff(adminsData.admins[scope.$index]._id)"
              type="text"
              size="small"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="修改" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="账号" :label-width="formLabelWidth">
          <el-input v-model="form.account" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth">
          <el-input v-model="form.age" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-select v-model="form.gender" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.phone" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogFormVisible = false"
          @click.native.prevent="revise"
        >确 定</el-button>
      </div>
    </el-dialog>

    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="~~adminsData.currentPage"
        :page-sizes="[6, 7, 8]"
        :page-size="~~adminsData.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="adminsData.length"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
//门店管理员
import axios from "axios";
export default {
  created() {
    this.getAdminsByPage();
  },
  methods: {
    revise() {
      //修改
      const {
        _id,
        account,
        password,
        name,
        age,
        gender,
        phone,
        position,
        status
      } = this.form;
      axios
        .post("/admins/revises", {
          _id,
          account,
          password,
          name,
          age,
          gender,
          phone,
          position,
          status
        })
        .then(res => {
          if (res.data) {
            this.getAdminsByPage();
          }
        });
    },
    modification(adminsData) {
      this.form = adminsData;
    },
    deleteRowOff(adminsId) {
      //删除
      axios
        .post("/admins/deletes", {
          _id: adminsId
        })
        .then(res => {
          if (res.data) {
            this.getAdminsByPage();
          }
        });
    },
    handleSizeChange(val) {
      this.adminsData.pageSize = val;
      this.getAdminsByPage();
    },
    handleCurrentChange(val) {
      this.adminsData.currentPage = val;
      this.getAdminsByPage();
    },
    getAdminsByPage() {
      //分页获取数据
      axios
        .get("/admins/getAdminByPage", {
          params: {
            currentPage: this.adminsData.currentPage,
            pageSize: this.adminsData.pageSize,
            position: "门店管理员"
          }
        })
        .then(res => {
          console.log("门店管理员", res.data);
          this.adminsData = res.data;
        });
    }
  },

  data() {
    return {
      dialogFormVisible: false,
      addFormVisible: false,
      form: {
        _id: "",
        account: "", // 账号
        password: "", // 密码
        name: "", // 姓名
        age: "", // 年龄
        gender: "", // 性别
        phone: "", // 手机号
        position: "门店管理员", // 职位（平台管理员/门店管理员）
        status: "已通过" // 状态（申请中/已通过/未通过）
      },
      formLabelWidth: "120px",
      adminsData: {
        currentPage: 1, // 当前页
        pageSize: 6, // 每页显示条数
        totalPages: 0, // 总页数
        totalCount: 0, // 总条数
        length: 0,
        admins: [] // 门店数据
      }
    };
  }
};
</script>
<style>
.block {
  margin-top: 30px;
  text-align: center;
}
.cell {
  text-align: center;
}
.el {
  height: 40px;
  padding: 0 15px;
}
.el > .el-icon-edit {
  line-height: 20px;
  height: 20px;
}
</style>

