
<script setup lang="ts">

const year = (new Date).getFullYear()

</script>

<template>
  <div class="footer">
    © Josiah Hamm {{ year }}
  </div>
</template>

<style scoped lang="scss">
  .footer{
    position:relative;
    height:100px;
    background-color: rgb(64, 61, 64);
  }
</style>