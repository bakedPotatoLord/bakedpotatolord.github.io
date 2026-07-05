<script setup lang="ts">
import PortfolioCard from "~/components/PortfolioCard.vue";
</script>

<template>
  <div class="portfolio">
    <SectionTitle title="Portfolio"/>
    <div class="cardHolder">
      <PortfolioCard 
      projectName="CIMmer Down - Electric Longboard"
      projectDescription="With funding from the Labriola Protofund, I lead a team to design and build a custom electric longboard featuring CAD-designed drivetrain components, urethane-cast wheels, embedded control electronics, and RF communication using extensive iterative prototyping"
      projectImage="/images/protofund_cover.png"
      :tools="['Onshape','GSheets','Milling','Electronics','Kicad']"
      projectLink="https://bakedpotatolord.vercel.app/blog/cimmerDown"
      projectGithub="https://github.com/bakedPotatoLord/CIMmerDown/"
      /> 
      <PortfolioCard 
      projectName="Helical Operation - Kiri:Moto CAM"
      projectDescription="as part of an internship with Kiri:Moto, I developed the helical operation, a CAM tool for interior/exterior threadmilling, as well as cutting cylindrical faces and holes."
      projectImage="/images/helical.png"
      :tools="[ 'JavaScript', 'NPM', 'Milling','Onshape' ]"
      projectLink="https://grid.space/kiri"
      projectGithub="https://github.com/gridspace/grid-apps"
      /> 
      <PortfolioCard
      projectName="Jimmi - FIRST Competitive Robot"
      projectDescription="I led a small team through the process of designing and fabricating a  robot for the FIRST robotics competition. I modeled the robot using Onshape CAD, and instructed my peers on use of multiple fabrication techniques including CNC milling, 3d printing, and drilling, earning my team our highest placement ever."
      projectImage="/images/jimmiRobot.svg"
      :tools="['Java','WPILib', 'Onshape', 'Vcarve' ]"
      projectLink="https://www.thebluealliance.com/team/7243/2024"
      projectGithub="https://github.com/lobobellos/Robot_Code_Crescendo"
      />
      <PortfolioCard
      projectName="Time Tracker - Clock-In/Clock-Out Solution"
      projectDescription="Developed an open-source time tracking system for robotics teams, replacing the cumbersome Google Forms approach with a streamlined solution built using Nuxt.js, MongoDB, and Raspberry Pi hardware. This project enables efficient monitoring of team dedication through an intuitive frontend, robust backend, and integrated hardware components, ensuring easy maintenance and scalability."
      projectImage="/images/timeTrackerOnshape.png"
      :tools="['TypeScript','Nuxt', 'rasPi', 'Onshape' ]"
      projectLink="https://time-tracker-liart.vercel.app/"
      projectGithub="https://github.com/lobobellos/time-tracker"
      />
      <PortfolioCard
      projectName="Eagle Scout Service Project - Raised Planter Beds"
      projectDescription="
For my Eagle Scout project, I designed and built a native plant garden with raised planter boxes at the Senac Creek Nature Center, featuring educational nameplates for each plant. This project enhances the center’s beauty, promotes environmental stewardship, and provides a lasting educational resource for visitors and school programs to learn about native Colorado plants."
      projectImage="/images/planters.jpg"
      :tools="['GSheets', 'Onshape' ]"
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