
<script setup lang="ts">

export interface BlogPost{
  title:string
  body:string
  images: string[]
}

const blog:BlogPost[] = [
  {
    title: "Energy Discharge of Biblical Proportions",
    body: "placeholder",
    images: ["/images/icons/bun.png"]
  }
]


</script>


<template>
  <div class="blog">
    <h2 class="sectionTitle">Blog</h2>

    <div class="blogItems">
      <div class="blogItem" v-for="{title,images} of blog">
        <BlogCard :title="title" :images="images" />
      </div>
    </div>
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