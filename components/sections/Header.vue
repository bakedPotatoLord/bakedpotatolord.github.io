

<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'

const viewportWidth = useWindowSize().width

const menuOpen = ref(false)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

</script>


<template>
  <div class="spacer"></div>
  <div class="absolute">

    <div class="base">
      <div class="logo">
        <NuxtImg src="/images/logo.jpg" alt="potato logo" width="150" />
      </div>

      <div class="navbar" v-show="viewportWidth > 800 && viewportWidth != Infinity">
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/#about">About</NuxtLink>
        <NuxtLink to="/#portfolio">Portfolio</NuxtLink>
        <NuxtLink to="/#blog">Blog</NuxtLink>
        <NuxtLink to="/#contact">Contact</NuxtLink>
      </div>
      <div class="navtab" v-show="viewportWidth <= 800 && viewportWidth != Infinity">
        <NuxtImg src="/images/icons/hamburger.png" alt="hamburger" width="64"
          :style="{ transform: menuOpen ? 'rotate(45deg)' : 'rotate(0deg)' }" @click="toggleMenu" class="hamburger" />

      </div>

    </div>
    <div class="smallMenu" :style="{ position: 'absolute', transform: menuOpen ? 'scaleY(1)' : 'scaleY(0)', }">
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/#about">About</NuxtLink>
      <NuxtLink to="/#portfolio">Portfolio</NuxtLink>
      <NuxtLink to="/#blog">Blog</NuxtLink>
      <NuxtLink to="/#contact">Contact</NuxtLink>
    </div>
    <MultiCurveDivider class="divider" />
  </div>
</template>

<style scoped lang="scss">
h1 {
  font-family: "Noto Sans", sans-serif;
}

.spacer{
  height: 5rem;
}

.absolute {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;

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
    .navtab  {
      .hamburger{
        margin:1rem;
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
}</style>
