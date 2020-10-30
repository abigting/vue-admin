<template>
  <div>
    <!-- 共二级嵌套 -->
    <router-view v-if="$route.meta.level===2"></router-view>
    <div v-else-if="$route.meta.level===1">
      <div class="search-bar">
        <el-form label-width="100px">
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
                <el-input v-model="queryForm.roleId" placeholder="请输入角色"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="4">
              <el-button type="primary" @click="toQuery">查询</el-button>
              <el-button type="success" class="ml24 add-btn" @click="addItem(ACTION.ADD)">新增</el-button>
              <!--              <el-button type="primary" plain @click="exportExecl">导出</el-button>-->

            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="table-wrapper">
        <el-table :data="data"
                  v-loading="loading"
                  :element-loading-text="loadingText"
                  :element-loading-spinner="loadingType"
                  :element-loading-background="loadingBg"
                  :header-cell-style="{background:'#eef1f6',color:'#606266'}">
          <el-table-column prop="title" label="角色名称" min-width="100" align="center"></el-table-column>
          <el-table-column prop="professionCode" label="所属子系统" min-width="100" align="center"></el-table-column>
          <el-table-column prop="userType" label="是否需要监督员审核" min-width="100" align="center"></el-table-column>
          <el-table-column prop="messageUserType" label="说明" min-width="100" align="center"></el-table-column>
          <el-table-column prop="operation" label="操作" min-width="120" align="center" fixed="right">
            <template slot-scope="scope">
              <span class="action" @click="showDetail(ACTION.REVIEW, scope.row)">查看</span>
              <span class="action" @click="showDetail(ACTION.EDIT, scope.row)">编辑</span>
              <el-popconfirm title="确认删除？" @onConfirm="deleteItem(scope.row)">
                <span class="delete" slot="reference">删除</span>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--分页组件-->
      <div style="margin-top: 15px;
        text-align: right;">
        <el-pagination :total="total" background :current-page="queryForm.page" style="margin-top: 0;"
                       layout="total,  sizes, prev, pager,next,jumper"
                       @size-change="sizeChange" @current-change="pageChange" :page-size="queryForm.size"/>
      </div>

    </div>
  </div>
</template>

<script>
  import initData from "@/mixins/initData"

  import * as roleApi from "@/api/system/role";
  import {
    ACTION
  } from "@/mixins/dictionary"
  import {
    Message
  } from "element-ui";

  export default {
    mixins: [initData],
    data() {
      return {
        data: [],
        total: 0,
        ACTION: ACTION,
        loading: false,
        queryForm: {
          page: 1,
          size: 10
        },
      }
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
        const res = await roleApi.getList({
          ...this.queryForm,
          professionCode: code
        });
        const {
          success,
          value
        } = res;
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
        this.getList()
      },
      toRest() {
        this.queryForm = {
          page: 1,
          size: 10
        };
        this.getList();
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
      addItem(action) {
        this.$router.push(`/system/role/detail?action=${action}`)
      },
      showDetail(action, item) {
        this.$router.push(`/system/role/detail?action=${action}&id=${item.id}`)
      },
      deleteItem(item) {
        roleApi.deleteItem({
          id: item.id
        }).then(res => {
          if (res) {
            this.getList();
            Message({
              message: '删除成功',
              type: 'success'
            });
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
