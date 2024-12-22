<template>
   <div class="w-screen h-screen bg-black text-white">
      <div class="h-screen flex flex-col">
         <div class="h-10 md:h-16 w-full px-2">
            <div class="w-full h-full border-b-[1.5px] border-white flex gap-4 items-center font-Montserrat font-semibold px-3">
               <div class="h-4/5 w-18 inline-block border-full bg-black rounded-full text-white p-3">
                  logo
               </div>
               <div>
                  VisCmd 0.1B
               </div>
               <div class="ml-auto text-xl">
                  Visualizing Your Commands,<span class="text-purple-400">Simplified</span>
               </div>
            </div>
         </div>

         <div class="flex-grow flex px-20 py-14">
            <div class="flex-grow flex bg-neutral-300 p-4 rounded-3xl gap-8">
               <div class="w-4/12 flex-1 px-3 py-5">
                  <div class="h-full">
                     <div class="h-2/3 items-end justify-end flex">
                        <pointer />
                     </div>
                     <div class="h-1/3">
                        <hashTags />
                     </div>
                  </div>
               </div>
               <div class="w-7/12 h-full py-5 pr-8" >
                  <div class="w-full h-full relative ">
                     <matter class="z-40">
                        <dropin class="absolute" />
                     </matter>
                  </div>
               </div>
            </div>
         </div>

         <div class="h-10 md:h-16 w-full">
            <div class="w-full h-full border-t-[1.5px] border-white flex gap-4 items-center font-Montserrat font-semibold px-3">
               <div class="flex items-center gap-2 ml-auto pr-2">
                  <div class="text-xl">
                     Lets vis-history
                  </div>
                  <svg viewBox="0 0 24 24" fill="none" width="40" height="40" xmlns="http://www.w3.org/2000/svg">
                     <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                     <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                     <g id="SVGRepo_iconCarrier">
                        <path d="M8 11L12 15M12 15L16 11M12 15V3M7 4.51555C4.58803 6.13007 3 8.87958 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 8.87958 19.412 6.13007 17 4.51555" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                     </g>
                  </svg>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script setup>
import hashTags from '../component/main/hashTags.vue';
import pointer from '../component/main/pointer.vue';
import matter from '../component/main/matter.vue';
import dropin from '../component/main/dropin.vue';
</script>
