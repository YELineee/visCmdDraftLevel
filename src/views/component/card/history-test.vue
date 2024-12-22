<template>
   <div class="bg-[#8E86A1] mb-4 rounded-2xl break-inside-avoid h-[400px] p-4 font-Montserrat">
      <div>
         <div class=" text-8xl" v-if="analyzeData.totalCommands['2024']">{{ analyzeData.totalCommands['2024']}} </div>
         <div class=" text-8xl" v-else>01</div>
         <div class=" text-2xl" > Thats all u got in <span class="text-3xl">2024 </span> </div>
         <!-- <h2>2024's Commands: {{ analyzeData.yearlyData['2024'] }} </h2> -->
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