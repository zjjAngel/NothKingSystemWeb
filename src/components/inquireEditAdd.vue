<template>
  <div class="reqbox" v-show="reqbox">
    <div class="req-box">
      <div class="re-row">
        <div class="re-row">
          
          <label for="project">项目</label>
          <input type="text" id="project" v-model="reqboxmsg.project" />
        </div>
        <div class="re-row">
          <label >岗位</label>
          <input type="text" id="post" v-model="reqboxmsg.post" />
        </div>
      </div>
      <div class="re-row">
        <label for="renum">需求人数</label>
        <input type="text" id="renum" v-model="reqboxmsg.renum" />
      </div>
      <div class="re-row">
        <label for="requestion">要求</label>
        <input type="text" id="requestion" v-model="reqboxmsg.requestion"></textarea>
      </div>
      <div class="re-row">
        <label for="priority">优先级</label>
        <input type="text" id="priority" v-model="reqboxmsg.priority" />
      </div>
    

      </div>
      <div class="re-row btn">
        <button @click="close">取消</button>
        <button class="primary" @click="submit">保存</button>
      </div>
    </div>
  <!--</div>-->
</template>

<script>
export default {
    name: 'inquireFormbox',
    props: {
        reqbox: {
            type: Number, // 0-关闭，1-编辑, 2-增加 
            default: false
        },
        reqboxmsg: {
            type: Object
        }
    },
    methods: {
        close: function(){
            //console.log(this.formbox)
            this.$emit("close", this.reqbox)
        },
        submit: function() {
            let msg = {
                'reqbox': this.reqbox,
                'reqboxmsg': this.reqboxmsg
            }
            this.$emit("submit", msg)
        }
    }
};
</script>

<style scoped>
/* .reqbox {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  /* background-color: #ffffff; */
  /* position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999; */
/* } */ 
label {
  font-weight: bold;
  min-width: 120px;
}
textarea{
   resize:none;
   width: 490px;
   height: 60px;
}
.reqbox-box {
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