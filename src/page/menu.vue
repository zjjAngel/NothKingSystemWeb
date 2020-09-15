<template>
  <div>
    <div class="client-page">
      <el-row class="clinet-title">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>需求管理</el-breadcrumb-item>
          <el-breadcrumb-item>需求查询</el-breadcrumb-item>
        </el-breadcrumb>
      </el-row>
      <el-row class="query-conditions">
        <el-col :span="5">
          <template>
            <span>菜单名称</span>
            <el-select style="width:10vw" v-model="requireCust" size="mini" placeholder="请选择">
              <el-option
                v-for="item in requireCustOptions"
                :key="item.user_id"
                :label="item.user_name"
                :value="item.user_id"
              ></el-option>
            </el-select>
          </template>
        </el-col>
        <el-col :span="5">
          <template>
            <span>父级菜单</span>
            <el-select style="width:10vw" v-model="project" size="mini" placeholder="请选择">
              <el-option
                v-for="item in projectOptions"
                :key="item.role_id"
                :label="item.role_name"
                :value="item.role_id"
              ></el-option>
            </el-select>
          </template>
        </el-col>
        <el-col :span="5">
          <template>
            <span>状态</span>
            <el-select style="width:10vw" v-model="project" size="mini" placeholder="请选择">
              <el-option
                v-for="item in projectOptions"
                :key="item.role_id"
                :label="item.role_name"
                :value="item.role_id"
              ></el-option>
            </el-select>
          </template>
        </el-col>
        <el-col :span="5" />
        <el-col :span="4">
          <el-button type="primary" @click="queryData">查询</el-button>
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
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="user_id" align="center" label="菜单ID"></el-table-column>
              <el-table-column prop="user_name" align="center" label="菜单名称"></el-table-column>
              <el-table-column prop="create_time" align="center" label="菜单级别"></el-table-column>
              <el-table-column prop="user_role" align="center" label="父级菜单"></el-table-column>
              <el-table-column prop="user_role" align="center" label="路径"></el-table-column>
              <el-table-column prop="back_up" align="center" label="备注"></el-table-column>
              <el-table-column prop="back_up" align="center" label="状态"></el-table-column>
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
      <el-row>
        <div class="pageStyle">
          <div class="pageChange">
            每页显示条数
            <el-input-number
              v-model="pageSize"
              controls-position="right"
              @change="handleChange"
              :min="1"
              :max="15"
              size="small"
            ></el-input-number>
          </div>
          <div>
            <el-pagination background layout="pager" :total="total"></el-pagination>
          </div>
        </div>
      </el-row>
    </div>
    <menuEditAdd
      :formbox="formbox"
      :formboxmsg="formboxmsg"
      :options="optionsArray"
      @close="closebox"
      @submit="submitbox"
      @resetPas="resetPas"
    ></menuEditAdd>
  </div>
</template>


<script>
import { MessageBox } from "element-ui";
import * as api from "@/utils/api";
import menuEditAdd from "@/components/menuEditAdd";
export default {
  name: "menu",
  data() {
    return {
      dialogVisible: false,
      requireCustOptions: [],
      pageNum: 1,
      pageSize: 10,
      total: 0, //总条数
      projectOptions: [],
      optionsArray: [
        {
          value: "1",
          label: "普通用户",
        },
        {
          value: "admin",
          label: "管理员",
        },
      ],
      requireCust: "",
      project: "",
      position: "",
      tableData: [],
      formbox: 0,
      formboxmsg: {},
    };
  },
  components: {
    menuEditAdd,
  },
  mounted() {
    let _this = this;
    // const queryData = {
    //   pageNum: this.pageNum,
    //   pageSize: this.pageSize,
    // };
    // this.$ajax({
    //   url: api.queryUser,
    //   data: queryData,
    //   type: "GET",
    //   success: function (data) {
    //     _this.tableData = data.data.list;
    //     _this.total = data.data.total;
    //   },
    //   error: function (data) {
    //     console.log(data);
    //   },
    // });

    // const userData = {}
    // this.$ajax({
    //   url: api.userList,
    //   data: userData,
    //   type: "GET",
    //   success: function (data) {
    //     _this.projectOptions = data.data;
    //   },
    //   error: function (data) {
    //     console.log(data);
    //   },
    // });

    const roleList = {};
    this.$ajax({
      url: api.roleIdList,
      data: roleList,
      type: "GET",
      success: function (data) {
        _this.optionsArray = data.data;
      },
      error: function (data) {
        console.log(data);
      },
    });
  },
  methods: {
    handleClick(row, action) {
      let _this = this;
      if (action == "less") {
        this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$ajax({
              url: api.requireDeleteRequire,
              data: {
                custno: row.number,
              },
              type: "POST",
              success: function (data) {
                _this.formbox = 0;
                console.log(data);
                _this.$message({
                  type: "success",
                  message: "删除成功!",
                });
              },
              error: function (data) {
                if (data == 500) {
                }
              },
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      } else {
        this.formbox = 1;
        this.formboxmsg = row;
      }
    },
    queryData() {
      let _this = this;
      const queryData = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      };
      this.$ajax({
        url: api.queryMenu,
        data: queryData,
        type: "GET",
        success: function (data) {
            console.log(data);
          _this.tableData = data.data.list;
          _this.total = data.data.total;
        },
        error: function (data) {
          console.log(data);
        },
      });
    },
    handleChange(e) {
      console.log("分页调整", e);
      this.pageSize = e;
    },
    closebox(e) {
      this.formbox = 0;
      this.$message({
        type: "info",
        message: "已取消",
      });
    },

    resetPas() {
      this.$confirm("确定要重置密码吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "info",
            message: "已重置密码",
          });
          // this.$ajax({
          //   url: api.requireDeleteRequire,
          //   data: {
          //     "custno": row.number
          //   },
          //   type: "POST",
          //   success: function(data) {
          //     _this.formbox = 0;
          //     console.log(data);
          //     _this.$message({
          //       type: "success",
          //       message: "删除成功!"
          //     });
          //   },
          //   error: function(data) {
          //     if (data == 500) {
          //     }
          //   }
          // });
        })
        .catch(() => {
          // this.$message({
          //   type: "info",
          //   message: "已取消删除"
          // });
        });
    },
    submitbox(e) {
      console.log(e);
      let _this = this;
      if (e.formbox == 1) {
        // 编辑
        this.$ajax({
          url: api.requireUpdateRequire,
          data: e.formboxmsg,
          type: "POST",
          success: function (data) {
            _this.formbox = 0;
          },
          error: function (data) {
            if (data == 500) {
            }
          },
        });
      } else if (e.formbox == 2) {
        // 增加
        this.$ajax({
          url: api.addUser,
          data: e.formboxmsg,
          type: "POST",
          success: function (data) {
            console.log(data);
            //_this.tableData.tableDataItem.push(data.data);
            _this.formbox = 0;
            _this.$message({
              type: "success",
              message: "新增成功!",
            });
          },
          error: function (data) {
            if (data !== 500) {
              _this.formbox = 0;
              _this.$message({
                type: "info",
                message: "新增失败!",
              });
            }
          },
        });
      }
    },
    addcust() {
      this.formbox = 2;
    },
  },
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
  margin-right: 90px;
  text-align: right;
}
.pageStyle {
  height: 35px;
  margin-left: 12px;
  display: flex;
  justify-content: space-between;
}
.pageChange {
  display: flex;
  align-items: center;
}
</style>
