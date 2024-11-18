
<script setup lang="ts">

interface Props{
  projectName: string
  projectDescription?: string
  projectImage?: string
  projectLink?: string
  projectGithub?: string
  tools?: tool[]
}

defineProps<Props>()
</script>

<template>
<div class="main">
  <div class="image">
    <NuxtImg :src="projectImage" width="500px" sizes="  md:500px lg:700px" />
  </div>
  <div class="textBody">
    <h2>{{projectName}}</h2>
    <p>{{projectDescription}}</p>
    <div class="tools">
      <div class="tool" v-for="tool of tools?.map(t=>getToolUrl(t))">
        <NuxtImg :src="tool" width="30px"/>
      </div>
    </div>
    <div class="buttons">
      <a v-if="projectLink !== undefined" :href="projectLink" target="_blank">Launch Project</a>
      <a v-if="projectGithub !== undefined" :href="projectGithub" target="_blank">View on Github</a>
    </div>
  </div>
</div>
</template>


<style lang="scss">
.main {
  display: flex;
  flex-direction: row;
  align-items:center;
  justify-content: center;
  flex-wrap:wrap;
  .image {

    max-width: 500px;
    padding: 1rem;
    img {
      position: relative;
      aspect-ratio: 2/1;
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      
    }
  }
  .textBody {
    padding:1rem;
    max-width:  500px;
    display: flex;
    flex-direction: column;
    justify-content: left;
    h2{
      margin-top:0px;
      margin-bottom:0px;
    }
    p{
      margin-top:0px;
      margin-bottom:0px;
    }
    .tools{
      display:flex;
      flex-direction: row;
      flex-wrap:wrap;
      padding-top: 0.5rem;
      padding-bottom:0.5rem;

      .tool{
        margin-right: 10px;
        padding: 0.5rem;
        border-radius: 10px;
        background-color: #39125c;
        display:flex;
        align-items: center;
        justify-content: center;
      }
    }
    .buttons{
      display:flex;
      flex-direction: row;
      flex-wrap:wrap;
      a{
        background-color: #8868d3;
        color: white;
        padding: 5px 10px;
        border-radius: 10px;
        margin-right: 10px;
      }
    }
  }
}
</style>