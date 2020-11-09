<template>
  <CustomModal :visible="dialogVisible" title="修改账号信息" @handCancel="closeModal">
    <div class="user-info-block">
      <!-- 基本信息 -->
      <div class="basic-info clear-float">
        <div class="block name">
          <span>姓名</span>
          <p>{{userBaseInfoVo.name}}
            <Hint :operationType="operationType" :last="userBaseInfoEditVo.name" :now="userBaseInfoVo.name"/>
<!--            <i class="el-icon-warning" v-if="userBaseInfoVo.name!==userBaseInfoEditVo.name">-->
<!--              <div class="history-info-wrap">{{userBaseInfoEditVo.name}}</div>-->
<!--            </i>-->
          </p>
        </div>
        <div class="block id-card">
          <span>身份证号</span>
          <p>{{userBaseInfoVo.idcard}}
            <Hint :operationType="operationType" :last="userBaseInfoEditVo.idcard" :now="userBaseInfoVo.idcard"/>
<!--            <i v-if="userBaseInfoVo.idcard!==userBaseInfoEditVo.idcard" class="el-icon-warning">-->
<!--              <div class="history-info-wrap">{{userBaseInfoEditVo.idcard}}</div>-->
<!--            </i>-->
          </p>
        </div>
        <div class="block phone">
          <span>手机号</span>
          <div class="allow-edit" v-show="editPhone">
            <el-input ref="editPhone" v-model="userBaseInfoVo.telphone" class="edit-phone" placeholder="请输入"></el-input>
          </div>
          <p v-if="!editPhone">
            {{userBaseInfoVo.telphone}}
            <Hint :operationType="operationType" :last="userBaseInfoEditVo.telphone" :now="userBaseInfoVo.telphone"/>
<!--            <i v-if="userBaseInfoVo.idcard!==userBaseInfoEditVo.idcard" class="el-icon-warning">-->
<!--              <div class="history-info-wrap">{{userBaseInfoEditVo.idcard}}</div>-->
<!--            </i>-->
          </p>
          <i v-if="operationType===0" class="iconfont iconbianjishoujihao icon-edit" @click="handleEdit"></i>
        </div>
      </div>
      <!-- 编辑修改情况 -->
      <div v-if="operationType===0" class="edit-role-block">
        <el-form :model="info" :rules="modifyRules" ref="infoForm" label-width="110px" label-position="right">
          <el-form-item label="目前角色：">
            <div class="current-role">{{systemRoles}}</div>
          </el-form-item>
          <el-form-item label="重新分配角色：" label-width="110px" prop="checkList">
            <el-checkbox-group v-model="approvalInfo.roleIdList">
              <el-checkbox :label="item.roleId" v-for="item in dicRoleList" :key="item.roleId">{{item.roleName}}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </div>
      <!-- 详细信息 -->
      <div :class="{'is-edit-status':operationType===0}">
        <div class="detailed-info-block has-top-line clear-float">
          <div class="top-title-block" v-if="operationType!==0">
            <div class="title" v-if="systemId.includes('33000000000')">效能/ {{systemRoles}}
              <Hint :operationType="operationType" :last="userBaseInfoEditVo.systemRoles" :now="userBaseInfoVo.systemRoles"/>
<!--              <i class="el-icon-warning" v-if="systemRoles!==systemEditRoles">-->
<!--                <div class="history-info-wrap">{{systemEditRoles}}</div>-->
<!--              </i>-->
            </div>
            <!--            <div class="title" v-if="systemIds.includes('33000000001')">-->
            <div class="title" v-else>自查/ {{systemRoles}}
              <Hint :operationType="operationType" :last="userBaseInfoEditVo.systemRoles" :now="userBaseInfoVo.systemRoles"/>
            </div>
            <div class="triangle"></div>
          </div>
          <div class="custom-info-list" v-if="systemId.includes('33000000000')">
            <el-row>
              <el-col :span="12">
                <p><span>所在机构：</span>{{userBaseInfoVo.orgname}}
<!--                  <i class="el-icon-warning" v-if="userBaseInfoVo.orgname!==userBaseInfoEditVo.orgname">-->
<!--                    <div class="history-info-wrap">{{userBaseInfoEditVo.orgname}}</div>-->
<!--                  </i>-->
                  <Hint :operationType="operationType" :last="userBaseInfoEditVo.orgname" :now="userBaseInfoVo.orgname"/>
                </p>
              </el-col>
              <el-col :span="12">
                <p><span>所在科室：</span>{{userBaseInfoVo.department}}
<!--                  <i class="el-icon-warning" v-if="userBaseInfoVo.department!==userBaseInfoEditVo.department">-->
<!--                    <div class="history-info-wrap">{{userBaseInfoEditVo.department}}</div>-->
<!--                  </i>-->
                  <Hint :operationType="operationType" :last="userBaseInfoEditVo.department" :now="userBaseInfoVo.department"/>
                </p>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <p><span>民族：</span>{{userBaseInfoVo.mz}}
<!--                  <i class="el-icon-warning" v-if="userBaseInfoVo.mz!==userBaseInfoEditVo.mz">-->
<!--                    <div class="history-info-wrap">{{userBaseInfoEditVo.mz}}</div>-->
<!--                  </i>-->
                  <Hint :operationType="operationType" :last="userBaseInfoEditVo.mz" :now="userBaseInfoVo.mz"/>
                </p>
              </el-col>
              <el-col :span="6">
                <p><span>出生日期：</span>{{userBaseInfoVo.birthday}}
                  <Hint :operationType="operationType" :last="userBaseInfoEditVo.birthday" :now="userBaseInfoVo.birthday"/>
<!--                  <i class="el-icon-warning" v-if="userBaseInfoVo.birthday!==userBaseInfoEditVo.birthday">-->
<!--                    <div class="history-info-wrap">{{userBaseInfoEditVo.birthday}}</div>-->
<!--                  </i>-->
                </p>
              </el-col>
              <el-col :span="6">
                <p><span>政治面貌：</span>{{userBaseInfoVo.zzmm}}
                  <Hint :operationType="operationType" :last="userBaseInfoEditVo.zzmm" :now="userBaseInfoVo.zzmm"/>
<!--                  <i class="el-icon-warning" v-if="userBaseInfoVo.zzmm!==userBaseInfoEditVo.zzmm">-->
<!--                    <div class="history-info-wrap">{{userBaseInfoEditVo.zzmm}}</div>-->
<!--                  </i>-->
                </p>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <p><span>学历：</span>{{userBaseInfoVo.xl}}
                  <Hint :operationType="operationType" :last="userBaseInfoEditVo.xl" :now="userBaseInfoVo.xl"/>
                </p>
              </el-col>
              <el-col :span="6">
                <p><span>学位：</span>{{userBaseInfoVo.xw}}
                  <Hint :operationType="operationType" :last="userBaseInfoEditVo.xw" :now="userBaseInfoVo.xw"/>
                </p>
              </el-col>
              <el-col :span="6">
                <p><span>毕业院校：</span>{{userBaseInfoVo.university}}
                  <Hint :operationType="operationType" :last="userBaseInfoEditVo.university" :now="userBaseInfoVo.university"/>
                </p>
              </el-col>
              <el-col :span="6">
                <p><span>参加工作日期：</span>{{userBaseInfoVo.workDate}}
                  <Hint :operationType="operationType" :last="userBaseInfoEditVo.workDate" :now="userBaseInfoVo.workDate"/>
                </p>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <p><span>所学专业：</span>{{userBaseInfoVo.discipline}}
                  <Hint :operationType="operationType" :last="userBaseInfoEditVo.discipline" :now="userBaseInfoVo.discipline"/>
                </p>
              </el-col>
              <el-col :span="6">
                <p><span>职务：</span>{{userBaseInfoVo.zw}}
                  <Hint :operationType="operationType" :last="userBaseInfoEditVo.zw" :now="userBaseInfoVo.zw"/>
                </p>
              </el-col>
              <el-col :span="6">
                <p><span>职称：</span>{{userBaseInfoVo.zc}}
                  <Hint :operationType="operationType" :last="userBaseInfoEditVo.zc" :now="userBaseInfoVo.zc"/>
<!--                  <i class="el-icon-warning" v-if="userBaseInfoVo.zc!==userBaseInfoEditVo.zc">-->
<!--                    <div class="history-info-wrap">{{userBaseInfoEditVo.zc}}</div>-->
<!--                  </i>-->
                </p>
              </el-col>
              <el-col :span="6">
                <p><span>电子邮箱：</span>{{userBaseInfoVo.email}}
                  <Hint :operationType="operationType" :last="userBaseInfoEditVo.email" :now="userBaseInfoVo.email"/>
<!--                  <i class="el-icon-warning" v-if="userBaseInfoVo.email!==userBaseInfoEditVo.email">-->
<!--                    <div class="history-info-wrap">{{userBaseInfoEditVo.email}}</div>-->
<!--                  </i>-->
                </p>
              </el-col>
            </el-row>
          </div>
          <div class="custom-info-list" v-if="systemId.includes('33000000001')">
            <el-row>
              <el-col :span="12">
                <p><span>所属单位地址：</span>{{zcUserExtraInfoVo.zcAddr}}
                  <Hint :operationType="operationType" :last="userBaseInfoEditVo.zcAddr" :now="userBaseInfoVo.zcAddr"/>
                </p>
              </el-col>
              <el-col :span="12">
                <p><span>所属单位名称：</span>{{zcUserExtraInfoVo.zcCompName}}
                  <Hint :operationType="operationType" :last="userBaseInfoEditVo.zcCompName" :now="userBaseInfoVo.zcCompName"/>
                </p>
              </el-col>
              <el-col :span="6">
                <p><span>专业编码：</span>{{zcUserExtraInfoVo.zcCompSpec}}
                  <Hint :operationType="operationType" :last="userBaseInfoEditVo.zcCompSpec" :now="userBaseInfoVo.zcCompSpec"/>
                </p>
              </el-col>
              <el-col :span="6">
                <p><span>人员类型：</span>{{zcUserExtraInfoVo.zcPersonType}}
                  <Hint :operationType="operationType" :last="userBaseInfoEditVo.zcPersonType" :now="userBaseInfoVo.zcPersonType"/>
                </p>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <p><span>健康证编码：</span>{{zcUserExtraInfoVo.zcHealthCertificate}}
                  <Hint :operationType="operationType" :last="userBaseInfoEditVo.zcHealthCertificate" :now="userBaseInfoVo.zcHealthCertificate"/>
                </p>
              </el-col>
              <el-col :span="12">
                <p><span>健康证期限：</span>{{zcUserExtraInfoVo.zcStartDate}}至{{zcUserExtraInfoVo.zcEndDate}}
                  <i class="el-icon-warning" v-if="zcUserExtraInfoVo.zcStartDate!==zcUserExtraInfoEditVo.zcStartDate||zcUserExtraInfoVo.zcEndDate!==zcUserExtraInfoEditVo.zcEndDate">
                    <div class="history-info-wrap">{{zcUserExtraInfoVo.zcStartDate}}至{{zcUserExtraInfoVo.zcEndDate}}
                    </div>
                  </i>
                </p>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <p><span>QQ号：</span>{{zcUserExtraInfoVo.zcQq}}
                  <Hint :operationType="operationType" :last="userBaseInfoEditVo.zcQq" :now="userBaseInfoVo.zcQq"/>
                </p>
              </el-col>
              <el-col :span="6">
                <p><span>工作年限：</span>{{zcUserExtraInfoVo.zcWorkYear}}年
                  <Hint :operationType="operationType" :last="userBaseInfoEditVo.zcWorkYear" :now="userBaseInfoVo.zcWorkYear"/>
                </p>
              </el-col>
            </el-row>
          </div>
        </div>
        <!-- 职位信息 -->
        <div class="position-info-block has-top-line clear-float" v-if="systemId.includes('33000000000')">
          <div v-if="userBaseInfoVo.isWsjdy===1">
            <div class="title title-1">卫生监督员</div>
            <div class="info-list">
              <p><span>胸牌号：</span>{{userBaseInfoVo.xph}}
                <Hint :operationType="operationType" :last="userBaseInfoEditVo.xph" :now="userBaseInfoVo.xph"/>
              </p>
              <p><span>行政执法号：</span>{{userBaseInfoVo.zfzh}}</p>
              <p><span class="long-title-wrap">参加监督工作日期：</span>{{userBaseInfoVo.jdWorkDate}}</p>
            </div>
          </div>
          <div v-if="userBaseInfoVo.isDagly===1" class="title">档案管理员</div>
          <div v-if="userBaseInfoVo.isTsjbzy===1" class="title">投诉举报专员</div>
          <div v-if="userBaseInfoVo.isSsjjdy===1" class="title">双随机监督员</div>
          <div v-if="userBaseInfoVo.isSsjzg===1" class="title">双随机在岗</div>
          <p class="range-block"><span>执业范围：</span>{{userBaseInfoVo.ssjzyfwText}}
            <i class="el-icon-warning" v-if="zcUserExtraInfoVo.ssjzyfwText!==zcUserExtraInfoEditVo.ssjzyfwText">
              <div class="history-info-wrap">{{userBaseInfoEditVo.ssjzyfwText}}</div>
            </i></p>
          </p>
        </div>
      </div>

    </div>
    <!-- 按钮组 -->
    <el-divider class="mb20 mt0"></el-divider>
    <!-- 审核操作 -->
    <div class="audit" v-if="operationType===1||operationType===3">
      <el-form :model="approvalInfo" :rules="approvalInfoRules" ref="approvalInfo" label-width="100px"
               label-position="left">
        <el-form-item label="是否同意：" prop="status">
          <el-radio-group v-model="approvalInfo.status" @change="linkFn">
            <el-radio :label="2">是</el-radio>
            <el-radio :label="3">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="驳回原因：" prop="rejectReason" v-if="approvalInfo.status===3">
          <div style="width: 60%;">
            <el-input type="textarea" :rows="4" label-width="84px" show-word-limit placeholder="请输入原因"
                      v-model="approvalInfo.rejectReason">
            </el-input>
          </div>
        </el-form-item>
        <el-form-item label="分配角色：" prop="roleIdList" label-width="100px" class="mb0" v-else>
          <el-checkbox-group v-model="approvalInfo.roleIdList">
            <el-checkbox :label="item.roleId" v-for="item in dicRoleList" :key="item.roleId">{{item.roleName}}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </div>
    <div class="operation">
      <div v-if="operationType===0||operationType===1||operationType===3">
        <el-button plain @click="closeModal">取消</el-button>
        <el-button type="primary" @click="submit('approvalInfo')">保存</el-button>
      </div>
      <div v-if="operationType===2">
        <el-button type="primary" @click="closeModal">关闭</el-button>
      </div>
    </div>
  </CustomModal>
</template>

<script>
  import CustomModal from '@/components/customModal'
  import common from "@/mixins/common"
  import * as userApi from "@/api/system/user"
  import Hint from './components/hint'

  export default {
    name: "index",
    mixins: [common],
    props: ['dialogVisible', 'operationType', 'item'],
    components: {
      CustomModal,
      Hint
    },
    data() {
      return {
        form: {},
        roles: [],
        row: {},
        yhlx: 1,
        current: {},
        info: {},
        editPhone: false,
        currentItem: {},
        userBaseInfoVo: {},
        userBaseInfoEditVo: {}, /*编辑前*/
        zcUserExtraInfoVo: {},
        zcUserExtraInfoEditVo: {},/*编辑前*/
        approvalInfo: {
          roleIdList: []
        },
        approvalInfoRules: {
          status: [
            {required: true, message: '请选择是否同意', trigger: 'blur'},
          ],
          rejectReason: [
            {required: true, message: '请输入驳回原因', trigger: 'blur'},
          ],
          roleIdList: [
            {required: true, message: '请选择分配角色', trigger: 'blur'},
          ],
        },
        modifyRules: {},
        systemId: '',
        systemRoles: '',
        systemEditRoles: '', /*编辑前*/
        userId: '',
        changedFields: [],
        changedContent: {},
      }
    },
    created() {

    },
    watch: {
      item(newVal) {
        if (newVal.userBaseInfoVo) {
          const {userId, userBaseInfoVo, zcUserExtraInfoVo, systemId, systemRoles, roles} = newVal;
          if (this.$props.operationType === 0 || this.$props.operationType === 1 || this.$props.operationType === 3) {
            if (systemId) this.queryDicRoleList(systemId);
          }
          this.userBaseInfoVo = userBaseInfoVo || {};
          this.zcUserExtraInfoVo = zcUserExtraInfoVo || {};
          this.systemId = systemId || [];
          this.systemRoles = systemRoles ? systemRoles.join(',') : '';
          this.userId = userId;
          this.approvalInfo = {
            ...this.approvalInfo,
            roleIdList: roles || []
          };
          //审核时需要比对数据
          if (this.$props.operationType === 3) {
            const {userBaseInfoEditVo, systemEditRoles, roleEdits, zcUserExtraInfoEditVo} = newVal;

            this.userBaseInfoEditVo = userBaseInfoEditVo || {};
            this.systemEditRoles = systemEditRoles ? systemEditRoles.join(',') : '';
            this.roleEdits = roleEdits || {};
            this.zcUserExtraInfoEditVo = zcUserExtraInfoEditVo || {};

            if (JSON.stringify(roleEdits) !== JSON.stringify(roles)) {
              this.changedFields = [...this.changedFields, 'systemRoles'];
              this.changedContent = {
                ...this.changedContent,
                systemRoles: systemEditRoles ? systemEditRoles.join(',') : ''
              }
            }
            Object.keys(userBaseInfoEditVo).forEach(s => {
              if (JSON.stringify(userBaseInfoEditVo[s]) !== JSON.stringify(userBaseInfoVo[s])) {
                this.changedFields = [...this.changedFields, s];
                this.changedContent = {
                  ...this.changedContent,
                  [s]: userBaseInfoEditVo[s]
                }
              }
            });

            console.log(this.changedFields, this.changedContent, 'changedContent')
            // console.log(this.userBaseInfoEditVo, 'changedContent')

          }
        }
      },
      dialogVisible(newVal) {
        if (newVal) {

        } else {
          this.userBaseInfoVo = {};
          this.zcUserExtraInfoVo = {};
          this.systemId = '';
          this.systemRoles = '';
          this.userId = '';
          this.approvalInfo = {
            roleIdList: []
          }
        }
      }
    },
    methods: {
      handleEdit() {
        this.editPhone = !this.editPhone;
        if (this.editPhone) {
          this.$refs.editPhone.focus();
        }
      },
      //查看弹窗信息-历史信息
      handHistory(row) {
        if (this.current === row) {
          this.current = ""
        } else {
          this.current = row;
        }
      },
      closeModal() {
        this.$emit('handCancel')
      },
      linkFn(s) {
        if (s === 2) {
          delete this.approvalInfo.rejectReason
        } else {
          this.approvalInfo.roleIdList = []
        }
      },
      submit() {
        //修改
        if (this.$props.operationType === 0) {
          const {telphone} = this.userBaseInfoVo;
          const {roleIdList} = this.approvalInfo;
          if (!telphone) {
            this.$message.info('请填写手机号');
            return
          }
          if (!roleIdList || roleIdList.length === 0) {
            this.$message.info('请选择重新分配的角色');
            return;
          }
          const req = {
            userId: this.userId,
            systemId: this.systemId,
            phone: telphone,
            roleIdList: roleIdList
          };
          userApi.editItem(req).then(res => {
            if (res) {
              this.closeModal()
            }
          })
        } else if (this.$props.operationType === 1 || this.$props.operationType === 3) {
          //审核
          this.$refs['approvalInfo'].validate((valid) => {
            if (valid) {
              const req = {
                userId: this.userId,
                systemId: this.systemId,
                ...this.approvalInfo
              };
              userApi.approval(req).then(res => {
                if (res) {
                  this.closeModal()
                }
              })
            }
          });
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .content {
    width: 340px;
  }

  .operation {
    text-align: center;
    margin: 8px 0 16px 0;
  }

  //用户信息区域
  .user-info-block {
    width: 1000px;
    /*height: 600px;*/
    overflow-y: auto;
    padding: 16px 30px 0 30px;
  }

  // 基本信息块
  .basic-info {
    padding: 0 0 14px 0;

    .block {
      height: 60px;
      border-radius: 4px;
      border: 1px solid #D6DBE2;
      padding: 9px 14px;
      box-sizing: border-box;
      background-size: 100% 100% !important;
      float: left;
      margin-right: 20px;
      background-color: rgba(245, 247, 251, 1);

      span {
        font-size: 14px;
        font-weight: 400;
        color: rgba(58, 61, 73, 0.8);
        line-height: 20px;
      }

      p {
        font-size: 14px;
        font-weight: 600;
        color: rgba(58, 61, 73, 1);
        line-height: 20px;
        margin: 0 !important;
      }
    }

    .name {
      width: 130px;
      background-image: url(../../../assets/imgs/name_bg.png);
    }

    .id-card {
      width: 200px;
      background-image: url(../../../assets/imgs/idcard_bg.png);
    }

    .phone {
      width: 200px;
      background-image: url(../../../assets/imgs/phone_bg.png);
    }
  }

  //详细信息-效能/自查块
  .detailed-info-block {
    .top-title-block {
      width: 100%;
      height: 36px;
      margin-bottom: 8px;

      .title {
        height: 36px;
        background: rgba(196, 211, 242, 1);
        float: left;
        line-height: 36px;
        text-align: center;
        font-size: 14px;
        font-weight: 600;
        color: #1C479E;
        padding: 0 16px;
      }

      .triangle {
        width: 1px;
        border-right: 20px solid transparent;
        border-top: 36px solid;
        color: rgba(196, 211, 242, 1);
        float: left;
      }
    }
  }

  //职位信息块
  .position-info-block {
    .title {
      font-size: 14px;
      font-weight: 600;
      color: #3A3D49;
      margin-bottom: 20px;
    }

    .info-list {
      margin-bottom: 20px;

      p {
        font-size: 14px;
        font-weight: 400;
        color: #3A3D49;
        margin: 0;
        display: inline-block;
        margin-right: 40px;

        span {
          font-size: 14px;
          font-weight: 400;
          color: rgba(58, 61, 73, .5);
          display: inline-block;
        }
      }
    }

    //执业范围
    .range-block {
      font-size: 14px;
      font-weight: 400;
      color: #3A3D49;
      float: left;
      margin: 0;
      margin-top: 12px;

      span {
        font-size: 14px;
        font-weight: 400;
        color: rgba(58, 61, 73, .5);
        display: inline-block;
        text-align: right;
      }
    }
  }

  //自查类型 用户详细信息-自定义布局
  .zicha-custom-info {
    p {
      font-size: 14px;
      font-weight: 400;
      color: #3A3D49;
      display: inline-block;
      margin: 0;
      margin-top: 12px;
    }

    span {
      font-size: 14px;
      font-weight: 400;
      color: rgba(58, 61, 73, .5);
      display: inline-block;
      text-align: right;
    }
  }

  // 用户详细信息列表公共css部分-自定义布局
  .custom-info-list {
    p {
      font-size: 14px;
      font-weight: 400;
      color: #3A3D49;
      display: inline-block;
      margin: 0;
      margin-top: 12px;
    }

    span {
      font-size: 14px;
      font-weight: 400;
      color: rgba(58, 61, 73, .5);
      display: inline-block;
      width: 100px;
      text-align: right;
    }

    .long-title-wrap {
      width: 140px;
    }
  }

  //有顶部边框
  .has-top-line {
    padding: 20px 0;
    border-top: 1px solid rgba(231, 236, 245, 1);
  }

  //清除浮动
  .clear-float::after {
    display: block;
    content: "";
    clear: both;
  }

  //带有蓝色左边框的标题
  .has-left-border {
    font-size: 16px;
    font-weight: 500;
    color: #3A3D49;
    padding-left: 8px;
    position: relative;
    display: inline-block;
  }

  .has-left-border::after {
    content: '';
    display: block;
    width: 4px;
    height: 12px;
    background: linear-gradient(180deg, #358FFF 1%, #105AD2 100%);
    border-radius: 2px;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  //审核操作块
  .operation-block {
    padding-top: 20px;
  }

  // 编辑修改情况 -有灰色背景
  .is-edit-status {
    background: #F5F7FB;
    border-radius: 4px;
    border: 1px solid #DADDE6;
    padding: 20px;

    .has-top-line {
      border: none;
      padding: 0;
    }

    p {
      margin-bottom: 12px;
    }

    .title-1 {
      margin-top: 8px;
    }
  }

  //手机号可编辑情况
  .allow-edit {
    width: 68%;
    display: flex;
    align-items: center;

    .el-input__inner {
      border: none;
    }

    i {
      color: rgba(73, 133, 254, 1);
    }

    input {
      font-size: 14px;
      font-weight: 600;
      color: #3a3d49;
    }
  }


  .el-icon-close {
    float: right;
    cursor: pointer;
    padding-left: 20px;
    color: rgba(78, 84, 114, 1);
    font-size: 20px;
  }

  .el-icon-close:hover {
    color: #409EFF;
  }

  .el-icon-warning {
    color: rgba(254, 146, 43, 1);
    font-size: 16px;
    cursor: pointer;
    margin-left: 4px;
    position: relative;
    transition: all .1s linear;
  }

  .history-info-wrap {
    position: absolute;
    left: 50%;
    top: 110%;
    z-index: 99;
    transform: translateX(-50%);
    background: rgba(132, 131, 131, 1);
    padding: 6px 18px;
    border-radius: 4px;
    display: none;
    white-space: nowrap;
    word-break: keep-all;
    font-size: 14px;
    font-weight: 400;
    color: #FFFFFF;
  }

  .search-block {
    .el-input__inner {
      height: 32px;
      line-height: 32px;
    }
  }

  .bottom-button {
    padding-top: 20px;
  }

  //查看原来的信息
  .el-icon-warning:hover {
    color: rgba(74, 123, 237, .8);
    transform: scale(1.1);

    .history-info-wrap {
      display: block;
    }
  }

  .current-role {
    font-size: 14px;
    font-weight: 500;
    color: #4985FE;
  }

  .audit {
    padding: 0 30px;
  }

  .edit-phone /deep/ .el-input__inner {
    border: 0;
    height: 28px;
    padding: 0;
    font-weight: 600;
    color: #3a3d49;
    font-size: 14px;
  }

  .phone {
    position: relative;
  }

  .icon-edit {
    position: absolute;
    right: 34%;
    bottom: 6px;
    color: #4985FE;
  }
</style>
