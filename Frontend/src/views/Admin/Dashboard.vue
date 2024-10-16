<script setup>
/** conponents*/
import SideBar from '@/components/layout/Sidebar.vue'
import Header from '@/components/Admin/Dashboard/header.vue'
import Statistics from "@/components/Admin/Dashboard/statistics.vue"
import Companies from '@/components/Admin/Dashboard/companies.vue'
import Invoices from '@/components/Admin/Dashboard/invoices.vue'

</script>
<template>
  <div class="w-full flex h-full">
    <div class="bg-white border-r border-gray-300 w-1/5 min-h-screen h-full">
        <SideBar />
    </div>
    <main class=" flex flex-col bg-[#F5F5FB] w-full min-h-screen h-full p-10">
      <Header :link="'Dashboard'" :page="'Dashboard'" />
      <div class="w-7/8 grid grid-cols-2 gap-4 grid-flow-cols-dense">
        <Statistics />
        <Companies :limit="5"/>
        <Invoices :limit="5"/>
      </div>
    </main>
  </div>
</template>
