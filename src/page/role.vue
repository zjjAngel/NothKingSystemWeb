<template>
  <div>
    <div class="client-page">
      <el-row class="clinet-title">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>系统管理</el-breadcrumb-item>
          <el-breadcrumb-item>角色管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-row>
      <el-row class="query-conditions">
        <el-col :span="5">
          <template>
            <span>角色名称</span>
            <el-select style="width:10vw" v-model="roleNameValue" size="mini" id="role1" placeholder="请选择" @change="fillData">
              <el-option
                v-for="item in roleNameList"
                :key="item.role_ID"
                :label="item.role_NAME"
                :value="item.role_ID"
              ></el-option>
            </el-select>
          </template>
        </el-col>
        <el-col :span="5">
        </el-col>
        <el-col :span="5" />
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
              <el-table-column prop="role_ID" align="center" label="角色ID"></el-table-column>
              <el-table-column prop="role_NAME" align="center" label="角色名称"></el-table-column>
              <el-table-column prop="back_UP" align="center" label="备注"></el-table-column>
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
    <roleEditAdd
      :formbox="formbox"
      :formboxmsg="formboxmsg"
      :options="optionsArray"
      @close="closebox"
      @submit="submitbox"
      @resetPas="resetPas"
    ></roleEditAdd>
  </div>
</template>


<script>
import { MessageBox } from "element-ui";
import * as api from "@/utils/api";
import roleEditAdd from "@/components/roleEditAdd";
// import { delete } from 'vue/types/umd';
export default {
  name: "role",
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
      tableData: [
      ],
      formbox: 0,
      formboxmsg: {},
      roleNameValue:'',
      roleNameList:[],
      inputQuery:{},

       inputAjax:{ 
         "user_role":"",
         "role_name":"",
         "back_up":"",
         "pageSize":"",
         "pageNum":""

       },
       inputAjax1:{
         "ROLE_NAME":"",
         "BACK_UP":"",
         "FEIGN_IDS":""
       }

    };
  },
  components: {
    roleEditAdd,
  },
  mounted() {
    let _this = this;
this.$ajax({
      url: api.roleNameList,
      data: {},
      type: "GET",
      success: function (data) {
        // console.log("接口返回值",data)
      
        _this.roleNameList = data.data.list;
        _this.roleselect = data;
      },
      error: function (data) {
        console.log(data);
      },
    });


      const queryData = {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
      };
      this.$ajax({
          url: api.roleNameList,
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
              url: api.roleDelete,
              data: {
                role_Id: row.role_ID,
              },
              type: "GET",
              success: function (data) {
                _this.formbox = 0;
                console.log(data);
                _this.$message({
                  type: "success",
                  message: "删除成功!",
                });

              _this.queryData();
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

        // _this.formboxmsg.user_role = row.user_role;
        _this.formboxmsg.ROLE_NAME = row.role_NAME;
        _this.formboxmsg.BACK_UP = row.back_UP;
        _this.formboxmsg.ROLE_ID = row.role_ID;
       

      }
    },
    fillData(value){
        console.log("select 中对应的value" +value);
        // console.log("select 中对应的label" +label);
        
        this.inputQuery={"roleId":value};
    },
    queryData(){
      let _this = this;
      
      console.log(document.getElementById("role1").value);
      console.log(_this.roleNameValue);

      const queryData = {
      pageNum: this.pageNum,
      pageSize: this.pageSize,
      "roleId": this.inputQuery.roleId
      };
      this.$ajax({
        url: api.roleNameList,
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
      let _this = this;
      const queryData = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      };
      this.$ajax({
        url: api.roleNameList,//要改
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
        // userId: this.requireCust,//要改
        roleId: this.requireCust,//要改
      };
      this.$ajax({
        url: api.roleNameList,//要改
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
      delete e.formboxmsg.user_role;
      
      if (e.formbox == 1) {
        // 编辑
        this.$ajax({
          url: api.ROleEdit,
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
      
          e.formboxmsg.BACK_UP=e.formboxmsg.BACK_UP;
          e.formboxmsg.ROLE_NAME=e.formboxmsg.ROLE_NAME;
          delete e.formboxmsg.back_up;
          delete e.formboxmsg.role_name;
        // 增加
        this.$ajax({
          
          url:api.roleAdd,
          data: e.formboxmsg,
          type: "POST",
          success: function (data) {
            console.log(data);
            //_this.tableData.tableDataItem.push(data.data);
            _this.formbox = 0;

            _this.$message({
              type: "success",
              message: "新增成功!若想角色生效，请分配用户！",
            });
           
          _this.queryData();
            
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
      let _this=this;
      this.formbox = 2;
      debugger;
      _this.formboxmsg.ROLE_NAME = "";
      _this.formboxmsg.BACK_UP = "";
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
