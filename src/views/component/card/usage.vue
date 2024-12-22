<template>
   <div class="bg-[#8E86A1] mb-4 rounded-2xl break-inside-avoid h-auto p-4 font-Montserrat">

       <!-- Header -->
       <div class="flex justify-between items-center mb-6">
         <h2 class="text-lg font-medium">Command Usage</h2>
         <button class="text-gray-400 hover:text-gray-600">
           <!-- <MoreHorizontalIcon class="h-5 w-5" /> -->
         </button>
       </div>
 
       <!-- Fixed Commands -->
       <div class="space-y-3 mb-8">
         <div v-for="(count, name) in fixedCommands" :key="name" 
              class="flex justify-between items-center">
           <span class="text-gray-900">{{ name }}</span>
           <span class="font-medium">{{ count }} times</span>
         </div>
       </div>
 
       <!-- Command Limits Section -->
       <div class="space-y-4">
         <h3 class="text-sm text-gray-500 font-medium">COMMAND LIMITS</h3>
         <div v-for="(item, command) in commandLimits" :key="command" 
              class="space-y-2">
           <div class="flex justify-between items-center">
             <span class="text-gray-900">{{ command }}</span>
             <span class="text-sm text-gray-500">
               {{ item.used }} / {{ item.limit }}
             </span>
           </div>
           <div class="h-1 bg-gray-200 rounded-full overflow-hidden">
             <div class="h-full bg-gray-800 rounded-full transition-all duration-500"
                  :style="{ width: `${(item.used / item.limit) * 100}%` }"
                  :class="{'bg-red-500': item.used > item.limit}">
             </div>
           </div>
         </div>
       </div>

   </div>
 </template>
 
 <script setup>
 import { ref } from 'vue'
//  import { MoreHorizontalIcon } from 'lucide-vue-next'
 
 const fixedCommands = ref({
   'System Check': 15,
   'Data Backup': 3,
   'Security Scan': 7
 })
 
 const commandLimits = ref({
   'File Transfer': {
     used: 42,
     limit: 100
   },
   'Database Query': {
     used: 78,
     limit: 150
   },
   'User Management': {
     used: 23,
     limit: 50
   },
   'Report Generation': {
     used: 56,
     limit: 75
   },
   'API Calls': {
     used: 189,
     limit: 200
   }
 })
 
 // Function to update command usage
 const updateCommandUsage = (command, count) => {
   if (commandLimits.value[command]) {
     commandLimits.value[command].used = count
   }
 }
 </script>
 
 <style scoped>
 .rounded-xl {
   border-radius: 1rem;
 }
 </style>