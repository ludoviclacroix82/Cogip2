<!-- /src/view/Home -->
<script setup lang="ts">
/**  components */
import NavBar from '@/components/layout/Navbar.vue'
import InvoicesList from '@/components/Invoices/invoices.vue'
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
      <InvoicesList :limit="15" :paginateView="true"/>
    </div>    
  </main>
</template>