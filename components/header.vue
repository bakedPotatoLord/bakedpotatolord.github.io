<template>
  <div>
    this is the header
    <br>
    and this is the navbar
    <div class="navbar">
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/potato">potato</NuxtLink>
      <NuxtLink to="/spaghetti">spaghetti</NuxtLink>

    </div>
  </div>
</template>

<style scoped lang="scss">
div{
  font-size: 30px;
}
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