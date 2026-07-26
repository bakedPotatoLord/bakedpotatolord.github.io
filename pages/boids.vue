<script setup lang="ts">

useHead({
})

useSeoMeta({
})


const c = ref<HTMLCanvasElement | null>(null)


onMounted(async () => {
  if (!c.value) throw new Error("no canvas")

});

onUnmounted(() => {
})

</script>

<template>
  <div class="title">
    <SectionTitle title="Boids" justify="left"/>
  </div>
  <div class="container">
    <div class="canvases">
      <canvas ref="c"></canvas>
    </div>
  </div>
</template>

<style scoped lang="scss">


</style>