<script setup>
import HeaderImg from '@/images/example-scene-2 1.png'

/** conponents*/
import SideBar from '@/components/layout/Sidebar.vue'
</script>
<template>
  <div class="w-full flex h-full">
    <div class="bg-white border-r border-gray-300 w-1/5 min-h-screen h-full">
        <SideBar />
    </div>
    <div class=" flex flex-col bg-[#F5F5FB] w-4/5 min-h-screen h-full p-10">
      <h2 class="text-4xl font-bold">Dashboard</h2>
      <h5 class="text-s">dashboard/</h5>
      <div class="relative bg-[#9698D6] w-[80%] h-[200px] m-auto mt-10 p-10 rounded-lg text-white">
        <h2 class="text-4xl font-bold w-1/2">Welcome back Henry!</h2>
        <h5 class="text-s w-1/2">You can here add an invoice, a company
          and some contacts</h5>
        <img :src="HeaderImg" class="absolute bottom-7 right-5" alt="">
      </div>
    </div>
  </div>
</template>
