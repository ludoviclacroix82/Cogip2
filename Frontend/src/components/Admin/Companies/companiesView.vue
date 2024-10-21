<template>
  <div   class="w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/2 m-auto" >
    <div class="mb-4">
      <h3 class="text-xl font-bold">{{company.name}}</h3>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="tva">
        Tva
      </label>
      <span>{{company.tva}}</span>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="country_id">
        Country
      </label>
      <span>{{country}}</span>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="type_id">
        Type
      </label>
      <span>{{type}}</span>
    </div>
  </div>
</template>
<script lang="ts">
import Company from  '@/Models/CompaniesModels'

export default {
  data() {
    return {
      country:'',
      type: '',
      company: [],
      token : this.$keycloak.token
    }
  },
  async mounted() {
    const companyModel = new Company()

    const idCompany:number = parseInt(this.$route.params.id)
    try {

      const responseCompany = await companyModel.getCompany(this.token,idCompany)
      this.company = responseCompany.companies
      this.country = responseCompany.companies.Country.name
      this.type = responseCompany.companies.Type.name

    } catch (error) {
      console.log(error)
    }
  },
}
</script>
