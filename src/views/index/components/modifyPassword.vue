<template>
  <CustomModal :visible="modifyPasswordDialog" bigTitle="修改密码" @handCancel="closeModal">
    <div class="content">
      <el-form ref="form"
               :model="form"
               :rules="rules"
               label-width="0">
        <el-row>
          <el-col :span="24">
            <el-form-item label-width="64px" label="手机号" prop="name">
              13526985466
            </el-form-item>
          </el-col>
          <el-col :span="24" class="relative-div">
            <el-form-item prop="name">
              <el-input v-model="form.name" :show-password="true"></el-input>
            </el-form-item>
            <i class="iconfont iconshurumima prefix-icon"></i>
          </el-col>
          <el-col :span="24" class="relative-div">
            <el-form-item prop="name">
              <el-input v-model="form.description" :show-password="true"></el-input>
            </el-form-item>
            <i class="iconfont iconshurumima prefix-icon"></i>
          </el-col>
          <el-col :span="16" class="relative-div">
            <el-form-item prop="name">
              <el-input v-model="form.description" style="width: 96%"></el-input>
            </el-form-item>
            <i class="iconfont iconyanzhengma prefix-icon"></i>
          </el-col>
          <el-col :span="8">
            <el-button>获取验证码</el-button>
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
  import {getUserInfo} from '@/utils/auth';

  export default {
    name: "modifyPassword",
    props: ['modifyPasswordDialog'],
    components: {
      CustomModal
    },
    methods: {
      closeModal() {
        this.$emit('handCancel')
      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            // registerApi.register(this.form).then((res) => {
            //   if(res){
            //     this.$message({
            //       message: "注册成功",
            //       type: "success",
            //     });
            //   }
            // });
          } else {
            return false;
          }
        });
      },
    },
    data() {
      return {
        form: {},
        rules: {
          system: [
            {required: true, message: '请选择角色所属子系统', trigger: 'blur'},
          ],
          name: [
            {required: true, message: '请输入角色名称', trigger: 'blur'},
          ],
          description: [
            {required: true, message: '请输入角色说明', trigger: 'blur'},
          ],
        },
      }
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
