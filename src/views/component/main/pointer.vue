<template>
   <div class="text-9xl font-Montserrat svg-container">
      <svg viewBox="0 0 20 20" fill="none" width="300" height="300" xmlns="http://www.w3.org/2000/svg">
         <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
         <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
         <g id="SVGRepo_iconCarrier">
            <path d="M8 8L17 17M18 18L18 9M18 18L9 18" stroke="#000" stroke-width="2.6" stroke-linecap="square" stroke-linejoin="miter"></path>
         </g>
      </svg>
   </div>
</template>

<script setup>
</script>

<style scoped>
@keyframes breathe {
   0% {
      stroke: #000;
   }
   25% {
      stroke: rgb(109, 40, 217);
   }
   50% {
      stroke: rgb(75, 0, 130);
   }
   75% {
      stroke: rgb(138, 43, 226);
   }
   100% {
      stroke: #000;
   }
}

@keyframes moveLeftRight {
   0%, 100% {
      transform: translateX(0);
   }
   50% {
      transform: translateX(-30px);
   }
}

.svg-container svg path {
   animation: breathe 0s infinite;
   transition: stroke 0.3s ease;
}

.svg-container svg:hover {
   stroke: rgb(109, 40, 217) !important;
   animation: moveLeftRight 0.5s infinite alternate;
}
</style>
