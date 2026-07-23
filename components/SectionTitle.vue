<script setup lang="ts">

interface Props {
  title?: string
  justify?: string
}

defineProps<Props>();

</script>


<template>
  <div :class="`secTitleWrapper justify-${justify ? justify : 'left'}`">
    <h2 class="sectionTitle">{{ title }}</h2>
  </div>
</template>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap');

.secTitleWrapper{
  display: flex;
  .sectionTitle {
    padding: 0.5rem;
    margin:0;
    transition: text-shadow 0.1s ease-in-out;
    width:fit-content;
    font: 400 3rem "Raleway", sans-serif;
    text-decoration: none ;
    &:hover {
      text-shadow: white 0px 0px 10px;
    }
  }
}
.justify-center {
  justify-content: center;
}

.justify-left{  
  justify-content: left;
}
.justify-right{
  justify-content: right;
}
</style>