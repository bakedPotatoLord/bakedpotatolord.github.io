<script setup lang="ts">

const route = useRoute()
const locator = route.params.locator
const { data: content, status, error } = useAsyncData(async () =>
  queryContent().where({ titleUrl: locator }).findOne()
)

const safeData = computed(() => content.value ?? <never>console.error(`aaah no content`))

const keywords = computed(() => content.value?.keywords?.split(',')?.map((s:string)=>s.trim()))

function parseDate(date: Date) {
  return  (date.getMonth()+1) + '/' + date.getDate() + '/' + date.getFullYear()
}

const publishedDate = computed(() => parseDate(new Date(content.value?.datePublished)))
const editedDate = computed(() => parseDate(new Date(content.value?.datePublished)))


</script>

<template>
  <div class="blogPost">
    <div class="title">
      <SectionTitle :title="content?.title" />
      <NuxtImg :src="content?.coverImg" width="800" sizes="sm: 300 md: 500 lg: 800" />
    </div>
    <div class="content" v-if="status === 'success'">
      <div class="metadata">
        Written by Josiah Hamm <br>
        Published {{ publishedDate }} <br>
        Last Edited {{ editedDate }}
      </div>
      <hr>
      <ContentRenderer :value="safeData" class="contentRenderer">
        <ContentRendererMarkdown :value="safeData" />
      </ContentRenderer>
      <hr>
    </div>
    <div class="content" v-if="status === 'pending'"> pending data</div>
    <div class="content" v-if="status === 'error'"> Error fetching post: <br>{{ error }} </div>

    <div class="keywords">
      Keywords:
      <div class="keyword" v-for="key of keywords">
        <h2 >
          {{ key }}
        </h2>
      </div>
    </div>

    <a href=""></a>

  </div>
</template>

<style lang="scss" >
.blogPost {
  padding-left: 1rem;
  padding-right: 1rem;

  .title {
    img {
      width: 100%;
      max-width: 800px;
    }
  }

  .content {
    .metadata {
      padding-top: 1rem;
      padding-bottom: 1rem;
    }

    hr {
      margin: 0;
    }

    table{
      border-spacing: 0px;
      border: 1px solid white;
      
      td{
        border: 1px solid white;
        margin:0;
      }
      th{
        border: 1px solid white;
        margin:0;
      }
    }


    .contentRenderer{
      
      img{
        width:50%;
      }

    }

  }

  .keywords {
    display: flex;
    align-items: center;

    .keyword {
      margin-left: 0.5rem;
      font-size: 0.5rem;
    }
  }
  .shiki{
    background-color:rgb(34, 32, 34);
    border-radius: 0.25rem;
    code{
      background: none;
    }
  }
  
  code{
    background-color:rgb(64, 61, 64);
    border-radius: 0.25rem;
    padding-left: 0.25rem;
    padding-right: 0.25rem;
  }
  
  .katex-html{
    display:none;
  }
}

a:-webkit-any-link{
  text-decoration: underline;
  color: rgb(203, 154, 203);

}


</style>