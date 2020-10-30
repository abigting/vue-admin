<template>
  <div>
    <div class="content" style="padding-bottom: 8px">
      <div class="limitedWidth">
        <p class="small-title">
          请填写角色信息
        </p>
        <el-form ref="form"
                 :model="form"
                 :rules="rules"
                 label-width="120px">
          <el-row>
            <el-col span="6">
              <el-form-item label="角色所属子系统" prop="name">
                <el-input v-model="form.system"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="6">
              <el-form-item label="角色名称" prop="name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="6">
              <el-form-item label="角色说明" prop="name">
                <el-input v-model="form.description"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="6">
              <el-form-item prop="name">
                <el-checkbox v-model="form.approve">
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
        <p class="small-title">
          请设置角色对应的功能
        </p>
        <div>
          <table class="customTable">
            <tr :key="item.key" v-for="item in roles">
              <td style="width:16%; background:#F5F6FA" class="firstMenu">
                <div>
                  <el-checkbox class="check"
                               @change="value=>handleChoose(value, item)"
                               v-model="item.checked"/>
                  {{item.name}}
                </div>
              </td>
              <td style="width:84%">
                <div v-if="!item.children" class="otherSys">
                  第三方系统，不支持功能选择
                </div>
                <div v-else>
                  <div class="secondMenu" v-for="child in item.children">
                    <div class="parentNode hasLine">
                      <div class="nameBox">
                        <el-checkbox class="check"
                                     @change="value=>handleChoose(value, child)"
                                     v-model="child.checked"/>
                        {{child.name}}
                      </div>
                      <div class="thirdMenuBox">
                        <div v-if="child.children">
                          <div class="thirdMenu" v-for="child1 in child.children">
                            <!--第四级是操作权限-->
                            <div v-if="child1.actions" class="includeAction">
                            <span>
                                <el-checkbox
                                  class="check"
                                  @change="value=>handleChoose(value, child1)"
                                  v-model="child1.checked"/>
                             {{child1.name}}
                            </span>
                              <div class="actionBox">
                             <span v-for="action in child1.actions">
                               <el-checkbox
                                 class="check"
                                 @change="value=>handleChoose(value, action)"
                                 v-model="action.checked"/>
                             {{action.name}}
                             </span>
                              </div>
                            </div>
                            <!--第四级是菜单权限-->
                            <div v-else-if="child1.children" class="includeMenu">
                        <span>
                           <el-checkbox class="check"
                                        @change="value=>handleChoose(value, child1)"
                                        v-model="child1.checked"/>
                          {{child1.name}}
                        </span>
                              <div class="menuBox">
                                <div v-for="child2 in child1.children">
                                  <el-checkbox class="check"
                                               @change="value=>handleChoose(value, child2)"
                                               v-model="child2.checked"/>
                                  {{child2.name}}
                                </div>
                              </div>
                            </div>
                            <!--没有第四级-->
                            <div v-else class="includeAction">
                            <span>
                               <el-checkbox class="check"
                                            @change="value=>handleChoose(value, child1)"
                                            v-model="child1.checked"/>
                              {{child1.name}}
                            </span>
                            </div>
                          </div>
                        </div>
                        <div v-else-if="child.actions">
                          <div class="firstAction">
                            <div class="actionBox">
                             <span v-for="action in child.actions">
                               <el-checkbox
                                 class="check"
                                 @change="value=>handleChoose(value, action)"
                                 v-model="action.checked"/>
                             {{action.name}}
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
      <el-button type="primary" @click="onSubmit('form')">提交</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
  </div>
</template>

<script>
  import * as roleApi from "@/api/role"

  export default {
    name: "detail",
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
        roles: [
          {
            name: '自查系统',
            key: 'zcxt',
            children: [
              {
                name: '首页',
                key: 'sy',
              },
              {
                name: '企业自查管理',
                key: 'qyzcgl',
                parentKey: 'zcxt',
                children: [
                  {
                    name: '企业自查结果',
                    key: 'qyzcjg',
                  },
                  {
                    name: '企业自查设置',
                    key: 'qyzcsz',
                    actions: [
                      {
                        name: '查看',
                        key: 'qyzcsz_ck',
                      },
                      {
                        name: '新增',
                        key: 'qyzcsz_xz',
                      },
                      {
                        name: '修改',
                        key: 'qyzcsz_xg',
                      },
                      {
                        name: '删除',
                        key: 'qyzcsz_sc',
                      }
                    ]
                  },
                  {
                    name: '企业自查汇总',
                    key: 'qyzchz',
                    actions: [
                      {
                        name: '查看',
                        key: 'qyzchz_ck',
                      },
                      {
                        name: '新增',
                        key: 'qyzchz_xz',
                      },
                      {
                        name: '修改',
                        key: 'qyzchz_xg',
                      },
                      {
                        name: '删除',
                        key: 'qyzchz_sc',
                      }
                    ]
                  }
                ]
              },
              {
                name: '培训考试管理',
                key: 'pxksgl',
                parentKey: 'zcxt',
                children: [
                  {
                    name: '培训结果',
                    key: 'pxjg',
                    actions: [
                      {
                        name: '查看',
                        key: 'pxjg_ck',
                        parentKey: 'pxcl',
                      },
                      {
                        name: '新增',
                        key: 'pxjg_xz',
                        parentKey: 'pxcl',
                      },
                      {
                        name: '修改',
                        key: 'pxjg_xg',
                        parentKey: 'pxcl',
                      },
                      {
                        name: '删除',
                        key: 'pxjg_sc',
                        parentKey: 'pxcl',
                      }
                    ]
                  },
                  {
                    name: '考试结果',
                    key: 'ksjg',
                    actions: [
                      {
                        name: '查看',
                        key: 'ksjg_ck',
                      },
                      {
                        name: '新增',
                        key: 'ksjg_xz',
                      },
                      {
                        name: '修改',
                        key: 'ksjg_xg',
                      },
                      {
                        name: '删除',
                        key: 'ksjg_sc',
                      }
                    ]
                  },
                  {
                    name: '考试培训汇总',
                    key: 'kspxhz',
                    parentKey: 'xtsz',
                    actions: [
                      {
                        name: '查看',
                        key: 'kspxhz_ck',
                        parentKey: 'pxcl',
                      },
                      {
                        name: '新增',
                        key: 'kspxhz_xz',
                        parentKey: 'pxcl',
                      },
                      {
                        name: '修改',
                        key: 'kspxhz_xg',
                        parentKey: 'pxcl',
                      },
                      {
                        name: '删除',
                        key: 'kspxhz_sc',
                        parentKey: 'pxcl',
                      }
                    ]
                  },
                  {
                    name: '题库管理',
                    key: 'tkgl',
                    parentKey: 'xtsz',
                    actions: [
                      {
                        name: '查看',
                        key: 'tkgl_ck',
                        parentKey: 'pxcl',
                      },
                      {
                        name: '新增',
                        key: 'tkgl_xz',
                        parentKey: 'pxcl',
                      },
                      {
                        name: '修改',
                        key: 'tkgl_xg',
                        parentKey: 'pxcl',
                      },
                      {
                        name: '删除',
                        key: 'tkgl_sc',
                        parentKey: 'pxcl',
                      }
                    ]
                  },
                  {
                    name: '考试规则管理',
                    key: 'ksgzgl',
                    parentKey: 'xtsz',
                    actions: [
                      {
                        name: '查看',
                        key: 'ksgzgl_ck',
                        parentKey: 'pxcl',
                      },
                      {
                        name: '新增',
                        key: 'ksgzgl_xz',
                        parentKey: 'pxcl',
                      },
                      {
                        name: '修改',
                        key: 'ksgzgl_xg',
                        parentKey: 'pxcl',
                      },
                      {
                        name: '删除',
                        key: 'ksgzgl_sc',
                        parentKey: 'pxcl',
                      }
                    ]
                  },
                  {
                    name: '资料管理',
                    key: 'zlgl',
                    parentKey: 'xtsz',
                    actions: [
                      {
                        name: '查看',
                        key: 'zlgl_ck',
                        parentKey: 'pxcl',
                      },
                      {
                        name: '新增',
                        key: 'zlgl_xz',
                        parentKey: 'pxcl',
                      },
                      {
                        name: '修改',
                        key: 'zlgl_xg',
                        parentKey: 'pxcl',
                      },
                      {
                        name: '删除',
                        key: 'zlgl_sc',
                        parentKey: 'pxcl',
                      }
                    ]
                  }
                ]
              },
              {
                name: '通知公告管理',
                key: 'tzgggl',
                actions: [
                  {
                    name: '查看',
                    key: 'tzgggl_ck',
                    parentKey: 'pxcl',
                  },
                  {
                    name: '新增',
                    key: 'tzgggl_xz',
                    parentKey: 'pxcl',
                  },
                  {
                    name: '修改',
                    key: 'tzgggl_xg',
                    parentKey: 'pxcl',
                  },
                  {
                    name: '删除',
                    key: 'tzgggl_sc',
                    parentKey: 'pxcl',
                  }
                ]
              },
              {
                name: '自查',
                key: 'zc',
                actions: [
                  {
                    name: '查看',
                    key: 'zc_ck',
                    parentKey: 'pxcl',
                  },
                  {
                    name: '新增',
                    key: 'zc_xz',
                    parentKey: 'pxcl',
                  },
                  {
                    name: '修改',
                    key: 'zc_xg',
                    parentKey: 'pxcl',
                  },
                  {
                    name: '删除',
                    key: 'zc_sc',
                    parentKey: 'pxcl',
                  }
                ]
              },
              {
                name: '培训',
                key: 'px',
                actions: [
                  {
                    name: '查看',
                    key: 'px_ck',
                    parentKey: 'pxcl',
                  },
                  {
                    name: '新增',
                    key: 'px_xz',
                    parentKey: 'pxcl',
                  },
                  {
                    name: '修改',
                    key: 'px_xg',
                    parentKey: 'pxcl',
                  },
                  {
                    name: '删除',
                    key: 'px_sc',
                    parentKey: 'pxcl',
                  }
                ]
              },
            ]
          },
          {
            name: '效能评价',
            key: 'xnpj'
          },
          {
            name: '驾驶舱',
            key: 'jsc'
          },
          {
            name: '智能办案',
            key: 'znba1',
            children: [
              {
                name: '智能办案配置',
                key: 'znbapz',
                children: [
                  {
                    name: '法律库',
                    key: 'flk',
                    actions: [
                      {
                        name: '查看',
                        key: 'flk_ck',
                        parentKey: 'pxcl',
                      },
                      {
                        name: '新增',
                        key: 'flk_xz',
                        parentKey: 'pxcl',
                      },
                      {
                        name: '修改',
                        key: 'flk_xg',
                        parentKey: 'pxcl',
                      },
                      {
                        name: '删除',
                        key: 'flk_sc',
                        parentKey: 'pxcl',
                      }
                    ]
                  },
                  {
                    name: '权力库',
                    key: 'qlk',
                    actions: [
                      {
                        name: '查看',
                        key: 'qlk_ck',
                        parentKey: 'pxcl',
                      },
                      {
                        name: '新增',
                        key: 'qlk_xz',
                        parentKey: 'pxcl',
                      },
                      {
                        name: '修改',
                        key: 'qlk_xg',
                        parentKey: 'pxcl',
                      },
                      {
                        name: '删除',
                        key: 'qlk_sc',
                        parentKey: 'pxcl',
                      }
                    ]
                  },
                  {
                    name: '自由裁量库',
                    key: 'zyclk',
                    actions: [
                      {
                        name: '查看',
                        key: 'zyclk_ck',
                        parentKey: 'pxcl',
                      },
                      {
                        name: '新增',
                        key: 'zyclk_xz',
                        parentKey: 'pxcl',
                      },
                      {
                        name: '修改',
                        key: 'zyclk_xg',
                        parentKey: 'pxcl',
                      },
                      {
                        name: '删除',
                        key: 'zyclk_sc',
                        parentKey: 'pxcl',
                      }
                    ]
                  },
                  {
                    name: '处罚案由管理',
                    key: 'cfaygl',
                    actions: [
                      {
                        name: '查看',
                        key: 'cfaygl_ck',
                        parentKey: 'pxcl',
                      },
                      {
                        name: '新增',
                        key: 'cfaygl_xz',
                        parentKey: 'pxcl',
                      },
                      {
                        name: '修改',
                        key: 'cfaygl_xg',
                        parentKey: 'pxcl',
                      },
                      {
                        name: '删除',
                        key: 'cfaygl_sc',
                        parentKey: 'pxcl',
                      }
                    ]
                  }
                ]
              },
              {
                name: '智能办案',
                key: 'znba',
                actions: [
                  {
                    name: '查看',
                    key: 'znba_ck',
                    parentKey: 'pxcl',
                  },
                  {
                    name: '新增',
                    key: 'znba_xz',
                    parentKey: 'pxcl',
                  },
                  {
                    name: '修改',
                    key: 'znba_xg',
                    parentKey: 'pxcl',
                  },
                  {
                    name: '删除',
                    key: 'znba_sc',
                    parentKey: 'pxcl',
                  }
                ]
              }
            ]
          },
          {
            name: '消毒',
            key: 'xd'
          }
        ],
        auth: [],
      }
    },
    computed: {},
    watch: {
      //auth变化时,处理数据roles
      auth: function (newVal) {
        this.roles = this.loopRoles(this.roles, newVal);
      }
    },
    created() {
      // this.getInfo();
    },
    methods: {
      // getInfo() {
      //   const {id} = this.$route.query;
      //   if (id) {
      //     roleApi.getInfo({id}).then(res => {
      //       const {success, value} = res;
      //       if (success) {
      //         //数据处理
      //         this.form = value
      //       }
      //     })
      //   }
      // },
      loopRoles(data, auth) {
        data = data.map(s => {
          if (auth.includes(s.key)) {
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
          if (!valid) {
            const {id} = this.$route.query;
            let req = {
              ...this.form,
              auth: this.auth
            };
            // if(id){
            //   registerApi.register({...req, id}).then((res) => {
            //     if(res){
            //       this.$message({
            //         message: "注册成功",
            //         type: "success",
            //       });
            //     }
            //   });
            // }else{
            //   registerApi.register(req).then((res) => {
            //     if(res){
            //       this.$message({
            //         message: "注册成功",
            //         type: "success",
            //       });
            //     }
            //   });
            // }
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
        const treeData = this.roles;
        const key = option.key;
        const currentItem = this.loopFindItem(key, treeData);
        const keys = this.loopFindAllKey(currentItem);
        const parentKeys = this.loopFindParentKey(key, treeData);
        if (value) {
          auth = [...auth, ...keys, ...parentKeys];
        } else {
          auth = auth.filter(s => !keys.some(key => key === s));
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
                return {key: s, hasChild: item.children.some(child => auth.includes(child.key))};
              } else if (item.actions && item.actions.length) {
                return {key: s, hasChild: item.actions.some(child => auth.includes(child.key))};
              } else {
                return {key: s, hasChild: true};
              }
            } else return {};
          },
        );
        list = list.map(s => s.hasChild ? s.key : -1);
        list = list.filter(s => s !== -1);
        return list;
      },
      loopFindItem(key, data) {
        let item = data.find(s => s.key === key);
        if (item) {
          return item;
        } else {
          for (let s of data) {
            if (s.children) {
              let res = this.loopFindItem(key, s.children);
              if (res)
                return res;
            } else if (s.actions) {
              let res = this.loopFindItem(key, s.actions);

              if (res)
                return res;
            }
          }
        }
      },
      loopFindAllKey(currentItem) {
        const ret = [];
        this.loopChildren(currentItem, function (item) {
          const key = item.key;
          ret.push(key);
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
      loopFindParentKey(key, data) {
        let item = data.find(s => s.key === key);
        // let parentKeys=[];
        if (item) {
          return [];
        } else {
          for (let s of data) {
            if (s.children) {
              let res = this.loopFindChildren(key, s.children);
              if (res) {
                // res=_.flattenDeep([s, ...res]);
                res = this.flatten([s, ...res]);
                return res.map(s => s.key);
              }
            } else if (s.actions) {
              let res = this.loopFindChildren(key, s.actions);
              if (res) {
                res = this.flatten([s, ...res]);
                return res.map(s => s.key);
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
      loopFindChildren(key, data) {
        let item = data.find(s => s.key === key);
        if (item) {
          return [item];
        } else {
          for (let s of data) {
            if (s.children) {
              let res = this.loopFindChildren(key, s.children);
              if (res)
                return [s, res];
            } else if (s.actions) {
              let res = this.loopFindChildren(key, s.actions);
              if (res)
                // return [s, res];
                return s;
            }
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

  .content {
    background-color: #fff;
    padding: 20px 12px;

    .limitedWidth {
      width: 1100px;
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
    padding: 8px 18px;
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
    margin: 16px;
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
      padding: 8px 4px;

      .includeAction {
        margin-right: 16px;
        padding-left: 12px;

        > span {
          width: 140px;
          padding: 2px;
          display: inline-block;
          background: linear-gradient(270deg, rgba(129, 178, 247, 0) 0%, rgba(74, 123, 237, 0.25) 100%);
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
        padding-left: 50px;
        display: inline-block;
        margin: 0;

        > span {
          width: 126px;
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
        width: 140px;
        border-right: 1px solid #E1E5EB;
        padding: 8px 8px;
        display: inline-block;
        /*background: linear-gradient(270deg, rgba(129, 178, 247, 0) 0%, rgba(74, 123, 237, 0.25) 100%);*/
      }
    }

  }

  .operation {
    margin-top: 20px;
  }
</style>
