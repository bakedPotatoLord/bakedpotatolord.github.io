<script setup lang="ts">
export interface BlogPost {
  title: string;
  body: string;
  images: string[];
}
</script>

<template>
  <div class="blog">
    <h2 class="sectionTitle">Blog</h2>
    <div class="blogItems">
      <ContentList path="/posts">
        <div v-for="article of [1, 2, 3]" :key="{ article }" class="blogItem">
          <h3 class="title">ARTICLE TITLE</h3>
          <NuxtImg
            src="https://media.istockphoto.com/id/157430678/photo/three-potatoes.jpg?s=612x612&w=0&k=20&c=qkMoEgcj8ZvYbzDYEJEhbQ57v-nmkHS7e88q8dv7TSA="
            width="500px"
            sizes=" sm:200px md:500px lg:700px"
            alt="potato"
            class="image"
          />
          <p class="description">ARTICLE DESCRIPTION</p>
        </div>
      </ContentList>
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
