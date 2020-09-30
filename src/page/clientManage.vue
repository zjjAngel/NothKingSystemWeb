<template>
  <div>
    <div class="client-page">
      <el-row class="clinet-title">
        <p>客户管理</p>
      </el-row>
      <el-row class="query-conditions">
        <el-col :span="5">
          <template>
            <span>客户姓名</span>
            <el-select style="width:10vw" v-model="custname" size="mini" placeholder="请选择">
              <el-option
                v-for="item in clientOptions"
                :key="item.custname"
                :label="item.custname"
                :value="item.custname"
              ></el-option>
            </el-select>
          </template>
        </el-col>
        <el-col :span="5">
          <template>
            <span>公司</span>
            <el-select style="width:10vw" v-model="company" size="mini" placeholder="请选择">
              <el-option
                v-for="item in firmOptions"
                :key="item.custno"
                :label="item.company"
                :value="item.custno"
              ></el-option>
            </el-select>
          </template>
        </el-col>
        <el-col :span="5">
          <template>
            <span>区域</span>
            <el-select style="width:10vw" v-model="region" size="mini" placeholder="请选择">
              <el-option
                v-for="item in areaOptions"
                :key="item.region"
                :label="item.region"
                :value="item.region"
              ></el-option>
            </el-select>
          </template>
        </el-col>
        <el-col :span="5">
          <template>
            <span>维系人</span>
            <el-select
              style="width:10vw"
              v-model="relationname"
              size="mini"
              placeholder="请选择"
            >
              <el-option
                v-for="item in contactPersonOptions"
                :key="item.custno"
                :label="item.relationname"
                :value="item.custno"
              ></el-option>
            </el-select>
          </template>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" size="mini"  @click="queryData">搜索</el-button>
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
              <el-table-column prop="custno" align="center" label="客户编号"></el-table-column>
              <el-table-column prop="custname" align="center" label="客户姓名"></el-table-column>
              <el-table-column prop="company" align="center" label="公司"></el-table-column>
              <el-table-column prop="mobileno" align="center" label="联系方式"></el-table-column>
              <el-table-column prop="adress" align="center" label="详细地址"></el-table-column>
              <el-table-column prop="region" align="center" label="区域"></el-table-column>
              <el-table-column prop="relationname" align="center" label="维系人"></el-table-column>
              <el-table-column prop="relatemobilNo" align="center" label="维系人联系方式"></el-table-column>
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
    <clientFormbox :formbox="formbox" :formboxmsg="formboxmsg" @close="closebox" @submit="submitbox"></clientFormbox>
  </div>
</template>
      

<script>
import { MessageBox } from "element-ui";
import * as api from "@/utils/api";
import clientFormbox from "@/components/clientFormbox";
export default {
  name: "clientManage",
  data() {
    return {

       pageNum: 1,
      pageSize: 10,
      total: 0, //总条数
      clientOptions: [],
      firmOptions: [],
      areaOptions: [],
      contactPersonOptions: [],
      custname:"",
      company:"",
      region:"",
      relationname:"",
      tableData: {
        tableDataItem: []
      },
      formbox: 0,
      formboxmsg: {},
      areaOptions:[{region:"西北区"},{region:"华南区"},{region:"华东区"},{region:"东北区"}]
    };
  },
  components: {
    clientFormbox
  },

mounted (){
  let _this = this;
  const beforeMount = {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
      };

      beforeMount: {
    let _this = this;
    const beforeMount = {
      pageNum: this.pageNum,
      pageSize: this.pageSize,
    
      }
    this.$ajax({
      url: api.custQuery,
      data: {
       pageNum: this.pageNum,
      pageSize: this.pageSize,
      },
      type: "POST",
      success: function(data) {
        _this.$set(_this.tableData, "tableDataItem", data.data);
      },
      error: function(data) {
        if (data == 500) {
        }
      }
    });
  }
  debugger;
  this.$ajax({
      url: api.queryForList,
      data:{option:"01"},
      type: "POST",
      success: function (data) {
        // console.log("接口返回值",data)
        debugger;
      console.log(data);
       _this.clientOptions = data.data
      },
      error: function (data) {
        console.log(data);
      },
    });

      this.$ajax({
      url: api.queryForList,
      data:{option:"02"},
      type: "POST",
      success: function (data) {
        // console.log("接口返回值",data)
        debugger;
      console.log(data);
       _this.firmOptions = data.data;
      },
      error: function (data) {
        console.log(data);
      },
    });

    this.$ajax({
      url: api.queryForList,
      data:{option:"04"},
      type: "POST",
      success: function (data) {
        // console.log("接口返回值",data)
        debugger;
      console.log(data);
        _this.contactPersonOptions = data.data;
      },
      error: function (data) {
        console.log(data);
      },
    });
    
},

  methods: {
    handleClick(row, action) {
      let _this = this
      console.log(row.custno)
      if (action == "less") {
        this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$ajax({
              url: api.custDel,
              data: {
                "custno": row.custno
              },
              type: "POST",
              success: function(data) {
                _this.formbox = 0;
                console.log(data);
                _this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                //_this.$set(_this.tableData, "tableDataItem", data.data);
                  _this.custname="";
                _this.company="";
                _this.region="";
                 _this.relationname="";
                _this.queryData();
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

  handleChange(e) {
         console.log("api:"+api);
       debugger;
      console.log("分页调整", e);
      let _this = this;
      _this.pageSize = e;
      const beforeMount = {
        page: _this.pageNum,
        size: _this.pageSize,
      };
       this.$ajax({
        url: api.custQuery,//如果不行 该改儿
        data: beforeMount,
        type: "POST",
        success: function (data) {
          // _this.$set(_this.tableData,"tableDataItem",data.data) ;
          _this.tableData.tableDataItem=data.data;
          if(data.data.length==0){
             _this.total =0;
          }else{
            _this.total = data.data[0].totalsize;
          }
          
        },
        error: function (data) {
          console.log(data);
        },
      });
    },
     pageQuery(val) {
       debugger;
      let _this = this;
      _this.pageNum = val;
      const beforeMount = {
        page: val,
        size: _this.pageSize,
      };
      this.$ajax({
        url: api.custQuery,//要改
        data: beforeMount,
        type: "POST",
        success: function (data) {
          _this.tableData.tableDataItem = data.data;
          _this.total = data.data[0].totalsize;
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
        message: "已取消"
      });
    },
    submitbox(e) {
      console.log(e);
      let _this = this;
      if (e.formbox == 1) {
        // 编辑
        this.$ajax({
          url: api.custUpdate,
          data: e.formboxmsg,
          type: "POST",
          success: function(data) {
            _this.formbox = 0;
            //_this.$set(_this.tableData, "tableDataItem", data.data);
           
          },
          error: function(data) {
            if (data == 500) {
            }
          }
        });
      } else if (e.formbox == 2) {
        // 增加
        this.$ajax({
          url: api.custAdd,
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
        _this.custname="";
      _this.company="";
      _this.region="";
      _this.relationname="";
            _this.queryData();
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
      this.formboxmsg={};
    },
    queryData(){
      debugger;
      let _this=this;
     this.$ajax({
      url: api.custQuery,
      data: {
       custname:_this.custname==""?null:_this.custname,
       company:_this.company==""?null:_this.company,
       region:_this.region==""?null:_this.region,
       relationname:_this.relationname==""?null:_this.relationname,
       pageNum: this.pageNum,
      pageSize: this.pageSize,
      },
      type: "POST",
      success: function(data) {
        _this.$set(_this.tableData, "tableDataItem", data.data);
      },
      error: function(data) {
        if (data == 500) {
        }
      }
    });
    }
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
  margin-right: 50px;
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