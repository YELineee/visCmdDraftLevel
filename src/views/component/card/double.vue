<template>
   <div class="mb-4 rounded-2xl break-inside-avoid font-Montserrat grid grid-cols-2 gap-4 text-black">
      <div class=" w-full h-[220px] bg-slate-200 rounded-2xl p-4">
         <div class="text-6xl">
            {{ maxHourCount.count }}
         </div>
         <div class="text-xl">
            {{ maxHourCount.timePeriod }}
         </div>
      </div>
      <div class=" w-full h-[220px] bg-slate-200 rounded-2xl p-4">
         <div class="text-6xl">
            {{ minHourCount.count }}
         </div>
         <div class="text-xl">
            {{ minHourCount.timePeriod }}
         </div>
      </div>
   </div>
</template>

<script setup>
import { computed } from 'vue';
import { useHistoryDataStore } from '../../../stores/store';
import { storeToRefs } from 'pinia';

const historyDataStore = useHistoryDataStore();
const { analyzeData } = storeToRefs(historyDataStore);

const maxHourCount = computed(() => {
    const currentYear = 2024;
    const hourlyData = analyzeData.value.hourlyData[currentYear] || {};
    const maxCount = Math.max(...Object.values(hourlyData));
    const timePeriod = Object.keys(hourlyData).find(key => hourlyData[key] === maxCount);
    return { count: maxCount, timePeriod };
});

const minHourCount = computed(() => {
    const currentYear = 2024;
    const hourlyData = analyzeData.value.hourlyData[currentYear] || {};
    const minCount = Math.min(...Object.values(hourlyData));
    const timePeriod = Object.keys(hourlyData).find(key => hourlyData[key] === minCount);
    return { count: minCount, timePeriod };
});

</script>