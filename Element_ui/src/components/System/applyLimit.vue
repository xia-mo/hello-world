<template>
  <div>
    <div>
      <el-table :data="shopsData.shops" style="width: 100%" max-height="400">
        <el-table-column prop="name" label="名称" width="220"></el-table-column>
        <el-table-column prop="address" label="地址" width="320"></el-table-column>
        <el-table-column fixed="right" label="操作" width="320">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(shopsData.shops[scope.$index]._id)"
              type="text"
              size="small"
            >注销</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="~~shopsData.currentPage"
        :page-sizes="[6, 7, 8]"
        :page-size="~~shopsData.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="shopsData.totalCount"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
//申请注销门店
import axios from "axios";
export default {
  created() {
    this.getShopsByPage();
  },
  methods: {
    deleteRow(shopId) {
      axios
        .post("/apply/queryApply", {
          //查询注销申请是否已存在
          type: "注销门店申请", // 申请类型（1 门店管理员申请/ 2 新门店申请/ 3 注销门店申请）
          status: 1, // 申请状态（ 1 申请中/ 2 已通过/ 3 未通过）
          adminId: this.admin_Id,
          shopId: shopId
        })
        .then(res => {
          if (!res.data) {
            this.cancelled(shopId);
          }
        });
    },
    cancelled(shopId) {
      axios
        .post("/apply/addApply", {
          type: "注销门店申请", // 申请类型（1 门店管理员申请/ 2 新门店申请/ 3 注销门店申请）
          status: 1, // 申请状态（ 1 申请中/ 2 已通过/ 3 未通过）
          adminId: this.admin_Id,
          shopId: shopId
        })
        .then(res => {
          // console.log(res.data);
        });
    },
    handleSizeChange(val) {
      this.shopsData.pageSize = val;
      this.getShopsByPage();
    },
    handleCurrentChange(val) {
      this.shopsData.currentPage = val;
      this.getShopsByPage();
    },
    getShopsByPage() {
      //分页获取数据
      axios
        .get("/shops/getShopsByPage", {
          params: {
            currentPage: this.shopsData.currentPage,
            pageSize: this.shopsData.pageSize,
            admin_Id: this.admin_Id
          }
        })
        .then(res => {
          //   console.log(res.data);
          this.shopsData = res.data;
        });
    },
  },

  data() {
    return {
      admin_Id: localStorage.getItem("adminId").split('"')[1],
      shopsData: {
        currentPage: 1, // 当前页
        pageSize: 6, // 每页显示条数
        totalPages: 0, // 总页数
        totalCount: 0, // 总条数
        shops: [] // 门店数据
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
</style>
