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
      <PortfolioCard
      projectName="Time Tracker - Clock-In/Clock-Out Solution"
      projectDescription="Developed an open-source time tracking system for robotics teams, replacing the cumbersome Google Forms approach with a streamlined solution built using Nuxt.js, MongoDB, and Raspberry Pi hardware. This project enables efficient monitoring of team dedication through an intuitive frontend, robust backend, and integrated hardware components, ensuring easy maintenance and scalability."
      projectImage="/images/timeTrackerOnshape.png"
      :tools="[tool.TypeScript,tool.Nuxt, tool.rasPi, tool.Onshape ]"
      projectLink="https://time-tracker-liart.vercel.app/"
      projectGithub="https://github.com/lobobellos/time-tracker"
      />
      <PortfolioCard
      projectName="Eagle Scout Service Project - Raised Planter Beds"
      projectDescription="
For my Eagle Scout project, I designed and built a native plant garden with raised planter boxes at the Senac Creek Nature Center, featuring educational nameplates for each plant. This project enhances the center’s beauty, promotes environmental stewardship, and provides a lasting educational resource for visitors and school programs to learn about native Colorado plants."
      projectImage="/images/planters.jpg"
      :tools="[tool.GSheets, tool.Onshape ]"
      projectLink="/documents/projectreportsigned.pdf"
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