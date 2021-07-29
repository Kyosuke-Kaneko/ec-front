<template>
  <div id="register">
    <div class="main">
      <div class="form-box">
        <div class="login-box box">
          <h2 class="header">ログイン</h2>
          <div class="form-inner">
            <p>会員のお客さま</p>
            <div class="innder-description">メールアドレスとパスワードを入力してログインしてください。</div>
            <validation-observer ref="obs" v-slot="ObserverProps">
              <form @submit.prevent="login" class="inner-elements">
                  <validation-provider v-slot="{ errors }" rules="required|email">
                    <div class="error">{{ errors[0] }}</div>
                    <div class="element">
                      <label for="mail">メールアドレス:</label>
                      <input type="email" v-model="loginEmail" placeholder="email" id="email">
                    </div>
                  </validation-provider>
                    <validation-provider v-slot="{ errors }" vid="passwordConfirm" rules="required|min:6|alpha_dash">
                    <div class="error">{{ errors[0] }}</div>
                    <div class="element">
                      <label for="password">パスワード:</label>
                      <input type="password" v-model="loginPassword" placeholder="password" id="password">
                    </div>
                  </validation-provider>
                <button type="submit" class="login-button" :disabled="ObserverProps.invalid || !ObserverProps.validated">ログイン</button>
              </form>
            </validation-observer>
          </div>
        </div>
        <div class="register-box box">
          <h2 class="header">新規会員登録</h2>
          <div class="form-inner">
            <p>初めてご利用の方・会員以外の方</p>
            <div class="innder-description">初めてご利用のお客様は、こちらから会員登録を行って下さい。</div>
            <validation-observer ref="obs" v-slot="ObserverProps">
              <form @submit.prevent="register" class="inner-elements">
                <validation-provider v-slot="{ errors }" rules="required|email">
                  <div class="error">{{ errors[0] }}</div>
                  <div class="element">
                    <label for="mail" >メールアドレス:</label>
                    <input type="email" v-model="email" id="email" placeholder="email">
                  </div>
                </validation-provider>
                <validation-provider v-slot="{ errors }" vid="passwordConfirm" rules="required|min:6|alpha_dash">
                  <div class="error">{{ errors[0] }}</div>
                  <div class="element">
                    <label for="password">パスワード:</label>
                    <input type="password" v-model="password" placeholder="password" id="password">
                  </div>
                </validation-provider>
                <validation-provider v-slot="{ errors }" rules="required|min:4|alpha">
                  <div class="error">{{ errors[0] }}</div>
                  <div class="element">
                    <label for="name">お名前:</label>
                    <input type="text" v-model="name" placeholder="name" id="name">
                  </div>
                </validation-provider>
                <button type="submit" class="register-button" :disabled="ObserverProps.invalid || !ObserverProps.validated">新規会員登録</button>
              </form>
            </validation-observer>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: null,
      password: null,
      name:null,
      loginEmail:null,
      loginPassword:null
    };
  },
  methods: {
    async login() {
      try {
        await this.$auth.loginWith("laravelJWT", {
          data: {
            email: this.loginEmail,
            password: this.loginPassword,
          },
      });
      } catch {
        alert("登録されていないユーザーです");
        this.loginEmail = "";
        this.loginPassword = "";
      }
    },
    async register() {
      try {
        // await this.$axios.post("http://localhost:8000/api/auth/register", 
        await this.$axios.post("https://ecback.kyosuke-k.com/api/auth/register", 
        {
          name: this.name,
          email: this.email,
          password: this.password,
        })
      } catch {
        alert("登録に失敗しました");
        this.email = "";
        this.password = "";
        this.name = "";
        return
      };
      try {
        await this.$auth.loginWith("laravelJWT", 
        {
          data: {
            email: this.email,
            password: this.password,
          },
        });
      } catch {
        alert("登録に失敗しました2");
        this.email = "";
        this.password = "";
        this.name = "";
        return
      }
    }
  },
};
</script>
<style scoped>
.form-box {
  display: flex;
  width: 65%;
  height: 50vh;
}
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
.form-box {
  display: flex;
}
.box {
  width: 50%;
  height: 100%;
  padding: 0 15px;
}
.header {
  font-family: Noto Sans JP;
  font-size: 30px;
}
.form-inner p { 
  font-size: 22px;
  font-weight: bold;
  border-bottom: solid 3px;
  margin-top: 40px;
  padding-left:15px;
}
.innder-description {
  margin-top: 30px;
  font-size: 14px;
  padding: 0px 16px;
}
.inner-elements {
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  margin-top: 20px;
}
.element {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.inner-elements span {
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: right;
}
.element input {
  background: #FAFAFA;
  border: 1px solid #E2E2E2;
  box-sizing: border-box;
  border-radius: 5px;
  width: 60%;
}
.element label {
  margin-right: 5px;
  font-weight: bold;
}
.inner-elements button {
  width: 50%;
  margin: 30px  auto;
  font-size: 18px;
  font-weight: 700;
  color: white;
  border: none;
}
.register-button {
  background-color: #80A31D;
  
}
.form-inner .login-button {
  margin-top: 65px;
  background-color:black ;
}
.error {
  color: red;
}
</style>
