import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useFileQueueStore = defineStore('fileQueue', () => {
  const files = ref<File[]>([])
  
  function addFile(file: File) {
    files.value.push(file)
  }

  function removeFile(file: File) {
    files.value = files.value.filter(f => f !== file)
  }

  function clearQueue() {
    files.value = []
  }

  return { files, addFile, removeFile, clearQueue }
})

export const useHistoryDataStore = defineStore('historyData', () => {
  const historyData = ref<{ name: string, data: any }[]>([])

  function addData(name: string, data: any) {
    historyData.value.push({ name, data })
    console.log(historyData.value);
  }

  function removeData(name: string) {
    historyData.value = historyData.value.filter(d => d.name !== name)
  }

  function clearHistory() {
    historyData.value = []
  }

  const analyzeData = computed(() => {
    const allData = historyData.value.flatMap(entry => entry.data);
    const totalCommands = allData.length;

    // Use Map for better performance with large data sets
    const periods = allData.reduce((acc: Map<string, number>, curr: any) => {
      acc.set(curr.period, (acc.get(curr.period) || 0) + 1);
      return acc;
    }, new Map<string, number>());

    const monthlyData = allData.reduce((acc: Map<string, number>, curr: any) => {
      const yearMonth = `${curr.year}-${curr.month}`;
      acc.set(yearMonth, (acc.get(yearMonth) || 0) + 1);
      return acc;
    }, new Map<string, number>());

    const periodCounts = {
      Morning: periods.get('Morning') || 0,
      Afternoon: periods.get('Afternoon') || 0,
      Night: periods.get('Night') || 0
    };

    const yearlyData = allData.reduce((acc: Map<string, number>, curr: any) => {
      acc.set(curr.year, (acc.get(curr.year) || 0) + 1);
      return acc;
    }, new Map<string, number>());

    const mainCmdUsage = allData.reduce((acc: Map<string, number>, curr: any) => {
      acc.set(curr.mainCmd, (acc.get(curr.mainCmd) || 0) + 1);
      return acc;
    }, new Map<string, number>());

    const mostUsedCmds = Array.from(mainCmdUsage)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15)
      .map(([cmd, count]) => ({ cmd, count }));

    const dailyData = allData.reduce((acc: Map<string, number>, curr: any) => {
      const date = `${curr.year}-${curr.month}-${curr.day}`;
      acc.set(date, (acc.get(date) || 0) + 1);
      return acc;
    }, new Map<string, number>());

    const dailyDataArray = Array.from(dailyData, ([date, value]) => ({ date, value }));

    const mostUsedCmdDayPerYear = allData.reduce((acc: Map<string, { date: string, count: number }>, curr: any) => {
      const date = `${curr.year}-${curr.month}-${curr.day}`;
      const year = curr.year;
      if (!acc.has(year) || acc.get(year)!.count < dailyData.get(date)!) {
        acc.set(year, { date, count: dailyData.get(date)! });
      }
      return acc;
    }, new Map<string, { date: string, count: number }>());

    const hourlyData = allData.reduce((acc: Record<number, Record<number, number>>, curr: any) => {
      if (!acc[curr.year]) {
        acc[curr.year] = {};
      }
      const yearMap = acc[curr.year];
      yearMap[curr.hour] = (yearMap[curr.hour] || 0) + 1;
      return acc;
    }, {});

    return {
      totalCommands,
      periods: Object.fromEntries(periods),
      monthlyData: Object.fromEntries(monthlyData),
      yearlyData: Object.fromEntries(yearlyData),
      mainCmdUsage: Object.fromEntries(mainCmdUsage),
      dailyData: dailyDataArray,
      mostUsedCmds,
      periodCounts,
      mostUsedCmdDayPerYear: Object.fromEntries(mostUsedCmdDayPerYear),
      hourlyData,
    };
  });

  return { historyData, addData, removeData, clearHistory, analyzeData }
})