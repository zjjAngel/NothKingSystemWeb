<template>
  <div>
    <div class="client-page">
      <el-row class="clinet-title">
        <p>需求查询</p>
      </el-row>
      <el-row class="query-conditions">
        <el-col :span="5">
          <template>
            <span>需求客户</span>
            <el-select style="width:10vw" v-model="requireCust" size="mini" placeholder="请选择">
              <el-option
                v-for="item in requireCustOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </template>
        </el-col>
        <el-col :span="5">
          <template>
            <span>项目</span>
            <el-select style="width:10vw" v-model="project" size="mini" placeholder="请选择">
              <el-option
                v-for="item in projectOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </template>
        </el-col>
        <el-col :span="5">
          <template>
            <span>岗位</span>
            <el-select style="width:10vw" v-model="position" size="mini" placeholder="请选择">
              <el-option
                v-for="item in positionOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </template>
        </el-col>
        <el-col :span="5">
          <template>
            <span>优先级</span>
            <el-select
              style="width:10vw"
              v-model="priority"
              size="mini"
              placeholder="请选择"
            >
              <el-option
                v-for="item in priorityOptions"
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
              <el-table-column prop="number" align="center" label="编号"></el-table-column>
              <el-table-column prop="requireCust" align="center" label="需求客户"></el-table-column>
              <el-table-column prop="project" align="center" label="项目"></el-table-column>
              <el-table-column prop="position" align="center" label="岗位"></el-table-column>
              <el-table-column prop="requreNum" align="center" label="需求人数"></el-table-column>
              <el-table-column prop="request" align="center" label="要求"></el-table-column>
              <el-table-column prop="priority" align="center" label="优先级"></el-table-column>
              <el-table-column prop="stutas" align="center" label="状态"></el-table-column>
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
    <clientFormbox
      :formbox="formbox"
      :formboxmsg="formboxmsg"
      @close="closebox"
      @submit="submitbox"
    ></clientFormbox>
  </div>
</template>
      

<script>
import { MessageBox } from "element-ui";
import * as api from "@/utils/api";
import clientFormbox from "@/components/clientFormbox";
export default {
  name: "Inquire",
  data() {
    return {
      requireCustOptions: [],
      projectOptions: [
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
      positionOptions: [
        {
          value: "UI设计师",
          label: "UI设计师"
        },
        {
          value: "H5",
          label: "H5"
        },
        {
          value: "java工程师",
          label: "java工程师"
        },
        {
          value: "php工程师",
          label: "php工程师"
        },
        {
          value: "DBA",
          label: "DBA"
        }
      ],
      priorityOptions: [
        {
          value: "高",
          label: "高"
        },
        {
          value: "中",
          label: "中"
        },
        {
          value: "低",
          label: "低"
        }
      ],
      
      requireCust: "",
      project: "",
      position: "",
      priority: "",
      tableData: {
        tableDataItem: []
      },
      formbox: 0,
      formboxmsg: {}
    };
  },
  components: {
    clientFormbox
  },
  methods: {
    handleClick(row, action) {
      let _this = this
      if (action == "less") {
        this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$ajax({
              url: api.requireDeleteRequire,
              data: {
                "custno": row.number
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
          url: api.requireUpdateRequire,
          data: e.formboxmsg,
          type: "POST",
          success: function(data) {
            _this.formbox = 0;
          },
          error: function(data) {
            if (data == 500) {
            }
          }
        });
      } else if (e.formbox == 2) {
        // 增加
        this.$ajax({
          url: api.requireAddRequire,
          data: e.formboxmsg,
          type: "POST",
          success: function(data) {
            console.log(data);
            //_this.tableData.tableDataItem.push(data.data);
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
    // 
    this.$ajax({
      url: api.requireSelectRequireCust,
      data: {},
      type: "POST",
      success: function(data) {
        console.log(data)
        _this.requireCustOptions = data.data
      },
      error: function(data) {
        console.log(data)
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