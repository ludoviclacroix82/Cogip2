<script setup>
/** conponents*/
import SideBar from '@/components/layout/Sidebar.vue'
import Header from '@/components/Admin/Dashboard/header.vue'

import { PlusIcon } from '@heroicons/vue/24/outline'
import CompaniesList from "@/components/Admin/Companies/companies.vue"

</script>
<template>
  <div class="w-full flex h-full">
    <div class="bg-white border-r border-gray-300 w-1/5 min-h-screen h-full">
      <SideBar />
    </div>
    <main class=" flex flex-col bg-[#F5F5FB] w-full min-h-screen h-full p-10">
      <Header :link="'Admin/Companies'" :page="'Companies'" />
      <div class="w-7/8 flex flex-col">
        <div class="w-full right-10 flex justify-end mb-5 ">
          <RouterLink class="w-40 py-2 font-semibold flex items-center  bg-transparent hover:bg-[#9698D6] text-gray-500 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded"  :to="{ name: 'companiesAdminIndex' }">
            <PlusIcon   class="size-5 mr-2 " /> Add
          </RouterLink>
        </div>
        <CompaniesList :limit="15" :paginateView="true"/>
      </div>
    </main>
  </div>
</template>