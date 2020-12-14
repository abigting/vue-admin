<template>
  <CustomModal :visible="modifyPasswordDialog" bigTitle="修改密码" @handCancel="closeModal">
    <div class="content">
      <el-form ref="form"
               :model="form"
               :rules="rules"
               label-width="0">
        <el-row>
          <p v-if="isFirstLogin" style="color: #4985FE">
            首次登录，请修改初始密码
          </p>
          <el-col :span="24">
            <el-form-item label-width="54px" label="手机号">
              {{form.telphone}}
            </el-form-item>
          </el-col>
          <el-col :span="24" class="relative-div">
            <el-form-item prop="password">
              <el-input v-model="form.password" :show-password="true" placeholder="请输入新密码"></el-input>
            </el-form-item>
            <i class="iconfont iconshurumima prefix-icon"></i>
          </el-col>
          <el-col :span="24" class="relative-div">
            <el-form-item prop="password2">
              <el-input v-model="form.password2" :show-password="true" placeholder="请确认新密码"></el-input>
            </el-form-item>
            <i class="iconfont iconshurumima prefix-icon"></i>
          </el-col>
          <el-col :span="16" class="relative-div">
            <el-form-item prop="checkCode">
              <el-input v-model="form.checkCode" placeholder="请确认验证码" style="width: 96%"></el-input>
            </el-form-item>
            <i class="iconfont iconyanzhengma prefix-icon"></i>
          </el-col>
          <el-col :span="8">
            <el-button :disabled="count<60" @click="getVerificationCode">{{count<60?`${count}S后重新获取`:'获取验证码'}}
            </el-button>
          </el-col>
        </el-row>
      </el-form>
      <!-- 按钮组 -->
      <div class="bottom-button">
        <el-button type="primary" @click="onSubmit('form')">保存</el-button>
      </div>
    </div>
  </CustomModal>
</template>

<script>
  import CustomModal from '@/components/customModal'
  import {getUserInfo} from '@/utils/auth'
  import md5 from 'js-md5'
  import * as userApi from "@/api/user";

  export default {
    name: "modifyPassword",
    props: ['modifyPasswordDialog'],
    components: {
      CustomModal
    },
    watch: {
      modifyPasswordDialog(newVal) {
        if (!newVal) {
          this.$refs['form'].resetFields();
        }
      }
    },
    data() {
      const passwordValidator = (rule, value, callback) => {
        let str = value;
        if (str == null || str.length < 8 || str.length > 12) {
          callback('密码为8-12位');
        }
        const reg = new RegExp(/^(?![^a-zA-Z]+$)(?!\D+$)/);
        if (reg.test(str)) {
          callback();
        } else {
          callback('请包含数字和字母!');
        }
      };
      return {
        form: {
          telphone: getUserInfo().telphone
        },
        isFirstLogin: getUserInfo().isFirstLogin,
        count: 60,
        timer: null,
        rules: {
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {validator: passwordValidator, trigger: 'blur'},
          ],
          password2: [
            {required: true, message: '请确认密码', trigger: 'blur'},
          ],
          checkCode: [
            {required: true, message: '请输入验证码', trigger: 'change'},
          ],
        },
      }
    },
    methods: {
      closeModal() {
        this.form = {
          telphone: getUserInfo().telphone
        };
        this.$emit('handCancel')
      },
      getVerificationCode() {
        userApi.createTelphonCode({
          checkType: 2,
          telphone: this.form.telphone
        }).then((res) => {
          this.timerFn();
          if (res) {
            // this.form.checkCode = res;
            this.$message.success(res)
          } else {
            clearInterval(this.timer);
          }
        });
      },
      timerFn() {
        this.timer = setInterval(() => {
          this.count--;
          if (this.count <= 0) {
            clearInterval(this.timer);
            this.count = 60;
          }
        }, 1000)
      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const {password, password2} = this.form;
            if (password !== password2) {
              this.$message.info('两次密码输入不同')
            }

            userApi.updatePassWord({...this.form, password: md5(password)}).then((res) => {
              if (res) {
                this.$message({
                  message: "修改成功",
                  type: "success",
                });
                this.closeModal()
              }
            });
          } else {
            return false;
          }
        });
      },
    },
  }
</script>

<style scoped lang="scss">
  .content {
    width: 420px;
    padding: 30px 40px;
  }

  .bottom-button {
    text-align: center;
    width: 120px;
    margin: 12px auto 0 auto;
  }

  .relative-div {
    position: relative;
  }

  .prefix-icon {
    position: absolute;
    color: #4A7BED;
    left: 10px;
    top: 10px;
  }

  .content /deep/ .el-input--mini .el-input__inner {
    height: 40px;
    padding-left: 32px;
  }

  .content /deep/ .el-button--mini {
    height: 40px;
    width: 100%;
    padding: 9px 2px;
  }
</style>
