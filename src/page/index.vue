<template>
  <el-container>
    <el-aside width="200px">
      <el-row class="left-aside">
        <h1>京北方</h1>
        <el-row>
          <template v-for="item of items">
            <jbf-menu
              class="first-menu"
              :name="item.menu_name"
              :menuid="item.menu_id"
              :key="item.menu_id"
              :url="item.patch"
              @isActive="active(item.menu_id,item.nextIdsMenu)"
            >

              <template v-if="item.grade">
                <div v-show="item.active">
                  <jbf-menu
                    v-for="menu of item.nextIdsMenu"
                    :name="menu.menu_name"
                    :url="menu.patch"
                    :menuid="menu.menu_id"
                    :key="menu.menu_id"
                  >
                  </jbf-menu>
                </div>
              </template>
            </jbf-menu>
          </template>
        </el-row>
      </el-row>
    </el-aside>
    <el-container>
      <el-header>
        <page-head :username="username" :character="character"></page-head>
      </el-header>
      <el-main style="height: calc(100vh - 60px);overflow: auto;">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { MessageBox } from "element-ui";
import jbfMenu from "@/components/left_menu";
import pageHead from "@/components/head"
import * as api from "@/utils/api";
export default {
  name: "index",
  data() {
    return {
      username: '吴彦祖',
      character: '超级管理员',
      items: [
        // {
        //   menu_name: "需求管理",
        //   menu_id: "menuid0",
        //   grade: true,
        //   active: true,
        //   patch: "/index/demandManage",
        //   nextIdsMenu: [
        //     // {
        //     //   name: "需求统计",
        //     //   id: "menuid00",
        //     //   grade: false,
        //     //   active: false,
        //     //   patch: "/index/demandManage/statistics"
        //     // },
        //     {
        //       menu_name: "需求查询",
        //       menu_id: "menuid01",
        //       grade: false,
        //       active: false,
        //       patch: "/index/demandManage/Inquire"
        //     }
        //   ]
        // },
        // {
        //   menu_name: "客户管理",
        //   menu_id: "menuid1",
        //   grade: false,
        //   active: false,
        //   patch: "/index/clientManage"
        // },
        // {
        //   menu_name: "项目管理",
        //   menu_id: "menuid2",
        //   grade: false,
        //   active: false,
        //   patch: "/index/projectManage"
        // },
        // {
        //   menu_name: "系统管理",
        //   menu_id: "menuid3",
        //   grade: true,
        //   active: false,
        //   patch: "/index/systemManage",
        //   nextIdsMenu: [
        //     {
        //       name: "用户管理",
        //       id: "menuid30",
        //       grade: false,
        //       active: false,
        //       patch: "/index/systemManage/user"
        //     },
        //     {
        //       name: "角色管理",
        //       id: "menuid31",
        //       grade: false,
        //       active: false,
        //       patch: "/index/systemManage/role"
        //     },
        //     {
        //       name: "菜单管理",
        //       id: "menuid32",
        //       grade: false,
        //       active: false,
        //       patch: "/index/systemManage/menu"
        //     }
        //   ]
        // }
      ]
     
    };
  },
  components: {
    jbfMenu,
    pageHead
  },
  methods: {
    active: function(id,nextMenus) {
      debugger; 
      this.items.forEach((e, index) => {
        this.items[index].grade = true; 
        if (e.menu_id == id) {
          this.items[index].active = true;
        }else {
           this.items[index].active = false;
         }
      });
       nextMenus.forEach((e2,index2)=>{
            e2.grade=true;
            e2.active=true;
            // nextMenus.active=true;
            // nextMenus.grade=true;
            console.log(this.items[0].active);
            console.log(this.items[0].grade);
           });
    },

     putData: function(dataResult){
        let  _this=this;
         // for (let i = 0;  ; i++) {
         //     if (dataResult[i].nextIdsMenu.nextIdsMenu.length==0
         //         &&dataResult[i].nextIdsMenu.nextIdsMenu[0].menu_id==""){
         //         break;
         //     }
         //     dataResult=dataResult[i].nextIdsMenu;
         //     _this.putData(dataResult[i].menu_id,dataResult[i].menu_name
         //         ,dataResult[i].menu_level,dataResult[i].nextIdsMenu );
         // }
     },
     // findNext: function (fatherMenuId,objFirstLevel,level) {
     //     let _this=this;
     //     const queryData = {
     //         menu_id: fatherMenuId
     //     };
     //     this.$ajax({
     //        url: _this.api.queryMenuByNextLevel,
     //        data:queryData,
     //        type:"GET",
     //         success:function (data) {
     //             data
     //            findNext();
     //         },
     //         error:function (data) {
     //
     //         }
     //
     //     })
     //
     //
     // }
  },
  mounted() {
      let _this=this;
      console.log(JSON.parse(sessionStorage.getItem("context")));
      let context=  JSON.parse(sessionStorage.getItem("context"));
      debugger;
      const queryData = {
          role_Id: context.user_role
      };
      _this.character=context.role_name;
     _this.username=context.user_name;
      this.$ajax({
          url: api.queryMenuByRoleId,
          data: queryData,
          type: "GET",
          success: function (data) {
              console.log(data);
              let dataResult = data.data;
              //渲染一级菜单 
              _this.items= dataResult;

          },
          error: function (data) {
              console.log(data);
          },
      });

     var findNext =function(fatherMenuId,objFirstLevel,level) {

          const queryData = {
              menu_id: fatherMenuId
          };
          _this.$ajax({
              url: api.queryMenuByNextLevel,
              data:queryData,
              type:"GET",
              success:function (data) {
                  
                  // let findNextResult;
                  var myArray=new Array()
                  for (let i = 0; i <data.data.length ; i++) {
                      var input1=_this.tmp;
                      input1.name=data.data[i].menu_name;
                      input1.id=data.data[i].menu_id;
                      input1.patch="/index/systemManage";
                      input1.grade=false;input1.active=false;
                        // objFirstLevel.menu_item.push(input);
                      myArray.push(input1);
                      _this.items[i].menu_item=myArray;
                      // findNextResult=   findNext(data.data[0].menu_id,objFirstLevel.menu_item[i],data.data[i].menu_level);
                  }
                // return objFirstLevel;

              },
              error:function (data) {

              }

          })


      }


  }
};
</script>

<style scoped>
.left-aside {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding-top: 50px;
}
.left-aside h1 {
  color: red;
}
.el-aside {
  background-color: #000;
  height: 100vh;
  text-align: center;
}
.el-header {
  background-color: #fff;
}
.el-main {
  background-color: #e8e8e8;
}
h1 {
  margin-bottom: 80px;
}
.first-menu {
  margin-bottom: 50px;
  height: 50px;
}
</style>
