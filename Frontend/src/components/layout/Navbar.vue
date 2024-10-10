<template>
    <nav class="absolute bg-[#F9DE4E] w-full h-[80px] text-black flex justify-center items-center z-10 top-24">
        <div class="w-[80%] flex items-center ">
            <div class="font-bold text-4xl w-1/4">COGIP</div>
            <div class="w-2/4 text-xl space-x-4 font-bold">
                <a class="p-2 hover:border border-gray-950" href="/">Home</a>
                <RouterLink class="p-2 hover:border border-gray-950" :to="{ name: 'invoicesIndex' }">Invoices</RouterLink>
                <RouterLink class="p-2 hover:border border-gray-950" :to="{ name: 'companiesIndex' }">Companies</RouterLink>
              <a class="p-2 hover:border border-gray-950" href="">Contacts</a>
            </div>
            <div class="w-1/4 text-xl space-x-4 font-bold" >
                <a class="px-4 py-2 bg-white rounded-md" href="">Sign up</a>
                <a href="">Login</a>
            </div>
        </div>  
</nav>
</template>
<script setup>
</script>