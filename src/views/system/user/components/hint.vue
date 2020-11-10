<template>
  <i v-if="(last!==now)&&operationType===3" class="el-icon-warning">
    <div class="history-info-wrap">{{last}}</div>
  </i>
</template>

<script>
  export default {
    name: "hint",
    props: ['last', 'now', 'operationType'],
  }
</script>

<style lang="scss" scoped>
  .el-icon-warning {
    color: rgba(254, 146, 43, 1);
    font-size: 16px;
    cursor: pointer;
    margin-left: 4px;
    position: relative;
    /*transition: all .1s linear;*/
  }

  .history-info-wrap {
    position: absolute;
    left: 50%;
    top: -26px;
    /*z-index: 99;*/
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

  .el-icon-warning:hover {
    color: rgba(74, 123, 237, .8);

  .history-info-wrap {
    display: block;
  }

  }
</style>
