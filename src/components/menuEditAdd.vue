<template>
  <div class="formbox" v-show="formbox">
    <div class="formbox-box">
      <div class="flex-row">
        <label for="mobileno">菜单名称</label>
        <input type="text" id="mobileno" v-model="formboxmsg.mobileno" value="formboxmsg.mobileno"  />
      </div>
      <div class="flex-row">
        <div class="flex-row">
          <label >父级菜单</label>
          <!-- <el-select v-model="formboxmsg.transRole" disabled="disabled" > -->
             <select v-model="formboxmsg.transRole"  name="fatherMn">
          <option  >请输入</option>
          </select>
         <!-- <el-select v-model="formboxmsg.transRole" size="mini" placeholder="请选择" name="fatherMn">
             @click.native="checkFather(item.menu_id,item.menu_level_parent)" 
              <el-option
                v-for="item in options"
                :key="item.menu_id"
                :label="item.menu_name"
                :value="item.menu_id"
               ></el-option>
            </el-select> -->
            <!-- <el-select v-model="formboxmsg.transRole"  >
            <el-option
              v-for="item in options"
              :key="item.menu_id"
              :label="item.menu_name"
              :value="item.menu_id"
            ></el-option>
          </el-select> -->
        </div>
        <div class="flex-row">
          <label for="menu_level">菜单级别</label>
          <input type="text" id="menu_level" v-model="formboxmsg.menu_level" />
        </div>
      </div>
      <div class="flex-row">
        <label >路径</label>
        <input type="text" id="path" v-model="formboxmsg.path" />
      </div>
      <div class="flex-row">
        <label for="back_up">备注</label>
        <textarea id="back_up" v-model="formboxmsg.back_up"></textarea>
      </div>
      <div class="flex-row">
        <label >状态</label>
        <!-- <el-select v-model="formboxmsg.status" placeholder="请选择" > -->
          
          <!-- <el-option
            v-for="item in options"
            :key="item.status"
            :label="item.status"
            :value="item.status"
            v-if="item.status === "1"
          > </el-option> -->
        <!-- </el-select> -->
        <select v-model="formboxmsg.status">
          <option value="1" >上线</option>
            <option value="0" >下线</option>
        </select>
<!--        <input type="text" id="status" v-model="formboxmsg.status"/>-->
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
  name: "clientFormbox",
  props: {
    formbox: {
      type: Number, // 0-关闭，1-编辑, 2-增加
      default: false,
    },
    formboxmsg: {
      type: Object
    
    },
      options:{
      }
  },
  methods: {
    close: function () {
      //console.log(this.formbox)
      this.$emit("close", this.formbox);
    },
    submit: function () {
       
        let msg = {
            formbox: this.formbox,
            formboxmsg: this.formboxmsg,
            menuId: "M_919679488",
            menuName: "客户管理",
            menu_level_parent:"0",
            menu_level:"1",
            path:"/menu/menu001",
            back_up:"er",
            status:"0"
        };
      this.$emit("submit",msg);
      // this.runsubmit();
    },

  },
    // runsubmit:function (msg) {
    //         // let  _this=this;
    //         let msg1 = {
    //             formbox: this.formbox,
    //             formboxmsg: this.formboxmsg,
    //         };
    //         this.$ajax({
    //             url: api.updateMenuMngerInfo,
    //             data: {
    //                 menuId: "M_919679488",
    //                 menuName: "客户管理",
    //                 menu_level_parent:"0",
    //                 menu_level:"1",
    //                 path:"/menu/menu001",
    //                 back_up:"er",
    //                 status:"0"
    //             },
    //             type: "PUT",
    //             success: function(data) {
    //                 debugger;
    //                 _this.$set(_this.tableData, "tableDataItem", data.data);
    //             },
    //             error: function(data) {
    //                 debugger;
    //                 if (data == 500) {
    //                 }
    //             }
    //         });
    //     }

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
