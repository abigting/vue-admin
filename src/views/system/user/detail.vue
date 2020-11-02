<template>
  <CustomModal :visible="dialogVisible" title="修改账号信息" @handCancel="closeModal">
    <div class="user-info-block">
      <!-- 基本信息 -->
      <div class="basic-info clear-float">
        <div class="block name">
          <span>姓名</span>
          <p>{{row.name}}</p>
        </div>
        <div class="block id-card">
          <span>身份证号</span>
          <p>{{row.idcard}}
            <i class="el-icon-warning" :class="{'show-history':current===row.idcard}" @click="handHistory(row.idcard)">
              <div class="history-info-wrap">330327196602030214</div>
            </i></p>
        </div>
        <div class="block phone">
          <span>手机号</span>
          <div class="allow-edit" v-if="operationType===0">
            <el-input v-model="row.telephone" placeholder="请输入"></el-input>
            <i class="el-icon-edit"></i>
          </div>
          <p v-else>{{row.telphone}}</p>
        </div>
      </div>
      <!-- 编辑修改情况 -->
      <div v-if="operationType===0" class="edit-role-block">
        <el-form :model="info" :rules="rules" ref="infoForm" label-width="140px" label-position="left">
          <el-form-item label="目前角色：">
            <div class="current-role">超级管理员</div>
          </el-form-item>
          <el-form-item label="重新分配角色：" prop="checkList">
            <el-checkbox-group v-model="info.checkList">
              <el-checkbox label="1">卫生监督员</el-checkbox>
              <el-checkbox label="2">档案管理员</el-checkbox>
              <el-checkbox label="3">投诉举报员</el-checkbox>
              <el-checkbox label="4">双随机监督员</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </div>
      <!-- 详细信息 -->
      <div :class="{'is-edit-status':operationType===0}">
        <div class="detailed-info-block has-top-line clear-float">
          <div class="top-title-block" v-if="operationType!==0">
            <div class="title">{{yhlx===1?'效能 / 办事人员':'自查 / 监督员'}}</div>
            <div class="triangle"></div>
          </div>
          <div class="custom-info-list" v-if="yhlx===1">
            <el-row>
              <el-col :span="12">
                <p><span>所在机构：</span>浙江省湖州市吴兴区吴兴区监督所</p>
              </el-col>
              <el-col :span="12">
                <p><span>所在科室：</span></p>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <p><span>名族：</span>汉族</p>
              </el-col>
              <el-col :span="6">
                <p><span>出生日期：</span>1987-08-05</p>
              </el-col>
              <el-col :span="6">
                <p><span>政治面貌：</span>党员</p>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <p><span>学历：</span>本科</p>
              </el-col>
              <el-col :span="6">
                <p><span>学位：</span>学士</p>
              </el-col>
              <el-col :span="6">
                <p><span>毕业院校：</span>杭州师范大学</p>
              </el-col>
              <el-col :span="6">
                <p><span>参加工作日期：</span>2001.02.03</p>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <p><span>所学专业：</span>土木工程</p>
              </el-col>
              <el-col :span="6">
                <p><span>职务：</span>教授</p>
              </el-col>
              <el-col :span="6">
                <p><span>职称：</span>教授</p>
              </el-col>
            </el-row>
          </div>
          <div class="zicha-custom-info" v-else>
            <p><span>所在企业：</span>浙江省湖州市吴兴区吴兴区监督所</p>
          </div>
        </div>
        <!-- 职位信息 -->
        <div class="position-info-block has-top-line clear-float" v-if="yhlx===1">
          <div class="title title-1">卫生监督员</div>
          <div class="info-list">
            <p><span>胸牌号：</span>1245844444</p>
            <p><span>行政执法号：</span>123456789</p>
            <p><span class="long-title-wrap">参加监督工作日期：</span>2001-01-01</p>
          </div>
          <div class="title">档案管理员</div>
          <div class="title">投诉举报专员</div>
          <div class="title">双随机监督员</div>
          <div class="title">双随机在岗</div>
          <p class="range-block"><span>执业范围：</span>生活饮用水，职业卫生，放射卫生，传染病管理
            <i class="el-icon-warning" :class="{'show-history':current=='我是历史信息。。。'}" @click="handHistory('我是历史信息。。。')">
              <div class="history-info-wrap">生活饮用水</div>
            </i></p>
          </p>
        </div>
      </div>
      <!-- 审核操作 -->
      <div class="operation-block has-top-line clear-float" v-if="operationType===1">
        <el-form :model="info" :rules="rules" ref="infoForm" label-width="140px" label-position="left">
          <el-form-item label="是否同意：" prop="radio">
            <el-radio-group v-model="info.radio">
              <el-radio :label="0">是</el-radio>
              <el-radio :label="1">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="驳回原因：" prop="reson" v-if="info.radio==1">
            <div style="width: 60%;">
              <el-input type="textarea" :rows="4" maxlength="200" show-word-limit placeholder="请输入原因"
                        v-model="info.reson">
              </el-input>
            </div>
          </el-form-item>
          <el-form-item label="分配角色：" prop="checkList" v-if="yhlx===1">
            <el-checkbox-group v-model="info.checkList">
              <el-checkbox label="1">卫生监督员</el-checkbox>
              <el-checkbox label="2">档案管理员</el-checkbox>
              <el-checkbox label="3">投诉举报员</el-checkbox>
              <el-checkbox label="4">双随机监督员</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </div>
      <!-- 按钮组 -->
      <div class="bottom-button">
        <div v-if="operationType===0||operationType===1">
          <el-button plain @click="closeModal">取消</el-button>
          <el-button type="primary" @click="submit">保存</el-button>
        </div>
        <div v-if="operationType===2">
          <el-button type="primary" @click="dialogVisible=false">关闭</el-button>
        </div>
      </div>
    </div>
  </CustomModal>
</template>

<script>
  import CustomModal from '@/components/customModal'

  export default {
    name: "index",
    props: ['dialogVisible', 'operationType'],
    components: {
      CustomModal
    },
    data() {
      return {
        form: {},
        row: {},
        yhlx: 1,
        current: {},
        info:{},
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
    methods: {
      // 审核
      handExamine(row, type) {
        this.row = row;
        this.operationType = type;
        this.dialogVisible = true;
      },
      // 编辑
      handEditor(row, type) {
        this.row = row;
        this.operationType = type;
        this.dialogVisible = true;
      },
      //查看
      handRead(row, type) {
        this.row = row;
        this.operationType = type;
        this.dialogVisible = true;
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
      submit(){

      }
    }
  }
</script>

<style scoped lang="scss">
  .content {
    width: 340px;
  }

  .bottom-button {
    text-align: center;
  }

  //用户信息区域
  .user-info-block {
    width: 1000px;
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
        color: rgba(58, 61, 73, .5);
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
    width: 80%;
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
</style>
