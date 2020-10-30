<template>
  <div>
    <div class="search-bar">
      <el-form label-width="100px" class="search-block">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="手机号码：">
              <el-input v-model="queryForm.telphone" placeholder="请输入手机号码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="姓名：">
              <el-input v-model="queryForm.name" placeholder="请输入姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="账号ID：">
              <el-input v-model="queryForm.userId" placeholder="请输入账号ID"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="当前状态：">
              <el-select v-model="queryForm.status" placeholder="请选择" clearable>
                <el-option label="待审核" :value="0"></el-option>
                <el-option label="启用" :value="1"></el-option>
                <el-option label="未启用" :value="2"></el-option>
                <el-option label="审核未通过" :value="3"></el-option>
                <el-option label="已删除" :value="4"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="所属子系统：">
              <el-select v-model="queryForm.systemId" placeholder="请选择" clearable>
                <el-option label="自查自律" :value="1"></el-option>
                <el-option label="效能融合" :value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="角色：">
              <el-input v-model="queryForm.roleId" placeholder="请输入角色ID"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6">
<!--            <el-button type="primary" plain @click="addItem">新增</el-button>-->
            <el-button type="primary ml24" plain @click="exportExecl">导出</el-button>
            <el-button type="primary" @click="toQuery">查询</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="table-wrapper">
      <el-table :header-cell-style="{background:'#F5F7FA',color:'#606266'}" :data="data" v-loading="loading"
                :element-loading-text="loadingText" class="table-block" align="center">
        <el-table-column prop="userId" label="账号ID" width="80"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="telphone" label="手机号"></el-table-column>
        <el-table-column prop="idcard" label="身份证号" width="150"></el-table-column>
        <el-table-column prop="orgname" label="所在机构"></el-table-column>
        <el-table-column prop="systemNames" label="所属子系统" width="140"></el-table-column>
        <el-table-column prop="roleNames" label="角色"></el-table-column>
        <el-table-column prop="status" label="当前状态">
          <template slot-scope="scope">
            <span>{{statusMap[scope.row.status]}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="280" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handRead(scope.row,2)">详情</el-button>
            <el-popconfirm title="确定禁用？" @onConfirm="handDisbale(scope.row)">
              <span class="primary-btn" slot="reference">禁用</span>
            </el-popconfirm>
            <span class="primary-btn" @click="handExamine(scope.row,1)">审核</span>
            <el-button type="text" size="small" style="color:#35AA47;" @click="handEditor(scope.row,0)">修改</el-button>
            <el-popconfirm title="确定删除吗？" @onConfirm="handDelete(scope.row,scope.$index)">
              <span class="delete" slot="reference">删除</span>
            </el-popconfirm>
            <!-- <el-popconfirm title="确定重置吗？" @onConfirm="reset(scope.row)">
              <span class="primary-btn" slot="reference">重置</span>
            </el-popconfirm> -->
          </template>
        </el-table-column>
      </el-table>
      <!--分页组件-->
      <el-pagination style="margin-top: 15px;text-align: right;" :total="total" background
                     :current-page="queryForm.page+1" layout="total, prev, pager, next, sizes"
                     @size-change="sizeChange" @current-change="pageChange" :page-size="queryForm.size"/>
    </div>
    <Detail :dialogVisible="dialogVisible" :operationType="operationType" @handCancel="dialogVisible = false"/>
  </div>
</template>

<script>
  import initData from "@/mixins/initData";
  import * as userApi from "@/api/system/user";
  import Detail from './detail'
  export default {
    name: "index",
    components: {Detail},
    mixins: [initData],
    data() {
      return {
        statusMap: ['待审核', '启用', '未启用', '审核未通过', '已删除'],
        operationType: null, //0编辑 1审核 2详情查看
        yhlx: 2, //测试用户类型 效能/自查
        row: {}, //当前查看/审核/编辑用户
        current: '', //当前点击的历史信息
        xzqhCode: [], //行政区划
        type: "", //查看/编辑/新增
        queryForm: {
          page: 1,
          size: 10
        },
        total: 0,
        info: {
          radio: "",
          checkList: [],
          reson: ""
        },
        rules: {
          radio: [{
            required: true,
            message: '请选择',
            trigger: 'change'
          }],
          checkList: [{
            required: true,
            message: '请选择',
            trigger: 'change'
          }],
          reson: [{
            required: true,
            message: '请输入驳回原因',
            trigger: 'blur'
          }],
        },
        dialogVisible: false
      };
    },
    created() {
      this.getList();
    },
    methods: {
      async getList() {
        this.loading = true;
        const {
          professionCode
        } = this.queryForm;
        let code = '';
        if (professionCode) {
          code = professionCode.map(s => {
            return s[s.length - 1]
          }).join(',');
        }
        const res = await userApi.getList({
          ...this.queryForm,
          professionCode: code
        });
        if (res) {
          const {
            totalRecords,
            datas
          } = res;
          this.total = totalRecords;
          this.data = datas;
          setTimeout(() => {
            this.loading = false;
          }, 280)
        }
      },
      toQuery() {
        this.getList();
      },
      toRest() {
        this.queryForm = {
          page: 1,
          size: 10
        };
        this.getList();
      },
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
        if (this.current == row) {
          this.current = ""
        } else {
          this.current = row;
        }
      },
      //新增
      addItem() {
        this.dialogVisible = true;
      },
      // 导出
      exportExecl() {

      },
      sizeChange(val) {
        this.queryForm = {
          ...this.queryForm,
          size: val
        };
        this.getList();
      },
      pageChange(val) {
        this.queryForm = {
          ...this.queryForm,
          page: val
        };
        this.getList();
      },
      //dialog弹窗-确定事件
      handConfirm() {
        this.$refs.infoForm.validate((valid) => {
          if (valid) {
            // api.addUser
            this.dialogVisible = false;
            this.$message({
              message: "保存成功",
              type: "success"
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //dialog弹窗-取消事件
      handCancle() {
        const obj = {
          radio: "",
          checkList: [],
        }
        this.info = obj;
        this.dialogVisible = false;
        // this.$refs.infoForm.resetFields();
      },
      //禁止
      handDisbale(row) {
        this.$message({
          message: "禁用成功",
          type: "success"
        });
      },
      // 重置
      reset(scope) {
        // api.resetUser
        // api.getUser
      },
      // 删除
      handDelete(row, index) {
        this.$message({
          message: "删除成功",
          type: "success"
        });
        this.data.splice(index, 1)
        // api.delUser({
        //   id: row.id
        // }).then(res => {
        //   if (res.success) {
        //     this.$message({
        //       message: "删除成功",
        //       type: "success"
        //     });
        //     this.data.splice(index, 1)
        //   }
        // });
      },
      //行政区划
      handXzqh() {
        this.queryForm.xzqhcode = this.xzqhCode[2];
      },
    },
    directives: {
      drag: {
        inserted: function (el, binding, vnode) {
          vnode = vnode.elm
          el.onmousedown = ((event) => {
            if (event.target.className !== "drag-title-header") {
              return
            }
            let mouseX = event.clientX - vnode.offsetLeft
            let mouseY = event.clientY - vnode.offsetTop
            document.onmousemove = ((event) => {
              let left, top
              left = event.clientX - mouseX
              top = event.clientY - mouseY
              let minX = -vnode.offsetWidth / 2 + 100
              let maxX = window.innerWidth + vnode.offsetWidth / 2 - 100
              if (left <= minX) {
                left = minX
              } else if (left >= maxX) {
                left = maxX
              }
              let minY = 30
              let maxY = window.innerHeight + vnode.offsetHeight / 2 - 100
              if (top <= minY) {
                top = minY
              } else if (top >= maxY) {
                top = maxY
              }
              vnode.style.left = left + 'px'
              vnode.style.top = top + 'px'
            })
            document.onmouseup = (() => {
              document.onmousemove = document.onmouseup = null
            })
          })
          window.onresize = (() => {
            vnode.style.left = "50%"
            vnode.style.top = "50%"
          })
        }
      }
    }
  };
</script>

<style lang="scss">
  .edit-role-block {
    height: 80px;
  }

  #user-index-pages {
    background: #fff;
    padding: 10px 20px 30px;

    // 弹窗
    .dialog-cover {
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      background: rgba(0, 0, 0, .6);
      z-index: 99999;

      .dialog-content {
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background: #fff;
        width: 1100px;
        min-height: 300px;
        z-index: 9999;
        box-shadow: 0px 5px 13px 0px rgba(219, 219, 219, 0.5);
      }

      .el-form-item__label {
        font-weight: 600;
        color: #3A3D49;
      }

      .drag-title-header {
        padding: 12px 20px;
        cursor: move;
        border-bottom: 1px solid rgba(231, 236, 245, 1);
        box-shadow: 0px 5px 13px 0px rgba(219, 219, 219, 0.5);
        border-radius: 6px 6px 0px 0px;
      }

      //用户信息区域
      .user-info-block {
        padding: 0 30px 30px;
      }

      // 基本信息块
      .basic-info {
        padding: 20px 0;

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


    .primary-btn {
      color: #409EFF;
      cursor: pointer;
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

    .show-history {
      color: rgba(74, 123, 237, .8);

      .history-info-wrap {
        display: block !important;;
      }
    }
  }
</style>
