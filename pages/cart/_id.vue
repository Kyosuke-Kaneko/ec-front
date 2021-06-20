<template>
  <div id="_id">
    <div class="main">
      <div class="cart-box">
        <p>ショッピングカート</p>
        <div class="cart-index">
          <div v-for="(product, index) in  products" :key="product.id" class="Ccards">
              <img :src=product.url alt="">
              <div class="card-inner">
                <div class="product-name">{{product.name}}</div>
                  <div class="right-box">
                    <label>個数<input type="number" min="0"  :value="product.amount" @change="changeAmo(product.id, $event)"></label>
                    <div class="product-price">¥{{product.price | addComma}}(税込)</div>
                  </div>
                  <button @click="deleteProduct(product.id, index)">削除する</button>
                </div>
          </div>
        </div>
      </div>
      <div class="total-box">
        <div class="total-ptice">合計：¥{{ totalPrice | addComma}} 税込</div>
        <button class="check-btn" @click="orderCart">注文する</button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
export default {
  middleware:["redirect"],
  data() {
    return {
      products: [],
      totalPrice:"",
    };
  },
  methods: {
    deleteProduct(id) {
      this.$store.commit('cart/deleteProduct',id);
      this.$store.dispatch('cart/calTotalPrice');
    },
  async orderCart() {
    // console.log("first")//値を変えていないときの最初の処理
    let uuid = uuidv4();
    let checkNum = this.products.every((value) => {
      let amount = Number(value.amount);
      return amount > 0 || amount !== 0 
      })
    if (checkNum) {
      const detailData = this.products.map(value => ({
        "history_id":uuid,
        "product_id":value.id,
        "amount":value.amount
      }));
      console.log(detailData);
      await axios.post("http://127.0.0.1:8000/api/detail", detailData).then(() => {
        this.$store.commit('cart/allDelete');
      })
      const historyData = {
        "history_id":uuid,
        "user_id":this.$auth.user.id,
        "total_price":this.totalPrice
      }
      await axios.post("http://127.0.0.1:8000/api/history", historyData)
      console.log(historyData)
      this.$router.push({name:'thank',query:{order_num:uuid}});
      } else {
        alert("個数が不適切です")
      }
    },
    changeAmo(id,event) {
      // console.log("second");//値変動時の最初の行動(ordercartより先)
      let inputNum = Number(event.target.value);//event.target.valueはstring判定
      if (Number.isInteger(inputNum) === false || inputNum < 0) {
        alert("個数が不適切です")//alertのおかげでordercartのクリックイベント発生しない
        inputNum = 0;
      }
      event.target.value = Math.floor(inputNum);
      this.$store.commit('cart/changeAmount',{ currentAmo: event.target.value,id:id });
      this.$store.dispatch('cart/calTotalPrice');
    },
  },
  mounted() {
    this.$store.dispatch('cart/calTotalPrice');
    this.totalPrice = this.$store.getters['cart/totalPrice'];
    this.products =this.$store.getters['cart/currentProducts'];
    
  },
  computed: {
    storePrice: function() {
      return this.$store.getters["cart/totalPrice"];
    },
    storeProducts: function() {
      return this.$store.getters["cart/currentProducts"];
    },
  },
  watch: {
    storePrice(values) {
      this.totalPrice = values;
    },
    storeProducts(value) {
      this.products = value;
    }
  },
}
</script>
<style>
  #_id {
    min-height: 100vh;
  }
  #_id .main {
    margin:0 auto;
    width: 90%;
    padding-top: 70px;
    display: flex;
  }
  .cart-box {
    width: 52%;
    height: 85%;
    margin-bottom: 70px;
  }
  .cart-box p{
    font-size: 30px;
    border-bottom: 1px solid #828282;
    font-weight: bold;
    padding-bottom: 30px;
  }
  .Ccards {
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #828282;
    padding: 10px 0;
  }
  .Ccards .card-inner {
    width: 75%;
    height: 100px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    position: relative;
  }
  .Ccards img {
    width: 20%;
    object-fit: cover;
  }
  .Ccards .card-inner input {
    width: 55%;
    height:26px;
  }
  .Ccards .card-inner label {
    width: 50%;
    height:26px;
  }
  .Ccards .product-name {
    font-size: 18px;
    position: absolute;
    top: 30%;
  }
  .Ccards .product-price {
    font-size: 14px;
    line-height: 19px;
  }
  .card-inner .right-box {
    position: absolute;
    right: 0;
    top: 30%;
    display: flex;
    align-items: center;
    width: 40%;
  }
  .card-inner button{
    display: inline;
    font-size: 14px;
    border: none;
    padding-bottom: 0;
    position: absolute;
    bottom: 0;
    color: #6C6C6C;
    font-weight: normal;
    background-color: transparent;
  }
  .total-box {
    width: 30%;
    height: 210px;
    background-color: #F7F7F7;
    margin: 0 auto;
    margin-top: 65px;
    text-align: center;
    }
  .total-ptice {
    font-weight: bold;
    font-size: 30px;
    width: 100%;
    margin-top: 40px;
  }
  .check-btn {
    font-weight: bold;
    line-height: 29px;
    color: #FFFFFF;
    font-size: 20px;
    background: #80A31D;
    border-radius: 24px;
    border: none;
    width: 223px;
    margin-top: 30px;
  }
</style>
