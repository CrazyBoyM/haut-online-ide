<template>
  <header class="w-full h-16 text-left shadow-sm">
    <slot />
  </header>
</template>

<style>
  header {
    background-color: var(--header-bgColor);
  }
  header .n-button--default-type .n-button__content {
    color: var(--header-textColor);
  }
</style>