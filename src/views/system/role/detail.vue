<template>
  <div>
    <div class="content" style="padding-bottom: 8px">
      <div class="limitedWidth">
        <p class="t_left_line">
          请填写角色信息
        </p>
        <el-form ref="form"
                 :model="form"
                 :rules="rules"
                 label-width="120px">
          <el-row>
            <el-col :span="6">
              <el-form-item label="角色所属子系统" prop="systemId">
                <el-select v-model="form.systemId" placeholder="" clearable @change="changeSystem">
                  <el-option :label="item.value"
                             :value="item.code"
                             v-for="item in systemTypeList"
                             :key="item.code"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="角色名称" prop="roleName">
                <el-input v-model="form.roleName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="角色说明" prop="roleDescribe">
                <el-input v-model="form.roleDescribe"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item>
                <el-checkbox v-model="form.needCheck">
                  需要监督员审核
                </el-checkbox>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="content mt8">
      <div class="limitedWidth">
        <p class="t_left_line">
          请设置角色对应的功能
        </p>
        <div>
          <table class="customTable">
            <tr :key="item.menuId" v-for="item in permissionList">
              <td style="width:12%; background:#F5F6FA" class="firstMenu">
                <div>
                  <el-checkbox class="check"
                               @change="value=>handleChoose(value, item)"
                               v-model="item.checked"/>
                  {{item.menuName}}
                </div>
              </td>
              <td style="width:88%">
                <!--第三方系统-->
                <div v-if="!item.children||item.children.length===0" class="otherSys">
                  第三方系统，不支持功能选择
                </div>
                <div v-else>
                  <div class="secondMenu" v-for="child in item.children">
                    <div class="parentNode hasLine">
                      <div :class="{'nameBox':true, childrenIsMenu: child.flag===0, childrenIsActions: child.flag===1}">
                        <el-checkbox class="check"
                                     @change="value=>handleChoose(value, child)"
                                     v-model="child.checked"/>
                        {{child.menuName}}
                      </div>
                      <div class="thirdMenuBox">
                        <!--第三级是菜单-->
                        <div v-if="child.flag===0">
                          <div class="thirdMenu" v-for="child1 in child.children">
                            <!--第四级是操作权限-->
                            <div v-if="child1.flag===1" class="includeAction">
                            <span>
                                <el-checkbox
                                  class="check"
                                  @change="value=>handleChoose(value, child1)"
                                  v-model="child1.checked"/>
                             {{child1.menuName}}
                            </span>
                              <div class="actionBox">
                               <span v-for="action in child1.children">
                                 <el-checkbox
                                   class="check"
                                   @change="value=>handleChoose(value, action)"
                                   v-model="action.checked"/>
                               {{action.menuName}}
                               </span>
                              </div>
                            </div>
                            <!--第四级是菜单权限-->
                            <div v-else-if="child1.children" class="includeMenu">
                        <span>
                           <el-checkbox class="check"
                                        @change="value=>handleChoose(value, child1)"
                                        v-model="child1.checked"/>
                          {{child1.menuName}}
                        </span>
                              <div class="menuBox">
                                <div v-for="child2 in child1.children">
                                  <el-checkbox class="check"
                                               @change="value=>handleChoose(value, child2)"
                                               v-model="child2.checked"/>
                                  {{child2.menuName}}
                                </div>
                              </div>
                            </div>
                            <!--没有第四级-->
                            <div v-else class="includeAction">
                            <span>
                               <el-checkbox class="check"
                                            @change="value=>handleChoose(value, child1)"
                                            v-model="child1.checked"/>
                              {{child1.menuName}}
                            </span>
                            </div>
                          </div>
                        </div>
                        <!--第三级是操作-->
                        <div v-else-if="child.flag===1" class="hasLeftBorder">
                          <div class="firstAction">
                            <div class="actionBox">
                             <span v-for="action in child.children">
                               <el-checkbox
                                 class="check"
                                 @change="value=>handleChoose(value, action)"
                                 v-model="action.checked"/>
                             {{action.menuName}}
                             </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <div class="operation">
      <el-button type="primary" @click="onSubmit('form')">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
  </div>
</template>

<script>
  import * as roleApi from "@/api/system/role"
  import common from "@/mixins/common"

  export default {
    name: "detail",
    mixins: [common],
    data() {
      return {
        form: {
          systemId: 33000000000
        },
        rules: {
          systemId: [
            {required: true, message: '请选择角色所属子系统', trigger: 'blur'},
          ],
          roleName: [
            {required: true, message: '请输入角色名称', trigger: 'blur'},
          ],
          roleDescribe: [
            {required: true, message: '请输入角色说明', trigger: 'blur'},
          ],
        },
        permissionList: [
          // {
          //   menuName: '自查系统',
          //   menuId: 'zcxt',
          //   children: [
          //     {
          //       menuName: '首页',
          //       menuId: 'sy',
          //     },
          //     {
          //       menuName: '企业自查管理',
          //       menuId: 'qyzcgl',
          //       children: [
          //         {
          //           menuName: '企业自查结果',
          //           menuId: 'qyzcjg',
          //         },
          //         {
          //           menuName: '企业自查设置',
          //           menuId: 'qyzcsz',
          //           actions: [
          //             {
          //               menuName: '查看',
          //               menuId: 'qyzcsz_ck',
          //             },
          //             {
          //               menuName: '新增',
          //               menuId: 'qyzcsz_xz',
          //             },
          //             {
          //               menuName: '修改',
          //               menuId: 'qyzcsz_xg',
          //             },
          //             {
          //               menuName: '删除',
          //               menuId: 'qyzcsz_sc',
          //             }
          //           ]
          //         },
          //         {
          //           menuName: '企业自查汇总',
          //           menuId: 'qyzchz',
          //           actions: [
          //             {
          //               menuName: '查看',
          //               menuId: 'qyzchz_ck',
          //             },
          //             {
          //               menuName: '新增',
          //               menuId: 'qyzchz_xz',
          //             },
          //             {
          //               menuName: '修改',
          //               menuId: 'qyzchz_xg',
          //             },
          //             {
          //               menuName: '删除',
          //               menuId: 'qyzchz_sc',
          //             }
          //           ]
          //         }
          //       ]
          //     },
          //     {
          //       menuName: '培训考试管理',
          //       menuId: 'pxksgl',
          //       children: [
          //         {
          //           menuName: '培训结果',
          //           menuId: 'pxjg',
          //           actions: [
          //             {
          //               menuName: '查看',
          //               menuId: 'pxjg_ck',
          //             },
          //             {
          //               menuName: '新增',
          //               menuId: 'pxjg_xz',
          //             },
          //             {
          //               menuName: '修改',
          //               menuId: 'pxjg_xg',
          //             },
          //             {
          //               menuName: '删除',
          //               menuId: 'pxjg_sc',
          //             }
          //           ]
          //         },
          //         {
          //           menuName: '考试结果',
          //           menuId: 'ksjg',
          //           actions: [
          //             {
          //               menuName: '查看',
          //               menuId: 'ksjg_ck',
          //             },
          //             {
          //               menuName: '新增',
          //               menuId: 'ksjg_xz',
          //             },
          //             {
          //               menuName: '修改',
          //               menuId: 'ksjg_xg',
          //             },
          //             {
          //               menuName: '删除',
          //               menuId: 'ksjg_sc',
          //             }
          //           ]
          //         },
          //         {
          //           menuName: '考试培训汇总',
          //           menuId: 'kspxhz',
          //           actions: [
          //             {
          //               menuName: '查看',
          //               menuId: 'kspxhz_ck',
          //             },
          //             {
          //               menuName: '新增',
          //               menuId: 'kspxhz_xz',
          //             },
          //             {
          //               menuName: '修改',
          //               menuId: 'kspxhz_xg',
          //             },
          //             {
          //               menuName: '删除',
          //               menuId: 'kspxhz_sc',
          //             }
          //           ]
          //         },
          //         {
          //           menuName: '题库管理',
          //           menuId: 'tkgl',
          //           actions: [
          //             {
          //               menuName: '查看',
          //               menuId: 'tkgl_ck',
          //             },
          //             {
          //               menuName: '新增',
          //               menuId: 'tkgl_xz',
          //             },
          //             {
          //               menuName: '修改',
          //               menuId: 'tkgl_xg',
          //             },
          //             {
          //               menuName: '删除',
          //               menuId: 'tkgl_sc',
          //             }
          //           ]
          //         },
          //         {
          //           menuName: '考试规则管理',
          //           menuId: 'ksgzgl',
          //           actions: [
          //             {
          //               menuName: '查看',
          //               menuId: 'ksgzgl_ck',
          //             },
          //             {
          //               menuName: '新增',
          //               menuId: 'ksgzgl_xz',
          //             },
          //             {
          //               menuName: '修改',
          //               menuId: 'ksgzgl_xg',
          //             },
          //             {
          //               menuName: '删除',
          //               menuId: 'ksgzgl_sc',
          //             }
          //           ]
          //         },
          //         {
          //           menuName: '资料管理',
          //           menuId: 'zlgl',
          //           actions: [
          //             {
          //               menuName: '查看',
          //               menuId: 'zlgl_ck',
          //             },
          //             {
          //               menuName: '新增',
          //               menuId: 'zlgl_xz',
          //             },
          //             {
          //               menuName: '修改',
          //               menuId: 'zlgl_xg',
          //             },
          //             {
          //               menuName: '删除',
          //               menuId: 'zlgl_sc',
          //             }
          //           ]
          //         }
          //       ]
          //     },
          //     {
          //       menuName: '通知公告管理',
          //       menuId: 'tzgggl',
          //       actions: [
          //         {
          //           menuName: '查看',
          //           menuId: 'tzgggl_ck',
          //         },
          //         {
          //           menuName: '新增',
          //           menuId: 'tzgggl_xz',
          //         },
          //         {
          //           menuName: '修改',
          //           menuId: 'tzgggl_xg',
          //         },
          //         {
          //           menuName: '删除',
          //           menuId: 'tzgggl_sc',
          //         }
          //       ]
          //     },
          //     {
          //       menuName: '自查',
          //       menuId: 'zc',
          //       actions: [
          //         {
          //           menuName: '查看',
          //           menuId: 'zc_ck',
          //         },
          //         {
          //           menuName: '新增',
          //           menuId: 'zc_xz',
          //         },
          //         {
          //           menuName: '修改',
          //           menuId: 'zc_xg',
          //         },
          //         {
          //           menuName: '删除',
          //           menuId: 'zc_sc',
          //         }
          //       ]
          //     },
          //     {
          //       menuName: '培训',
          //       menuId: 'px',
          //       actions: [
          //         {
          //           menuName: '查看',
          //           menuId: 'px_ck',
          //         },
          //         {
          //           menuName: '新增',
          //           menuId: 'px_xz',
          //         },
          //         {
          //           menuName: '修改',
          //           menuId: 'px_xg',
          //         },
          //         {
          //           menuName: '删除',
          //           menuId: 'px_sc',
          //         }
          //       ]
          //     },
          //   ]
          // },
          // {
          //   menuName: '效能评价',
          //   menuId: 'xnpj'
          // },
          // {
          //   menuName: '驾驶舱',
          //   menuId: 'jsc'
          // },
          // {
          //   menuName: '智能办案',
          //   menuId: 'znba1',
          //   children: [
          //     {
          //       menuName: '智能办案配置',
          //       menuId: 'znbapz',
          //       children: [
          //         {
          //           menuName: '法律库',
          //           menuId: 'flk',
          //           actions: [
          //             {
          //               menuName: '查看',
          //               menuId: 'flk_ck',
          //             },
          //             {
          //               menuName: '新增',
          //               menuId: 'flk_xz',
          //             },
          //             {
          //               menuName: '修改',
          //               menuId: 'flk_xg',
          //             },
          //             {
          //               menuName: '删除',
          //               menuId: 'flk_sc',
          //             }
          //           ]
          //         },
          //         {
          //           menuName: '权力库',
          //           menuId: 'qlk',
          //           actions: [
          //             {
          //               menuName: '查看',
          //               menuId: 'qlk_ck',
          //             },
          //             {
          //               menuName: '新增',
          //               menuId: 'qlk_xz',
          //             },
          //             {
          //               menuName: '修改',
          //               menuId: 'qlk_xg',
          //             },
          //             {
          //               menuName: '删除',
          //               menuId: 'qlk_sc',
          //             }
          //           ]
          //         },
          //         {
          //           menuName: '自由裁量库',
          //           menuId: 'zyclk',
          //           actions: [
          //             {
          //               menuName: '查看',
          //               menuId: 'zyclk_ck',
          //             },
          //             {
          //               menuName: '新增',
          //               menuId: 'zyclk_xz',
          //             },
          //             {
          //               menuName: '修改',
          //               menuId: 'zyclk_xg',
          //             },
          //             {
          //               menuName: '删除',
          //               menuId: 'zyclk_sc',
          //             }
          //           ]
          //         },
          //         {
          //           menuName: '处罚案由管理',
          //           menuId: 'cfaygl',
          //           actions: [
          //             {
          //               menuName: '查看',
          //               menuId: 'cfaygl_ck',
          //             },
          //             {
          //               menuName: '新增',
          //               menuId: 'cfaygl_xz',
          //             },
          //             {
          //               menuName: '修改',
          //               menuId: 'cfaygl_xg',
          //             },
          //             {
          //               menuName: '删除',
          //               menuId: 'cfaygl_sc',
          //             }
          //           ]
          //         }
          //       ]
          //     },
          //     {
          //       menuName: '智能办案',
          //       menuId: 'znba',
          //       actions: [
          //         {
          //           menuName: '查看',
          //           menuId: 'znba_ck',
          //         },
          //         {
          //           menuName: '新增',
          //           menuId: 'znba_xz',
          //         },
          //         {
          //           menuName: '修改',
          //           menuId: 'znba_xg',
          //         },
          //         {
          //           menuName: '删除',
          //           menuId: 'znba_sc',
          //         }
          //       ]
          //     }
          //   ]
          // },
          // {
          //   menuName: '消毒',
          //   menuId: 'xd'
          // }
        ],
        auth: [],
      }
    },
    computed: {},
    watch: {
      //auth变化时,处理数据roles
      auth: function (newVal) {
        this.permissionList = this.loopRoles(this.permissionList, newVal);
      },
    },
    created() {
      this.getInfo();
      this.getSystemType();
    },
    methods: {
      getPermissionList(data) {
        roleApi.getPermissionList(data).then(res => {
          if (res) {
            this.auth = [...this.auth];
            this.permissionList = res
          }
        })
      },
      changeSystem(value) {
        if (value !== 33000000000) {
          this.auth = []
        }
        this.getPermissionList({code: value});
      },
      getInfo() {
        const {id} = this.$route.query;
        if (id) {
          roleApi.getInfo({roleId: id}).then(res => {
            if (res) {
              //数据处理
              this.form = {
                ...res,
                needCheck: res.needCheck === 1,
              };
              this.auth = res.permissionList || [];
              this.getPermissionList({code: res.systemId});
            }
          })
        } else {
          this.getPermissionList({code: this.form.systemId});
        }
      },
      loopRoles(data, auth) {
        data = data.map(s => {
          if (auth.includes(s.menuId)) {
            return this.dealData(s, auth, true)
          } else {
            return this.dealData(s, auth, false)
          }
        });
        return data || []
      },
      dealData(s, auth, checked) {
        if (s.children) {
          return {...s, checked: checked, children: this.loopRoles(s.children, auth)};
        } else if (s.actions) {
          return {...s, checked: checked, actions: this.loopRoles(s.actions, auth)};
        } else return {...s, checked: checked}
      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const {id} = this.$route.query;
            const {needCheck} = this.form;
            if (this.auth.length === 0) {
              this.$message.info('请勾选角色对应的功能');
              return
            }
            let req = {
              ...this.form,
              needCheck: needCheck ? 1 : 0,
              permissionList: this.auth
            };
            if (id) {
              roleApi.editItem({...req, roleId: id}).then((res) => {
                if (res) {
                  this.$message({
                    message: "保存成功",
                    type: "success",
                  });
                  this.$router.go(-1)
                }
              });
            } else {
              roleApi.addItem(req).then((res) => {
                if (res) {
                  this.$message({
                    message: "保存成功",
                    type: "success",
                  });
                  this.$router.go(-1)
                }
              });
            }
          } else {
            return false;
          }
        });
      },
      cancel() {
        this.$router.go(-1);
      },
      handleChoose(value, option) {
        let auth = this.auth;
        const level = 4;
        const treeData = this.permissionList;
        const menuId = option.menuId;
        const currentItem = this.loopFindItem(menuId, treeData);
        const menuIds = this.loopFindAllKey(currentItem);
        const parentKeys = this.loopFindParentKey(menuId, treeData);
        if (value) {
          auth = [...auth, ...menuIds, ...parentKeys];
        } else {
          auth = auth.filter(s => !menuIds.some(key => key === s));
        }
        // 父节点下的子节点没有选中就取消父节点的选中
        for (let i = 1; i < level; i++) {
          auth = this.judgeParentNode(treeData, auth);
        }
        this.auth = auth;
      },
      judgeParentNode(treeData, auth) {
        let list = auth.map(s => {
            const item = this.loopFindItem(s, treeData);
            if (item) {
              if (item.children && item.children.length) {
                return {menuId: s, hasChild: item.children.some(child => auth.includes(child.menuId))};
              } else if (item.actions && item.actions.length) {
                return {menuId: s, hasChild: item.actions.some(child => auth.includes(child.menuId))};
              } else {
                return {menuId: s, hasChild: true};
              }
            } else return {};
          },
        );
        list = list.map(s => s.hasChild ? s.menuId : -1);
        list = list.filter(s => s !== -1);
        return list;
      },
      loopFindItem(menuId, data) {
        let item = data.find(s => s.menuId === menuId);
        if (item) {
          return item;
        } else {
          for (let s of data) {
            if (s.children) {
              let res = this.loopFindItem(menuId, s.children);
              if (res)
                return res;
            } else if (s.actions) {
              let res = this.loopFindItem(menuId, s.actions);
              if (res)
                return res;
            }
          }
        }
      },
      loopFindAllKey(currentItem) {
        const ret = [];
        this.loopChildren(currentItem, function (item) {
          const menuId = item.menuId;
          ret.push(menuId);
        });
        return ret;
      },
      loopChildren(item, callback) {
        let stack = [];
        stack = stack.concat(item);
        while (stack.length) {
          const item = stack.shift();
          if (callback(item)) {
            return item;
          }
          if (item.children) {
            stack = stack.concat(item.children);
          } else if (item.actions) {
            stack = stack.concat(item.actions);
          }
        }
      },
      loopFindParentKey(menuId, data) {
        let item = data.find(s => s.menuId === menuId);
        // let parentKeys=[];
        if (item) {
          return [];
        } else {
          for (let s of data) {
            if (s.children) {
              let res = this.loopFindChildren(menuId, s.children);
              if (res) {
                res = this.flatten([s, ...res]);
                return res.map(s => s.menuId);
              }
            } else if (s.actions) {
              let res = this.loopFindChildren(menuId, s.actions);
              if (res) {
                res = this.flatten([s, ...res]);
                return res.map(s => s.menuId);
              }
            }
          }
        }
      },
      flatten(arr) {
        return arr.reduce((pre, cur) => {
          return pre.concat(Array.isArray(cur) ? this.flatten(cur) : cur);
        }, [])
      },
      loopFindChildren(menuId, data) {
        let item = data.find(s => s.menuId === menuId);
        if (item) {
          return [item];
        } else {
          for (let s of data) {
            if (s.children) {
              let res = this.loopFindChildren(menuId, s.children);
              if (res)
                return [s, res];
            } else if (s.actions) {
              let res = this.loopFindChildren(menuId, s.actions);
              if (res)
                // return [s, res];
                return [s, res];
            }
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .title {
    border-left: 3px solid #358FFF;
    padding: 0 8px;
    font-size: 14px;
    margin-top: 0;
    font-weight: 600;
    color: #1F2022;
  }

  .content {
    background-color: #fff;
    padding: 20px 12px;

    .limitedWidth {
      width: 1200px;
    }
  }

  .customTable {
    border: 1px solid #e8e8e8;
    border-right: 0;
    border-bottom: 0;
    margin-bottom: 8px;
    width: 100%;
    background: #FBFBFD;
    font-size: 14px;
    color: #606266;

    > tr {
      display: flex;

      > td {
        color: rgba(0, 0, 0, 0.85);
        font-weight: 500;
        border-bottom: 1px solid #e8e8e8;
        transition: background 0.3s ease;
        /*padding: 6px 4px;*/
        overflow-wrap: break-word;
        border-right: 1px solid #e8e8e8;
        display: inline-block;
        min-height: 36px;
      }
    }

    .header {
      > td {
        text-align: left;
        padding: 6px 16px;

        > span {
          width: 200px;
          display: inline-block;
          margin: 0 8px;
        }
      }
    }
  }

  .firstAction {
    /*padding: 0 18px;*/

    .actionBox {
      margin: 0;

      > span {
        width: 100px;
        display: inline-block;
      }
    }
  }

  .firstMenu {
    position: relative;

    > div {
      white-space: nowrap;
      position: absolute;
      top: 50%;
      left: 8px;
      transform: translate(0, -50%);
    }
  }

  .otherSys {
    margin: 12px;
  }

  .check {
    margin-right: 8px;
  }

  .secondMenu {
    text-align: left;
    /*margin: 0 16px;*/
    border-bottom: 1px solid #e8e8e8;

    &:last-child {
      border-bottom: 0;
    }

    .thirdMenuBox {
      display: inline-block;
    }

    .thirdMenu {
      /*padding: 8px 4px;*/

      .includeAction {
        margin-right: 16px;
        padding-left: 12px;

        > span {
          width: 140px;
          padding: 12px 4px;
          display: inline-block;
          border-right: 1px solid #e8e8e8;
        }
      }

      .includeMenu {
        padding-left: 12px;

        > span {
          width: 140px;
          padding: 2px;
          display: inline-block;
          background: linear-gradient(270deg, rgba(129, 178, 247, 0) 0%, rgba(74, 123, 237, 0.25) 100%);
        }
      }

      .actionBox {
        padding-left: 12px;
        display: inline-block;
        margin: 0;

        > span {
          width: 100px;
          display: inline-block;
        }
      }

      .menuBox {
        > div {
          padding: 8px 4px 8px 23px;

          &:nth-child(1) {
            margin-top: 8px;
          }

          &:last-child {
            padding-bottom: 0;
          }
        }
      }
    }

    .parentNode {
      /*padding: 12px 4px 0 4px;*/
      position: relative;
      display: flex;

      .nameBox {
        width: 146px;
        border-right: 1px solid #E1E5EB;
        padding: 12px 12px;
        display: inline-block;
        /*background: linear-gradient(270deg, rgba(129, 178, 247, 0) 0%, rgba(74, 123, 237, 0.25) 100%);*/
      }

      .childrenIsMenu {

      }

      .childrenIsActions {
        border-right: 0;
      }

      .hasLeftBorder {
        border-left: 1px solid #e8e8e8;
        padding: 12px 0 12px 16px;
        margin-left: 151px;
      }
    }

  }


  .operation {
    margin-top: 20px;
  }
</style>
