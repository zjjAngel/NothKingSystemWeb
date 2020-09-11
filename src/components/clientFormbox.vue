<template>
  <div class="formbox" v-show="formbox">
    <div class="formbox-box">
      <div class="flex-row">
        <div class="flex-row">
          <label for="custname">客户名称</label>
          <input type="text" id="custname" v-model="formboxmsg.custname" />
        </div>
        <div class="flex-row">
          <label for="company">公司</label>
          <input type="text" id="company" v-model="formboxmsg.company" />
        </div>
      </div>
      <div class="flex-row">
        <label for="mobileno">联系方式</label>
        <input type="text" id="mobileno" v-model="formboxmsg.mobileno" />
      </div>
      <div class="flex-row">
        <label for="adress">详细地址</label>
        <textarea id="adress" v-model="formboxmsg.adress"></textarea>
      </div>
      <div class="flex-row">
        <label for="region">区域</label>
        <input type="text" id="region" v-model="formboxmsg.region" />
      </div>
      <div class="flex-row">
        <div class="flex-row">
          <label for="relationname">维系人</label>
          <input type="text" id="relationname" v-model="formboxmsg.relationname" />
        </div>
        <div class="flex-row">
          <label for="relatemobilNo">维系人联系方式</label>
          <input type="text" id="relatemobilNo" v-model="formboxmsg.relatemobilNo" />
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
                'formboxmsg': this.formboxmsg
            }
            this.$emit("submit", msg)
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