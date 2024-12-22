<template>
   <div class="w-screen h-auto border-4 border-y-sky-300">
      <div v-if="analyzeData">
         <h2>Total Commands: {{ analyzeData.totalCommands }}</h2>
         <h3>Periods:</h3>
         <ul>
            <li v-for="(count, period) in analyzeData.periods" :key="period">
               {{ period }}: {{ count }}
            </li>
         </ul>
         <h3>Monthly Data:</h3>
         <ul>
            <li v-for="(count, month) in analyzeData.monthlyData" :key="month">
               {{ month }}: {{ count }}
            </li>
         </ul>
         <h3>Main Command Usage:</h3>
         <ul>
            <li v-for="(count, cmd) in analyzeData.mainCmdUsage" :key="cmd">
               {{ cmd }}: {{ count }}
            </li>
         </ul>
         <div>
            {{  analyzeData.yearlyData   }}
         </div>
      </div>
   </div>
</template>

<script setup>
import { useHistoryDataStore } from '../../stores/store';
import { storeToRefs } from 'pinia';

const historyDataStore = useHistoryDataStore();
const { analyzeData } = storeToRefs(historyDataStore);


</script>