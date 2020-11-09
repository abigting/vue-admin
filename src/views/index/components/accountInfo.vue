<template>
  <CustomModal :visible="accountInfoVisible"
               bigTitle="账号信息"
               @handCancel="closeModal"
               closeIcon="false"
  >
    <i v-if="disabled" class="iconfont iconbianji edit-icon" @click="disabled=false"></i>
    <div class="registerForm">
      <el-form ref="form"
               :model="form"
               :rules="rules"
               label-width="110px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="姓名：" prop="name">
              <el-input v-model="form.name" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="性别：" prop="sex">
              <el-radio-group v-model="form.sex" :disabled="disabled">
                <el-radio label="0">男</el-radio>
                <el-radio label="1">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="民族：" prop="mz">
              <el-select v-model="form.mz" placeholder="" :disabled="disabled">
                <el-option v-for="item in dictionary.mz" :label="item.text" :value="item.code"
                           :key="item.code"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="出生日期：" prop="birthday">
              <el-date-picker type="date" v-model="form.birthday"
                              :disabled="disabled"
                              value-format="yyyy-MM-dd"
                              style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="身份证号：" prop="idcard">
              <el-input v-model="form.idcard" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="政治面貌：" prop="zzmm">
              <el-select v-model="form.zzmm" placeholder="" :disabled="disabled">
                <el-option v-for="item in dictionary.zzmm"
                           :label="item.text"
                           :value="item.code"
                           :key="item.code"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="学历：" prop="xl">
              <el-select v-model="form.xl" placeholder="" :disabled="disabled">
                <el-option v-for="item in dictionary.xl"
                           :label="item.text"
                           :value="item.code"
                           :key="item.code"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="学位：" prop="xw">
              <el-select v-model="form.xw" placeholder="" :disabled="disabled">
                <el-option v-for="item in dictionary.xw"
                           :label="item.text"
                           :value="item.code"
                           :key="item.code"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="毕业院校：" prop="university">
              <el-input v-model="form.university" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="所学专业：" prop="discipline">
              <el-input v-model="form.discipline" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="职务：" prop="zw">
              <el-input v-model="form.zw" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="职称：" prop="zc">
              <el-input v-model="form.zc" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="所在机构：" prop="areacode">
              <el-cascader
                :options="cityAddress"
                v-model="form.areacode"
                :props="{
                  expandTrigger: 'hover',
                  value: 'code',
                  label: 'name'
                }"
                @change="changeAreaCode"
                placeholder="请选择地区"
                :disabled="disabled"
              ></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="" prop="orgname" label-width="0">
              <el-select v-model="form.orgcode" placeholder="" :disabled="disabled">
                <el-option v-for="item in dicJgList"
                           :label="item.orgname"
                           :value="item.orgcode"
                           :key="item.orgcode"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="所在科室：" prop="department">
              <el-input v-model="form.department" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="参加工作日期：">
              <el-date-picker v-model="form.workDate" :disabled="disabled" style="width: 100%;"
                              value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider class="mb20 mt0"></el-divider>
        <el-row>
          <el-col :span="3">
            <el-form-item label-width="0">
              <el-checkbox label="卫生监督员" :disabled="disabled" v-model="form.isWsjdy"></el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="form.isWsjdy">
            <el-form-item label-width="78px" label="胸牌号：" prop="xph">
              <el-input v-model="form.xph" :disabled="disabled" style="width: 155px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7" v-if="form.isWsjdy">
            <el-form-item label-width="136px" label="行政执法证号：" prop="zfzh">
              <el-input v-model="form.zfzh" :disabled="disabled" style="width: 155px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="form.isWsjdy">
            <el-form-item label-width="200px" label="参加卫生监督工作日期：">
              <el-date-picker type="date" :disabled="disabled" v-model="form.jdWorkDate"
                              style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3">
            <el-form-item label-width="0" prop="isDagly">
              <el-checkbox label="档案管理员" :disabled="disabled" v-model="form.isDagly"></el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3">
            <el-form-item label-width="0">
              <el-checkbox label="投诉举报专员" :disabled="disabled" v-model="form.isTsjbzy"></el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3">
            <el-form-item label-width="0">
              <el-checkbox label="双随机监督员" :disabled="disabled" v-model="form.isSsjjdy"></el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label-width="0" v-if="form.isSsjjdy">
              <el-checkbox label="双随机在岗" :disabled="disabled" v-model="form.isSsjzg"></el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="17" v-if="form.isSsjjdy">
            <span class="subtitle">双随机执业范围</span>
            <el-form-item label-width="0" class="mb0">
              <el-checkbox-group v-model="form.ssjzyfw" :disabled="disabled">
                <el-checkbox v-for="item in dictionary.ssjzyfw" :label="item.code" :key="item.code">
                  <span class="profession-name">{{item.text}}</span>
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider class="mb20 mt0"></el-divider>
        <el-row>
          <el-col :span="24">
            <el-form-item label="申请角色：" label-width="92px" prop="roles" class="mb0">
              <el-checkbox-group v-model="form.roles" :disabled="disabled">
                <el-checkbox :label="item.roleId" v-for="item in dicRoleList" :key="item.roleId">{{item.roleName}}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider class="mb20 mt0"></el-divider>
        <el-row>
          <!--            <el-col :span="24" class="hint">-->
          <!--              手机验证码5分钟内有效，请先填写上述信息-->
          <!--            </el-col>-->
          <el-col :span="8">
            <el-form-item label="手机号：" prop="telphone" label-width="78px">
              <el-input v-model="form.telphone" disabled>
                <!--                  <template slot="append">-->
                <!--                    <span class="action">获取验证码</span>-->
                <!--                  </template>-->
              </el-input>
            </el-form-item>
          </el-col>
          <!--            <el-col :span="6">-->
          <!--              <el-form-item label="手机验证码：" prop="checkCode">-->
          <!--                <el-input v-model="form.checkCode"></el-input>-->
          <!--              </el-form-item>-->
          <!--            </el-col>-->
          <el-col :span="6">
            <el-form-item label="电子邮箱：" prop="email">
              <el-input v-model="form.email" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
    </div>
    <el-divider class="mb20 mt0"></el-divider>
    <div class="operation">
      <el-button v-if="!disabled" type="primary" @click="onSubmit('form')">保存</el-button>
      <el-button v-if="!disabled" @click="closeModal">取消</el-button>
      <el-button v-if="disabled" @click="closeModal">关闭</el-button>
    </div>
  </CustomModal>
</template>

<script>
  import CustomModal from '@/components/customModal'
  import * as userApi from "@/api/user";
  import common from "@/mixins/common";
  import {getUserInfo} from "@/utils/auth";
  import {splitAddrCodeWithStreet} from "@/utils/common";

  export default {
    name: "accountInfo",
    mixins: [common],
    props: ['accountInfoVisible'],
    components: {
      CustomModal
    },
    data() {
      const idCardValidator = (rule, value, callback) => {
        const reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/;
        if (!reg.test(value)) {
          callback('请输入正确的身份证号');
        } else {
          callback();
        }
      };
      const phoneValidator = (rule, value, callback) => {
        const phoneReg = /^1[3-578]\d{9}$/;
        if (value && !phoneReg.test(value)) {
          callback('请填写正确的手机号码');
        } else {
          callback();
        }
      };
      const emailValidator = (rule, value, callback) => {
        const emailReg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if (value && !emailReg.test(value)) {
          callback('请填写正确的电子邮件');
        } else {
          callback();
        }
      };
      return {
        form: {
          // roles: [],
          // ssjzyfw: [],
          // telphone: "17859865320",
          // idcard: '330721199006077122',
          // name: 'Fiona',
          // sex: '1',
          // mz: '01',
          // birthday: "2020-11-11",
          // zzmm: "zzmm01",
          // xl: "jbxl01",
          // xw: 'xw',
          // university: '1',
          // discipline: '2',
          // zw: '3',
          // zc: '4',
          // email: '115468520@qq.com'
        },
        // disabled: true,
        disabled: false,
        rules: {
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'},
          ],
          sex: [
            {required: true, message: '请选择性别', trigger: 'blur'},
          ],
          mz: [
            {required: true, message: '请选择民族', trigger: 'blur'},
          ],
          birthday: [
            {required: true, message: '请选择出生日期', trigger: 'blur'},
          ],
          idcard: [
            {required: true, message: '请填写身份证号', trigger: 'blur'},
            {validator: idCardValidator, trigger: 'blur'},
          ],
          zzmm: [
            {required: true, message: '请选择政治面貌', trigger: 'blur'},
          ],
          xl: [
            {required: true, message: '请选择学历', trigger: 'blur'},
          ],
          xw: [
            {required: true, message: '请选择学位', trigger: 'blur'},
          ],
          university: [
            {required: true, message: '请输入毕业院校', trigger: 'blur'},
          ],
          discipline: [
            {required: true, message: '请选择所学专业', trigger: 'blur'},
          ],
          zw: [
            {required: true, message: '请输入职务', trigger: 'blur'},
          ],
          zc: [
            {required: true, message: '请输入职称', trigger: 'blur'},
          ],
          Fiona: [
            {required: true, message: '请选择所在机构', trigger: 'blur'},
          ],
          department: [
            {required: true, message: '请选择所在科室', trigger: 'blur'},
          ],
          workDate: [
            {required: true, message: '请选择参加工作日期', trigger: 'blur'},
          ],
          xph: [
            {required: true, message: '请输入胸牌号', trigger: 'blur'},
          ],
          zfzh: [
            {required: true, message: '请输入行政执法证号', trigger: 'blur'},
          ],
          roles: [
            {required: true, message: '请选择角色', trigger: 'blur'},
          ],
          jdWorkDate: [
            {required: true, message: '请选择参加卫生监督工作日期', trigger: 'blur'},
          ],
          telphone: [
            {required: true, message: '请输入手机号', trigger: 'blur'},
            // {validator: phoneValidator, trigger: 'blur'},
          ],
          email: [
            {required: true, message: '请输入电子邮箱', trigger: 'blur'},
            {validator: emailValidator, trigger: 'blur'},
          ],
          areacode: [
            {required: true, message: '请输入所在机构', trigger: 'blur'},
          ],
          orgcode: [
            {required: true, message: '请输入所在机构', trigger: 'blur'},
          ],
          // checkCode: [
          //   {required: true, message: '请输入手机验证码', trigger: 'blur'},
          // ]
        },
      };
    },
    watch:{
      accountInfoVisible(newVal){
        if(newVal){
          this.getDictionary("xl");
          this.getDictionary("xw");
          this.getDictionary("ssjzyfw");
          this.getDictionary("zzmm");
          this.getDictionary("mz");
          this.getAreaInfo();
          this.queryDicRoleList();
          this.getInfo();
        }
      }
    },
    created() {

    },
    methods: {
      getInfo() {
        userApi.queryUserBaseInfoByUserId({userId: getUserInfo().userId}).then((res) => {
          if (res) {
            const {isWsjdy, isDagly, isTsjbzy, isSsjzg, isSsjjdy, areacode} = res;
            this.form = {
              ...res,
              isWsjdy: isWsjdy === 1,
              isDagly: isDagly === 1,
              isTsjbzy: isTsjbzy === 1,
              isSsjjdy: isSsjjdy === 1,
              isSsjzg: isSsjzg === 1,
              areacode:splitAddrCodeWithStreet(areacode)
            };
            this.changeAreaCode(splitAddrCodeWithStreet(areacode))
          }
        });
      },
      closeModal() {
        // this.disabled = true;
        this.$emit('handCancel')
      },
      changeAreaCode(value) {
        if (value) {
          this.queryDicJgList({
            areaCode: value[value.length - 1],
            type: 2
          });
        } else {

        }
      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const {roles, checkCode, areacode, telphone, idcard, isWsjdy, isDagly, isTsjbzy, isSsjjdy, isSsjzg, ssjzyfw, ...rest} = this.form;
            const req = {
              userId: getUserInfo().userId,
              systemId: 33000000000,
              roles: roles,
              checkCode: 123456,
              telphone,
              idcard,
              data: {
                ...rest,
                isWsjdy: isWsjdy ? 1 : 0,
                isDagly: isDagly ? 1 : 0,
                isTsjbzy: isTsjbzy ? 1 : 0,
                isSsjjdy: isSsjjdy ? 1 : 0,
                isSsjzg: isSsjzg ? 1 : 0,
                ssjzyfw: ssjzyfw ? ssjzyfw : [],
                areacode: areacode[areacode.length-1],
              }
            };
            userApi.updateUserInfo(req).then((res) => {
              if (res) {
                this.$message({
                  message: "保存成功",
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
    }
  }
</script>

<style scoped lang="scss">

  .subtitle {
    font-size: 14px;
    margin: 6px 0;
    display: block;
    color: #606266;
  }

  .registerForm {
    width: 1120px;
    max-height: 660px;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 30px 40px;
  }

  .operation {
    text-align: center;
    margin: 8px 0 24px 0;
  }


  .hint {
    color: #B7BAC8;
    margin-bottom: 10px;
    font-size: 14px;
  }

  .profession-name {
    display: inline-block;
    width: 140px;
  }

  .edit-icon {
    font-size: 24px;
    color: #1875E8;
    position: absolute;
    top: 16px;
    right: 16px;
    cursor: pointer;
  }
</style>
