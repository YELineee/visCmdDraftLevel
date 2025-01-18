<template>
   <div class="bg-[#34728D] mb-4 rounded-2xl break-inside-avoid min-h-[300px] p-4 font-Montserrat">
      <div class="rolling-list overflow-hidden flex">
         <div class="w-1/2 flex items-center justify-end pr-5">
            <div class="">
               111111
            </div>
            <div>
               --->
            </div>
         </div>
         <div class="rolling-list max-w-1/2 overflow-hidden">
            <ul class="text-3xl relative" v-if="data.length === 0">
               <li>test1</li>
               <li>test2</li>
               <li>test3</li>
               <li>test4</li>
               <li>test5</li>
               <li>test6</li>
               <li>test8</li>
               <li>test7</li>
               <li>test9</li>
               <li>test10</li>
               <li>test11</li>
               <li>test12</li>
               <li>test13</li>
               <li>test14</li>
               <li>test15</li>
            </ul>
            <ul class="text-3xl w-1/2 relative" v-else="data.length > 0">
               <li v-for="item in data" :key="item.cmd">{{ item.cmd }}</li>
            </ul>
         </div>
      </div>

   </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

import { useHistoryDataStore } from '../../../stores/store';
import { storeToRefs } from 'pinia';


const historyDataStore = useHistoryDataStore();
const { analyzeData } = storeToRefs(historyDataStore);
const data = computed(() => analyzeData.value.mostUsedCmds);


onMounted(() => {
   const listName = '.rolling-list';
   const listIndex = 13;
   let listHeight = 0;

   const animateList = () => {
      console.log(data);
      if (data.value.length > 0) {
         console.log(data.value[0].cmd);
      }
      const listElement = document.querySelector(listName);
      const firstItem = listElement.querySelector('li');
      listHeight = firstItem.offsetHeight;
      listElement.style.height = `${listHeight * listIndex}px`;

      const ulElement = listElement.querySelector('ul');
      ulElement.style.transition = 'top 1s';
      ulElement.style.top = `-${listHeight}px`;

      setTimeout(() => {
         ulElement.appendChild(firstItem.cloneNode(true));
         ulElement.style.transition = '';
         ulElement.style.top = '0px';
         ulElement.removeChild(firstItem);
      }, 1000);
   };

   animateList();

   setInterval(animateList, 1500); // 增加滚动间隔
});
</script>