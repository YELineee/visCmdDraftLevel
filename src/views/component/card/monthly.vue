<template>
  <div class="bg-[#E35B39] mb-4 rounded-2xl break-inside-avoid p-4 font-Montserrat">
    <div>
      <div class="text-3xl">It's works but not my style :)</div>
       <div id="vchart-container"></div>
       <!-- <div>{{ analyzeData.monthlyData }}</div> -->
    </div>
  </div>
</template>

<script setup>
import { useHistoryDataStore } from '../../../stores/store';
import { storeToRefs } from 'pinia';
import { onMounted, watch } from 'vue';
import { createOrUpdateChart } from '../vchart/installer';

const historyDataStore = useHistoryDataStore();
const { analyzeData } = storeToRefs(historyDataStore);

const chartContainer = "vchart-container";

const createChartSpec = (data) => ({
  type: 'bar',
  data: [
    {
      id: 'barData',
      // values: Object.entries(data).map(([name, value]) => ({ name, value }))
      values: [
        {
          name: 'Apple',
          value: 214480
        },
        {
          name: 'Google',
          value: 155506
        },
        {
          name: 'Amazon',
          value: 100764
        },
        {
          name: 'Microsoft',
          value: 92715
        },
        {
          name: 'Coca-Cola',
          value: 66341
        },
        {
          name: 'Samsung',
          value: 59890
        },
        {
          name: 'Toyota',
          value: 53404
        },
        {
          name: 'Mercedes-Benz',
          value: 48601
        },
        {
          name: 'Facebook',
          value: 45168
        },
        {
          name: "McDonald's",
          value: 43417
        },
        {
          name: 'Intel',
          value: 43293
        },
        {
          name: 'IBM',
          value: 42972
        },
        {
          name: 'BMW',
          value: 41006
        },
        {
          name: 'Disney',
          value: 39874
        },
        {
          name: 'Cisco',
          value: 34575
        },
        {
          name: 'GE',
          value: 32757
        },
        {
          name: 'Nike',
          value: 30120
        },
        {
          name: 'Louis Vuitton',
          value: 28152
        },
        {
          name: 'Oracle',
          value: 26133
        },
        {
          name: 'Honda',
          value: 23682
        }
      ]
    }
  ],
  direction: 'horizontal',
  background: 'transparent',
  xField: 'value',
  yField: 'name',
  bar: {
    style: {
      cornerRadius: 20,
      fill: '#000',
      height: 10 
    },
    state: {
      selected: {
        stroke: '#000',
        lineWidth: 1
      }
    }
  },
  axes: [
   {
    orient: 'bottom',
    visible: false,
   },
   {
    orient: 'left',
    visible: false ,
   }
  ],
  label: {
   visible: false
  },
  tooltip: {
    style: {
      panel: {
        /** 背景色 */
        backgroundColor: 'rgba(0,0,0, 0.1)',
        /** tooltip边框 */
        border: {
          color: '#111',
          width: 2,
          /** 圆角 */
          radius: 4
        },
        /** tooltip阴影 */
        shadow: {
          blur: 20,
          spread: 1,
          color: '#111'
        }
      }
    }
  }

});

const updateChart = () => {
  const spec = createChartSpec(analyzeData.value.monthlyData);
  createOrUpdateChart(spec, chartContainer);
};

onMounted(updateChart);

watch(analyzeData, updateChart, { deep: true });
</script>