<template>
  <section>
    <div id="bg"></div>
    <div class="flex flex-col w-screen h-screen" id="page">
      <slot />
    </div>
  </section>
</template>

<style>
  #bg {
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-image: var(--bg-url);
    background-size: cover;
    z-index: -1;
  }
  #page {
    backdrop-filter: blur(var(--bg-blur));
    z-index: 999;
  }
</style>