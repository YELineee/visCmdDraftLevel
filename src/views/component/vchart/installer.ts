import VChart, { type ISpec } from '@visactor/vchart';

let chart: VChart | null = null;

export function createOrUpdateChart(chartProps:ISpec ,chartContainer:string): boolean {
   const container = document.getElementById(chartContainer);
   if (container && !chart) {
     chart = new VChart(chartProps, {
       dom: container,
     });
 
     chart.renderSync();
     return true;
   } else if (chart) {
     chart.updateSpec(chartProps);
     chart.renderSync();
 
     return true;
   }
   return false;
 }