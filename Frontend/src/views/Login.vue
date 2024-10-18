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
      <div class="flex flex-col w-3/4 justify-start">
        <h2 class="text-black text-4xl font-bold from-black-700 z-10">
          Login
        </h2>
        <hr class="w-[100px] h-[20px] bg-[#F9DE4E] relative bottom-4 left-10 z-0" />
      </div >
          <div class="w-2/3">
            <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/2 m-auto" @submit.prevent="login">
              <h2 v-if="message">{{message}}</h2>
              <div class="mb-4">
                <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Username</label>
                <div class="mt-2">
                  <input id="username" name="username" type="text"  required class=" p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
              </div>

              <div class="mb-4">
                <div class="flex items-center justify-between">
                  <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                </div>
                <div class="mt-2">
                  <input id="password" name="password" type="password" autocomplete="current-password" required class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
              </div>

              <div class="mb-4">
                <button type="submit" class="flex w-full justify-center rounded-md bg-[#F9DE4E] px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-white border border-[#F9DE4E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
              </div>
            </form>
        </div>
    </div>    
  </main>
</template>
<script lang="ts">
export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    login() {
      const { username, password } = this;

      // Utilisation de Keycloak pour effectuer une requête de connexion
      this.$root.keycloak.login({
        redirectUri: window.location.origin,  // Redirige après authentification
        loginHint: username
      }).catch(error => {
        this.errorMessage = 'Échec de la connexion. Vérifiez vos informations.';
        console.error('Login failed:', error);
      })
    }
  }
}
</script>