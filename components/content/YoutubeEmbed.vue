<script setup lang="ts">

defineProps<{
  src: string,
}>()

</script>


<template>
  <div class="iframeContainer">
    <iframe width="336" height="598" :src="src" title="Plastic Antweight Spin-Up test (gone vibrational)"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  </div>
</template>


<style scoped lang="scss">
.iframeContainer {
  padding: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>