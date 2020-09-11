<template>
  <div class="formbox" v-show="formbox">
    <div class="formbox-box">
        <div class="flex-row">
          <label>用户名</label>
          <input type="text" v-model="formboxmsg.user_name" />
        </div>
      <div class="flex-row">
        <label>备注</label>
        <textarea v-model="formboxmsg.back_up"></textarea>
      </div>
      <div class="flex-row">
        <label>分配角色</label>
        <!-- <input type="text" v-model="formboxmsg.region" /> -->
        <el-select v-model="formboxmsg.transRole" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.role_id"
          :label="item.role_name"
          :value="item.role_id">
        </el-option>
      </el-select>
      </div>
      <div class="flex-row">
        <div class="flex-row">
          <label  >修改密码</label>
          <input type="password"  v-model="formboxmsg.password" />
          <label class="resetPas" @click="resetPas">重置密码</label>
        </div>
      </div>
      <div class="flex-row btn">
        <button @click="close">取消</button>
        <button class="primary" @click="submit">保存</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'clientFormbox',
    props: {
        formbox: {
            type: Number, // 0-关闭，1-编辑, 2-增加
            default: false
        },
        formboxmsg: {
            type: Object
        },
        options:{
            type:Array
        }
    },
    data() {
    return {
      transRole : ''
    }
    },
    methods: {
        close: function(){
            //console.log(this.formbox)
            this.$emit("close", this.formbox)
        },
        submit: function() {
            let msg = {
                'formbox': this.formbox,
                'formboxmsg': this.formboxmsg,
                'value': this.value
            }
            this.$emit("submit", msg)
        },
        resetPas: function(){
          this.$emit("resetPas",this.formbox)
        }
    }
};
</script>

<style scoped>
.formbox {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}
label {
  font-weight: bold;
  min-width: 120px;
}
textarea{
   resize:none;
   width: 490px;
   height: 60px;
}
.formbox-box {
  width: 50vw;
  height: 70vh;
  background-color: rgba(255, 255, 255, 1);
  border: 1px solid;
  padding: 20px;
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  justify-content: space-around;
}
.flex-row {
  display: flex;
  flex-flow: row nowrap;
  width: 100%
}
.resetPas{
    color: #169BD5;
}
.btn {
  justify-content: space-around;
}
button {
  border-radius: 20px;
  padding: 12px 23px;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  width: 200px;
}
.primary {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}
</style>
