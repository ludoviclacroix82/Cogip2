<template>
    <nav class="absolute w-full h-[80px] text-black flex justify-center items-center z-10 top-24">
        <div class="w-[80%] flex items-center ">
            <div class="font-bold text-4xl w-1/4">COGIP</div>
            <div class="w-2/4 text-xl space-x-4 font-bold">
                <a class="p-2 hover:border border-gray-950" href="/">Home</a>
                <RouterLink class="p-2 hover:border border-gray-950" :to="{ name: 'invoicesIndex' }">Invoices</RouterLink>
                <RouterLink class="p-2 hover:border border-gray-950" :to="{ name: 'companiesIndex' }">Companies</RouterLink>
              <a class="p-2 hover:border border-gray-950" href="">Contacts</a>
              <RouterLink class="p-2 hover:border border-gray-950" :to="{ name: 'dashboardIndex' }">Dashboard</RouterLink>
            </div>
            <div class="w-1/4 text-xl space-x-4 font-bold" >

                <button @click="logout" class="px-4 py-2 bg-white rounded-md" >Logout</button>
                <router-link :to="{name:'Login'}">
                  Login
                </router-link>
            </div>
        </div>  
</nav>
</template>
<script lang="ts">
export default {
  name: 'LogoutButton',
  methods: {
    logout() {
      // Utilisation de la méthode logout de Keycloak
      this.$keycloak.logout({
        redirectUri: window.location.origin // Redirection après déconnexion
      });
    }
  }
}
</script>