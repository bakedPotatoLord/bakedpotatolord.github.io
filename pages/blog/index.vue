<script setup lang="ts">
import type { QueryBuilderParams } from '@nuxt/content';

const dev = import.meta.dev;

const query: QueryBuilderParams = {
  where: dev? undefined : [{ inProgress: { $eq: "false" } }],
  sort: [{ datePublished: -1 }]
}

</script>


<template>
  <SectionTitle title="Potato Blog" />
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

.contentList {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;

  .content{
    color:pink;
    a{
      width:fit-content
    }
  }
}

</style>