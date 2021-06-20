<template>
  <div id="header">
    <div class="header-menu">
      <nuxt-link to="/" class="header-title">Trace</nuxt-link>
      <div class="menu-icons">
        <p v-if="$auth.loggedIn">Name：{{ $auth.user.name  }}</p>
        <div class="icon">
          <img src="../assets/cart.png" alt="" @click="cart">
        </div>
        <div class="icon">
          <img src="../assets/Vector.png" alt="" @click="mypage">
        </div>
        <div class="icon">
          <img src="../assets/logout.png" alt="" @click="logout" v-if="$auth.loggedIn">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    methods: {
      async mypage() {
        this.$router.push('mypage') 
      },
      async cart() {
        this.$router.push('cart') 
      },
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
<style>
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
    margin: 10px auto ;
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
  }

</style>
