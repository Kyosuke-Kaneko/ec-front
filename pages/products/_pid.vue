<template>
  <div id="detail">
    <div class="main">
      <div class="detail-box">
        <div class="product-info">
          <img v-bind:src=this.$store.state.select.url alt="">
          <div class="info-box">
            <div class="product-name">{{this.$store.state.select.name}}</div>
            <div class="product-price">¥{{this.$store.state.select.price | addComma}}(税込)</div>
            <label>個数<input type="number" v-model="amount" min="0" @change="restrict($event)"
            ></label>
            <button class="cart" @click="cart">
              カートに入れる
            </button>
          </div>
        </div>
        <div class="product-description">
          <p class="header">{{this.$store.state.select.header}}</p>
          <p class="description">{{this.$store.state.select.description}}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  middleware:["redirect"],
  data() {
    return {
      amount:0
    };
  },
  methods: {
    cart() {
      let amount = Number(this.amount);
      if(Number.isInteger(amount)) {
        if (amount === 0) {
          alert ("個数が0です");
          return
        }
        this.$store.dispatch('cart/add_product_to_cart',amount);
        this.$router.push('cart') 
      } else {
        this.amount = 0; //これがないとdata上は小数点にみなされる
        alert("個数が不適切です");
        return
      }
    },
    restrict(event) {
      let inputNum = Math.floor(event.target.value);
      if(inputNum < 0)  {
        inputNum = 0;
      }
      event.target.value = inputNum;
    }
  }
}
</script>
<style>
  #detail {
    min-height: 100vh;
  }
  #detail .main {
    margin:0 auto;
    width: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 100px 0;
  }
  .detail-box {
    width: 55%;
    height: 50%;
  }
  .product-info {
    display: flex;
  }
  .product-info img {
    width: 230px;
    height: 230px;
    object-fit: cover;
  }
  .info-box {
    display: flex;
    flex-direction: column;
    width: 70%;
    padding-left: 30px;
  }
  .info-box .product-name {
    font-size: 30px;
    line-height: 43px;
    margin-bottom: 30px;
  }
  .product-info .info-box .product-price {
    font-weight: bold;
    font-size: 40px;
    margin-bottom: 20px;
  }
  .info-box input {
    background: #EFEFEF;
    border-radius: 3px;
    width: 20%;
    border: none;
    margin-left: 5px;
  }
  .product-description {
    padding-top: 100px;
  }
  .header {
    font-weight: bold;
    font-size: 20px;
    line-height: 27px;
    margin-bottom: 20px;
  }
  .description {
    font-size: 16px;
  }
  .info-box button {
    line-height: 29px;
    color: #FFFFFF;
    font-size: 20px;
    background: #80A31D;
    border-radius: 24px;
    border: none;
    width: 223px;
    position: relative;
    
  }
  .cart {
    margin-top: 20px;
  }
  .cart::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 15px;
    background: url(~/assets/whitecart.png) no-repeat;
    background-size: cover;
    width: 20px;
    height: 20px;
    transform: translate(0, -50%);
  }
</style>
