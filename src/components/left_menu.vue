<template>
  <div @click="isActive(menuid)">
    <router-link class="routerLink" :to="url">{{menuname}}</router-link>
    <slot class="slotStyle"></slot>
  </div>
</template>

<script>
export default {
  name: "left_menu",
  data() {
    return {
      menuname: this.name
    };
  },
  props: {
    name: String,
    menuid: String,
    url: String,
  },
  methods: {
    isActive: function(id) {
      return this.$emit("isActive", id);
    }
  }
};
</script>

<style scoped>
.routerLink{
  color: #86898C;
}
.slotStyle{
  font-size: 5vh;
}

a, span{
  color: #9c9999;
  font-size: 13px;
}
a {
  text-decoration: none;
}
.router-link-active {
  text-decoration: none;
  color: #fff;
}
</style>
