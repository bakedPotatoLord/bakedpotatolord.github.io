<script lang="ts" setup>
import SectionTitle from "~/components/SectionTitle.vue";
import allShaders from "~/utils/shaders"


function getShader(){
  return Object.entries(allShaders)
  .map(([k,v])=>[k,v.getInfo()] as [string,ShaderInfo]);
}

useSeoMeta({
  title: "Shader Portfolio",
  description: "A portfolio of computer generated graphics written by Josiah Hamm",
  ogTitle: "Shader Playground",
  ogDescription: "A portfolio of computer generated graphics written by Josiah Hamm",
  ogImage: "/images/shaders/attractor.png",
  
})

</script>

<template>
<div class="header">
  <SectionTitle title="Shaders"  justify="center"/>
  <p class="description">Beginning in the summer of 2026, I began developing a portfolio of shaders, designed to demonstrate my competency with graphics programming,
    and hopefully land me a job developing graphics for EDM concerts. These programs are displayed in order of their creation, and include both 2d and 3d graphics.  
  </p>
</div>
<div class="cardContainer">
  <div class="shaderCard" v-for="[k,v] of getShader()" :key="k">
    <div class="description">
      <h2>{{ k }}</h2>
      <p>{{ v.description }}</p>
      <a :href="`/shader?shader=${k}`" class="buttonStyle">
        Launch
      </a>
    </div>
    <div class="image">
      <img :src="v.image" alt="">
    </div>
  
  </div>
</div>

</template>

<style lang="scss" scoped>
.header{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-left: 5%;
  padding-right: 5%;
  padding-bottom: 3rem;
  gap:1rem;
  text-align: center;

  .description{
    max-width: 30rem;
    
  }
}

.cardContainer{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-left: 5%;
  padding-right: 5%;
  padding-bottom: 3rem;
  gap:1rem;
  justify-content: center;
  .shaderCard{
    display: flex;
    flex-direction: row;
    gap:1rem;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    .description{
      width:25vw;
      min-width: 17rem;
      max-width: 22rem;
    }
    .image{
      width:25vw;
      min-width: 300px;
      max-width: 400px;
      img{
        width: 100%;
      }
    }
  }
}
</style>