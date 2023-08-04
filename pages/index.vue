<script setup lang="ts">

const adjectives =[
    "Starchy",
    "Versatile",
    "Dependable",
    "Satisfying",
    "Wholesome",
    "Down-To-Earth",
    "Robust",
    "Resourceful",
]

const year = Date.parse("1971-01-01T00:00:00.000Z");
const currentTime = Date.now();
const birthTime = Date.parse("October 2, 2006");
const ageMs = currentTime - birthTime;
const age = ref(Math.floor(ageMs / year));

const i = ref(0)
const a = ref<HTMLSpanElement | null>(null)
const adjective = computed(() => adjectives[i.value])

onMounted(async ()=>{
  let isOver = false
  let timeout:ReturnType<typeof setTimeout>;

  if(a.value){
    a.value.onmouseover = ()=>{
      console.log('mouse over')
      isOver = true
      changeWord()
    }
    a.value.onmouseleave = ()=>{
      console.log('mouse leave')
      isOver = false
      clearTimeout(timeout)
    }
  }

  function changeWord(){
    if(isOver) i.value = (++i.value) % adjectives.length
    timeout = setTimeout(changeWord, 750)
  }
})
</script>

<template>
  <div class="intro">
    <div class="maintext">
      <div class="textContainer">
        <h1>
          C<span class="potato">🥔</span>de P<span class="potato">🥔</span>tato
        </h1>
        <h2>
          The <span ref="a" class="adjective">{{ adjective }} </span>
          <span class="fullstack"> Fullstack</span><br />Web Developer
        </h2>
      </div>
    </div>
    <div class="potatoContainer">
      <Potato id="potato" />
    </div>
  </div>
  <DiagonalDivider id="diagonalDivider"/>
  <div class="about">
    <div class="aboutText">
        <h3>About</h3>
        <p>
          Hi, I'm Josiah Hamm, a {{ age }} year old freelance developer based in
          Denver, CO, with a passion for software development, leadership,
          problem-solving, and teamwork.<br />
          <br />
          I build beautiful and functional web applications
          that join art and technology to create engaging user experiences.<br>
          <br>
          I also enjoy competitive robotics, reading up on 
          Star Wars / Warhammer 40,000 lore, camping, hiking and competitve programming.<br>
          <br>
        </p>
    </div>
    <div class="headshot">
      <img src="~/assets/headshot.jpg" alt="headshot" />
    </div>
  </div>
</template>

<style lang="scss">
.intro{
  padding-left:2rem;
  padding-right:2rem;
  display:flex;
  flex-direction: row;
  flex-wrap: wrap;
  .maintext {
    display:flex;
    align-items: center;
    .textContainer{
      display:block;
      min-width: 400px;
      max-width: 500px;
      h1 {
        font-weight: 600;
      }
      h2 {
        font-weight: 300;
        margin-bottom: 0px;
        .adjective{
          text-shadow: white 0px 0px 10px ;
        }
      }
    }
  }
  .potatoContainer{
    flex:1;
    display:flex;
    align-items:center;
    justify-content: center;
  }
}
#diagonalDivider{
  position: relative;
}
.about {
  margin-top: 0px;
  padding-left:2rem;
  padding-right:2rem;
  display:flex;
  flex-direction: row;
  flex-wrap:wrap;
  background-color:  #39125c;
  .aboutText {
    h3 {
      font-weight: 400;
      font-size: 1.5rem;
    }
    max-width:500px
  }
  .headshot {
    flex:3;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    width: 100%;
    img {
      transition: box-shadow 0.3s ease-in-out;
      width: 250px;
      border-radius: 50%;
      &:hover{
        box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.3);
      }
    }
  }
}
</style>
