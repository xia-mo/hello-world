<template>
  <div style="overflow:auto;height:560px;margin:10px 0 0 20px">
    <div>
      <!-- 商品列表渲染 -->
      <el-table style="width: 100%;text-align: center" max-height="100%" :data="goodsData">
        <el-table-column fixed prop="name" label="名称" width="100"></el-table-column>
        <el-table-column prop="classify" label="种类" width="100"></el-table-column>
        <el-table-column prop="pet" label="适用宠物" width="100"></el-table-column>
        <el-table-column prop="price" label="价格" width="100"></el-table-column>
        <el-table-column prop="weight" label="重量" width="100"></el-table-column>
        <el-table-column prop="production" label="生产日期" width="100"></el-table-column>
        <el-table-column prop="shelfLife" label="保质期" width="100"></el-table-column>
        <el-table-column prop="producer" label="产地" width="120"></el-table-column>
        <el-table-column prop="images" label="图片展示" width="120">
          <template slot-scope="scope">
            <img :src="scope.row.images[0]" width="50%" />
          </template>
        </el-table-column>
        <el-table-column prop="desc" label="商品描述" width="200"></el-table-column>
        <el-table-column fixed="right" width="200">
          <template slot="header">添加到门店</template>
          <template slot-scope="scope">
            <el-select v-model="select" style="width:50%" placeholder="请选择门店">
              <el-option
                v-for="item in shopId"
                :key="item._id"
                :label="item.shopId.name"
                :value="item._id"
              ></el-option>
            </el-select>
            <el-button
              type="success"
              size="mini"
              @click="addToshop(scope.$index, goodsData)"
              style="height:40px"
            >添加</el-button>
          </template>
        </el-table-column>

        <el-table-column fixed="right" width="300">
          <template slot="header" slot-scope="scope">
            <el-select v-model="condition.type" style="width:45%">
              <el-option label="名称" value="name"></el-option>
              <el-option label="种类" value="classify"></el-option>
              <el-option label="宠物" value="pet" @click="Null(scope.$index, goodsData)"></el-option>
            </el-select>
            <el-input v-model="condition.value" style="width:40%;" v-on:input="queryGoods"></el-input>
            <!-- <el-input v-model="search" size="mini"  v-on:input="queryGoods"  placeholder="输入关键字搜索"/> -->
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="updateGoods(scope.$index, goodsData)"
              type="primary"
              style="height:40px;width:80px;"
            >修改</el-button>
            <el-button
              size="mini"
              @click="deleteGoods(scope.$index, goodsData)"
              type="danger"
              style="height:40px;width:80px;"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--修改商品信息的弹框 -->
      <div>
        <el-dialog title="商品修改" :visible.sync="dialogFormVisible">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="商品名称" style="width:50%">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="商品类型" style="width:50%">
              <el-select v-model="form.classify" placeholder="请选择商品类型---">
                <el-option label="主粮" value="主粮"></el-option>
                <el-option label="零食" value="零食"></el-option>
                <el-option label="玩具" value="玩具"></el-option>
                <el-option label="日用药品" value="日用药品"></el-option>
                <el-option label="零食" value="零食"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="适用宠物" style="width:50%">
              <el-select v-model="form.pet" placeholder="请选择宠物类型---">
                <el-option label="通用" value="通用"></el-option>
                <el-option label="狗" value="狗"></el-option>
                <el-option label="猫" value="猫"></el-option>
                <el-option label="鸟" value="鸟"></el-option>
                <el-option label="水禽" value="水禽"></el-option>
                <el-option label="其他" value="其他"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="商品价格" style="width:50%">
              <el-input v-model="form.price"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" style="width:50%">
              <el-input v-model="form.weight"></el-input>
            </el-form-item>
            <el-form-item label="生产日期" style="width:50%">
              <el-input v-model="form.production"></el-input>
            </el-form-item>
            <el-form-item label="保质期" style="width:50%">
              <el-input v-model="form.shelfLife"></el-input>
            </el-form-item>
            <el-form-item label="商品产地" style="width:50%">
              <el-input v-model="form.producer"></el-input>
            </el-form-item>
            <el-form-item label="商品图片" style="width:50%">
              <el-upload
                action="/upload"
                list-type="picture-card"
                :on-remove="handleRemove"
                :on-success="addressImages"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt />
              </el-dialog>
            </el-form-item>
            <el-form-item label="商品描述" style="width:50%">
              <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <template>
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="sureUpdate">确 定</el-button>
            </template>
          </el-form>
        </el-dialog>
      </div>
    </div>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[2, 5, 10, 15]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      shopId: {},
      select: "",
      adminId: localStorage.getItem("adminId").split('"')[1],
      currentPage: 1, //当前页
      totalCount: 0, //数据共计多少条
      pageSize: 5, //每页数据
      search: "", //搜索内容
      goodsData: [
        {
          name: "", // 名称
          classify: "", // 商品种类
          pet: "", // 适⽤用宠物（
          price: "", // 价格
          weight: "", // 重量量
          production: "", // ⽣生产⽇日期
          shelfLife: "", // 保质期
          producer: "", // 产地
          images: [], // 商品图⽚片（列列表图/详情图...）
          desc: "", // 商品描述
          adminId: {
            // 门店管理理员 id
            status: "" //管理员状态
          }
        }
      ],
      images: [], // 商品图⽚片（列列表图/详情图...）
      form: {
        //修改信息的弹窗口
        name: "", // 名称
        classify: "", // 商品种类
        pet: "", // 适⽤用宠物（
        price: "", // 价格
        weight: "", // 重量量
        production: "", // ⽣生产⽇日期
        shelfLife: "", // 保质期
        producer: "", // 产地
        images: "", // 商品图⽚片（列列表图/详情图...）
        desc: "" // 商品描述
      },
      dialogVisible: false,
      dialogImageUrl: "", //照片路径
      formLabelWidth: "120px", //弹出对话框的表单宽度
      dialogTableVisible: false, //对话框默认关闭
      dialogFormVisible: false, //表单默认关闭
      updateId: "", //修改行数据的Id
      shops: [], //门店管理员所有门店的集合
      condition: {
        type: "name",
        value: ""
      }
    };
  },
  created() {
    this.getGoodsByPage();
  },
  methods: {
    Null() {}, //空的事件，作用使搜索处不警告
    addressImages(response, file, fileList) {
      //文件上传成功时触发的钩子
      // console.log(response, file, fileList);
      let imageUrl = "/upload/" + response;
      this.images.push(imageUrl);
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList);
      //文件列表移除文件时触发的钩子
      // for (let i = 0; i < this.images.length; i++) {
      // if (this.images[i] === file.url) {
      // this.images.splice(i, 1);
      // }
    },
    handleSizeChange(val) {
      //每页条数
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getGoodsByPage();
    },
    handleCurrentChange(val) {
      //当前页
      this.currentPage = val;
      this.getGoodsByPage();
    },
    getGoods() {
      //获取所有商品信息
      axios.get("/goods/getGoods", {}).then(res => {
        this.goodsData = res.data;
        this.totalCount = res.data.length;
      });
    },
    getGoodsByPage() {
      //分页获取商品信息
      axios
        .get("/goods/getGoodsByPage", {
          params: {
            currentPage: this.currentPage,
            pageSize: this.pageSize,
            adminId: localStorage.getItem("adminId").split('"')[1]
          }
        })
        .then(res => {
          this.goodsData = res.data.goods;
          this.totalCount = res.data.totalCount;
          this.getShops();
        });
    },
    deleteGoods(index, rows) {
      //删除
      axios
        .delete(`/goods/${rows[index]._id}`, {
          _id: rows[index]._id
        })
        .then(res => {
          // console.log("删除成功");
          this.getGoodsByPage();
        });
    },
    updateGoods(index, rows) {
      this.images = [];
      //获取修改商品的id
      this.dialogFormVisible = true;
      axios
        .get("/goods/queryGoods", {
          //修改时拿到修改的数据
          params: { _id: rows[index]._id }
        })
        .then(res => {
          //修改时的信息显示在弹窗的表单
          this.form.name = res.data[0].name;
          this.form.classify = res.data[0].classify;
          this.form.pet = res.data[0].pet;
          this.form.price = res.data[0].price;
          this.form.weight = res.data[0].weight;
          this.form.production = res.data[0].production;
          this.form.shelfLife = res.data[0].shelfLife;
          this.form.producer = res.data[0].producer;
          this.form.images = res.data[0].images;
          this.form.desc = res.data[0].desc;
          this.updateId = rows[index]._id;
        });
    },
    sureUpdate() {
      //确认修改
      // console.log(this.dialogImageUrl);
      axios
        .put("/goods/", {
          params: {
            _id: this.updateId,
            name: this.form.name,
            classify: this.form.classify,
            pet: this.form.pet,
            weight: this.form.weight,
            price: this.form.price,
            production: this.form.production,
            shelfLife: this.form.shelfLife,
            producer: this.form.producer,
            desc: this.form.desc,
            images: this.images
          }
        })
        .then(res => {
          if (res.data === true) {
            // console.log(res.data);
            alert("修改成功");
            this.dialogFormVisible = false;
            this.getGoodsByPage();
          } else {
            alert("修改失败");
          }
        });
    },
    queryGoods() {
      //输入框查询事件
      // console.log(this.condition.type, this.condition.value);
      const { type, value } = this.condition;
      if (this.condition.value !== "") {
        //当查询值不为空时
        axios
          .get("/goods/queryGoodsByPage", {
            params: {
              currentPage: this.currentPage,
              pageSize: this.pageSize,
              name: this.condition.value,
              classify: this.condition.value,
              pet: this.condition.value
            }
          })
          .then(res => {
            // console.log("234", res.data.goods);
            this.goodsData = res.data.goods;
            this.totalCount = res.data.goods.length;
          });
      } else {
        this.getGoodsByPage();
      }
    },
    getShops() {
      axios
        .post("/apply/getApply", {
          //通过后台拿到门店的状态值
          adminId: this.adminId,
          type: "新门店申请"
        })
        .then(res => {
          this.shopId = res.data;
        });
    },
    addToshop(index, rows) {
      //将商品添加到门店
      this.shopId.map(v => {
        if (v._id === this.select) {
          if (v.status === 2) {
            this.select = "";
            // console.log("!3", this.adminId, v.shopId._id, rows[index]._id);
            axios
              .post("/allots/allotGoodstoShops", {
                adminId: this.adminId, //v.adminId
                shopId: v.shopId._id,
                goodsId: rows[index]._id
              })
              .then(res => {
                if (res.data === true) {
                  alert("商品已新增到门店");
                }
              });
          } else {
            alert("门店申请权限未通过,无法进行商品分配");
          }
        }
      });
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
</script>

<style>
.block {
  margin-top: 30px;
  text-align: center;
}
.el-table th div {
  padding-left: 0;
}
</style>
