<template>
  <div class="navicationBg">
    <div class="header">
      <div class="systemLogoBox">
        <img src="@/assets/imgs/logo.svg" alt="" class="logo">
        <span class="sysName">
            <img src="@/assets/imgs/logoText.png" alt="" class="logo">
        </span>
      </div>
      <i class="iconfont iconxitong1 settingIcon" :size="30" style="vertical-align: middle" v-permission="38000000000"
         @click="jump({key:'9'})">
      </i>
      <el-dropdown class="userInfo">
          <span class="el-dropdown-link">
            <el-avatar :size="30" style="vertical-align: middle">
                 {{userInfo.name?userInfo.name[0]:'无'}}
            </el-avatar>
            <span class="name">
                  {{userInfo.name?userInfo.name:'无名氏'}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
          </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item><span class="fixed-menu-item" @click="handleClick('1')"><i
            class="iconfont iconbianji blue-text"></i>账号信息</span>
          </el-dropdown-item>
          <el-dropdown-item><span class="fixed-menu-item" @click="handleClick('2')"><i
            class="iconfont iconmima blue-text"></i>修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item><span class="fixed-menu-item" @click="handleClick('3')"><i
            class="iconfont icontuichu blue-text"></i>退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="menuBox">
      <div class="menu"
           v-for="item in menus"
           :key="item.key"
           @mouseenter="showAnimation(item.key, true)"
           @mouseleave="showAnimation(item.key, false)"
           @click="jump(item)">
        <div class="imgBox">
          <img :src="item.img" alt=""
               :class="{'detectionImg':item.key ==='5'}">
        </div>
        <div class="detection" v-if="item.key ==='5'&&detectionHover">
          <div class="each" @click="jump({key:'6'})">
            口腔诊所
          </div>
          <div class="each" @click="jump({key:'7'})">
            消毒保洁
          </div>
          <div class="each" @click="jump({key:'8'})">
            水质监测
          </div>
        </div>
        <div v-else class="textBox">
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
  import SettingPng from '../../assets/imgs/setting.png'
  import {removeAllcookie} from '../../utils/auth'
  import {getUserInfo} from '@/utils/auth'
  import {asyncRoutes} from '@/router'

  export default {
    name: "index",
    components: {
      ModifyPassword,
      AccountInfo
    },
    data() {
      return {
        circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        settingUrl: SettingPng,
        modifyPasswordDialog: false,
        accountInfoVisible: false,
        detectionHover: false,
        userInfo: getUserInfo(),
        menus: [{
          name: '驾驶舱',
          key: '0',
          path: '',
          img: require('../../assets/imgs/img_7.png')
        },
          {
            name: '智能办案',
            key: '1',
            path: '/caseM/index',
            img: require('../../assets/imgs/img_8.png')
          },
          {
            name: '自查系统',
            key: '2',
            path: '',
            img: require('../../assets/imgs/img_6.png')
          },
          {
            name: '效能评价',
            key: '3',
            path: '',
            img: require('../../assets/imgs/img_4.png')
          },
          {
            name: '数据交换',
            key: '4',
            path: '',
            img: require('../../assets/imgs/img_5.png')
          },
          {
            name: '在线监测',
            key: '5',
            path: '',
            img: require('../../assets/imgs/img_3.png')
          }
        ]
      }
    },
    methods: {
      jump(item) {
        switch (item.key) {
          case '0':
            //驾驶舱
            window.open(`${window.location.origin}/xnrh-sjdp-web/#/login?token=${Cookies.get('token')}`, "_blank");
            return;
          case '1':
            //智能办案
            window.open(`${window.location.origin}/xnrh-znws-web/#/login?token=${Cookies.get('token')}`, "_blank");
            return;
          case '2':
            //自查系统
            window.open(`${window.location.origin}/xnrh-zczl-web/#/login?token=${Cookies.get('token')}`, "_blank");
            return;
          case '3':
            //效能评价

            return;
          case '4':
            //数据交换
            return;
          case '5':
            //在线检测
            return;
          case '6':
            //口腔
            window.open(`https://wj.platform.ilabservice.cloud/index`, "_blank");
            return;
          case '7':
            //消毒
            window.open(`http://provincedisinfection.terabits.cn/`, "_blank");
            return;
          case '8':
            //水质
            window.open(`https://zj.waterview.cn/index.php`, "_blank");
            return;
          case '9':
            //设置
            const systemMenu = asyncRoutes.find(s => s.menuId === "38010000000");
            if (systemMenu) {
              this.$router.push(`${systemMenu.path}/${systemMenu.children[0].path}`);
            }
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
            const loading = this.$loading({
              lock: true,
              text: '退出登录中...',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            setTimeout(() => {
              loading.close();
            }, 1000);
            this.$store.dispatch('user/logout').then(res => {
              setTimeout(() => {
                this.$router.push('/login');
                location.reload()
              }, 1000);
            });
            return;
        }
      },
      showAnimation(key, value) {
        if (key === '5') {
          this.detectionHover = value;
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .navicationBg {
    background: url("../../assets/imgs/navigation.png");
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

      > img {
        width: 44px;
      }
    }

    .logo {
      vertical-align: middle;
      margin-left: 16px;
    }

    .sysName {
      vertical-align: middle;

      > img {
        width: 660px;
      }
    }

    .userInfo {
      position: absolute;
      cursor: pointer;
      top: 30px;
      right: 16px;
      line-height: 30px;

      .name {
        margin-left: 8px;
        width: 64px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: inline-block;
        vertical-align: middle;
      }

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

        > img {
          width: 100%;

          &:hover {
            transform: scale(1.5);
          }
        }

        .detectionImg {
          &:hover {
            transform: scale(1);
          }
        }
      }

      .textBox {
        display: inline-block;
        background-color: rgba(19, 68, 166, 0.8);
        padding: 12px 20px;
        position: absolute;
        left: 0;
        bottom: 0;
        font-size: 24px;
        color: #ffffff;
        width: 100%;
      }

      :hover {
      }
    }
  }

  .detection {
    position: absolute;
    top: 0;
    left: 0;
    width: 320px;
    height: 168px;
    background-color: rgba(19, 68, 166, 0.8);
    display: flex;
    justify-content: space-between;
    padding: 52px 48px;
    animation: enter 0.4s ease-in-out 0s 1 alternate forwards;

    .each {
      /*display: inline-block;*/
      color: rgba(255, 255, 255, 0.5);
      font-size: 24px;
      font-weight: 600;
      width: 48px;

      &:hover {
        color: rgba(255, 255, 255, 1);
      }
    }
  }

  .settingIcon {
    position: absolute;
    cursor: pointer;
    top: 2px;
    color: #d1d8e6;
    right: 128px;
    font-size: 30px;
  }

  .blue-text {
    color: #4985FE;
  }

  .psw {
    width: 24px;
    position: relative;
    top: 6px;
  }

  @keyframes enter {
    0% {
      transform: translateY(100px);
      opacity: 0
    }
    100% {
      transform: translateY(0%);
      opacity: 1
    }
  }
</style>
