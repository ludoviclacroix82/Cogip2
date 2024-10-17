<script setup>
import { EyeIcon , PencilIcon , TrashIcon } from '@heroicons/vue/24/outline'
</script>/
<template>
  <div class="w-full flex flex-col">
    <div class="w-full py-10">
      <Paginate v-if="paginateView === true" :page="page" :pages="pages" @updatePage="updatePage" />
      <table class="min-w-full">
        <thead>
        <tr class="bg-[#9698D6] text-white font-semibold text-left">
          <th class="py-2 px-4">#</th>
          <th class="py-2 px-4">name</th>
          <th class="py-2 px-4">Type</th>
          <th class="py-2 px-4">Country</th>
          <th class="py-2 px-4">Tva</th>
          <th class="py-2 px-4">created_at</th>
          <th class="py-2 px-4"></th>
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
          <td class="py-2 px-4 border-b border-gray-300 flex ">
            <router-link :to="{ name: 'companiesAdminView', params: { id: company.id } }">
             <EyeIcon   class="size-5 mr-2 hover:text-[#9698D6] cursor-pointer transition duration-150" />
            </router-link>
            <router-link :to="{ name: 'companiesAdminUpdate', params: { id: company.id } }">
              <PencilIcon class="size-5 mr-2 hover:text-[#9698D6] cursor-pointer transition duration-150" />
            </router-link>
            <router-link :to="{ name: 'companiesAdminDelete', params: { id: company.id } }">
              <TrashIcon   class="size-5 mr-2 hover:text-red-600 cursor-pointer transition duration-150" />
            </router-link>
          </td>
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