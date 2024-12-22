<template>
   <div class="border-red-200 border-0 py-10 mb-4 break-inside-avoid bg-[#D2DCD0] rounded-2xl h-[300px] flex gap-10 px-10">
      <div class=" text-black mt-6">
         <div class=" text-8xl" v-if="analyzeData.yearlyData['2024']">{{ analyzeData.yearlyData['2024']}} </div>
         <div class=" text-8xl" v-else>0</div>
         <div class=" text-2xl" > Thats all u got in <span class="text-3xl">2024 </span> </div>
      </div>
      <div class="flex-1 flex justify-center items-center">
         <heatMap />
      </div>
   </div>
</template>

<script setup>
import { useHistoryDataStore } from '../../../stores/store';
import { storeToRefs } from 'pinia';
import heatMap from './heatMap.vue';

const historyDataStore = useHistoryDataStore();
const { analyzeData } = storeToRefs(historyDataStore);

// console.log(analyzeData.value.yearlyData);
// console.log(typeof(analyzeData.value.yearlyData));
const formatDate = (date) => {
   const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
   const day = date.getDate();
   const month = months[date.getMonth()];
   const year = date.getFullYear();

   const getOrdinal = (n) => {
      const s = ["th", "st", "nd", "rd"];
      const v = n % 100;
      return s[(v - 20) % 10] || s[v] || s[0];
   };

   return `${month}.${day}${getOrdinal(day)}.${year}`;
};

// const currentDate = new Date();
// const formattedDate = formatDate(currentDate);
</script>
