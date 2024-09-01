<script setup lang="ts">

interface ContactCard {
  socialImage: string
  tag: string
  link: string
  imageStyle?:string
}


defineProps<ContactCard>()

</script>

<template>
  <a :href="link" class="cardWrapper">
    <div class="card">
      <div class="image">
        <NuxtImg :src="socialImage" width="56px" :style="imageStyle" />
      </div>
      <div class="tag">
        <h3>{{ tag }}</h3>
      </div>
    </div>
  </a>
</template>

<style scoped lang="scss">
.cardWrapper {
  margin:1rem;
  text-decoration: none;
  color:white;
  .card {
    background-color: rgb(29, 27, 30);
    border-radius: 1rem;

    display: flex;
    padding: 0.5rem;
    flex-direction: row;
    width: fit-content;
    align-items: center;
    .image {
      display: flex;
      align-items:center;
      width: fit-content;
      aspect-ratio: 1/1;
    }
    .tag {
      padding-left: 3rem;
      padding-right: 3rem;
      width:fit-content;
      h3 {
        font-size: 0.75rem;
        text-align: center;
        margin: 0px;
        width: 16ch;
      }
    }
  }
}
</style>