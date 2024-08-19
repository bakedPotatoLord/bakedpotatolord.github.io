
<script setup lang="ts">


interface BlogCard {
  title?: string
  image?: string
  imageAlt?: string
  description?: string
}

defineProps<BlogCard>()
</script>

<template>
  <div class="blogItem">

    <h3 class="title">{{ title }}</h3>
    <NuxtImg :src="image" width="500px" sizes=" sm:200px md:500px lg:700px" :alt="imageAlt" class="image" />
    <p class="description">{{ description }}</p>

  </div>
</template>

<style scoped lang="scss">
.blogItem {
  max-width: 400px;
  min-width: 300px;
  background-color: rgb(64, 61, 64);
  border-radius: 10px;
  padding: 2%;
  margin: 2%;
  height:fit-content;

  .title {
    margin-top: 0.5rem;
    font: 400 1.5rem;
  }

  .image {
    width: 100%;
    border-radius: 1rem;
    aspect-ratio: 1.618 /1;
  }

  .description {
    margin-bottom: 0px;
    overflow: hidden;

  }

  &:hover {
    box-shadow: 0 0 10px 10px rgba(64, 61, 64, 0.5);
  }
}
</style>