<template>
   <div class="bg-[#D2DCD0] mb-4 rounded-2xl break-inside-avoid h-min-[200px] px-6 py-10 font-Montserrat">
      <div class="text-xl mt-4 leading-relaxed font-bold text-black">
         the most used command is 
         <span class="text-6xl align-middle">brew</span>,
         which is a versatile tool widely used by developers.
      </div>
   </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { useHistoryDataStore } from '../../../stores/store';
import { storeToRefs } from 'pinia';

const historyDataStore = useHistoryDataStore();
const { analyzeData } = storeToRefs(historyDataStore);

const mostUsedCmd = ref('');

watchEffect(() => {
   if (analyzeData.value) {
      mostUsedCmd.value = analyzeData.value.mostUsedCmd;
   }
});
</script>
