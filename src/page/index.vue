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
        {
          menu_name: "需求管理",
          menu_id: "menuid0",
          grade: true,
          active: true,
          patch: "/index/demandManage",
          nextIdsMenu: [
            // {
            //   name: "需求统计",
            //   id: "menuid00",
            //   grade: false,
            //   active: false,
            //   patch: "/index/demandManage/statistics"
            // },
            {
              menu_name: "需求查询",
              menu_id: "menuid01",
              grade: false,
              active: false,
              patch: "/index/demandManage/Inquire"
            }
          ]
        },
        {
          menu_name: "客户管理",
          menu_id: "menuid1",
          grade: false,
          active: false,
          patch: "/index/clientManage"
        },
        {
          menu_name: "项目管理",
          menu_id: "menuid2",
          grade: false,
          active: false,
          patch: "/index/projectManage"
        },
        {
          menu_name: "系统管理",
          menu_id: "menuid3",
          grade: true,
          active: false,
          patch: "/index/systemManage",
          nextIdsMenu: [
            {
                menu_name: "用户管理",
                menu_id: "menuid30",
              grade: false,
              active: false,
              patch: "/index/systemManage/user"
            },
            {
              menu_name: "角色管理",
              menu_id: "menuid31",
              grade: false,
              active: false,
              patch: "/index/systemManage/role"
            },
            {
                menu_name: "菜单管理",
                menu_id: "menuid32",
              grade: false,
              active: false,
              patch: "/index/systemManage/menu"
            }
          ]
        }
      ]
    };
  },
  components: {
    jbfMenu,
    pageHead
  },
  methods: {
    active: function(id,nextMenus) {
        this.items.forEach((e, index) => {
            debugger;
            this.items[index].grade = true;
            if (e.menu_id == id) {
                this.items[index].active = true;
            }
        });
        nextMenus.forEach((e2,index2)=>{
            e2.active=true;
            // nextMenus.active=true;
            e2.grade=true;
            // nextMenus.grade=true;
            console.log(this.items[0].active);
            console.log(this.items[0].grade);
           });
    },

     putData: function(dataResult){
        let  _this=this;
     },
  },
  mounted() {
      let _this=this;
      console.log(JSON.parse(sessionStorage.getItem("context")));
      let context=  JSON.parse(sessionStorage.getItem("context"));
      const queryData = {
          role_Id: context.user_role
      };
     _this.username=context.user_name;
      this.$ajax({
          url: api.queryMenuByRoleId,
          data: queryData,
          type: "GET",
          success: function (data) {
              debugger;
              console.log(data);
              //渲染所有菜单
              _this.items=data.data;
              console.log(_this.items);
          },
          error: function (data) {
              console.log(data);
          },
      });

  },


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
