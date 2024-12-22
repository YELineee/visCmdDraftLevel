<template>
   <div class="mb-4 rounded-2xl break-inside-avoid font-Montserrat grid grid-cols-2 gap-4 text-black">
      <div class=" w-full h-[220px] bg-slate-200 rounded-2xl p-4">
         <div class="text-6xl">
            10%
         </div>
      </div>
      <div class=" w-full h-[220px] bg-slate-200 rounded-2xl p-4">
         <div class="text-6xl">
            10%
         </div>
      </div>
   </div>
</template>

<script setup>
import { useHistoryDataStore } from '../../../stores/store';
import { storeToRefs } from 'pinia';

const historyDataStore = useHistoryDataStore();
const { analyzeData } = storeToRefs(historyDataStore);

// console.log(analyzeData.value.yearlyData);
// console.log(typeof(analyzeData.value.yearlyData));

</script>