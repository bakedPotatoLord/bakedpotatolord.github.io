
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
    <div class="descContainer">
      <p class="description">{{ description }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.blogItem {
  max-width: 600px;
  min-width: 200px;
  width:31rem;
  background-color: rgb(64, 61, 64);
  border-radius: 10px;
  padding: 2%;
  margin: 2%;
  aspect-ratio: 1.618 / 1;
  display: flex;
  flex-direction: column;
  align-items: center ;
  box-sizing: border-box;

  
  .title {
    margin-top: 0.1ch;
    font: 400 1.5rem;
    height: 4ch;
  }
  .image {
    max-width: 100%;
    border-radius: 1rem;
    aspect-ratio: 1.618 /1;
  }
  .descContainer {
    height: 6ch;
    overflow: hidden;
    margin-top: 0.5rem;
    width:100%;
    .description {
      margin: 0px;
      min-width: 0;
    }
  }
  &:hover {
    box-shadow: 0 0 10px 10px rgba(64, 61, 64, 0.5);
  }
}
</style>