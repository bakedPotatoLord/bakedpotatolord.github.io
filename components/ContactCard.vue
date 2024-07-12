<script setup lang="ts">

interface ContactCard {
  socialImage: string
  tag: string
  link: string
}


defineProps<ContactCard>()

</script>

<template>
  <a :href="link">
  <div class="card">
    <div class="image">
        <NuxtImg :src="socialImage" width="128px" />
    </div>
    <div class="tag">
      <h3>{{ tag }}</h3>
    </div>
  </div>
</a>
</template>

<style scoped lang="scss">
.card {
  display: flex;
  padding: 1rem;
  flex-direction: row;
  width: fit-content;
  align-items: center;
  cons

  .image {
    width: 2rem;
    border: p2x solid black;
  }

  .tag{
    padding-left: 3rem;
    padding-right:3rem;
    h3{
      margin:0px;
    }
  }
}
</style>