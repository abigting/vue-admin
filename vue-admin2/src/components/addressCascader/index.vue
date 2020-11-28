<template>
    <el-cascader
            ref="cascader"
            :options="optionsData"
            expandTrigger="hover"
            class="address"
            :value="value"
            :props="{ expandTrigger: 'hover', value:'code',  label:'name', checkStrictly }"
            :disabled=disabled
            :placeholder=placeholder
            clearable
            @change="handleChange"
            @visible-change="elCascaderOnlick"
            @expand-change="elCascaderOnlick"
    >
    </el-cascader>
</template>

<script>
  import request from "@/utils/request";
  import storage from '@/utils/localStorage';

  export default {
    name: "HelloWorld",
    props: {
      disabled:Boolean,
      checkStrictly: Boolean,
      placeholder:String,
      msg: String,
      value: String,// 获取父级组件传递的value
    },
    data() {
      return {
        optionsData: [],
      }
    },
    updated() {
    },
    created() {
      if (storage.get('address')) {
        this.optionsData = storage.get('address')
      } else this.getOptions()
    },
    methods: {
      async getOptions() {
        const res = await request('/xnrh-common/api/dic/queryAreaInfo', {
          method: 'post',
          data: {}
        });
        if (res) {
          let address = res;
          address.forEach(val1 => {
            val1.children.forEach(val2 => {
              val2.children.forEach(val3 => {
                delete val3.children;
              });
            });
          });
          storage.set('address', address);
          this.optionsData = address
        }
      },
      handleChange(value) {
        this.$refs.cascader.dropDownVisible = false;
        if(value.length){
          this.$emit('input', value[value.length-1]);
        }else{
          this.$emit('input', '');
        }
      },
      elCascaderOnlick() {
        setTimeout(function () {
          document.querySelectorAll(".el-cascader-node__label").forEach(el => {
            el.onclick = function () {
              this.previousElementSibling.click();
            };
          });
        }, 100);
      },
    }
  };
</script>
