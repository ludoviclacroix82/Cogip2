<template>
  <div class="bg-white rounded-lg p-5">
    <h2 class="text-s font-semibold border-b border-gray-300 py-3">Last invoices</h2>
    <table class="w-full mt-5">
      <thead>
      <tr class="text-sm text-left h-20">
        <th>Ref</th>
        <th>Price</th>
        <th>Company</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="invoice in invoices" class="text-sm text-left space-y-5 h-10">
        <td>{{invoice.ref}}</td>
        <td>{{invoice.price}}</td>
        <td>{{invoice.Company.name}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import Invoices from "@/Models/InvoicesModels"

export default {
  props: {
    limit: {
      type: Number,
      required: true,
    }
  },
  data(){
    return {
      invoices:[],
    }
  },
  async mounted() {
    const invoicesModels = new Invoices()
    try {
      const response = await invoicesModels.getInvoices(this.limit,0)
      this.invoices = response.invoices
    }catch (error) {
      console.error( error)
    }
  }
}
</script>