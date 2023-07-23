<template>
  <h2>this is the potato page</h2>
  <img :src="potato" alt="potato" >
</template>

<script setup lang="ts">
 import potato from '~/assets/potato.jpg';

</script>

<style scoped lang="scss">
  img{
    width: 100%;
  }

</style>