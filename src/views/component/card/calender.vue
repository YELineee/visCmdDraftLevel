<template>
  <div class="bg-[#000000] rounded-2xl break-inside-avoid h-auto p-4 font-Montserrat">
    <div class="grid grid-cols-7 gap-1">
      <div v-for="(day, index) in ['S', 'M', 'T', 'W', 'T', 'F', 'S']" :key="index" class="text-center font-bold text-2xl mb-1">
        {{ day }}
      </div>
      <div
        v-for="date in dates"
        class="aspect-square flex items-center justify-center text-2xl relative"
      >
        <div
          :class="{
            'absolute inset-0 rounded-full': date.isToday,
            'bg-red-600': date.isToday,
          }"
        ></div>
        <span
          :class="{
            'relative z-10': true,
            'text-white': !date.isToday && date.isCurrentMonth,
            'text-black font-bold': date.isToday,
            'text-black': !date.isCurrentMonth
          }"
        >
          {{ String(date.day).padStart(2, '0') }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useHistoryDataStore } from '../../../stores/store';
import { storeToRefs } from 'pinia';

const historyDataStore = useHistoryDataStore();
const { analyzeData } = storeToRefs(historyDataStore);

const currentDate = ref(new Date());

const dates = computed(() => {
  let today = new Date();

  if (analyzeData.value.mostUsedCmdDayPerYear && Object.keys(analyzeData.value.mostUsedCmdDayPerYear).length > 0) {
    const mostUsedCmdDay = analyzeData.value.mostUsedCmdDayPerYear[2024]; // Assuming you want to use the data for the year 2024
    if (mostUsedCmdDay) {
      const targetDate = new Date(mostUsedCmdDay.date);
      currentDate.value = targetDate;
      today = targetDate;
    }
  }

  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay();

  const calendarDays = [];

  // Add days from previous month
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    const day = new Date(year, month, -i);
    calendarDays.push({
      day: day.getDate(),
      isCurrentMonth: false,
      isToday: false
    });
  }

  // Add days of current month
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({
      day: i,
      isCurrentMonth: true,
      isToday: i === today.getDate() && month === today.getMonth() && year === today.getFullYear()
    });
  }

  // Add days from next month
  const remainingDays = 42 - calendarDays.length;
  for (let i = 1; i <= remainingDays; i++) {
    calendarDays.push({
      day: i,
      isCurrentMonth: false,
      isToday: false
    });
  }

  return calendarDays;
});
</script>