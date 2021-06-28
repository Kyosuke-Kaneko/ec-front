<template>
  <div id="header">
    <div class="header-menu">
      <nuxt-link to="/" class="header-title">Trace</nuxt-link>
      <div class="menu-icons">
        <p v-if="$auth.loggedIn">Name：{{ $auth.user.name  }}</p>
        <div class="icon">
          <img src="../assets/cart.png" alt="cart-img" @click="$router.push('cart')">
        </div>
        <div class="icon">
          <img src="../assets/user.png" alt="user-img" @click="$router.push('mypage')">
        </div>
        <div class="icon">
          <img src="../assets/logout.png" alt="logout-img" @click="logout" v-if="$auth.loggedIn">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    async logout() {
      if(window.confirm( this.$auth.user.name + 'さん、本当にログアウトしますか？')) {
        try {
          await this.$auth.logout();
          this.$store.commit('cart/allDelete');
          console.log("ログアウト成功");
        } catch (e) {
          console.log(e);
        }
      };
    }
  },
}
</script>
<style scoped>
.header-title {
  font-size: 40px;
  font-family: Adamina;
  text-decoration: none;
  color: black;
}
.header-menu {
  width: 90%;
  display: flex;
  justify-content: space-between;
  margin: 15px auto ;
  padding-bottom: 5px;
  align-items: center;
  border-bottom: 1px #E5E5E5 solid;
}
.menu-icons {
  display: flex;
  justify-content: space-between;
}
.menu-icons p {
  margin-right: 15px;
}
.icon img{
  width: 24px;
  height: 24px;
  margin-right: 15px;
  cursor: pointer;
}
</style>
