<template>
  <div>
    <div class="client-page">
      <el-row class="clinet-title">
        <p>项目管理</p>
      </el-row>
      <el-row class="query-conditions">
        <el-col :span="5">
          <template>
            <span>项目名称</span>
            <el-select style="width:10vw" v-model="prodname" size="mini" placeholder="请选择">
              <el-option
                v-for="item in prodnameOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </template>
        </el-col>
        <el-col :span="5">
          <template>
            <span>项目类型</span>
            <el-select style="width:10vw" v-model="prodtype" size="mini" placeholder="请选择">
              <el-option
                v-for="item in prodtypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </template>
        </el-col>
        <el-col :span="5">
          <template>
            <div class="block">
              <span class="demonstration">起始时间</span>
              <el-date-picker
                v-model="starttime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
                size="mini"
                style="width:170px"
              ></el-date-picker>
            </div>
          </template>
        </el-col>
        <el-col :span="5">
          <template>
            <span>状态</span>
            <el-select style="width:10vw" v-model="status" size="mini" placeholder="请选择">
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </template>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" size="mini">搜索</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-row class="addcust">
          <el-col>
            <span @click="addcust">+添加</span>
          </el-col>
        </el-row>
        <el-row>
          <template>
            <el-table :data="tableData.tableDataItem" style="width: 100%">
              <el-table-column prop="prodno" align="center" label="项目编号"></el-table-column>
              <el-table-column prop="prodname" align="center" label="项目名称"></el-table-column>
              <el-table-column prop="prodtype" align="center" label="项目类型"></el-table-column>
              <el-table-column prop="starttime" align="center" label="起始时间"></el-table-column>
              <el-table-column prop="status" align="center" label="状态"></el-table-column>
              <el-table-column fixed="right" align="center" label="操作">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row, 'edit')" type="text" size="small">编辑</el-button>
                  <el-button @click="handleClick(scope.row, 'less')" type="text" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-row>
      </el-row>
    </div>
    <prodFormbox :formbox="formbox" :formboxmsg="formboxmsg" @close="closebox" @submit="submitbox"></prodFormbox>
  </div>
</template>
      

<script>
import { MessageBox } from "element-ui";
import * as api from "@/utils/api";
import prodFormbox from "@/components/prodFormbox";
export default {
  name: "projectManage",
  data() {
    return {
      prodnameOptions: [
        {
          value: "选项1",
          label: "中行"
        },
        {
          value: "选项2",
          label: "农信"
        },
        {
          value: "选项3",
          label: "信合"
        },
        {
          value: "选项4",
          label: "汇丰"
        },
        {
          value: "选项5",
          label: "花旗"
        }
      ],
      prodtypeOptions: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      statusOptions: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      prodname: "",
      prodtype: "",
      starttime: "",
      status: "",
      tableData: {
        tableDataItem: []
      },
      formbox: 0,
      formboxmsg: {}
    };
  },
  components: {
    prodFormbox
  },
  methods: {
    handleClick(row, action) {
      let _this = this;
      console.log(row.custno);
      if (action == "less") {
        this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$ajax({
              url: api.projectDel,
              data: {
                prodno: row.prodno,
                prodname: row.prodname
              },
              type: "POST",
              success: function(data) {
                _this.formbox = 0;
                console.log(data);
                _this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              },
              error: function(data) {
                if (data == 500) {
                }
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      } else {
        console.log(row);
        this.formbox = 1;
        this.formboxmsg = row;
      }
    },
    closebox(e) {
      this.formbox = 0;
      this.$message({
        type: "info",
        message: "已取消"
      });
    },
    submitbox(e) {
      console.log(e);
      let _this = this;
      if (e.formbox == 1) {
        // 编辑
        this.$ajax({
          url: api.projectUpdate,
          data: e.formboxmsg,
          type: "POST",
          success: function(data) {
            console.log(data);
            _this.formbox = 0;
          },
          error: function(data) {
            console.log(data);
            if (data == 500) {
            }
          }
        });
      } else if (e.formbox == 2) {
        // 增加
        this.$ajax({
          url: api.projectAdd,
          data: e.formboxmsg,
          type: "POST",
          success: function(data) {
            _this.formbox = 0;
            _this.$message({
              type: "success",
              message: "新增成功!"
            });
          },
          error: function(data) {
            if (data !== 500) {
              _this.formbox = 0;
              _this.$message({
                type: "info",
                message: "新增失败!"
              });
            }
          }
        });
      }
    },
    addcust() {
      this.formbox = 2;
    }
  },
  beforeMount: function() {
    let _this = this;
    this.$ajax({
      url: api.projectQuery,
      data: {
        size: 10,
        page: 1
      },
      type: "POST",
      success: function(data) {
        console.log(data);
        _this.$set(_this.tableData, "tableDataItem", data.data);
      },
      error: function(data) {
        if (data == 500) {
        }
      }
    });
  }
};
</script>

<style scoped>
::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
.clinet-title {
  font-size: 14px;
  color: #000;
  margin-bottom: 15px;
  margin-left: 12px;
  text-align: left;
}
.client-page {
  padding: 10px;
}
.query-conditions {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: flex-end;
}
.el-message-box {
  height: 50vh;
  widows: 50vw;
}
.page-edit {
  display: flex;
  flex-flow: column;
}
.flex-row {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
}
.addcust {
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: 50px;
  text-align: right;
}
</style>