<template>
  <div id="app">
    <div class="main">
      <div class="top-image">
        <img src="../assets/sandal.jpg" alt="top-image">
        <div class="catch-box">
          <div class="catch">New Arrivals</div>
          <div class="sub-catch">for BOYS & GIRLS</div>
        </div>
      </div>
      <div class="line-up">
        <h2 class="line-up-header">Products</h2>
        <client-only placeholder="Loading...">
          <ul class="line-up-products">
            <li v-for="product in getItems" :key="product.id" class="cards" @click="toDetail(product.id)">
              <img :src=product.url alt="product-image">
              <div class="product-name">{{product.name}}</div>
              <div class="product-price">¥{{product.price | addComma}}(税込)</div>
            </li>
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
      // const productsData = await this.$axios.get("http://127.0.0.1:8000/api/product");
      const productsData = await this.$axios.get("https://ecback.kyosuke-k.com/api/product");
      this.products = productsData.data.data;
    },
    toDetail(id) {
      const extractedPro = this.products.splice(
      this.products.findIndex((obj) => obj.id === id ),1);
      this.$store.dispatch('select/select', extractedPro)
      this.$router.push('detail')
    },
    clickCallback(pageNum) {
      this.currentPage = Number(pageNum);
    }
  },
  computed: {
    getItems() {
      const current = this.currentPage * this.parPage;
      const start = current - this.parPage;
      return this.products.slice(start, current);
    },
    getPageCount() {
      return Math.ceil(this.products.length / this.parPage);
    }
  },
  mounted() {
    this.getProducts();
  }
}
</script>
<style scoped>
.main {
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
.cards {
  width: 23%;
  margin-right: 2%;
  margin-bottom: 10px;
}
.cards img {
  width: 100%;
  object-fit: cover;
  max-height: 210px;
}
</style>
