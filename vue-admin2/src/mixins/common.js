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
      address:[]
    }
  },
  created() {

  },
  destroyed() {
    clearInterval(this.timer)
  },
  methods: {
    //获取专业
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
     * @parameter
     * @description 获取行政区划
     * @author Feng.xiuting
     * @date
     */
    getAreaInfo() {
      commonApi.queryAreaInfo({code:''}).then(res => {
        res.forEach(val1 => {
          val1.children.forEach(val2 => {
            val2.children.forEach(val3 => {
              delete val3.children;
            });
          });
        });
        let cityAddress =JSON.stringify(res);
        cityAddress= JSON.parse(cityAddress);
        cityAddress.forEach(val1 => {
          val1.children.forEach(val2 => {
            delete val2.children;
          });
        });
        const userCode = '330000000';
        // this.matchUserArea(res, userCode, 4);
        this.address = res;
        //地区到市区
        // this.cityAddress = cityAddress
      });
    },
  }
}
