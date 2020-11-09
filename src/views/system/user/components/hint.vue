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

<style scoped>

</style>
