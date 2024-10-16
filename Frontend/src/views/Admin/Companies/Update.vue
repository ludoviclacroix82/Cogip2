<script setup>
/** conponents*/
import SideBar from '@/components/layout/Sidebar.vue'
import Header from '@/components/Admin/Dashboard/header.vue'
import Form from '@/components/Admin/Companies/companiesForm.vue'

</script>
<template>
  <div class="w-full flex h-full">
    <div class="bg-white border-r border-gray-300 w-1/5 min-h-screen h-full">
      <SideBar />
    </div>
    <main class=" flex flex-col bg-[#F5F5FB] w-full min-h-screen h-full p-10">
      <Header :link="'Admin/Companies/update'" :page="'Update Companies'" />
      <div class="w-7/8 flex flex-col">
        <Form />
      </div>
    </main>
  </div>
</template>