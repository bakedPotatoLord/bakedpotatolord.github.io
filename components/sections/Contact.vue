<template>
  <div class="contact">
    <FooterDivider class="divider" />

    <SectionTitle title="Contact Me" />
    <div class="contactCards">
      <ContactCard class="card" social-image="/images/instagram.png" tag="baked_potato_lord"
        link="https://www.instagram.com/baked_potato_lord/"  />
      <ContactCard class="card" social-image="/images/discord.png" tag="potatolord4545"
        link="https://discordapp.com/users/750347468826345492" />
      <ContactCard class="card" social-image="/images/github.png" tag="bakedPotatoLord"
        link="https://github.com/bakedpotatolord" image-style="filter: invert(1)"/>
      <ContactCard class="card" social-image="/images/linkedin.png" tag="Josiah Hamm"
        link="https://www.linkedin.com/in/josiah-hamm-36208625b/" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.contact {
  background-color: rgb(64, 61, 64);
  position: relative;

  .contactCards {
    padding-left: 1rem;
    padding-right:1rem;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
  }



}
</style>