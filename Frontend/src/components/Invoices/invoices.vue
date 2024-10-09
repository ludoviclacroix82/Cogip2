<template>
    <div class="w-3/4 flex flex-col">
      <div class="flex flex-col">
        <h2 class="text-black text-4xl font-bold from-black-700 z-10">
          All invoices
        </h2>
        <hr class="w-[200px] h-[20px] bg-[#F9DE4E] relative bottom-4 left-20 z-0" />
      </div>
      <div class="w-full py-10">
        <div class="w-full p-3 flex justify-end">
          <!-- Pagination controls -->
            <button 
              @click="previousPage" 
              :disabled="page === 1" 
              class=" bg-white text-xs text-gray-600 border border-gray-600 rounded px-2 py-1 hover:bg-[#F9DE4E] hover:text-white hover:border-[#F9DE4E] transition duration-300 disabled:bg-white disabled:text-gray-600 disabled:border-gray-600 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span class="mx-2  text-xs bg-white  text-gray-600 border border-gray-600 rounded px-2 py-1">Page {{ page }} of {{ pages }}</span>
            <button 
              @click="nextPage" 
              :disabled="page === pages" 
              class="bg-white  text-xs  text-gray-600 border border-gray-600 rounded px-2 py-1 hover:bg-[#F9DE4E] hover:text-white hover:border-[#F9DE4E] transition duration-300 disabled:bg-white disabled:text-gray-600 disabled:border-gray-600 disabled:cursor-not-allowed"
            >
              Next
            </button>
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
  
  <script>
  import Invoice from '@/Models/InvoicesModels'
  
  export default {
  data() {
    return {
      invoices: [],
      limit: 15,
      offset: 0,
      page: 1,
      records: 0,
      pages: 0,
    }
  },
  async created() {
    const invoiceModel = new Invoice()
    try {
      const response = await invoiceModel.getInvoices(this.limit, this.offset)
      this.invoices = response.invoices   
      this.records = response.count
      this.pages = Math.ceil(this.records / this.limit)
    } catch (error) {
      console.error( error)
    }
  },
  methods: {
    nextPage() {
      if (this.page < this.pages) {
        this.page++
        this.offset = (this.page - 1) * this.limit
        this.fetchUpdate()
      }
    },
    previousPage() {
      if (this.page > 1) {
        this.page--
        this.offset = (this.page - 1) * this.limit
        this.fetchUpdate()
      }
    },
    async fetchUpdate() {
      const invoiceModel = new Invoice()
      try {
        const response = await invoiceModel.getInvoices(this.limit, this.offset)
        this.invoices = response.invoices
        this.records = response.count
        this.pages = Math.ceil(this.records / this.limit)
      } catch (error) {
        console.error( error)
      }
    },
  },
}
  </script>
  