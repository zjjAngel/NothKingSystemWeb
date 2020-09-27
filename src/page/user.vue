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
            <span>用户名</span>
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
            <span>用户角色</span>
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
        <el-col :span="5" />
        <el-col :span="4">
          <el-button type="primary" @click="query">查询</el-button>
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
              <el-table-column prop="user_id" align="center" label="用户ID"></el-table-column>
              <el-table-column prop="user_name" align="center" label="用户名"></el-table-column>
              <el-table-column prop="create_time" align="center" label="创建时间"></el-table-column>
              <el-table-column prop="role_name" align="center" label="用户角色"></el-table-column>
              <el-table-column prop="back_up" align="center" label="备注"></el-table-column>
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
            <el-pagination
              background
              layout="pager"
              :page-size="pageSize"
              @current-change="pageQuery"
              :total="total"
            ></el-pagination>
          </div>
        </div>
      </el-row>
    </div>
    <userEditAdd
      :formbox="formbox"
      :formboxmsg="formboxmsg"
      :options="optionsArray"
      @close="closebox"
      @submit="submitbox"
      @resetPas="resetPas"
    ></userEditAdd>
  </div>
</template>


<script>
import { MessageBox } from "element-ui";
import * as api from "@/utils/api";
import userEditAdd from "@/components/userEditAdd";
export default {
  name: "user",
  data() {
    return {
      dialogVisible: false,
      requireCustOptions: [],
      pageNum: 1,
      pageSize: 10,
      total: 0, //总条数
      projectOptions: [],
      optionsArray: [],
      requireCust: "",
      project: "",
      position: "",
      tableData: [],
      formbox: 0,
      formboxmsg: {},
    };
  },
  components: {
    userEditAdd,
  },
  mounted() {
    let _this = this;
    const queryData = {
      pageNum: this.pageNum,
      pageSize: this.pageSize,
    };
    this.$ajax({
      url: api.queryUser,
      data: queryData,
      type: "GET",
      success: function (data) {
        _this.tableData = data.data.list;
        _this.total = data.data.total;
      },
      error: function (data) {
        console.log(data);
      },
    });
    const userData = {};
    this.$ajax({
      url: api.userList,
      data: userData,
      type: "GET",
      success: function (data) {
        _this.requireCustOptions = data.data;
      },
      error: function (data) {
        console.log(data);
      },
    });
    const roleList = {};
    this.$ajax({
      url: api.roleIdList,
      data: roleList,
      type: "GET",
      success: function (data) {
        _this.projectOptions = data.data;
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
              url: api.delUser,
              data: {
                userId: row.user_id,
              },
              type: "DELETE",
              success: function (data) {
                _this.formbox = 0;
                console.log(data);
                _this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                const queryData = {
                  pageNum: this.pageNum,
                  pageSize: this.pageSize,
                  userId: this.requireCust,
                  roleId: this.project,
                };
                this.$ajax({
                  url: api.queryUser,
                  data: queryData,
                  type: "GET",
                  success: function (data) {
                    _this.tableData = data.data.list;
                    _this.total = data.data.total;
                  },
                  error: function (data) {
                    console.log(data);
                  },
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
        this.formboxmsg.transRole = row.user_role;
      }
    },

    //查询List
    query() {
      let _this = this;
      console.log(_this.requireCust);
      const queryData = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        userId: this.requireCust,
        roleId: this.project,
      };
      this.$ajax({
        url: api.queryUser,
        data: queryData,
        type: "GET",
        success: function (data) {
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
      let _this = this;
      const queryData = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      };
      this.$ajax({
        url: api.queryUser,
        data: queryData,
        type: "GET",
        success: function (data) {
          _this.tableData = data.data.list;
          _this.total = data.data.total;
        },
        error: function (data) {
          console.log(data);
        },
      });
    },

    

    pageQuery(val) {
      let _this = this;
      _this.pageNum = val;
      const queryData = {
        pageNum: val,
        pageSize: _this.pageSize,
        userId: this.requireCust,
        roleId: this.project,
      };
      this.$ajax({
        url: api.queryUser,
        data: queryData,
        type: "GET",
        success: function (data) {
          _this.tableData = data.data.list;
          _this.total = data.data.total;
        },
        error: function (data) {
          console.log(data);
        },
      });
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
        })
        .catch(() => {});
    },
    submitbox(e) {
      console.log(e);
      let _this = this;
      if (e.formbox == 1) {
        const data = {
          username: e.formboxmsg.user_name,
          password: e.formboxmsg.password,
          userId: e.formboxmsg.user_id,
          backup: e.formboxmsg.back_up,
          transRole: e.formboxmsg.transRole,
        };
        // 编辑
        this.$ajax({
          url: api.editUser,
          data: data,
          type: "PUT",
          success: function (data) {
            _this.formbox = 0;
            const queryData = {
              pageNum: this.pageNum,
              pageSize: this.pageSize,
              userId: this.requireCust,
              roleId: this.project,
            };
            this.$ajax({
              url: api.queryUser,
              data: queryData,
              type: "GET",
              success: function (data) {
                _this.tableData = data.data.list;
                _this.total = data.data.total;
              },
              error: function (data) {
                console.log(data);
              },
            });
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
