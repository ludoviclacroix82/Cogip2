<template>
    <div class="w-3/4 flex flex-col">
      <h2 class="text-black text-4xl font-bold from-black-700">Last invoices</h2>
      <div class="w-full py-10">
        {{ invoices.invoices }}
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
                <RouterLink :to="`/invoice/${invoice.ref}`">{{ invoice.ref }}</RouterLink>                
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
  import Invoice from '../../Models/InvoicesModels'
  
  export default {
    data() {
      return {
        invoices: [],
      }
    },
    async created() {
      const invoiceModel = new Invoice()
      try {
        const limit = 5
        const offset = 0
        const response = await invoiceModel.getInvoices(limit,offset)
        this.invoices = response.invoices       
      } catch (error) {
        console.error("Error fetching invoices:", error)
      }
    }
  }
  </script>
  