<template>
  <div class="bg-white rounded-lg p-5">
    <h2 class="text-s font-semibold border-b border-gray-300 py-3">Last companies</h2>
    <table class="w-full mt-5">
      <thead>
        <tr class="text-sm text-left h-20">
          <th>Name</th>
          <th>Tva</th>
          <th>Country</th>
        </tr>
      </thead>
      <tbody>
      <tr v-for="company in companies" class="text-sm text-left space-y-5 h-10">
        <td>{{ company.name }}</td>
        <td>{{ company.tva }}</td>
        <td>{{ company.Country.name }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import Company from '@/Models/CompaniesModels'

export default {
  props: {
    limit: {
      type: Number,
      required: true,
    },
  },data(){
    return {
      companies: [],
    }
  },
  async mounted() {
    const companiesModel = new Company()
    try {
      const response = await companiesModel.getCompanies(this.limit,0)
      this.companies = response.companies
    }catch (error) {
      console.error(error)
    }
  }
}
</script>