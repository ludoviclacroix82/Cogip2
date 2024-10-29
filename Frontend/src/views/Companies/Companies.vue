<!-- /src/view/Companies -->
<script setup lang="ts">
/**  components */
import CompaniesList from "@/components/Companies/comapnies.vue"
import NavBar from "@/components/layout/Navbar.vue"
/** images */
import HeaderImgFont from '@/images/Rectangle_10.png'

</script>

<template>
  <NavBar />
  <header class="relative bg-[#F9DE4E] w-full h-[290px] flex justify-center">
    <img class="absolute bottom-0" :src="HeaderImgFont" alt="" >
  </header>
  <main class="w-full flex justify-center m-auto py-16">
    <div class="w-full flex justify-center items-center flex-col ">
      <div class="flex flex-col w-3/4 justify-start">
        <h2 class="text-black text-4xl font-bold from-black-700 z-10">
          All companies
        </h2>
        <hr class="w-[200px] h-[20px] bg-[#F9DE4E] relative bottom-4 left-20 z-0" />
      </div>
      <CompaniesList :limit="15" :paginateView="true"/>
    </div>
  </main>
</template>