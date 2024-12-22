<template>
   <div class="w-full h-full py-3 px-4 text-black">
      <div 
         v-for="(hashtag, index) in hashtags" 
         :key="index" 
         class="h-1/4 w-full flex justify-end space-x-4 border-b-black border-b-2 text-3xl items-end font-Montserrat"
      >
         <div v-for="(tag, idx) in hashtag" :key="idx" class="flex mr-1">
            <div class="text-violet-700 font-normal ">#</div>
            <div class=" ml-1 font-normal italic" >{{ tag }} </div>
         </div>
      </div>
   </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
   words: String,
});

const hashtags = [
   ['Commamd', 'Visualization'],
   ['Zsh', 'Bash', 'Fish'],
   ['Unix', 'Linux', 'MacOS'],
   ['Terminal', 'Shell', 'CLI'],
];
</script>
