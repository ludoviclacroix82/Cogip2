<!-- /src/view/Comapnies/view -->
<script setup lang="ts">
/**  components */
import NavBar from "@/components/layout/Navbar.vue"
import InvoicesList from '@/components/Invoices/invoices.vue'
/** images */
import HeaderImgFont from '@/images/Rectangle_10.png'

</script>
<template>
  <NavBar />
  <header class="relative bg-[#F9DE4E] w-full h-[290px] flex justify-center">
    <img class="absolute bottom-0" :src="HeaderImgFont" alt="" >
  </header>
  <main class="w-full flex flex-col justify-center m-auto py-16">
    <div class="w-full flex justify-center items-center flex-col ">
      <div class="flex flex-col w-3/4 justify-start">
        <h2 class="text-black text-4xl font-bold from-black-700 z-10">
          #{{companyId}}  {{company.name}}
        </h2>
        <hr class="w-[200px] h-[20px] bg-[#F9DE4E] relative bottom-4 left-20 z-0" />
      </div>
      <div class="p-4 flex flex-col w-3/4 justify-start">
        <div class="text-black text-xl font-bold from-black-700 z-10">
          Name : <span class="font-normal	">{{company.name}}</span>
        </div>
        <div class="text-black text-xl font-bold from-black-700 z-10">
          Tva : <span class="font-normal	">{{company.tva}}</span>
        </div>
        <div class="text-black text-xl font-bold from-black-700 z-10">
          Country : <span class="font-normal	">{{country.name}}</span>
        </div>
        <div class="text-black text-xl font-bold from-black-700 z-10">
          Type : <span class="font-normal	">{{type.name}}</span>
        </div>
      </div>
    </div>
    <div class="w-full flex justify-center items-center flex-col ">
      <InvoicesList :limit="15" :companyId='companyId' :paginateView="true" :searchView="true"/>
    </div>
  </main>
</template>
<script lang="ts">
import Company from '../../Models/CompaniesModels'
export default {
  data(){
    return {
      company:[],
      country : [],
      type: [],
      companyId:'',
      token : this.$keycloak.token,
    }
  },
  async mounted() {
    const companyModel =  new Company
    this.companyId = parseInt(this.$route.params.id)
    try {
      const response = await companyModel.getCompany(this.token,this.companyId)
      this.company = response.companies
      this.country = response.companies.Country
      this.type = response.companies.Type
    }catch (e) {
      console.log(e)
    }
  }
}
</script>