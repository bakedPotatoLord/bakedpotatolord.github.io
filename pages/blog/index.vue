<script setup lang="ts">
import type { QueryBuilderParams } from '@nuxt/content';

const dev = import.meta.dev;

const query: QueryBuilderParams = {
  where: dev? undefined : [{ inProgress: { $eq: "false" } }],
  sort: [{ datePublished: -1 }]
}

</script>


<template>
  <div class="header">
    <SectionTitle title="Potato Blog" justify="center" />
    <p class="desc">
      A collection of blog posts by Josiah Hamm. I try to maintain a variety of topics, 
      and always include lots of images when possible. Please don't 
      republish or reproduce any of my content without my permission.
    </p>
  </div>
  <div class="contentList">
    <ContentList :query="query" v-slot="{list}" >
      <div class="content" v-for="post of list" :key="post._path">
        <a :href="'/blog/' + post.titleUrl">
          <BlogCard 
          :title="post.title"
          :image="post.coverImg"
          :imageAlt="post.coverImgAlt"
          :description="post.description"
          />
        </a>
      </div>
    </ContentList>
  </div>
 
</template>

<style scoped lang="scss">
.header{
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  .desc{
    max-width: 600px;
    width: 50%;
  }
}
.contentList {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;

  .content{
    color:pink;
    a{
      display: block;
    }
  }
}

</style>