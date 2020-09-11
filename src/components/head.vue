<template>
  <div class="page-head">
      <el-menu>
        <el-submenu index="1">
          <template slot="title">
            <div class="page-msg">
                <span class="page-character">{{character}}</span>
                <span class="page-username">{{username}}</span>
            </div>
          </template>
          <el-menu-item index="1-1" @click="returnLog">退出</el-menu-item>
        </el-submenu>
      </el-menu>
  </div>
</template>

<script>
export default {
    name: 'page-head',
    data() {
        return {

        }
    },
    props: {
        username: String,
        character: String
    },
    methods: {
      returnLog(){
          this.$router.push({name: 'login'});
          sessionStorage.clear()
      }
    },
}
</script>

<style scoped>
    .page-head{
        box-sizing: border-box;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: flex-end;
    }
    .page-msg{
        box-sizing: border-box;
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
        font-size: 12px;
    }
    .page-msg>span{
        box-sizing: border-box;
        height: 15px;
        margin-bottom: 2px
    }
    .character{
        font-size: 13px
    }
    .page-usernam{
        color: #e5e5ee
    }
    .el-menu{
        box-sizing: border-box;
        border: none;
        width: 100px;
    }
    .el-submenu, .el-menu-item{
        box-sizing: border-box;
        min-width: 100px !important;
        padding: 0 !important;
        text-align: center
    }
</style>
