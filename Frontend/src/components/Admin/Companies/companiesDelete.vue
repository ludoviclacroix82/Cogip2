<template>
  <form   class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/2 m-auto" @submit.prevent="deleteCompany()" >
    <div class="mb-4 py-5">
      <h3 v-if="!submited && response.status !== 201 && response" class="text-lg ">Do you want to remove the <strong>{{name}}</strong> ?</h3>
      <h3 v-if="submited && response.status === 201 && response" class="text-lg "> <strong>{{name}}</strong> deleted successfully.</h3>
      <h3 v-if="!response" class="text-lg text-red-500 ">Company not found.</h3>
    </div>
    <div class="flex items-center justify-between">
      <button class="bg-[#9698D6] flex items-center hover:bg-white text-white hover:text-[#9698D6] hover:border-[#9698D6] py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
        <router-link :to="{ name: 'companiesAdminIndex'}">
          <span v-if="!submited && response.status !== 201">Canceled</span>
          <span v-if="submited && response.status === 201">Back</span>
        </router-link>
      </button>
      <button v-if="!submited && response.status !== 201 && response" class="bg-red-500 flex items-center hover:bg-white text-white hover:text-[#9698D6] hover:border-[#9698D6] py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        <TrashIcon class="size-5 mr-2" />Delete
      </button>
    </div>
  </form>

</template>
<script lang="ts">
import { TrashIcon} from "@heroicons/vue/24/outline"
import Company from '@/Models/CompaniesModels.js'

export default {
  components: {
    TrashIcon,
  },
  data(){
    return {
      name:'',
      response:false,
      submited:false,
      token: this.$keycloak.token,
    }
  },
  async mounted(){
    const companiesModels = new Company()
    const id:number = parseInt(this.$route.params.id)

    try {
      const response:object|any =await  companiesModels.getCompany(this.token,id)
        this.name=response.companies.name
        this.response = response

      console.log(response)
    }catch(error){
      console.log(error)
    }
  },
  methods:{
    async deleteCompany(){
      const companiesModels = new Company()
      const id:number = parseInt(this.$route.params.id)
      try {
        const response:object|any =await  companiesModels.deleteCompany(this.token,id) as object|any
        this.response= response
        this.submited = true
      }catch(error){
        console.log(error)
      }
    }
  },
}

</script>