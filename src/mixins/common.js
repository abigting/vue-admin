/**
 * @parameter
 * @description 通用方法
 * @author Feng.xiuting
 * @date 2020-10-21
 */
import * as commonApi from "@/api/common"

export default {
  data() {
    return {
      majorList:[], /*专业*/
      dictionary:{
        xl:[],
        xw:[],
        ssjzyfw:[],
        zzmm:[],
        mz:[]
      },
      dicRoleList:[],
      address:[],
      cityAddress:[]
    }
  },
  created() {

  },
  destroyed() {
    clearInterval(this.timer)
  },
  methods: {
    /**
     * @parameter
     * @description 获取专业
     * @author Feng.xiuting
     * @date
     */
    getMajorList() {
      commonApi.queryProfessionDataList({}).then(res => {
        if(res.value){
          res.value.forEach(s=>{
            if(s.childList.length===0){
              delete s.childList
            }
          });
          this.majorList = res.value
        }
      })
    },
    /**
     * @parameter type(按照后端提供的Excel)
     * @description 获取字典表
     * @author Feng.xiuting
     * @date 2020-11-2
     */
    getDictionary(type) {
      commonApi.queryDicList({module:'xnrh-yhzx', type}).then(res => {
        if(res){
          this.dictionary[type]=res||[];
        }
      });
    },
    /**
     * @parameter
     * @description 系统角色列表查询接口
     * @author Feng.xiuting
     * @date 2020-11-2
     */
    queryDicRoleList() {
      commonApi.queryDicRoleList({systemId:33000000000}).then(res => {
        if(res){
          this.dicRoleList = res
        }
      })
    },
    /**
     * @parameter type(按照后端提供的Excel)
     * @description 获取行政区划
     * @author Feng.xiuting
     * @date
     */
    getAreaInfo() {
      commonApi.getAreaInfo({code:''}).then(res => {
        if(res){
          // value.forEach(val1 => {
          //   val1.children.forEach(val2 => {
          //     val2.children.forEach(val3 => {
          //       delete val3.children;
          //     });
          //   });
          // });
          let cityAddress =JSON.stringify(res);
          cityAddress= JSON.parse(cityAddress);
          cityAddress.forEach(val1 => {
            val1.children.forEach(val2 => {
              delete val2.children;
            });
          });
          this.address = res;
          //地区到市区
          this.cityAddress = cityAddress
        }
      });
    },
  }
}
