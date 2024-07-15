<script setup lang="ts">
import type { QueryBuilderParams } from '@nuxt/content';

const query: QueryBuilderParams = {
  where: [{ inProgress: { $ne: "true" } }],
  sort: [{ datePublished: -1 }]
}

</script>


<template>
  <SectionTitle title="Potato Blog"/>
  <ContentList :query="query" v-slot="{list}" class="ContentList">
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

</template>