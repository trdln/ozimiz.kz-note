<template>
  <div
    class="flex flex-col h-full bg-gradient-to-br from-indigo-800 to-black bg-no-repeat bg-fixed relative"
  >
    <Header />

    <main class="grow mt-20"><slot></slot></main>
    <Footer />
  </div>
</template>

<script setup lang="ts"></script>
