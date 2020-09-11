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
import jbfMenu from "@/components/left_menu";
import pageHead from "@/components/head"
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
        {
          name: "系统管理",
          id: "menuid3",
          grade: true,
          active: false,
          patch: "/index/systemManage",
          menu_item: [
            {
              name: "用户管理",
              id: "menuid30",
              grade: false,
              active: false,
              patch: "/index/systemManage/user"
            },
            {
              name: "角色管理",
              id: "menuid31",
              grade: false,
              active: false,
              patch: "/index/systemManage/role"
            },
            {
              name: "菜单管理",
              id: "menuid32",
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
    active: function(id) {
      this.items.forEach((e, index) => {
        this.items[index].active = false;
        if (e.id == id) {
          this.items[index].active = true;
        }
      });
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
