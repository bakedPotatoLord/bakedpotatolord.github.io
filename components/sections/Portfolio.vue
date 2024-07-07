<script setup lang="ts">
import PortfolioCard from "~/components/PortfolioCard.vue";
</script>

<template>
  <div class="portfolio">
    <SectionTitle title="Portfolio"/>
    <div class="cardHolder">
      <PortfolioCard 
      projectName="Robo Lobo Bellos — Robotics Team Website"
      projectDescription="I developed a website for my robotics team, the Robo-Lobo-Bellos. It increased awareness of our team, and attracted sponsors. I cooperated with teammates to acquire  media."
      projectImage="/images/lobobellos.png"
      :tools="[tool.Nuxt, tool.Vue, tool.TypeScript, tool.Bun]"
      projectLink="https://lobobellos.github.io"
      projectGithub="https://github.com/LoboBellos/lobobellos.github.io"
      />
      <PortfolioCard
      projectName="Jimmi - FIRST Competitive Robot"
      projectDescription="I led a small team through the process of designing and fabricating a  robot for the FIRST robotics competition. I modeled the robot using Onshape CAD, and instructed my peers on use of multiple fabrication techniques including CNC milling, 3d printing, and drilling, earning my team our highest placement ever."
      projectImage="/images/jimmiRobot.svg"
      :tools="[tool.Java,tool.WPILib, tool.Onshape, tool.Vcarve ]"
      projectLink="https://www.thebluealliance.com/team/7243/2024"
      projectGithub="https://github.com/lobobellos/Robot_Code_Crescendo"
      />
    </div>
    
  </div> 
</template>

<style scoped lang="scss">

.portfolio {
  margin-top:125px;
  .cardHolder {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

</style>