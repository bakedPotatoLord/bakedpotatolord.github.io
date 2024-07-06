
<script setup lang="ts">


interface BlogCard {
  title:string
  images: string[]
  body?: string
}

defineProps<BlogCard>()
</script>

<template>
  <div class="card">
    <NuxtImg :src="images.at(0)"/>
    <h2>{{ title }}</h2>

  </div>
</template>

<style scoped lang="scss">
.card{
  background-color: black;
  border-radius: 2rem;
  padding:5%;
}
</style>