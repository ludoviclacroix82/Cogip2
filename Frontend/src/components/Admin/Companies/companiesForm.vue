<template>
  <form   class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/2 m-auto" @submit.prevent="action === 'postCompany' ? postCompany() : updateCompany()" >
    <div class="mb-4">
      <div v-if="submited && responseStatus === 201" class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400">Company created successfully.</div>
      <div v-if="submited && responseStatus === 200" class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"><strong>{{form.name}}</strong> updated successfully.</div>
      <div v-if="responseStatus === 409  && submited " class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">The VAT is already registered.</div>
      <div v-if="responseStatus === 400  && submited && !isNotValidate" class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">The company has not been established</div>
      <div v-if=" submited && isNotValidate" class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">The fields must be required.</div>
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
      <button  class="bg-[#9698D6] flex items-center hover:bg-white text-white hover:text-[#9698D6] hover:border-[#9698D6] py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        <span v-if="action === 'postCompany'"  class="w-20 flex justify-center">
          <PlusIcon class="size-5 mr-2" /> Add
        </span>
        <span v-if="action === 'updateCompany'" class="w-20 flex justify-center">
          <PencilIcon  class="size-5 mr-2" /> Update
        </span>

      </button>
    </div>
  </form>
</template>
<script lang="ts">
import Country from '@/Models/CountryModels'
import Types from '@/Models/TypesModels'
import Company from  '@/Models/CompaniesModels'
import {PlusIcon , PencilIcon } from "@heroicons/vue/24/outline"

export default {
  components: {PlusIcon , PencilIcon},
  data() {
    return {
      action: 'postCompany',
      countries: [],
      types: [],
      responseStatus: [],
      submited: false,
      isNotValidate : false,
      token : this.$keycloak.token,
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

    const idCompany:number = parseInt(this.$route.params.id)
    try {
      const responseCountry = await countryModel.getCountry(this.token)
      this.countries = responseCountry.countries

      const responseTypes = await typesModel.getTypes(this.token)
      this.types = responseTypes.types
      if(idCompany)
        await this.actionForm(idCompany)
      else
        this.action = 'postCompany'

    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    async actionForm(idCompany){
      const id:number = parseInt(idCompany)

      const companyModel = new Company()
      try {
        const response = await companyModel.getCompany(this.token,id)
        if(response){

          this.form.name = response.companies.name
          this.form.tva = response.companies.tva
          this.form.country_id = response.companies.country_id
          this.form.type_id = response.companies.type_id

          this.action = 'updateCompany'
        }
      } catch (error) {
        console.log(error)
      }
    },
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
        const validateForm = this.validator(formData)

        if(!validateForm){
          this.isNotValidate = true
        }else{
          const responsePost = await companyModel.postCompany(this.token,formData) as boolean|object|any
          this.responseStatus = responsePost.status
          this.resetFrom()
        }

      } catch (error) {
        console.log(error)
      }
    },
    async updateCompany(){
      this.submited = true
      const idCompany:number = parseInt(this.$route.params.id)

      const formData = {
        name: this.form.name,
        tva: this.form.tva,
        country_id: this.form.country_id,
        type_id: this.form.type_id
      }
      const companyModel = new Company()

      try {

        const responsePatch = await companyModel.patchCompany(this.token,idCompany, formData)
        this.responseStatus = responsePatch.status
      } catch (error) {
        console.log(error)
      }


    },
    validator(data: any): boolean | object {
      if (data.name === null || data.tva === null || data.country_id === 0 || data.type_id === 0) return false
      return data
    },
    resetFrom(){
      this.isNotValidate = false
      this.form.name = null
      this.form.tva = null
      this.form.country_id = 0
      this.form.type_id = 0
      this.isNotValidate = false
    }

  }
}
</script>
