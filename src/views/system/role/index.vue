<template>
  <div>
    <!-- 共二级嵌套 -->
    <router-view v-if="$route.meta.level===2"></router-view>
    <div v-else-if="$route.meta.level===1">
      <div class="search-block" style="text-align: right;padding: 10px 12px;">
        <el-button type="primary" @click="addItem(ACTION.ADD)">新增</el-button>
      </div>
      <div class="table-block">
        <el-table :data="data" border v-loading="loading" :element-loading-text="loadingText"
                  :element-loading-spinner="loadingType"
                  :element-loading-background="loadingBg" align="center"
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
                <span class="del" slot="reference">删除</span>
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
  import * as roleApi from "@/api/role/index"
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
        // this.loading = true;
        // const {
        //   professionCode
        // } = this.queryForm;
        // let code = '';
        // if (professionCode) {
        //   code = professionCode.map(s => {
        //     return s[s.length - 1]
        //   }).join(',');
        // }
        // const res = await roleApi.getList({ ...this.queryForm,
        //   professionCode: code
        // });
        // const {
        //   success,
        //   value
        // } = res;
        // if (success) {
        //   const {
        //     totalRecords,
        //     datas
        //   } = value;
        //   this.total = totalRecords;
        //   this.data = datas;
        //   setTimeout(() => {
        //     this.loading = false;
        //   }, 280)
        // }
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
