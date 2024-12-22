<template>
  <div class="w-screen p-4 bg-black border-y-[1.5px] border-white py-10 px-6 text-white font-Montserrat" id="output">
    <localeDateCard />
    <div class=" 2xl:columns-4 columns-3 md:gap-4 gap-2 " >
      <words/>
      <calender />
      <usage />
      <dayOrNight />
      <double />
      <monthly />
      <coffie />
      <about />
      <rolling />
      <div v-for="(item, index) in items" :key="index" :class="item.class">
      </div>
      <!-- <button @click="exportAsImage" class="mt-4 p-2 bg-blue-500 text-white rounded">导出为图片</button> -->
    </div>
  </div>
</template>

<script setup>
import localeDateCard from '../component/card/localeDateCard.vue';
import words from '../component/card/words.vue';
import calender from '../component/card/calender.vue';
import usage from '../component/card/usage.vue';
import dayOrNight from '../component/card/dayOrNight.vue';
import double from '../component/card/double.vue';
import coffie from '../component/card/coffie.vue';
import about from '../component/card/about.vue';
import monthly from '../component/card/monthly.vue';
import rolling from '../component/card/rolling.vue';

import html2canvas from 'html2canvas';

const exportAsImage = async () => {
  const element = document.getElementById('output');
  if (element) {
    const canvas = await html2canvas(element);
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'exported-image.png';
    link.click();
  }
};

const items = [
  { class: 'bg-[#8E86A1] mb-4 rounded-2xl break-inside-avoid h-[400px]' },
  { class: 'bg-[#D2DCD0] mb-4 rounded-2xl break-inside-avoid h-[400px]' },
  { class: 'bg-[#EDE257] mb-4 rounded-2xl break-inside-avoid h-[400px]' },
  { class: 'bg-[#E35B39] mb-4 rounded-2xl break-inside-avoid h-[400px]' },
  { class: 'bg-[#877D26] mb-4 rounded-2xl break-inside-avoid h-[400px]' },
  { class: 'bg-[#34728D] mb-4 rounded-2xl break-inside-avoid h-[400px]' },
];

</script>

