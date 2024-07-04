<template>
  <div class="container">
    <div class="main">

      <div class="title">
        <h2>About... Me</h2>
      </div>
      <div class="about">
        <p>
          Hey there, I'm Josiah Hamm, a freelance developer and robotics engineer based in
          Denver, CO, with a passion for making ideas real, leadership,
          problem-solving, and teaching.<br />
          <br />
          Some days, I build beautiful and functional web applications
          that join art and technology to create engaging user experiences.<br>
          <br>
          Other days, I design, test, and fabricate robots and other
          machines. I love watching something move from a thought to a digital model to reality.<br>
          <br>
          I also enjoy competitive robotics, reading up on
          Star Wars / Warhammer 40,000 lore, camping, hiking and competitve programming.<br>
          <br>
        </p>
      </div>
    </div>
    <AboutDivider1 />
    <div class="autobiography">
      <h3>My Journey</h3>
      <div class="section">
        <h4>Early Attraction</h4>
        <p>
          I was first introduced to programming in grade school by my amazing technology teacher, who first showed me
          the seemingly magic power of computer programming. I have fond memmories of Scratch programming, where I
          learned basic programming concepts and design patterns through making games and apps that I could share. <br>
          <br>
          While in grade school, I also engaged in a FIRST Lego League (FLL) team through my school, where I developed my
          passion for robotics. Through FLL, I gained experince in mechanical engineering, and robot programming.
          FLL showed me the beauty of well designed mechanisms paired with flawless code. <br>
          <br>
        </p>
      </div>
      <div class="section">
        <h4>Into the DOM</h4>
        <p>
          Near the end of middle school, I was feeling
          burnt out from Scratch, and It's limits.
          despite making some wildly sucessful projects,
          I craved something more. I had heard that I could
          learn to write text-based code on Kahn Academy,
          and so I headed there.<br>
          <br>
          Through Kahn Academy, I made many projects, and learned new tools
          but eventually, I grew bored of their sandbox, and did some researching.
          about this time, I found HTML, and learned that it could run the same JavaScript that
          I was used to writing for Kahn academy. I was in the DOM, and I loved it.

        </p>
      </div>
      <div class="section">
        <h4>Vanilla JS? Heck Yes! </h4>
        <p>
          During the Covid-19 Pandemic, I had far too much time on my hands, and used that time to
          make a multitude of different web apps with HTML and Vanilla JS. These apps ranged from
          simple canvas art programs, to platformer games, to headless
          chatrooms with AES encryption. <br>
          <br>
          In the browser, I had much more power than with anything prior. There were so many utilities,
          HTML elements, and web APIs at my disposal, that I felt like I could do anything. it was also around
          this time that I began playing around with the Libraries of others, and becoming more ingrained
          with the developer community as a whole. <br>
          <br>
          Simeltaneously, I saved up some money, and bought a VEX IQ robotics kit.
          with this kit, I continued to organically grow my skills as an engineer and problem solver.
          with these parts, I made many interesting mechanisms, and learned a host of
          engineering and design principles. <br>
        </p>
      </div>
      <div class="section">
        <h4>Vanilla JS? Heck Yes! </h4>
        <p>
          During the Covid-19 Pandemic, I had far too much time on my hands, and used that time to
          make a multitude of different web apps with HTML and Vanilla JS. These apps ranged from
          simple canvas art programs, to platformer games, to headless
          chatrooms with AES encryption. <br>
          <br>
          In the browser, I had much more power than with anything prior. There were so many utilities,
          HTML elements, and web APIs at my disposal, that I felt like I could do anything. it was also around
          this time that I began playing around with the Libraries of others, and becoming more ingrained
          with the developer community as a whole. <br>
          <br>
          Simeltaneously, I saved up some money, and bought a VEX IQ robotics kit.
          with this kit, I continued to organically grow my skills as an engineer and problem solver.
          with these parts, I made many interesting mechanisms, and learned a host of
          engineering and design principles. <br>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;

  .main {
    background: linear-gradient(0deg,
        rgba(41, 44, 61, 1) 0%,
        rgba(82, 43, 135, 1) 36%,
        rgba(82, 43, 135, 1) 100%);
    padding-bottom: 2rem;
    .title {
      display: flex;
      justify-content: center;

    }

    .about {
      padding-left: 1rem;
      padding-right: 1rem;
    }
  }

  .autobiography {
    background-color: #39125c;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h3 {
      text-align: center;
    }

    .section {
      max-width: 50rem;
      padding: 1rem
    }
  }
}
</style>