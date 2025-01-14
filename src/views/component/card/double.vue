<template>
   <div class="mb-4 rounded-2xl break-inside-avoid font-Montserrat gap-2 text-black flex min-h-[300px]">
      <div class="w-3/5 aspect-square bg-neutral-700 rounded-2xl p-4 text-neutral-200 relative">
         <div class="text-6xl" v-if="maxHourCount.count > 0 && maxHourCount.count !== Infinity">
            {{ maxHourCount.count }}
            <div class=" text-lg">
               times
            </div>
            <scissorhand class="absolute right-2 bottom-1/4" />
         </div>
         <div class="text-3xl" v-else>
            NaN
         </div>
         <div class="text-xl absolute bottom-4 right-4">
            <span class="text-3xl"> {{ maxHourCount.timePeriod }} </span> o'clock
         </div>
      </div>
      <div class="w-2/5 aspect-auto bg-neutral-200 rounded-2xl p-4 text-neutral-700 relative">
         <div class="text-6xl" v-if="minHourCount.count > 0 && minHourCount.count !== Infinity">
            {{ minHourCount.count }}
            <div class="text-lg">
               times
            </div>
            <paperhand class="absolute left-2 bottom-1/4" />
         </div>
         <div class="text-3xl" v-else>
            NaN
         </div>
         <div class="text-xl absolute bottom-4 right-4">
            <span class="text-3xl"> {{ minHourCount.timePeriod }} </span> o'clock
         </div>
      </div>
   </div>
</template>

<script setup>
import { computed } from 'vue';
import { useHistoryDataStore } from '../../../stores/store';
import { storeToRefs } from 'pinia';

import paperhand from '@/assets/paperhand.vue';
import scissorhand from '@/assets/scissorhand.vue';


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
