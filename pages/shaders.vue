<script lang="ts" setup>
import allShaders from "~/utils/shaders"


function getShader(){
  return Object.entries(allShaders)
  .map(([k,v])=>[k,v.getInfo()] as [string,ShaderInfo]);
}

</script>

<template>
<div class="cardContainer">
  <div class="shaderCard" v-for="[k,v] of getShader()" :key="k">
    <div class="description">
      <h2>{{ k }}</h2>
      <p>{{ v.description }}</p>
      <a :href="`/shader?shader=${k}`">
        <button class="buttonStyle">Launch</button>
      </a>
    </div>
    <div class="image">
      <img :src="v.image" alt="">
    </div>
  
  </div>
</div>

</template>

<style>
.cardContainer{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-left: 5%;
  padding-right: 5%;
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