
<script setup lang="ts">

export interface BlogPost{
  title:string
  body:string
  images: string[]
}


</script>


<template>
  <div class="blog">
    <h2 class="sectionTitle">Blog</h2>

    <ContentList path="/posts" v-slot="{ posts }"  >
      {{ posts }}
      <div v-for="article in posts" :key="article._path">

        {{ article }}
      </div>
    </ContentList>

  </div>
</template>


<style lang="scss">
  .blog{
    margin-top:100px;
    background-color:#39125c ;

    h2{
      margin-top:0px;
      margin-bottom:0px;
    }

    .blogItems{
      display:flex;
      flex-direction: row;
      flex-wrap: nowrap;
      .blogItem{
        max-width:400px;
        min-width:300px;
        
      

      }
    }
  }

</style>