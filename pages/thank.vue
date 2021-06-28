<template>
  <div id="thank">
    <div class="main">
      <p class="mes">ありがとうございます。注文が確定されました。</p>
      <p>注文内容と配送状況についてはEメールでお知らせをご確認ください。</p>
      <div class="thank-box">
        <span>注文番号</span>
        <p class="history-num">{{ $route.query.order_num }}</p>
        <p>で承りました</p>
        <button class="thank-button" @click="$router.push('/')">ショッピングを続ける</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  middleware:["redirect"]
}
</script>
<style scoped>
.main {
  display: flex;
  align-items: center;
  flex-flow: column;
  min-height: 100vh;
  padding-top: 10%;
}
.mes{
  font-weight: bold;
  font-size: 40px;
  line-height: 58px;
  margin-bottom: 25px;
}
.thank-box {
  width: 50%;
  height: 30vh;
  background-color:#EEEEEE ;
  display: flex;
  align-items: center;
  flex-flow: column;
  font-size: 20px;
  padding: 50px;
  margin-top: 60px;
  justify-content: space-evenly;
}
.thank-box span {
  font-weight: bold;
  margin-bottom: 20px;
}
.thank-box .history-num {
  font-weight: bold;
  font-size: 25px;
  margin-bottom: 30px;
}
.thank-button {
  width: 50%;
  height: 50px;
  color: #ffffff;
  background: #80A31D;
  border-radius: 24px;
  border: none;
  margin-top: 30px;
  padding: 5px;
  font-size: 20px;
  font-weight: bold;
}
</style>
