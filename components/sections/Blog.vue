<script setup lang="ts">


const { data: content, status } = useAsyncData(async () =>
  queryContent().where({ inProgress: { $ne: "true" } }).limit(5).sort({ datePublished: -1 }).find()
)

</script>

<template>
  <div class="blog">
    <SectionTitle title="Blog" />

    <div class="blogItems" v-if="status === 'success'">
      <div v-for="post of content" class="blogItem">
        <a :href="'/blog/' + post.titleUrl">
            <BlogCard 
            :title="post.title"
            :image="post.coverImg"
            :imageAlt="post.coverImgAlt"
            :description="post.description"
            />
        </a>
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
  }
  
}
</style>
