<template>
  <div class="scroll-smooth">
    <mian />
    <vis />
    <testHistory/>
    <!-- <about /> -->
  </div>
</template>

<script setup>
import mian from "./views/page/main.vue";
import vis from "./views/page/vis.vue";
import about from "./views/page/about.vue";
import testHistory from "./views/page/testHistory.vue";

import Lenis from 'lenis'

// Initialize Lenis
const lenis = new Lenis({
  autoRaf: true,
});

</script>
