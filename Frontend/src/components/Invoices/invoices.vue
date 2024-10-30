<template>
    <div class="w-3/4 flex flex-col">
      <div class="w-full py-10">
        <div class="w-full py-2 flex justify-between items-center">
          <input
              v-if="searchView === true"
              class="py-1 px-2 border border-gray-400 rounded text-s h-8"
              name="searchRef"
              id="searchRef"
              placeholder="Search Ref"
              v-model="searchRef"
              @input="onSearchInput"
          />
          <Paginate v-if="paginateView === true" :page="page" :pages="pages" @updatePage="updatePage" />
        </div>
        <table class="min-w-full">
          <thead>
            <tr class="bg-[#F9DE4E] text-black font-semibold text-left">
              <th class="py-2 px-4">Invoice Number</th>
              <th class="py-2 px-4">Company</th>
              <th class="py-2 px-4">Price</th>
              <th class="py-2 px-4">Created At</th>
              <th class="py-2 px-4">Updated At</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="records === 0 && companyId > 0">
              <td colspan="5" class="py-4 px-4 border-b border-gray-300 text-center text-gray-500">
                This company has no invoices
              </td>
            </tr>
            <tr v-if="records === 0 && companyId === 0">
              <td colspan="5" class="py-4 px-4 border-b border-gray-300 text-center text-gray-500">
                No invoices found
              </td>
            </tr>
            <tr v-for="invoice in invoices" :key="invoice.id" class="hover:bg-gray-100">
              <td class="py-2 px-4 border-b border-gray-300">
                <RouterLink :to="{ name: 'invoicesHome', params: { ref : invoice.ref } }">{{ invoice.ref }}</RouterLink>                
            </td>
              <td class="py-2 px-4 border-b border-gray-300">{{ invoice.Company ? invoice.Company.name : 'N/A' }}</td>
              <td class="py-2 px-4 border-b border-gray-300">{{ invoice.price }}</td>
              <td class="py-2 px-4 border-b border-gray-300">{{ invoice.created_at }}</td>
              <td class="py-2 px-4 border-b border-gray-300">{{ invoice.updated_at }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script setup>
  const emit = defineEmits(['updatePage'])
  </script>
<script>
import Invoice from '@/Models/InvoicesModels'
import Paginate from '@/components/Paginate/paginate.vue'

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
    companyId: {
      type: Number,
      required: false,
      default: 0,
    },
    searchView:{
      type: Boolean,
      required: false,
      default: false,
    }
  },
  data() {
    return {
      invoices: [],
      page: 1,
      records: 0,
      pages: 0,
      offset: 0,
      token: this.$keycloak.token,
      searchRef: '',
    }
  },
  watch: {
    async companyId() {
      await this.fetchUpdate(this.limit, this.offset)
    },
  },
  created() {
    this.fetchUpdate(this.limit, this.offset)
  },
  methods: {
    async fetchUpdate(limit, offset) {
      const invoiceModel = new Invoice()
      try {
        let response
        if (this.companyId > 0) {
          response = await invoiceModel.getInvoicesFromCompany(this.token, this.companyId)
        } else {
          response = await invoiceModel.getInvoices(this.token, limit, offset)
        }

        this.invoices = response.invoices
        this.records = response.count

        if (this.searchRef) {
          this.invoices = this.invoices.filter(invoice => invoice.ref.includes(this.searchRef))
        }

        this.pages = Math.ceil(this.records / this.limit)
      } catch (error) {
        console.error('Erreur lors de la récupération des factures:', error)
      }
    },
    async updatePage(newPage) {
      this.page = newPage
      this.offset = (this.page - 1) * this.limit
      await this.fetchUpdate(this.limit, this.offset)
    },
    async onSearchInput() {
      await this.fetchUpdate(this.limit, this.offset)
    }
  },
}
</script>
  