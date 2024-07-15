<template>
  <div class="background">
    <Header />
    <MultiCurveDivider class="divider" />
    <br />
    <div class="pagewrapper">
      <NuxtPage />
    </div>
    <Footer />
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@100;200;300;400;500;600;700;800&display=swap');

.background {
  background: none;
  .divider {
    position: relative;
  }
}

:root {
  body {
    background: rgb(41, 44, 61);
    background: linear-gradient(-45deg,
        rgb(65, 34, 107) 0%,
        rgba(82, 43, 135, 1) 50%,
        rgba(82, 43, 135, 1) 100%);
    margin: 0px;
    font-family: 'Noto Sans', sans-serif;
    font-weight: 300;
    color: #fff;
  }
}

a:-webkit-any-link{
  color:white;
  text-decoration: none;
}

</style>
