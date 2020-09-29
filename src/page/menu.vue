<template>
  <div>
    <div class="client-page">
      <el-row class="clinet-title">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>系统管理</el-breadcrumb-item>
          <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-row>
      <el-row class="query-conditions">
        <el-col :span="5">
          <template>
            <span>菜单名称</span>
            <el-select style="width:10vw" v-model="requireCust" size="mini" placeholder="请选择">
              <el-option
                v-for="item in requireCustOptions"
                :key="item.menu_id"
                :label="item.menu_name"
                :value="item.menu_id"
              @click.native="checkFather(item.menu_id,item.menu_level_parent)" ></el-option>
            </el-select>
          </template>
        </el-col>
        <el-col :span="5">
          <template>
            <span>父级菜单</span>
            <el-select style="width:10vw" v-model="project" id="father" size="mini" placeholder="请选择">
              <el-option
                v-for="item in fatherMenu"
                :key="item.menu_id"
                :label="item.menu_name"
                :value="item.menu_id"
              ></el-option>
            </el-select>
          </template>
        </el-col>
        <el-col :span="5">
          <template>
            <span>状态</span>
            <el-select style="width:10vw" v-model="status" size="mini" placeholder="请选择">
              <el-option label="上线" value="1" @click.native="addstatus()"></el-option>
              <el-option label="下线" value="0" @click.native="addstatus()"></el-option>
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
              <el-table-column prop="menu_id" align="center" label="菜单ID"></el-table-column>
              <el-table-column prop="menu_name" align="center" label="菜单名称"></el-table-column>
              <el-table-column prop="menu_level" align="center" label="菜单级别"></el-table-column>
              <el-table-column prop="menu_level_parent" align="center" label="父级菜单"></el-table-column>
              <el-table-column prop="path" align="center" label="路径"></el-table-column>
              <el-table-column prop="back_up" align="center" label="备注"></el-table-column>
              <el-table-column prop="status" align="center" label="状态" :formatter="stateFormat" >
              </el-table-column>
<!--              <el-table-column prop="status" align="center" label="状态"  ></el-table-column>-->
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
    <menuEditAdd
      :formbox="formbox"
      :formboxmsg="formboxmsg"
      :options="optionsArray"
      @close="closebox"
      @submit="submitb"
      @resetPas="resetPas"
    ></menuEditAdd>
  </div>
</template>


<script>
import { MessageBox } from "element-ui";
import * as api from "@/utils/api";
import menuEditAdd from "@/components/menuEditAdd";



export default {
  name: "menuM",
  data() {
    return {
      dialogVisible: false,
      requireCustOptions: [],
      pageNum: 1,
      pageSize: 10,
      total: 0, //总条数
      projectOptions: [],
      fatherMenu:[],
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
      status:"",
      tableData: [],
      formbox: 0,
      formboxmsg: {},
        inputAjax:{
          "menu_id":"",
          "menuName":"",
          "menu_level_parent":"",
          "status":"",
            "pageSize":"",
            "pageNum":""
        }
    };
  },
  components: {
    menuEditAdd,
  },
  mounted() {
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
  

    const queryMenu2 = {};
    this.$ajax({
      url: api.queryMenu,
      data: queryMenu2,
      type: "GET",
      success: function (data) {
        _this.optionsArray = data.data;
        _this.requireCustOptions=data.data.list;
        // _this.projectOptions=data.data.list;
      },
      error: function (data) {
        console.log(data);
      },
    });
  },
  methods: {

    handleClick(row, action) {
        console.log(row);
      let _this = this;
      if (action == "less") {
        this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$ajax({
              url: api. Menudelet,//这个接口错的
              data: {
                // custno: row.number,//要改
                  menu_id : row.menu_id,//要改
                                
              },  
              type:"DELETE",

              success: function (data) {
                 
                _this.formbox = 0;
                // _this.formboxmsg.menuName = rowmenuName;//要改
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
        debugger;
         _this.formboxmsg.row=row;
        this.formbox = 1;
        // this.formboxmsg = row;
          _this.formboxmsg.mobileno="";
          _this.formboxmsg.mobileno=row.menu_name;
          _this.formboxmsg.transRole=row.menu_level_parent;
          _this.formboxmsg.options=row;
          _this.formboxmsg.menu_level=row.menu_level;
          _this.formboxmsg.path=row.path;
          _this.formboxmsg.back_up=row.back_up;
           _this.optionsArray.list=_this.requireCustOptions;
      var  context="";
      for (let index = 0; index < _this.requireCustOptions.length; index++) {
      //  _this.formboxmsg.options[index] = _this.requireCustOptions[index];
          //  document.getElementsByName("fatherMn")[index].textContent= _this.requireCustOptions[index].menu_name;
          //  document.getElementsByName("fatherMn")[index]= _this.requireCustOptions[index];
          // <el-option
        context+=   "<option value="+_this.requireCustOptions[index].menu_id+">"+_this.requireCustOptions[index].menu_name+"</option>  "+"\n";
        }
        document.getElementsByName("fatherMn")[0].innerHTML =context;

        e.formboxmsg.menuName=e.formboxmsg.mobileno; delete e.formboxmsg.mobileno;
        
     
     // _this.formboxmsg.status=row.status=;
          if (row.status='1'){
              _this.formboxmsg.status= "在线";
          }else if(row.status='0'){
              _this.formboxmsg.status= "下线";
          }else {
              return '异常状态'
          }

      }
      
    },
    queryData() {
      let _this = this;
      // const queryData = {
      //   pageNum: this.pageNum,
      //   pageSize: this.pageSize,
      // };
      // queryData=_this.inputAjax;
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
    handleChange(e) {//试试
      console.log("分页调整", e);
      this.pageSize = e;
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
        menu_id: this.requireCust,//要改
        roleId: this.project,//要改
      };
      this.$ajax({
        url: api.queryMenu,
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
    submitb(e) {
      console.log(e);
      let _this = this;
        
      if (e.formbox == 1) {
        
        // 编辑
        e.formboxmsg.menuName = e.formboxmsg.row.menu_name;
        e.formboxmsg.menuId = e.formboxmsg.row.menu_id;
        e.formboxmsg.menu_level_parent= e.formboxmsg.row.menu_level_parent;
        e.formboxmsg.status = e.formboxmsg.row.status;
        // e.formboxmsg.back_up = e.formboxmsg.row.back_up;
        delete e.formboxmsg.transRole;
        delete e.formboxmsg.options;
        delete e.formboxmsg.mobileno;
        delete e.menu_level;
        delete e.formboxmsg.row;
        this.$ajax({
          url: api.updateMenuMngerInfo,
          data: e.formboxmsg,
          type: "PUT",
          success: function (data) {
            _this.formbox = 0;
            queryData();
             this.$ajax({
              url: api.queryMenu,
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

        e.formboxmsg.BACK_UP=e.formboxmsg.back_up;
        debugger;
        e.formboxmsg.MENU_NAME=e.formboxmsg.mobileno;
        e.formboxmsg.MENU_LEVEL_PARENT=e.formboxmsg.transRole;
        e.formboxmsg.MENU_LEVEL=e.formboxmsg.menu_level;
        e.formboxmsg.PATH=e.formboxmsg.path;
        e.formboxmsg.STATUS="0";

        delete e.formboxmsg.back_up;
        delete e.formboxmsg.mobileno;
        delete e.transRole;
        delete e.menu_level;
        delete e.formboxmsg.path;
        delete e.status;
        // 增加
        this.$ajax({
          url: api.MenuAdd,
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

             _this.queryData();
          },
          error: function (data) {
            if (data !== 200) {
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
      _this.formboxmsg.MENU_NAME= "";
      _this.formboxmsg.MENU_LEVEL_PARENT = "";
      _this.formboxmsg.MENU_LEVEL = "";
      _this.formboxmsg.PATH = "";
      _this.formboxmsg.BACK_UP = "";
      _this.formboxmsg.STATUS = "";
       _this.optionsArray.list=_this.requireCustOptions;
      var  context="";
      for (let index = 0; index < _this.requireCustOptions.length; index++) {
      //  _this.formboxmsg.options[index] = _this.requireCustOptions[index];
          //  document.getElementsByName("fatherMn")[index].textContent= _this.requireCustOptions[index].menu_name;
          //  document.getElementsByName("fatherMn")[index]= _this.requireCustOptions[index];
          // <el-option
        context+=   "<option value="+_this.requireCustOptions[index].menu_id+">"+_this.requireCustOptions[index].menu_name+"</option>  "+"\n";
        }
        document.getElementsByName("fatherMn")[0].innerHTML =context;

        

    },
    
      stateFormat(row, column) {
          console.log(row.status)
          console.log('column:'+column);
          if (row.status === '1') {
              return '上线'
          } else if (row.state === '0') {
              return '下线'
          }else {
              return '异常状态'
          }
      },
      addstatus(){
        let _this=this;
         _this.inputAjax.status=_this.status;
      },
      checkFather(menuId,fatherMenuId){
          let _this = this;
        console.log(menuId+"-"+fatherMenuId);
        _this.inputAjax.menu_id=menuId;
        _this.inputAjax.menu_level_parent=fatherMenuId;
          // this.axios({
          // url: api.queryMenu+"?menu_id="+menuId+"&menu_level_parent="+fatherMenuId,
          // method: "get"
          // }).then(res=>{
          //     console.log(res);
          //     this.projectOptions=res;
          // }).catch(err=>{
          //     console.log(err);
          // })
          // this.$ajax({
          //     url: api.queryMenu,
          //
          // })
          const queryMenu3 = {"menu_id":fatherMenuId};
          // _this.fatherMenu=[];
          this.$ajax({
              url: api.queryMenu,
              data: queryMenu3,
              type: "GET",
              async: false,
              success: function (data) {
                  console.log(data);
                  document.getElementById("father").value="";
                  _this.fatherMenu=data.data.list;
                  // document.getElementById("father").placeholder=data.data.list[0].menu_name;
                  document.getElementById("father").value=data.data.list[0].menu_name;

              },
              error: function (data) {
                  console.log(data);
              },
          });

      },


      // submit:function (msg) {
      //     // let  _this=this;
      //     let msg1 = {
      //         formbox: this.formbox,
      //         formboxmsg: this.formboxmsg,
      //     };
      //     this.$ajax({
      //         url: api.updateMenuMngerInfo,
      //         data: {
      //             menuId: "M_919679488",
      //             menuName: "客户管理",
      //             menu_level_parent:"0",
      //             menu_level:"1",
      //             path:"/menu/menu001",
      //             back_up:"er",
      //             status:"0"
      //         },
      //         type: "PUT",
      //         success: function(data) {
      //             debugger;
      //             _this.$set(_this.tableData, "tableDataItem", data.data);
      //         },
      //         error: function(data) {
      //             debugger;
      //             if (data == 500) {
      //             }
      //         }
      //     });
      // }

  },
};

// var app2 = new Vue({
//     el:"#fatherMenu",
//     data:{
//         fatherMenu:[]
//     }
// });
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
