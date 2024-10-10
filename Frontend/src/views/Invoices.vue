<!-- /src/view/Home -->
<script setup lang="ts">
/**  componnents */
import InvoicesList from '@/components/Invoices/invoices.vue'
/** image */
import HeaderImgFont from '@/components/image/Rectangle_10.png'
</script>

<template>
    <header class="relative bg-[#F9DE4E] w-full h-[290px] flex justify-center">
    <img class="absolute bottom-0" :src="HeaderImgFont" alt="" >
  </header>
  <main class="w-full flex justify-center m-auto py-16">
    <div class="w-full flex justify-center items-center flex-col ">
      <InvoicesList :limit="15" :offset="0" :paginateView="true"/>
    </div>    
  </main>
</template>