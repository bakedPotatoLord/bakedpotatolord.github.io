<template>
  <div class="base">
    <div class="logo">🥔</div>
    <div class="navbar">
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/potato">About</NuxtLink>
      <NuxtLink to="/spaghetti">Portfolio</NuxtLink>
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
  }
  .navbar {
    display: flex;
    align-items: center;
    justify-content: right;
    width: 100%;
    a {
      color: white;
      text-decoration: none;
      padding: 1rem;
      
    }
    
  }
}
</style>
