<template>
    <div class="w-3/4 flex flex-col">
      <div class="w-full py-10">
        <div class="w-full py-2 flex justify-between items-center">
          <input
              v-if="searchView === true"
              class="py-1 px-2 border border-gray-400 rounded text-s h-8"
              name="searchName"
              id="searchName"
              placeholder="Search Name"
              v-model="searchName"
              @input="onSearchInput"
          />
          <Paginate v-if="paginateView === true" :page="page" :pages="pages" @updatePage="updatePage" />
        </div>
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
                    <RouterLink :to="{ name: 'companiesView', params: { id: company.id } }">{{ company.name }}</RouterLink>
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
  import Paginate from "@/components/Paginate/paginate.vue"
  
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
      searchView :{
        type: Boolean,
        required: false,
        default: false,
      }
    },
      data() {
      return {
        companies: [],
        page: 1,
        records: 0,
        pages: 0,
        offset: 0,
        token : this.$keycloak.token,
        searchName:'',
      }
    },
    async created() {
      await this.fetchUpdate(this.limit,this.offset)
    },
    methods: {
      async fetchUpdate(limit,offset) {
        const companyModel = new Company()
        try {
          const response = await companyModel.getCompanies(this.token,limit,offset)
          this.companies = response.companies

          if(this.searchName)
            this.companies = this.companies.filter(company => company.name.includes(this.searchName))

          this.records = response.count
          this.pages = Math.ceil(this.records / this.limit)
        } catch (error) {
          console.error(error)
        }
      },
      async updatePage(newPage) {
        this.page = newPage
        this.offset = (this.page - 1) * this.limit
        await this.fetchUpdate(this.limit,this.offset)
      },
      async onSearchInput(){
            await this.fetchUpdate(this.limit,this.offset)
      }
    },
  }
  </script>