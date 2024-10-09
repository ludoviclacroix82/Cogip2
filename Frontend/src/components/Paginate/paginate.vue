<!-- src/components/paginate/paginate -->

<template>
    <div class="w-full p-3 flex justify-end">
          <!-- Pagination controls -->
            <button 
              @click="prevPage" 
              :disabled="page === 1" 
              class=" bg-white text-xs text-gray-600 border border-gray-600 rounded px-2 py-1 hover:bg-[#F9DE4E] hover:border-[#F9DE4E] transition duration-300 disabled:bg-white disabled:text-gray-600 disabled:border-gray-600 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span class="mx-2  text-xs bg-white  text-gray-600 border border-gray-600 rounded px-2 py-1">Page {{ page }} of {{ pages }}</span>
            <button 
              @click="nextPage" 
              :disabled="page === pages" 
              class="bg-white  text-xs  text-gray-600 border border-gray-600 rounded px-2 py-1 hover:bg-[#F9DE4E]  hover:border-[#F9DE4E] transition duration-300 disabled:bg-white disabled:text-gray-600 disabled:border-gray-600 disabled:cursor-not-allowed"
            >
              Next
            </button>
    </div>
</template>

<script>  
  export default {
    props: {
    page: {
      type: Number,
      required: true,
    },
    pages: {
      type: Number,
      required: true,
    },
  },
  methods: {
    nextPage() {
      if (this.page < this.pages) {
        this.offset = (this.page - 1) * this.limit
        console.log(this.page)        
        this.$emit('updatePage', this.page + 1)
      }
    },
    prevPage() {
      if (this.page > 1) {
        this.offset = (this.page - 1) * this.limit
        console.log(this.page)
        this.$emit('updatePage', this.page - 1)
      }
    },
  },
}
  </script>
  