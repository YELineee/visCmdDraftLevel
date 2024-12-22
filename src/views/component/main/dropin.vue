<template>
   <div
      class="drop-container w-full h-full absolute top-0 left-0 flex items-center justify-center font-Montserrat"
      :class="{
         'bg-[#ffffff22] border-8 z-20 border-dashed border-yellow-300 transition-colors duration-300': isDragOver,
         'border-red-500': isErrorType
      }"
      @dragover.prevent="handleDragOver"
      @dragleave="handleDragLeave"
      @drop.prevent="handleDrop"
   >
      <div v-if="!isErrorType && isDragOver" class="text-2xl">drop there plz</div>
      <div v-if="isErrorType" class="text-red-500 mt-2">Null</div>
   </div>
</template>

<script setup>
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat);
import { ref, watch } from 'vue';
import { useFileQueueStore , useHistoryDataStore } from '../../../stores/store';


const isDragOver = ref(false);
const isErrorType = ref(false);

const fileQueueStore = useFileQueueStore();
const historyDataStore = useHistoryDataStore();

function handleDragOver() {
   isDragOver.value = true;
   isErrorType.value = false;
}

function handleDragLeave() {
   isDragOver.value = false;
}

function handleDrop(event) {
   isDragOver.value = false;
   const files = event.dataTransfer.files;
   if (files.length > 0) {
      const file = files[0];
      if (file.type === "text/plain") {
         if (!fileQueueStore.files.some(f => f.name === file.name)) {
            fileQueueStore.addFile(file);
            isErrorType.value = false;
         } else {
            isErrorType.value = true;
            setTimeout(() => {
               isErrorType.value = false;
            }, 3000);
         }
      } else {
         isErrorType.value = true;
         setTimeout(() => {
            isErrorType.value = false;
         }, 3000);
      }
   }
}

function historyHander(file) {
   const reader = new FileReader();
   reader.onload = function(event) {
      history2data(file.name, event.target.result);
   };
   reader.readAsText(file);
}

function history2data(fileName, historyText) {
   const lines = historyText.split('\n');
   const regex = /(\d+)\*?\s+(\d{4}-\d{2}-\d{2})\s+([\d:]+)\s+(.*)/;
   const batchSize = 1000; 
   let newEntries = [];

   for (let i = 0; i < lines.length; i += batchSize) {
      const batch = lines.slice(i, i + batchSize);
      const batchEntries = batch.map(line => {
         const match = line.match(regex);
         if (match) {
            const [_, timestamp, dateStr, timeStr, command] = match;
            const dateTime = dayjs(`${dateStr} ${timeStr}`, ['YYYY-MM-DD HH:mm', 'DD-MM-YYYY HH:mm', 'MM-DD-YYYY HH:mm']);
            if (!dateTime.isValid()) {
               // console.log('Invalid date time:', dateStr, timeStr);
               return null;
            }
            const year = dateTime.year();
            const month = dateTime.month() + 1;
            const day = dateTime.date();
            const hour = dateTime.hour();

            let period = 'Night';
            if (hour < 12) {
               period = 'Morning';
            } else if (hour < 18) {
               period = 'Afternoon';
            }

            const [mainCmd, ...cmdContent] = command.split(' ');
            return {
               timestamp: parseInt(timestamp, 10),
               year,
               month,
               day,
               period,
               mainCmd,
               contentCmd: cmdContent.join(' '),
            };
         }
         return null;
      }).filter(entry => entry !== null);

      newEntries = newEntries.concat(batchEntries);
   }

   historyDataStore.addData(fileName, newEntries);
}

watch(fileQueueStore.files, (newQueue) => {
   if (newQueue.length > 0) {
      const latestFile = newQueue[newQueue.length - 1];
      historyHander(latestFile);
   }
}, {
   deep: true,
});
</script>
