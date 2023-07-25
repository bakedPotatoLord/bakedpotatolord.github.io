<template>
  <div class="maintext">
    <h1>
      C<span class="potato">🥔</span>de P<span class="potato">🥔</span>tato
    </h1>
    <h2>
      The <span class="adjective">{{ adjective }} </span>
      <span class="fullstack"> Fullstack</span><br />Web Developer
    </h2>
  </div>

  <div class="about">
    <h3>About</h3>

    Hello there, 
  </div>
</template>

<script setup lang="ts">

function rand(arr:any[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const adjective = ref([
  "Starchy",
  "Versatile",
  "Comforting",
  "Satisfying",
  "Wholesome",
  "Down-To-Earth",
  "Robust",
  "Resourceful",
][0]);

</script>

<style lang="scss">
  .maintext {
    h1{
      font-weight: 600;
    }
    h2{
      font-weight: 300;
    }
    margin-bottom: 80px;
  }
 .about {
  h3{
    font-weight: 400;
  }
 }
</style>
