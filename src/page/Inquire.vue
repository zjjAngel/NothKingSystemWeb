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
            <span>需求客户</span>
            <el-select style="width:10vw" v-model="requireCust" size="mini" placeholder="请选择">

              <el-option
                v-for="item in requireCustOptions"
                :key="item.requireCust"
                :label="item.requireCust"
                :value="item.requireCust"
              @click.native="changeInquire(item.requireCust)"></el-option>
            </el-select>
          </template>
        </el-col>
        <el-col :span="5" v-show="ifshow">
          <template>
            <span>项目</span>
            <el-select style="width:10vw" v-model="project" size="mini" placeholder="请选择" id="resIn">
              <el-option
                v-for="item in project"
                :key="item.option"
                :label="item.requireCust"
                :value="item.option"
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
                :key="item.position"
                :label="item.position"
                :value="item.position"
              ></el-option>
            </el-select>
          </template>
        </el-col>
        <el-col :span="5">
          <template>
            <span>优先级</span>

              <el-select style="width:10vw" v-model="priority" size="mini" placeholder="请选择">

              <el-option
                v-for="item in priorityOptions"
                :key="item.priority"
                :label="item.priority"
                :value="item.priority"
              ></el-option>
            </el-select>
          </template>
        </el-col>
        <el-col :span="4">


          <el-button type="primary" @click="queryData" >搜索</el-button>

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
              <el-table-column prop="numNo" align="center" label="编号"></el-table-column>
              <!-- <el-table-column prop="requireCust" align="" label="需求客户"></el-table-column> -->
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
          <!-- <div>
            <el-pagination background layout="pager" :total="total"></el-pagination>
          </div> -->
        </div>
      </el-row>

    <inquireEditAdd
      :reqbox="reqbox"
      :reqboxmsg="reqboxmsg"

      @close="closebox"
      @submit="submitbox"
    ></inquireEditAdd>
  </div>



</template>


<script>
import { MessageBox } from "element-ui";
import inquireEditAdd from "@/components/inquireEditAdd";
import * as api from "@/utils/api";
export default {
  name: "Inquire",
  data() {
    return {
      requireCustOptions: [],
      projectlist:[],
      projectOptions: [],
       pageNum: 1,
       pageSize: 10,
       total:0,
      positionOptions: [],
      priorityOptions: [],

      requireCust: "",
      project: "",
      position: "",
      priority: "",
      tableData:[],
      reqbox: 0,
      reqboxmsg: {},
       inputAjax:{ 

         "project":"",
         "post":"",
         "reqnum":"",
         "status":"",
         "pageSize":"",
         "pageNum":""

       },
        formboxmsg:{
          status:""
        },
        ifshow:false
     };
  },
  components: {
    inquireEditAdd,
  },

mounted(){
 let _this = this;
 
      this.$ajax({
      url:api.RequireSearch,
      data:{"option":"01"},//查询需求客户
      type:"POST",
      success:function(data){

        _this.requireCustOptions=data.data;
      },
      error: function (data){
        console.log(data);
      },
    });

    this.$ajax({

      url:api.RequireSearch,
      data:{"option":"03"},
      type:"POST",
      success:function(data){

        console.log(data);
         _this.tableData= data.data;
        // _this. positionOptions= data.data;
        // _this.priorityOptions = data.data;
      },
      error:function(data){
        console.log(data);
      },
    })
    debugger;
    this.$ajax({
      url:api.queryPointWhere,
      data:{},
      type:"GET",
      success:function(data){
       _this.positionOptions= data.data;
      },
       error:function(data){
        console.log(data);
      },
    })
    _this.priorityOptions=[{"priority":"高"},{"priority":"中"},{"priority":"低"}];
   
},

  methods:{
    changeInquire(obj){
      let _this = this;
      if(null==obj){
        _this.ifshow=false;
        return;
      }
      debugger;
      this.$ajax({
      url:api.RequireSearch,
      data:{"option":"02"
      ,"requireCust":obj
      },//查询项目
      type:"POST",
      success:function(data){
        _this.requireCustOptions=data.data;
        document.getElementById("resIn").value=data.data[0].project;
        _this.ifshow=true;
        
      },
      error: function (data){
        console.log(data);
      },
    });
    },
    refresh(){
       let _this = this;
 
      this.$ajax({
      url:api.RequireSearch,
      data:{"option":"01"},//查询需求客户
      type:"POST",
      success:function(data){

        _this.requireCustOptions=data.data;
      },
      error: function (data){
        console.log(data);
      },
    });
    },
    handleClick(row, action) {
      debugger;
      console.log(row);
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
                //"prono": row.id
                numNo:row.numNo,
              },
              type: "POST",
              success: function(data) {
                _this.reqbox = 0;
                console.log(data);
                _this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                // _this.queryData();
                _this.refresh();
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
        this.reqbox = 1;
        //this.reqboxmsg = row;
        _this.reqboxmsg.project=row.project;
        _this.reqboxmsg.post=row.position;
        _this.reqboxmsg.renum = row.requreNum;
        _this.reqboxmsg.requestion=row.request;
        _this.reqboxmsg.priority=row.priority;
        _this.reqboxmsg.numNo=row.numNo;
         if (row.status='1'){
              _this.formboxmsg.status= "在线";
          }else {
              _this.formboxmsg.status= "下线";
          }

      }
    },
 handleChange(e) {
         console.log("api:"+api);
       debugger;
      console.log("分页调整", e);
      let _this = this;
      _this.pageSize = e;
      const req= {
        option:"03",
        page: _this.pageNum,
        size: _this.pageSize,
      };
       this.$ajax({
        url: api.RequireSearch,
        data: req,
        type: "POST",
        success: function (data) {
          // _this.$set(_this.tableData,"tableDataItem",data.data) ;
          _this.tableData=data.data;
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
      const req= {
        option: "03",
        page: val,
        size: _this.pageSize,
      };
      this.$ajax({
        url: api.RequireSearch,//要改
        data: req,
        type: "POST",
        success: function (data) {
          debugger;
          _this.tableData = data.data;
          _this.total = data.data[0].totalsize;
        },
        error: function (data) {
          console.log(data);
        },
      });
    },



    closebox(e) {
      this.reqbox = 0;
      this.$message({
        type: "info",
        message: "已取消"
      });
    },

    

    submitbox(e) {
      console.log(e);
      let _this = this;
      if (e.reqbox == 1) {
       let input2=  e.reqboxmsg;
      //  input2.numNo=1111;
       
       input2.requreNum=input2.renum;
       delete input2.renum;
        // 编辑
        this.$ajax({
          url: api.requireUpdateRequire,
          data:input2,
          
          type: "POST",
          success: function(data) {
            _this.reqbox = 0;
          },
          error: function(data) {
            if (data == 500) {
            }
          }
        });
      } else if (e.reqbox == 2) {
        // 增加
        this.$ajax({
          url: api.requireAddRequire,
          data: e.reqboxmsg,
          type: "POST",
          success: function(data) {
            console.log(data);
            //_this.tableData.tableDataItem.push(data.data);
            _this.reqbox = 0;
            _this.$message({
              type: "success",
              message: "新增成功!"
            });
          },
          error: function(data) {
            if (data !== 500) {
              _this.reqbox = 0;
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
      this.reqbox = 2;
      this.reqmsg={};
    },
    queryData(){
       let _this = this;
     this.$ajax({

      url:api.RequireSearch,
      data:{
       option:"03",
       requireCust:_this.requireCust==""?null:_this.requireCust,
       project:_this.project==""?null:_this.project,
       position:_this.position==""?null:_this.position,
       priority:_this.priority==""?null:_this.priority
      },
      type:"POST",
      success:function(data){
          debugger;
         console.log(data);
         _this.tableData= data.data;
        _this. positionOptions= data.data;
        _this.priorityOptions = data.data;
      },
      error:function(data){
        console.log(data);
      },
    })
    }
  },
  // beforeMount: function() {
  //   let _this = this;
  //   //
  //   this.$ajax({
  //     url: api.requireSelectRequireCust,
  //     data: {},
  //     type: "POST",
  //     success: function(data) {
  //       console.log(data)
  //       _this.requireCustOptions = data.data
  //     },
  //     error: function(data) {
  //       console.log(data)
  //       if (data == 500) {
  //       }
  //     }
  //   });
  // }
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
  align-items: re-end;
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
.pageChange {
  display: flex;
  align-items: center;
}
.pageStyle {
  height: 35px;
  margin-left: 12px;
  display: flex;
  justify-content: space-between;
}
</style>
