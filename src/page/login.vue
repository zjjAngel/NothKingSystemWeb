<template lang="html">
  <div class="login">
      <div class="login_form">
        <h1>vue-admin</h1>
        <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        <el-input placeholder="请输入密码" v-model="form.password" show-password @keyup.enter="login"></el-input>
        <el-button type="primary" @click="login">登录</el-button>
        <!-- <el-button type="primary" @click="test">测试</el-button> -->
      </div>
  </div>
</template>
<script>
import { MessageBox } from "element-ui";
import * as api from "@/utils/api"
export default {
    name: "login",
    data() {
        return {
            form: {
                username: '',
                password: '',
            },
            context:{
                user_id:'',
                user_name:'',
                user_role:''
            }
        }
    },
    methods: {
      login: function() {
        let _this = this
        if(this.form.username.length === '' || this.form.username.length === null || this.form.password.length < 6) return MessageBox.alert('请输入正确的用户名密码')
        this.$ajax(
          {
            "url": api.login1,
            "data" : {
              "userid": "ZHUJXD",
              "username": this.form.username,
              "password": this.form.password
            },
            "type" : "POST",
            "success": function(data) {
               _this.context.user_id=data.data.user_id;
                _this.context.user_name=data.data.user_name;
                _this.context.user_role=data.data.user_role;
               sessionStorage.setItem("session", data.data)
               sessionStorage.setItem('sessionId',data.data.sessionId)
               sessionStorage.setItem("context",JSON.stringify(_this.context));
               _this.$router.push({name: 'index'});
            },
            "error": function(data) {
              console.log(data)
            }
        })
      },
      test: function() {
         this.$ajax(
          {
            "url": api.test,
            "data" : "",
            "type" : "POST",
            "success": function(data) {
              console.log(data)
            },
            "error": function(data) {
              console.log(data)
            }
        })
      }
    }
}
</script>

<style>
.login{
  background-color: #f5f5f5;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login_form{
  background-color: #fff;
  display: flex;
  flex-flow: column nowrap;
  align-items: start;
  justify-content: space-around;
  height: 50vh;
  width: 50vw;
  border: 1px solid #cfd8dc;
  padding: 35px;
}
</style>
