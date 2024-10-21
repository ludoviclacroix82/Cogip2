<script setup>
import HeaderImg from '@/images/example-scene-2 1.png'

</script>
<template>
  <header class="py-5">
        <h2 class="text-4xl font-bold">{{ page }}</h2>
        <h5 class="text-s">{{ headerLink }}</h5>
        <div class="relative bg-[#9698D6] w-7/8 h-[200px] m-auto mt-10 p-10 rounded-lg text-white">
          <h2 class="text-4xl font-bold w-1/2">Welcome back {{ keycloak.tokenParsed.preferred_username }}!</h2>
          <h5 class="text-s w-1/2">You can here add an invoice, a company
            and some contacts</h5>
          <img :src="HeaderImg" class="absolute bottom-7 right-5" alt="">
        </div>
  </header>
</template>
<script>

export default {
  props: {
    page: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  data(){
    return {
      headerLink:this.link,
      page: this.page,
      keycloak:this.$keycloak
    }
  }
}
</script>