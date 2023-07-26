<template>
  <div class="maintext">
    <Potato id="potato" />
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

  <div class="headshot">
    <img src="~/assets/headshot.jpg" alt="headshot">
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
    #potato{
      position:absolute;
      z-index: -1;
    }
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
 .headshot{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  img{
    width: 200px;
    border-radius: 50%;
  }
 }
</style>
