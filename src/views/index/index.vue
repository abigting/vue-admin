<template>
  <div class="navicationBg">
    <div class="header">
      <div class="systemLogoBox">
        <img src="@/assets/imgs/logo.svg" alt="" class="logo">
        <span class="sysName">
            <img src="@/assets/imgs/logoText.png" alt="" class="logo">
        </span>
      </div>
      <el-dropdown class="userInfo" @click="handleClick">
          <span class="el-dropdown-link">
            <el-avatar @click="handleClick" :size="30" style="vertical-align: middle" :src="circleUrl">
            </el-avatar>
            <span class="name">用户名<i class="el-icon-arrow-down el-icon--right"></i></span>
          </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item><span @click="handleClick('1')"><i class="iconfont iconbianji blue-text"></i>账号信息</span></el-dropdown-item>
          <el-dropdown-item><span @click="handleClick('2')"><i class="iconfont iconmima blue-text"></i>修改密码</span></el-dropdown-item>
          <el-dropdown-item><span @click="handleClick('3')"><i class="iconfont icontuichu blue-text"></i>退出登录</span></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="menuBox">
      <div class="menu" v-for="item in menus" :key="item.key" @click="jump(item)">
        <div class="imgBox">
          <img :src="item.img" alt="">
        </div>
        <div class="textBox">
          {{item.name}}
        </div>
      </div>
    </div>
    <ModifyPassword :modifyPasswordDialog="modifyPasswordDialog" @handCancel="modifyPasswordDialog=false"/>
    <AccountInfo :accountInfoVisible="accountInfoVisible" @handCancel="accountInfoVisible=false"/>
  </div>
</template>

<script>
  import ModifyPassword from './components/modifyPassword'
  import AccountInfo from './components/accountInfo'
  import Cookies from 'js-cookie';
  import avatarSVG from '../../assets/imgs/avatar.svg'

  export default {
    name: "index",
    components: {
      ModifyPassword,
      AccountInfo
    },
    data() {
      return {
        circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        modifyPasswordDialog: false,
        accountInfoVisible: false,
        menus: [{
          name: '领导驾驶舱',
          key: '0',
          path: '',
          img: require('../../assets/imgs/img_7.png')
        },
          {
            name: '口腔在线监测系统',
            key: '1',
            path: '/caseM/index',
            img: require('../../assets/imgs/img_2.png')
          },
          {
            name: '消毒保洁在线监测系统',
            key: '2',
            path: '',
            img: require('../../assets/imgs/img_4.png')
          },
          {
            name: '自查自律系统',
            key: '3',
            path: '',
            img: require('../../assets/imgs/img_3.png')
          },
          {
            name: '智能办案辅助系统',
            key: '4',
            path: '',
            img: require('../../assets/imgs/img_5.png')
          },
          {
            name: '系统管理',
            key: '5',
            path: '',
            img: require('../../assets/imgs/img_1.png')
          }
        ]
      }
    },
    methods: {
      jump(item) {
        switch (item.key) {
          case '0':
            // window.open(
            //   'http://192.168.22.128:8004/#/login?name=' + this.$store.state.user.userdata.username + '&token=' +
            //   this.$store.state.user.userdata.token + '&areaCode=' + this.$store.state.user.userdata.areaCode,
            //   "_blank")
            window.open(`${window.location.origin}/xnrh-sjdp-web/#/`, "_blank");
            return;
          case '4':
            this.$router.push({
              path: '/caseM/index',
              redirect: '/caseM/index'
            });
            return;
          case '3':
            window.open(`${window.location.origin}/xnrh-zczl-web/#/login?token=${Cookies.get('token')}`, "_blank");
            return;
          case '5':
            this.$router.push('/system/user');
            return;
        }

      },
      handleClick(type) {
        switch (type) {
          case '1':
            this.accountInfoVisible = true;
            return;
          case '2':
            this.modifyPasswordDialog = true;
            return;
          case '3':
            this.$router.push('/login');
            return;
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .navicationBg {
    /* background: url("../../assets/img/navigation.png"); */
    height: 100vh;
    background-size: cover;
  }

  .header {
    height: 90px;
    background: #ffffff;
    box-shadow: 0px 8px 12px 0px #C9D2D9;
    margin: 0 auto;
    vertical-align: middle;
    position: relative;
    line-height: 90px;
    .systemLogoBox {
      width: 1040px;
      margin: 0 auto;
      text-align: center;
      >img{
        width: 44px;
      }
    }

    .logo {
      vertical-align: middle;
      margin-left: 16px;
    }

    .sysName {
      vertical-align: middle;
      >img{
        width: 660px;
      }
    }

    .userInfo {
      position: absolute;
      cursor: pointer;
      top: 0;
      right: 30px;
      height: 60px;
      .name {
        margin-left: 8px;
      }
    }
  }

  .menuBox {
    width: 1040px;
    margin: 80px auto;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .menu {
      width: 320px;
      height: 168px;
      display: inline-block;
      background: #ffffff;
      margin: 25px 0;
      overflow: hidden;
      font-size: 24px;
      font-weight: 600;
      color: #333333;
      position: relative;
      box-shadow: 0px 8px 12px 0px #C9D2D9;
      cursor: pointer;

      .imgBox {
        vertical-align: middle;

        >img {

          &:hover {
            transform: scale(1.5);
          }
        }
      }

      .textBox {
        display: inline-block;
        background-color: rgba(38, 93, 245, 0.5);
        padding: 12px 20px;
        position: absolute;
        left: 0;
        bottom: 0;
        font-size: 18px;
        color: #ffffff;
        width: 100%;
      }

      :hover {}
    }
  }

  .userInfo /deep/ .avatar-menu-wrap{

    .fixed-menu-item {
      display: block;
      font-size: 14px;
      padding: 4px 0;
      text-align: center;
      width: 120px;
      box-sizing: border-box;
      overflow: hidden;
      transition: all .1s linear;
      white-space: nowrap;
    }

    .el-dropdown-menu--mini {
      padding: 0 !important;
    }

    .fixed-menu-item:hover {
      font-size: 18px;
      font-weight: 600;
    }

    .login-out-item:hover {
      color: #F56C6C !important;
    }
  }
</style>
