<script setup lang="ts">
export interface BlogPost {
  title: string;
  body: string;
  images: string[];
}


const {data:content,status} = useAsyncData(async()=>
   queryContent().limit(5).find()
)

</script>

<template>
  <div class="blog">
    <SectionTitle title="Blog"/>

    <div class="blogItems" v-if="status==='success'">
        <div v-for="post of content"  class="blogItem">
          <ContentRenderer :value="post" >
          <h3 class="title">{{post.title}}</h3>
          <NuxtImg
            :src="post.coverImg"
            width="500px"
            sizes=" sm:200px md:500px lg:700px"
            alt="potato"
            class="image"
          />
          <p class="description">{{ post.description }}</p>
        </ContentRenderer>
        </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.blog {
  margin-top: 100px;
  background-color: #39125c;

  h2 {
    margin-top: 0px;
    margin-bottom: 0px;
  }

  .blogItems {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    padding-bottom: 5rem;

    color: orange;
    .blogItem {
      max-width: 400px;
      min-width: 300px;
      background-color: rgb(64, 61, 64);
      border-radius: 10px;
      padding:2%;
      margin:2%;

      .title {
        margin-top: 0px;
        font: 400 1.5rem;
      }
      .image {
        width: 100%;
        height: auto;
      }
      .description {
        margin-bottom:0px;
      }

      &:hover {
        box-shadow:  0 0 10px 10px rgba(64, 61, 64, 0.5);
      }
    }
  }
}
</style>
