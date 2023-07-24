<template>
  <div class="navbar">
    <NuxtLink to="/">Home</NuxtLink>
    <NuxtLink to="/potato">potato</NuxtLink>
    <NuxtLink to="/spaghetti">spaghetti</NuxtLink>
  </div>
</template>

<style lang="scss">
.navbar {
    display: flex;
    justify-content: space-between;
    width:100%;
    a{
      color: blue;
      padding: 1rem;
    }
  }
</style>