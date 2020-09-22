<template>
  <el-container>
    <el-aside width="200px">
      <el-row class="left-aside">
        <h1>京北方</h1>
        <el-row>
          <template v-for="item of items">
            <jbf-menu
              class="first-menu"
              :name="item.name"
              :menuid="item.id"
              :key="item.id"
              :url="item.patch"
              @isActive="active(item.id)"
            >

              <template v-if="item.grade">
                <div v-show="item.active">
                  <jbf-menu
                    v-for="menu of item.menu_item"
                    :name="menu.name"
                    :url="menu.patch"
                    :menuid="menu.id"
                    :key="menu.id"
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
        {
          name: "需求管理",
          id: "menuid0",
          grade: true,
          active: true,
          patch: "/index/demandManage",
          menu_item: [
            // {
            //   name: "需求统计",
            //   id: "menuid00",
            //   grade: false,
            //   active: false,
            //   patch: "/index/demandManage/statistics"
            // },
            {
              name: "需求查询",
              id: "menuid01",
              grade: false,
              active: false,
              patch: "/index/demandManage/Inquire"
            }
          ]
        },
        {
          name: "客户管理",
          id: "menuid1",
          grade: false,
          active: false,
          patch: "/index/clientManage"
        },
        {
          name: "项目管理",
          id: "menuid2",
          grade: false,
          active: false,
          patch: "/index/projectManage"
        },
        // {
        //   name: "系统管理",
        //   id: "menuid3",
        //   grade: true,
        //   active: false,
        //   patch: "/index/systemManage",
        //   menu_item: [
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
      ],
        menus:{}
    };
  },
  components: {
    jbfMenu,
    pageHead
  },
  methods: {
    active: function(id) {
      this.items.forEach((e, index) => {
        this.items[index].active = false;
        if (e.id == id) {
          this.items[index].active = true;
        }
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
      debugger;
      console.log(JSON.parse(sessionStorage.getItem("context")));
      let context=  JSON.parse(sessionStorage.getItem("context"));
      const queryData = {
          role_Id: context.user_role
      };
      this.$ajax({
          url: api.queryMenuByRoleId,
          data: queryData,
          type: "GET",
          success: function (data) {
              console.log(data);
              let dataResult = data.data;
              // _this.putData(dataResult);
              //渲染一级菜单
              let datare;
              for (let i = 0; i <dataResult.length ; i++) {
                  _this.menus.name=dataResult[i].menu_name;
                  _this.menus.id=dataResult[i].menu_id;
                  _this.menus.patch= "/index/systemManage";
                  _this.menus.grade= false;
                  _this.menus.active=false;
                  // debugger;
                  datare= findNext(_this.menus.id,_this.menus,1);
              }
              _this.items.push(datare);

          },
          error: function (data) {
              console.log(data);
          },
      });

     var findNext =function(fatherMenuId,objFirstLevel,level) {
          let _this=this;
          const queryData = {
              menu_id: fatherMenuId
          };
          this.$ajax({
              url: _this.api.queryMenuByNextLevel,
              data:queryData,
              type:"GET",
              success:function (data) {
                  debugger;
                  let findNextResult;
                  for (let i = 0; i <data.data.length ; i++) {
                      if (level+1==data.data[i].level){
                          return objFirstLevel;
                      }
                      objFirstLevel.menu_item[i].name=data.data[i].menu_name;
                      objFirstLevel.menu_item[i].id=data.data[i].menu_id;
                      objFirstLevel.menu_item[i].patch= "/index/systemManage";
                      objFirstLevel.menu_item[i].grade= false;
                      objFirstLevel.menu_item[i].active=false;
                      findNextResult=   findNext(data.data[0].menu_id,objFirstLevel.menu_item[i],data.data[i].menu_level);
                  }
                return objFirstLevel;

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
