<template>
  <div class="formbox" v-show="formbox">
    <div class="formbox-box">
      <div class="flex-row">
        <div class="flex-row">
          <label for="custname">项目名称</label>
          <input type="text" id="prodname" v-model="formboxmsg.prodname" />
        </div>
        <div class="flex-row">
          <label for="company">项目类型</label>
          <input type="text" id="prodtype" v-model="formboxmsg.prodtype" />
        </div>
      </div>
      <div class="flex-row">
        <div class="block">
              <span class="demonstration" style="font-weight: bold;display: inline-block;min-width: 120px;">起始时间</span>
              <el-date-picker 
              v-model="formboxmsg.starttime" 
              type="date" 
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              size="mini"
              style="width:170px;border: #000 1px solid;border-radius: 4px;">
              </el-date-picker>
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
  name: "prodFormbox",
  data() {
    return {
      starttime: ''
    }
  },
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
    close: function() {
      this.$emit("close", this.formbox);
    },
    submit: function() {
      let msg = {
        formbox: this.formbox,
        formboxmsg: this.formboxmsg
      };
      console.log(msg.formboxmsg.starttime)
      this.$emit("submit", msg);
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
textarea {
  resize: none;
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
  width: 100%;
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