<template>
  <div class="maintext">
    <div class="potatoContainer">
      <Potato id="potato" />
    </div>
    <h1>
      C<span class="potato">🥔</span>de P<span class="potato">🥔</span>tato
    </h1>
    <h2>
      The <span ref="a" class="adjective">{{ adjective }} </span>
      <span class="fullstack"> Fullstack</span><br />Web Developer
    </h2>
  </div>
  <div class="about">
    <h3>About</h3>

    <p>
      Hi, I'm Josiah Hamm, a {{ age }} year old freelance developer based in
      Denver, CO, with a passion for software development, leadership,
      problem-solving, and teamwork.<br />
      <br />
      I enjoy building beautiful and functional web applications
      that join art and technology to create engaging user experiences 
      
    </p>
  </div>

  <div class="headshot">
    <img src="~/assets/headshot.jpg" alt="headshot" />
  </div>
</template>

<script setup lang="ts">
function rand(arr: any[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const adjectives =[
    "Starchy",
    "Versatile",
    "Comforting",
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
const adjective = computed(() => {
  return adjectives[i.value]
})


const a = ref<HTMLSpanElement | null>(null)

onMounted(async ()=>{
  console.log(a.value)
  if(a.value){
    a.value.onmouseover = ()=>{
      console.log('mouse over')
      i.value = (++i.value) % adjectives.length
    }
  }
})

</script>

<style lang="scss">
.maintext {
  .potatoContainer{
    width:calc(100% - 4rem);
    display:flex;
    justify-content: right;
    position: absolute;
    z-index: -1;
  }
  h1 {
    font-weight: 600;
  }
  h2 {
    font-weight: 300;
  }
  margin-bottom: 80px;
}
.about {
  h3 {
    font-weight: 400;
  }
}
.headshot {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  img {
    width: 200px;
    border-radius: 50%;
  }
}
</style>
