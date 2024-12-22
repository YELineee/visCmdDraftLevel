<template>
   <div id="ex-year"></div>
</template>

<script setup>
import { computed, onMounted, render, watch } from 'vue';
import CalHeatmap from 'cal-heatmap';
import 'cal-heatmap/cal-heatmap.css';

import { useHistoryDataStore } from '../../../stores/store';
import { storeToRefs } from 'pinia';

const historyDataStore = useHistoryDataStore();
const { analyzeData } = storeToRefs(historyDataStore);

const data = computed(() => analyzeData.value.dailyData);

let cal;

const renderHeatmap = () => {
   if (cal) {
      cal.destroy();
   }
   cal = new CalHeatmap();
   console.log("rendering");
   cal.paint({
      theme: 'dark',
      data: { source: data.value, type: 'json', x: 'date', y: 'value' },
      date: { start: new Date('2024-01-01') },
      range: 1,
      scale: {
         color: {
            type: 'linear',
            domain: [0, 100],
            range: ['#f2f'],
         },
      },
      domain: {
         type: 'year',
         label: { text: null },
         padding: [10, 10, 10, 10],
      },
      subDomain: { type: 'day', radius: 5, width: 16, height: 16, color: '#f2f4' },
      itemSelector: '#ex-year',
   });
};

watch(data, (newValue, oldValue) => {
   renderHeatmap();
});

onMounted(() => {
   renderHeatmap();
});
</script>
