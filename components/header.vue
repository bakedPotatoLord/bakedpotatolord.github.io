
<script setup>
import logo from '@/assets/logo.jpg'
</script>

<template>
  <div class="base">
    <div class="logo">
      <img :src="logo" alt="potato logo">
    </div>
    <div class="navbar">
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/about">About</NuxtLink>
      <NuxtLink to="/portfolio">Portfolio</NuxtLink>
      <NuxtLink to="/contact">Contact</NuxtLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
h1 {
  font-family: "Noto Sans", sans-serif;
}

.base {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: rgb(63, 25, 108);
  .logo {
    font-size: 2rem;
    padding: 0.5rem;
    img {
      width: 4rem;
      border-radius: 50%;
    }
  }
  .navbar {
    display: flex;
    align-items: center;
    justify-content: right;
    width: 100%;
    a {
      color: white;
      text-decoration: none;
      font-size: 1.0rem;
      padding: 1rem;
      &:hover {
        text-shadow: white 0px 0px 10px;
      }
    }
  }
}
</style>
