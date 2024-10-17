<script setup>
import ImageProfil from '../../images/user-profile.png'
import { UserIcon , HomeIcon , ClipboardIcon } from '@heroicons/vue/24/outline'

</script>
<template>
  <div class="w-full">
    <!-- Profil -->
    <div class="flex flex-col w-full items-center border-b border-[#E0E0E0] p-5">
      <img :src="ImageProfil" class="w-2/5 object-cover rounded-full" alt="">
      <div class=" flex flex-col justify-center">
          <h3 class="text-md font-semibold text-center">User</h3>
          <h3 class="text-md font-semibold text-center">Name</h3>
      </div>
    </div>
    <!-- Menu -->
    <div class="flex flex-col w-full items-end py-4 ">
      <RouterLink class="w-4/5 py-2 font-semibold hover:border-r-4 hover:border-[#9698D6] hover:text-[#9698D6] flex items-center" :to="{ name: 'dashboardIndex' }">
        <HomeIcon   class="size-5 mr-2 " />Dashboard
      </RouterLink>
      <RouterLink class="w-4/5 py-2 font-semibold hover:border-r-4 hover:border-[#9698D6] hover:text-[#9698D6] flex items-center"  :to="{ name: 'companiesAdminIndex' }">
        <ClipboardIcon   class="size-5 mr-2 " />Companies
      </RouterLink>
      <RouterLink class="w-4/5 py-2 font-semibold hover:border-r-4 hover:border-[#9698D6] hover:text-[#9698D6] flex items-center" :to="{ name: 'dashboardIndex' }">
        <ClipboardIcon   class="size-5 mr-2 " />Invoices
      </RouterLink>
      <RouterLink class="w-4/5 py-2 font-semibold hover:border-r-4 hover:border-[#9698D6] hover:text-[#9698D6] flex items-center" :to="{ name: 'dashboardIndex' }">
        <UserIcon  class="size-5 mr-2 " />Contacts
      </RouterLink>
    </div>
    <div class="flex items-center py-4 fixed bottom-0 left-0 z-10 p-10 h-20 font-semibold">
      <img :src="ImageProfil" class="w-1/5 object-cover rounded-full mr-5" alt=""> Logout
    </div>
  </div>
</template>