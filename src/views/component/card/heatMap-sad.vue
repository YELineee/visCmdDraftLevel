<template>
   <div id="ex-year"></div>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue';
import CalHeatmap from 'cal-heatmap';
import 'cal-heatmap/cal-heatmap.css';

import { useHistoryDataStore } from '../../../stores/store';
import { storeToRefs } from 'pinia';

const historyDataStore = useHistoryDataStore();
const { analyzeData } = storeToRefs(historyDataStore);

const data = computed(() => analyzeData.value.dailyData);

watch(data, (newValue, oldValue) => {
   console.log('Data changed:', newValue);
   cal.fill
});

onMounted(() => {
   const cal = new CalHeatmap();
   cal.paint({
      theme: 'dark',
      data: { source: data, type: 'json', x: 'date', y: 'value' },
      date: { start: new Date('2012-01-01') },
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
});
</script>
