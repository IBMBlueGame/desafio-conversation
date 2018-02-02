<template>
  <div id="app">
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style>
  body {
    background-image: url('./assets/background.png');
    font-family: Courier, "Courier New", "Lucida Sans Typewriter", "Lucida Typewriter", monospace;
    font-size: 2vw;
    position: fixed;
  }
</style>
