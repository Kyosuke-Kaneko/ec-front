<template>
  <div id="mypage">
    <div class="main">
      <div class="history-box">
        <div class="history-headder">
          購入履歴
        </div>
          <client-only placeholder="Loading...">
            <ul class="history-cards">
              <li v-for="(history,id) in getItems" :key="id" class="cards">
                <img v-bind:src=history.url alt="">
                <div class="info-box">
                  <div class="history-num">注文番号:{{ history.history_id}}</div>
                  <div class="history-inner-box">
                    <div class="product-name">{{history.name}}</div>
                    <div class="right-box">
                      <div class="history-date">{{history.orderedDate}}</div>
                      <div class="product-price">合計{{history.amount}}個</div>
                      <div class="product-price">¥{{history.price}}(税込)</div>
                    </div>
                  </div>
                  <div @click="toDetail(history.product_id)">もう一度購入する</div>
                </div>
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
  middleware:["redirect"],
  data() {
    return {
      filterdHistories:[],
      parPage: 8,
      currentPage: 1,
    };
  },
  methods: {
    async getHistory() {
      const historyData =await this.$axios.get("http://127.0.0.1:8000/api/detail")
      console.log(historyData);
      let currentUser = this.$auth.user.id;
      let histories = historyData.data.data.reverse();
      this.filterdHistories = histories.filter(function(value) {
        if (value.user_id === currentUser) {
          return value
        }
      });
      console.log(this.filterdHistories);
    },
    toDetail(id) {
      console.log(id);
      const extractedPro = this.filterdHistories.splice(
      this.filterdHistories.findIndex((obj) => obj.id === id ),1);
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
        return this.filterdHistories.slice(start, current);
      },
    getPageCount: function() {
      return Math.ceil(this.filterdHistories.length / this.parPage);
    }
  },
  mounted() {
    this.getHistory();
  }
}
</script>
<style>
#mypage .main {
    margin:0 auto;
    width: 90%;
    padding-top: 70px;
  }
  .history-box {
    width: 63%;
    margin: 0 auto;
  }
  .history-headder {
    font-weight: bold;
    font-size: 30px;
    line-height: 43px;
    border-bottom: 1px solid #828282;
    padding-bottom: 30px;
  }
  .cards {
    display: flex;
    border-bottom: 1px solid #828282;
    padding: 20px 0;
  }
  .cards img {
    width: 150px;
    height: 150px;
    object-fit: cover;
  }
  .history-cards {
    padding: 0 !important;
    margin-bottom: 40px;
  }
  .info-box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 20px;
    font-size: 14px;
    line-height: 19px;
    color: #6C6C6C;
    width: 100%;
    
  }
  .history-inner-box {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .product-name {
    font-size: 25px;
    line-height: 26px;
    color: #000000;
  }
  .history-inner-box .right-box {
    width: 50%;
    display: flex;
    justify-content: space-between;
    padding-right: 10px;
  }
  .info-box a {
    text-decoration: none;
    color: #6C6C6C;
  }

</style>
