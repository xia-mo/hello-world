<template>
  <div>
    <div style="margin-top: 20px;">
      <el-table :data="applyData.apply" style="width: 100%;" max-height="400" class="table">
        <el-table-column prop="adminId.account" label="门店员账号" width="320"></el-table-column>
        <el-table-column prop="shopId.name" label="门店名称" width="320"></el-table-column>
        <el-table-column fixed="right" label="操作" width="320">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(applyData.apply[scope.$index].shopId._id,applyData.apply[scope.$index]._id)"
              type="text"
              size="small"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="~~applyData.currentPage"
        :page-sizes="[6, 7, 8]"
        :page-size="~~applyData.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="applyData.length"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
// 删除注销的门店
import axios from "axios";
export default {
  created() {
    this.getApplyByPage();
  },
  methods: {
    deleteRow(shopId, applyId) { //删除同意注销申请
      axios
        .post("/apply/deletes", {
          _id: applyId
        })
        .then(res => {
          if (res.data) {
            this.deleteShops(shopId);
            this.deleteApply(shopId);
            this.getApplyByPage();
          }
        });
    },
    deleteApply(shopId) {//删除新门店申请
      axios
        .post("/apply/deletes", {
          shopId: shopId
        })
        .then(res => {
        });
    },
    deleteShops(shopId) {//删除门店
      axios
        .post("/shops/deletes", {
          _id: shopId
        })
        .then(res => {
        });
    },
    handleSizeChange(val) {
      this.applyData.pageSize = val;
      this.getApplyByPage();
    },
    handleCurrentChange(val) {
      this.applyData.currentPage = val;
      this.getApplyByPage();
    },
    getApplyByPage() {
      //分页获取数据
      axios
        .get("/apply/getApplyByPage", {
          params: {
            currentPage: this.applyData.currentPage,
            pageSize: this.applyData.pageSize,
            status: 2,
            type: "注销门店申请"
          }
        })
        .then(res => {
          this.applyData = res.data;
        });
    }
  },

  data() {
    return {
      applyData: {
        currentPage: 1, // 当前页
        pageSize: 6, // 每页显示条数
        totalPages: 0, // 总页数
        totalCount: 0, // 总条数
        length: 0,
        apply: [] // 门店数据
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
