<template>
    <div class="w-3/4 flex flex-col">
      <h2 class="text-black text-4xl font-bold from-black-700">Last companies</h2>
      <div class="w-full py-10">
        <table class="min-w-full">
          <thead>
            <tr class="bg-[#F9DE4E] text-black font-semibold text-left">
              <th class="py-2 px-4">#</th>
              <th class="py-2 px-4">name</th>
              <th class="py-2 px-4">Type</th>
              <th class="py-2 px-4">Country</th>
              <th class="py-2 px-4">Tva</th>
              <th class="py-2 px-4">created_at</th>
              <th class="py-2 px-4">updated_at</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="company in companies" :key="company.id" class="hover:bg-gray-100">
                <td class="py-2 px-4 border-b border-gray-300">{{ company.id}}</td>
                <td class="py-2 px-4 border-b border-gray-300">
                    <RouterLink :to="`/comapnies/${company.id}`">{{ company.name }}</RouterLink>                
                </td>
                <td class="py-2 px-4 border-b border-gray-300">{{ company.type_id }}</td>
                <td class="py-2 px-4 border-b border-gray-300">{{ company.country_id }}</td>
                <td class="py-2 px-4 border-b border-gray-300">{{ company.tva}}</td>
                <td class="py-2 px-4 border-b border-gray-300">{{ company.created_at }}</td>
                <td class="py-2 px-4 border-b border-gray-300">{{ company.updated_at }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import company from '@/Models/CompaniesModels'
  
  export default {
    data() {
      return {
        companies: [],
      }
    },
    async created() {
      const companyModel = new company()
      try {
        const limit = 5
        const offset = 0
        const response = await companyModel.getCompanies(limit,offset)
        console.log(response.companies)
        
        this.companies = response.companies    
      } catch (error) {
        console.error("Error fetching companies:", error)
      }
    }
  }
  </script>