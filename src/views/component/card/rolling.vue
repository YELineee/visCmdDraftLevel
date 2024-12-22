<template>
   <div class="bg-[#8E86A1] mb-4 rounded-2xl break-inside-avoid min-h-[300px] p-4 font-Montserrat">
      <div>
         <!-- <div v-for="cmd in mainCmdUsage" :key="cmd">{{ cmd }}</div>  -->
         <!-- <ul>
            <li v-for="cmd in mainCmdUsage" :key="cmd">{{ cmd }}</li>
         </ul> -->
         <ul class="text-4xl">
            <li class="translate-x-4">asddasdad </li>
            <li class="translate-x-8">asddasdad </li>
            <li class="translate-x-12">asddasdad </li>
            <li class="translate-x-16">asddasdad </li>
            <li class="translate-x-20">asddasdad </li>
            <li class="translate-x-24">asddasdad </li>
            <li class="translate-x-20">asddasdad </li>
            <li class="translate-x-16">asddasdad </li>
            <li class="translate-x-12">asddasdad </li>
            <li class="translate-x-8">asddasdad </li>
            <li class="translate-x-4">asddasdad </li>
         </ul>
      </div>
   </div>
</template>

<script setup>
import { useHistoryDataStore } from '../../../stores/store';
import { storeToRefs } from 'pinia';
import { ref, computed } from 'vue';

const historyDataStore = useHistoryDataStore();
const { analyzeData } = storeToRefs(historyDataStore);

const mainCmdUsage = computed(() => {
   if (analyzeData.value) {
      return Object.entries(analyzeData.value.mainCmdUsage)
         .sort((a, b) => b[1] - a[1])
         .slice(0, 30)
         .map(entry => entry[0]);
   }
});

</script>