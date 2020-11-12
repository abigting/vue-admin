<template>
  <div class="login">
    <div class="systemLogo">
      <img src="@/assets/imgs/loginText.png" alt="" class="logo">
    </div>
    <div class="login-container">
      <transition name="pull-up" mode="out-in">
        <img v-if="imgShow" class="cube0" src="@/assets/imgs/cube.png" alt="">
      </transition>
      <transition name="pull-up" mode="out-in">
        <img v-if="imgShow" class="cube1" src="@/assets/imgs/cube.png" alt="">
      </transition>
      <transition name="pull-up" mode="out-in">
        <img v-if="imgShow" class="cube2" src="@/assets/imgs/cube.png" alt="">
      </transition>
      <transition name="pull-up" mode="out-in">
        <img v-if="imgShow" class="cube3" src="@/assets/imgs/cube.png" alt="">
      </transition>
      <div>
        <img v-if="imgShow" class="illustration" src="@/assets/imgs/illustration.png" alt="">
      </div>
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        auto-complete="on"
        label-position="left"
      >
        <h3 class="title">登录</h3>
        <el-form-item prop="username">
          <span class="svg-container">
            <i class="el-icon-message"></i>
          </span>
          <el-input
            v-model="loginForm.username"
            name="username"
            type="text"
            auto-complete="on"
            placeholder="请输入用户名"
            @keyup.enter="handleLogin"
          />
        </el-form-item>
        <el-form-item prop="password">
          <span class="svg-container">
            <i class="el-icon-lock"></i>
          </span>
          <el-input
            :type="pwdType"
            v-model="loginForm.password"
            name="password"
            auto-complete="on"
            placeholder="请输入密码"
            @keyup.enter="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="pwdType === 'password' ? 'eye' : 'eye-open'"/>
          </span>
        </el-form-item>
        <el-form-item class="checkCode">
          <span class="svg-container">
            <i class="el-icon-document-checked"></i>
          </span>
          <el-input
            v-model="loginForm.imageCode"
            type="text"
            auto-complete="on"
            placeholder="验证码"
            style="width: 60%"
            @keyup.enter="handleLogin"
          />
          <div class="yzmImg" @click="clickImgFN()">
            <img :src="imgBase64" alt="">
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="loading"
            type="primary"
            style="width:100%;"
            @click.native.prevent="handleLogin"
          >登 录
          </el-button>
        </el-form-item>
        <p class="register" @click="register">监督员注册</p>
      </el-form>
    </div>
    <div class="footer">
      浙江创得信息技术有限公司&nbsp;&nbsp;&nbsp;&nbsp;服务电话：0571-85776903
    </div>
  </div>
</template>

<script>
  import * as userApi from "@/api/user";
  import {setCookie, getToken} from '@/utils/auth';
  import storage from '@/utils/localStorage'

  export default {
    name: "Login",
    data() {
      // const validateUsername = (rule, value, callback) => {
      //   if (!isvalidUsername(value)) {
      //     callback(new Error("请输入正确的用户名"));
      //   } else {
      //     callback();
      //   }
      // };
      const validatePass = (rule, value, callback) => {
        if (value.length < 5) {
          callback(new Error("密码不能小于5位"));
        } else {
          callback();
        }
      };
      return {
        imgBase64: '',
        loginForm: {
          username: "17859865320",
          password: "xn123456",
          systemId: 33000000000
        },
        loginRules: {},
        loading: false,
        pwdType: "password",
        redirect: undefined,
        imgShow: false
      };
    },
    mounted() {
      this.imgShow = true
    },
    watch: {
      $route: {
        handler: function (route) {
          this.redirect = route.query && route.query.redirect;
        },
        immediate: true
      }
    },
    methods: {
      showPwd() {
        if (this.pwdType === "password") {
          this.pwdType = "text";
        } else {
          this.pwdType = "password";
        }
      },
      handleLogin() {
        const {username, password, imageCode} = this.loginForm;
        if (!username) {
          this.$message.info('请填写账号');
          return
        } else if (!password) {
          this.$message.info('请填写密码');
          return
        } else if (!imageCode) {
          this.$message.info('请填写验证码');
          return
        }
        this.loading= true;
        userApi.login(this.loginForm).then(res => {
          if (res) {
            this.loading= false;
            const {token, userZcVo, menuListVo} = res;
            const {name, sex, compName, telphone, id, isFirstLogin} = userZcVo;
            setCookie('token', token);
            setCookie('userInfo', {
              name, sex, compName, telphone, userId:id, isFirstLogin
            });
            const permission = menuListVo.find(s=>s.systemId===33000000000);
            if(permission){
              const {menuList, auths} = permission;
              this.$store.dispatch('permission/generateRoutes', auths);
              storage.set('menuList', menuList||[]);
              storage.set('auths', auths||[]);
              this.$router.options.routes = this.$store.getters.routes;
              this.$router.addRoutes(this.$store.getters.routes)
            }
            this.$router.push({path: "/"});
          }else{
            this.loading= false;
          }
        }).catch(() => {
          this.loading= false;
          console.log("登录失败");
        });
      },
      async clickImgFN() {

        let s = [];
        let hexDigits = "0123456789abcdef";
        for (let i = 0; i < 36; i++) {
          s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
        s[8] = s[13] = s[18] = s[23] = "";
        let uuid = s.join("");
        this.loginForm.uuid = uuid;

        const res = await userApi.createImageCode({uuid: this.loginForm.uuid});
        if (res) {
          const {imageBase64} = res;
          this.imgBase64 = imageBase64;
        }
      },
      register() {
        this.$router.push('/register')
      }
    },
    created() {
      this.clickImgFN();
      let lett = this;
      document.onkeydown = function (e) {
        let key = window.event.keyCode;
        if (key === 13) {
          lett.handleLogin();
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  .login {
    height: 100vh;
    width: 100%;
    background: linear-gradient(180deg, #1789FA 0%, #1454D5 100%);
  }

  .systemLogo {
    text-align: center;
    padding-top: 78px;

    > img {
      width: 722px;
    }
  }

  .yzmImg {
    position: absolute;
    bottom: 0;
    right: -88px;
    width: 80px;
    height: 42px;
    cursor: pointer;
    border-radius: 2px;
    border: 1px solid #cfc3c3;
    > img {
      width: 100%;
      height: 40px;
    }
  }

  .checkCode {
    position: relative;
    width: 70%;
  }

  .login-container /deep/ .el-input {
    display: inline-block;
    height: 38px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      /*padding: 12px 5px 12px 15px;*/
      // color: rgb(83, 78, 78);
      // color: $light_gray;
      height: 38px;

      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px white inset !important;
        -webkit-text-fill-color: rgb(196, 193, 193) !important;
      }
    }
  }

  .login-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 228px);
    /*background: url("../../assets/img/background_2.png") no-repeat;*/
    background-position: center;
    background-size: cover;
    /*width: 1440px;*/
    margin: 0 auto;

    .login-form {
      width: 360px;
      height: 340px;
      background-color: #fff;
      max-width: 100%;
      padding: 30px 35px 15px 35px;
      border-radius: 2px;
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: #889aa4;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title {
      font-size: 23px;
      font-weight: 400;
      color: #1680df;
      margin: 0px auto 21px auto;
      text-align: center;
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: #889aa4;
      cursor: pointer;
      user-select: none;
    }

    .el-form-item {
      border: 1px solid rgb(207, 195, 195);
      background: white;
      border-radius: 2px;
      margin-bottom: 12px;
    }

    .el-form-item span i {
      font-size: 16px;
    }

    .el-button {
      height: 40px;
    }
  }

  .register {
    color: #585E77;
    font-size: 14px;
    cursor: pointer;
  }

  .illustration {
    width: 585px;
    margin-right: 94px;
  }

  .cube0 {
    position: absolute;
    left: 52px;
    width: 110px;
  }

  .cube1 {
    position: absolute;
    left: 400px;
    width: 84px;
    bottom: 0;
  }

  .cube2 {
    position: absolute;
    top: 112px;
    left: 50%;
    transform: (-50%, -50%);
    width: 101px;
  }

  .cube3 {
    position: absolute;
    bottom: 200px;
    right: 86px;
    width: 82px;
  }

  .footer {
    text-align: center;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 30px 0;
    font-size: 16px;
    font-weight: 400;
    color: #fff;
  }

  @media screen and (max-width: 1400px) {
    .chatBox {
      .title {
        font-size: 12px;
        padding: 0 4px 4px 16px;
        margin-bottom: 4px;
      }
    }
    .login-container {
      height: calc(100vh - 188px);
    }
  }

</style>
