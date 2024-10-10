<template>
    <div class="w-3/4 flex flex-col">
      <h2 class="text-black text-4xl font-bold from-black-700">All companies</h2>
      <div class="w-full py-10">
        <Paginate v-if="paginateView === true" :page="page" :pages="pages" @updatePage="updatePage" />
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
                    <RouterLink :to="{ name: 'companiesHome', params: { id: company.id } }">{{ company.name }}</RouterLink>                
                </td>
                <td class="py-2 px-4 border-b border-gray-300">{{ company.Type.name }}</td>
                <td class="py-2 px-4 border-b border-gray-300" :title="company.Country.name">{{ company.Country.initials }}</td>
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
  import Company from '@/Models/CompaniesModels'
  import Paginate from "@/components/Paginate/paginate.vue";
  
  export default {
    components: {
      Paginate,
    },
    props: {
      limit: {
        type: Number,
        required: true,
      },
      paginateView: {
        type: Boolean,
        required: true,
      },
    },
    data() {
      return {
        companies: [],
        page: 1,
        records: 0,
        pages: 0,
        offset: 0,
      }
    },
    async created() {
      const companyModel = new Company()
      try {
        const response = await companyModel.getCompanies(this.limit,this.offset)
        this.companies = response.companies
        this.records = response.count
        this.pages = Math.ceil(this.records / this.limit)
      } catch (error) {
        console.error(error)
      }
    },
    methods: {
      async fetchUpdate() {
        const companyModel = new Company()
        try {
          const response = await companyModel.getCompanies(this.limit,this.offset)
          this.companies = response.companies
          this.records = response.count
          this.pages = Math.ceil(this.records / this.limit)
        } catch (error) {
          console.error(error)
        }
      },
      updatePage(newPage) {
        this.page = newPage;
        this.offset = (this.page - 1) * this.limit;
        this.fetchUpdate();
      },
    },
  }
  </script>