<template>
  <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/2 m-auto" @submit.prevent="postCompany">
    <div class="mb-4">
      <div v-if="submited && response.status === 201" class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400">Company created successfully.</div>
      <div v-if="response.status === 409  && submited " class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">The VAT is already registered.</div>
      <div v-if="response.status === 400  && submited && !isNotValidate" class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">The company has not been established</div>
      <div v-if=" submited && isNotValidate" class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">TThe fields must be required.</div>

    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
        Name
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
             id="name"
             type="text"
             placeholder="Company name"
             v-model="form.name">
      <div v-if="form.name === null && submited && isNotValidate" class="text-xs text-red-600">*Required</div>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="tva">
        Tva
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
             id="tva"
             type="text"
             placeholder="tva"
             v-model="form.tva">
      <div v-if="form.tva === null && submited && isNotValidate" class="text-xs text-red-600">*Required</div>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="country_id">
        Country
      </label>
      <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="country_id"
              v-model="form.country_id">
        <option value="0" selected disabled >Select Country</option>
        <option v-for="country in countries" :value="country.id">{{country.name}}</option>
      </select>
      <div v-if="form.country_id === 0 && submited && isNotValidate" class="text-xs text-red-600">*Required</div>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="type_id">
        Type
      </label>
      <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="type_id"
              v-model="form.type_id">
        <option value="0" selected disabled >Select Type</option>
        <option v-for="type in types" :value="type.id">{{type.name}}</option>
      </select>
      <div v-if="form.type_id === 0 && submited && isNotValidate" class="text-xs text-red-600">*Required</div>
    </div>
    <div class="flex items-center justify-between">
      <button class="bg-[#9698D6] flex items-center hover:bg-white text-white hover:text-[#9698D6] hover:border-[#9698D6] py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        <PlusIcon   class="size-5 mr-2 " /> Add
      </button>
    </div>
  </form>
</template>
<script lang="ts">
import Country from '@/Models/CountryModels'
import Types from '@/Models/TypesModels'
import Company from  '@/Models/CompaniesModels'
import {PlusIcon} from "@heroicons/vue/24/outline"

export default {
  components: {PlusIcon},
  data() {
    return {
      countries: [],
      types: [],
      response: [],
      submited: false,
      isNotValidate : false,
      form: {
        name: null,
        tva: null,
        country_id: 0,
        type_id: 0
      }
    }
  },
  async mounted() {
    const countryModel = new Country()
    const typesModel = new Types()
    try {
      const responseCountry = await countryModel.getCountry()
      this.countries = responseCountry.countries

      const responseTypes = await typesModel.getTypes()
      this.types = responseTypes.types

    } catch (error) {
      console.log(error)
    }
  }, methods: {
    async postCompany() {
      this.submited = true

      const formData = {
        name: this.form.name,
        tva: this.form.tva,
        country_id: this.form.country_id,
        type_id: this.form.type_id
      }
      const companyModel = new Company()

      try {
        const validateFrom = this.validator(formData)

        if(!validateFrom){
          this.isNotValidate = true
        }else{
          const responsePost = await companyModel.postCompany(formData) as boolean|object|any
          this.response = responsePost

          this.isNotValidate = false
          this.form.name = null
          this.form.tva = null
          this.form.country_id = 0
          this.form.type_id = 0
          this.isNotValidate = false
        }


      } catch (error) {
        console.log(error)
      }

    },
    validator(data: object): boolean | object {
      if (data.name === null || data.tva === null || data.country_id === 0 || data.type_id === 0) return false
      return data
    }
  }
}
</script>