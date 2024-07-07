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
        <NuxtImg :src="socialImage" />
      </div>
      <div class="tag">
        <h3>{{ tag }}</h3>
      </div>
    </div>
  </a>
</template>