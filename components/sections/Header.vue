

<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'

const viewportWidth = useWindowSize().width

const menuOpen = ref(false)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

</script>


<template>
  <div class="base">
    <div class="logo">
      <NuxtImg src="/images/logo.jpg" alt="potato logo" width="150" />
    </div>
    {{ viewportWidth }}
    <div v-if="viewportWidth == Infinity"></div>
    <div class="navbar" v-else-if="viewportWidth > 800">
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/#about">About</NuxtLink>
      <NuxtLink to="/#portfolio">Portfolio</NuxtLink>
      <NuxtLink to="/#blog">Blog</NuxtLink>
      <NuxtLink to="/#contact">Contact</NuxtLink>
    </div>
    <div class="navtab" v-else>
      <NuxtImg src="/images/icons/hamburger.png" alt="potato logo" width="128"
        :style="{ transform: menuOpen ? 'rotate(45deg)' : 'rotate(0deg)' }" @click="toggleMenu" />

    </div>

  </div>
  <div class="smallMenu" :style="{ position: 'absolute',transform: menuOpen ? 'scaleY(1)' : 'scaleY(0)',}">
    <NuxtLink to="/">Home</NuxtLink>
    <NuxtLink to="/#about">About</NuxtLink>
    <NuxtLink to="/#portfolio">Portfolio</NuxtLink>
    <NuxtLink to="/#blog">Blog</NuxtLink>
    <NuxtLink to="/#contact">Contact</NuxtLink>
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
    padding-right: 1rem;

    a {
      color: white;
      text-decoration: none;
      font-size: 2rem;
      padding: 1rem;

      &:hover {
        text-shadow: white 0px 0px 10px;
      }
    }
  }

  .navtab {
    padding: 1rem;

    img {
      width: 3rem;
    }
  }
}

.smallMenu {
  background-color: rgb(63, 25, 108);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: right;
  width: 100%;
  padding-right: 1rem;

  transition: transform 0.3s ease-in-out;

  a {
    color: white;
    text-decoration: none;
    font-size: 2rem;
    padding: 1rem;

    &:hover {
      text-shadow: white 0px 0px 10px;
    }
  }
}
</style>
