<!-- /src/view/Home -->
<script setup lang="ts">
/** components */
import InvoicesList from '@/components/Invoices/invoices.vue'
import CompaniesList from '@/components/Companies/comapnies.vue'
 
/** images */
import HeaderImgFont from '@/images/Rectangle_10.png'
import HeaderImage from '@/images/DrawKit_Vector_Illustration_Project_Manager.png'
import NavBar from "@/components/layout/Navbar.vue";
</script>

<template>
  <NavBar />
  <header class="relative bg-[#F9DE4E] w-full h-[740px] flex justify-center">
      <div class="w-3/4 flex items-center justify-center">
        <div class="w-full flex items-center justify-center">
          <h2 class="text-5xl w-4/5 font-bold">MANAGE YOUR CUSTOMERS AND INVOICES EASLY</h2>
        </div>
        <div class="w-full flex items-center justify-center">
          <img :src="HeaderImage"  />
        </div>
      </div>
    <img class="absolute bottom-0" :src="HeaderImgFont" alt="" >
  </header>
  <main class="w-full flex justify-center m-auto py-16">
    <div class="w-full flex justify-center items-center flex-col ">
      <div class="flex flex-col w-3/4 justify-start">
        <h2 class="text-black text-4xl font-bold from-black-700 z-10">
          Last invoices
        </h2>
        <hr class="w-[200px] h-[20px] bg-[#F9DE4E] relative bottom-4 left-20 z-0" />
      </div>
      <InvoicesList :limit="5" :paginateView="false" />
      <div class="flex flex-col w-3/4 justify-start">
        <h2 class="text-black text-4xl font-bold from-black-700 z-10">
          Last companies
        </h2>
        <hr class="w-[200px] h-[20px] bg-[#F9DE4E] relative bottom-4 left-20 z-0" />
      </div>
      <CompaniesList :limit="5" :paginateView="false"/>
    </div>    
  </main>
</template>