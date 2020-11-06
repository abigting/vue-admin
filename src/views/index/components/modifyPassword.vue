<template>
  <CustomModal :visible="modifyPasswordDialog" bigTitle="修改密码" @handCancel="closeModal">
    <div class="content">
      <el-form ref="form"
               :model="form"
               :rules="rules"
               label-width="0">
        <el-row>
          <el-col :span="24">
            <el-form-item label-width="64px" label="手机号">
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
            <el-button @click="getVerificationCode">获取验证码</el-button>
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
  import * as userApi from "@/api/user";

  export default {
    name: "modifyPassword",
    props: ['modifyPasswordDialog'],
    components: {
      CustomModal
    },
    data() {
      return {
        form: {
          telphone: getUserInfo().telphone
        },
        rules: {
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
          ],
          password2: [
            {required: true, message: '请确认密码', trigger: 'blur'},
          ],
          checkCode: [
            {required: true, message: '请输入验证码', trigger: 'blur'},
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
          if (res) {
            this.form.checkCode = res;
          }
        });
      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const {password, password2} = this.form;
            if (password !== password2) {
              this.$message.info('两次密码输入不同')
            }
            userApi.updatePassWord(this.form).then((res) => {
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
  }
</style>
