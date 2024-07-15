
<script setup lang="ts">

const year = (new Date).getFullYear()

</script>

<template>
  <div class="footer">
    <div class="text">
      © Josiah Hamm {{ year }}
    </div>
  </div>
</template>

<style scoped lang="scss">
  .footer{
    position:relative;
    height:100px;
    background-color: rgb(64, 61, 64);

    display: flex;
    flex-direction: column;
    align-items:center;
    justify-content:end;

    .text{
      padding:0.5rem
    }
  }
</style>