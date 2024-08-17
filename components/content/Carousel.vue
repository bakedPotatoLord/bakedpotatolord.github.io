<template>
  {{  }}
  <div class="carousel">
    <div class="image" v-for="image of images">
      <NuxtImg  :src="image"  />
    </div> 
  </div>
</template>

<script lang="ts" setup>
defineProps<{images: string[]}>()
</script>

<style scoped lang="scss">
.carousel {
  padding-top: 2rem;
  padding-bottom: 2rem;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;

  .image {
    scroll-snap-align: start;
    height: 400px;
    margin-right: 2rem;

    flex-shrink: 0;

    img {
      width: 100%;
      height: 100%;

    }
  }
}
</style>


