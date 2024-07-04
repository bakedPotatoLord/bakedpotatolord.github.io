<template>
  <div class="about">
    <div class="aboutText">
      <h3 class="sectionTitle">About</h3>
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
        Star Wars / Warhammer 40,000 lore, rock climbing, hiking and competitve programming.<br>
        <br>
      </p>
    </div>
    <div class="headshot">
      <img src="~/assets/headshot.jpg" alt="headshot" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.about {
  margin-top: 0px;
  padding-left: 2rem;
  padding-right: 2rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: #39125c;

  .aboutText {
    .sectionTitle {
      font-weight: 400;
      font-size: 2rem;
      margin: 0.5rem;
      transition: text-shadow 0.3s ease-in-out;
    }

    .sectionTitle:hover{
      text-shadow: white 0px 0px 10px;
    }
    max-width:500px
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
</style>