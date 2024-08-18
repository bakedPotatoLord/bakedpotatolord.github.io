<script setup lang="ts">

const dev = import.meta.dev;

const { data: content, status } = useAsyncData(async () =>
  queryContent().where(dev  ? {} : { inProgress: { $ne: "true" } }).limit(5).sort({ datePublished: -1 }).find()
)

</script>

<template>
  <div class="blog">
    <SectionTitle title="Blog" />

    <div class="blogItems" v-if="status === 'success'">
      <div v-for="post of content" class="blogItem">
        <a :href="'/blog/' + post.titleUrl">
          <BlogCard :title="post.title" :image="post.coverImg" :imageAlt="post.coverImgAlt"
            :description="post.description" />
        </a>
      </div>
    </div>
    <div class="container">
      <div class="seeMore">
        <RouterLink to="/blog">
          See more
        </RouterLink>
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
  }

  .container {
    text-align: center;
    display: flex;
    justify-content: center;


    padding-bottom: 5rem;

    .seeMore {
      background-color: rgb(64, 61, 64);
      border-radius: 10px;
      padding: 1rem;
      margin:1rem;
      width:fit-content;

    }
  }

}
</style>
