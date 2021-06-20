<template>
  <div id="app">
    <div class="main">
      <div class="top-image">
        <img src="../assets/haley-truong-LnR6-7P2YNk-unsplash.jpg" alt="">
        <div class="catch-box">
          <div class="catch">New Arrivals</div>
          <div class="sub-catch">for BOYS & GIRLS</div>
        </div>
      </div>
      <div class="line-up">
        <div class="line-up-header">
          Products
        </div>
          <client-only placeholder="Loading...">
            <ul class="line-up-products">
              <li v-for="product in getItems" :key="product.id" class="Icards" @click="toDetail(product.id)"><img v-bind:src=product.url alt="">
              <div class="product-name">{{product.name}}</div>
              <div class="product-price">¥{{product.price | addComma}}(税込)</div></li>
            </ul>
        <paginate v-if="(getPageCount > 1)"
          :page-count="getPageCount"
          :page-range="3"
          :margin-pages="2"
          :click-handler="clickCallback"
          :prev-text="'前へ'"
          :next-text="'次へ'"
          :container-class="'pagination-box'"
          :page-class="'pagination-item'"
          :page-link-class="'pagination-item__link'"
          :prev-class="'pagination-btn pagination-prev'"
          :prev-link-class="'pagination-btn__link'"
          :next-class="'pagination-btn pagination-next'"
          :next-link-class="'pagination-btn__link'"
          :hide-prev-next="true"
          >
        </paginate>
      </client-only>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products:[],
      parPage: 8,
      currentPage: 1,
    };
  },
  methods: {
    async getProducts() {
      const productsdata = await this.$axios.get("http://127.0.0.1:8000/api/product");
      this.products = productsdata.data.data;
      console.log(this.products)
    },
    toDetail(id) {
      const extractedPro = this.products.splice(
      this.products.findIndex((obj) => obj.id === id ),1);
      this.$store.dispatch('select/select', extractedPro)
      this.$router.push('products')
    },
    clickCallback: function (pageNum) {
      this.currentPage = Number(pageNum);
    }
  },
  computed: {
    getItems: function() {
       let current = this.currentPage * this.parPage;
       let start = current - this.parPage;
       return this.products.slice(start, current);
     },
    getPageCount: function() {
      return Math.ceil(this.products.length / this.parPage);
    }
   },

  mounted() {
    this.getProducts();
  }
}
</script>
<style >
  #app .main {
    margin:0 auto;
    width: 90%;
  }
  .top-image img {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .catch-box {
    font-family: Adamina;
    position: absolute;
    top: 50%;
    left: 58%;
  }
  .catch {
    font-size: 70px;
    line-height: 95px;
  }
  .sub-catch {
    font-size: 28px;
    line-height: 38px;
  }
  .line-up {
    width: 100%;
    height: 100%;
    padding: 0 10px;
  }
  .line-up-header {
    font-size: 40px;
    text-align: center;
    margin: 15px 0;
  }
  .line-up-products {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 15px;
  }
  .Icards {
    width: 23%;
    margin-right: 2%;
    margin-bottom: 10px;
  }
  .Icards img {
    width: 100%;
    object-fit: cover;
    max-height: 210px;
  }
  .pagination-box {
    display: flex;
    justify-content: center;
    margin: 40px 0;
  }
  .pagination-btn__link,
  .pagination-item__link {
    border: solid 2px #80A31D;
    border-radius: 20px;
    text-align: center;
    padding: 4px 0;
    margin: 0 .25rem;
    display: block;
    width: 50px;
  }
  .pagination-btn__link:hover,
  .pagination-item__link:hover {
    background-color: #80A31D;
    color: #fff;
  }
  .active .pagination-item__link {
    list-style: none;
    background-color: #80A31D;
    color: #fff;
    pointer-events: none;
  }
  .pagination-next, .pagination-prev {
    font-size: 13px;
    font-weight: bold;
  }
  li {
    list-style-type:none;
  }
</style>