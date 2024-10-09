<!-- /src/view/Home -->
<script setup lang="ts">
/** componnents */
import InvoicesList from '@/components/Invoices/invoices.vue'
 
/** image */
import HeaderImgFont from '@/components/image/Rectangle_10.png'
</script>

<template>
    <header class="relative bg-[#F9DE4E] w-full h-[580px] flex justify-center">
    <img class="absolute bottom-0" :src="HeaderImgFont" alt="" >
  </header>
  <main class="w-full flex justify-center py-16">
    <InvoicesList />
  </main>
</template>