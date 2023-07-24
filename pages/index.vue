<template>
  <div class=maintext>
    This is the main page
  </div>
  <div class="countbox">
    <div>count: {{ count }}</div>
    <button @click="count++">count++</button>
  </div>
  <input type="text" v-model="echoInput"><br>
  echo: {{ echo }}
</template>

<script setup lang="ts">
const count = ref(0);
const echoInput = ref("");

let echo = ref("");

watch(echoInput, async () => {
  console.log(echoInput.value);
  echo.value = await $fetch('/api/echo',{
    method: 'POST',
    body: {
      message: echoInput.value
    }
  });
});
</script>

<style lang="scss">
  .maintext {
    margin:1rem;
  }

  .countbox {
    margin:1rem;
  }
</style>