<script setup lang="ts">

defineProps<{
  src: string,
  maxWidth: number,
  width: number
}>()

</script>


<template>
  <div class="imageContainer">
    <NuxtImg :src="src" :width="width" :style="`max-width: ${maxWidth}px , `"/>
  </div> 
</template>

<style scoped lang="scss">
.imageContainer {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>

