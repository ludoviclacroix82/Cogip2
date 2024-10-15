<template>
  <div class="bg-white rounded-lg p-5">
    <h3 class="text-lg py-2 font-semibold">Statistics</h3>
    <div class="w-full p-4 flex justify-around items-center text-center">
      <div class="w-20 h-20 p-3 rounded-full text-s text-white font-semibold bg-[#4D4CAC] flex flex-col items-center justify-center">
        {{numberCompanies}}
        <h3 class="text-xs font-semibold">Companies</h3>
      </div>
      <div class="w-20 h-20 p-3 rounded-full text-lg text-white font-semibold bg-[#9698D6] flex flex-col items-center justify-center">
        {{numberInvoices}}
        <h3 class="text-xs font-semibold">Invoices</h3>
      </div>
      <div class="w-20 h-20 p-3 rounded-full text-lg text-white font-semibold bg-[#FF808B] flex flex-col items-center justify-center">
        0
        <h3 class="text-xs font-semibold">Contacts</h3>
      </div>
    </div>

  </div>
</template>

<script>
import Company from '@/Models/CompaniesModels'
import  Invoices from '@/Models/InvoicesModels'

export default {
  data(){
    return {
      numberCompanies:0,
      numberInvoices:0
    }
  },
  async mounted() {
    const companyModel = new Company()
    const invoicesModel = new Invoices()
    try {
      const responseCompanies = await companyModel.getCompanies(1,0)
      this.numberCompanies = responseCompanies.count
      const responseInvoices = await invoicesModel.getInvoices(1,0)
      this.numberInvoices = responseInvoices.count
    }catch(e){
      console.log(e)
    }
  }

}
</script>