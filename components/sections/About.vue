
<script setup lang="ts">


</script>

<template>
  <div class="about">
    <SectionTitle title="About" />
    <div class="aboutItems">
      <div class="aboutText">
        <p>
          Hey there, I'm Josiah Hamm, a software developer and robotics engineer based in
          Denver, CO.<br />
          <br />
          A Presidential Scholar at the Colorado School of Mines, I am pursuing my bachelors degree
          and working as a makerspace technical assistant, with the end goal of starting my own company in the robotics industry.<br>
          <br>
          Additionally, by the grace of God, I have been freed from the enslavement of sin and death,
          and am now a servant of Jesus Christ, currently serving on the plant team of crown hill evanglical free church.<br>
          <br>
          I love projects that involve CAD, code, electronics, manufacturing, and control systems.
          You'll usually find me working on a project if I'm not suffering through some schoolwork.<br>
          <br>
          I also enjoy competitive robotics, studying theology (calvinist btw), rock climbing, and competitve programming.<br>
          <br>
        </p>
      </div>
      <div class="headshot">
        <NuxtImg src="/images/headshot.png" alt="headshot" width="200" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.about {
  background-color: #39125c;

  .aboutItems{
    margin-top: 0px;
    padding-left: 2rem;
    padding-right: 2rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .aboutText {
      max-width: 500px
    }
    .headshot {
      flex: 3;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1rem;
      width: 100%;
      img {
        transition: box-shadow 0.3s ease-in-out;
        width: 250px;
        border-radius: 50%;
  
        &:hover {
          box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.3);
        }
      }
    }
  }
}
</style>