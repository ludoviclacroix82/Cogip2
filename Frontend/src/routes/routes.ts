// /routes/routes.ts
import Home from '@/views/Home.vue'
import Invoices from '@/views/Invoices.vue'
import Companies from '@/views/Companies.vue'

import Dashboard from '@/views/Admin/Dashboard.vue'

// Admin companies CRUD
import CompaniesAdmin from '@/views/Admin/Companies/Companies.vue'
import CompaniesAdminAdd from '@/views/Admin/Companies/Add.vue'
import CompaniesAdminUpdate from '@/views/Admin/Companies/Update.vue'
import CompaniesAdminView from '@/views/Admin/Companies/View.vue'
import CompaniesAdminDelete from '@/views/Admin/Companies/Delete.vue'

export const routes: { path: string; component: any; name?:string; meta?: any }[] = [
    { path: '/', component: Home },
    { path: '/invoices/', name: 'invoicesIndex',component: Invoices },
    { path: '/companies/', name: 'companiesIndex',component: Companies },
    { path: '/invoices/:ref', name: 'invoicesHome',component: Home },
    { path: '/companies/:id',  name: 'companiesHome',component: Home },
    { path: '/dashboard/',  name: 'dashboardIndex',component: Dashboard },
    { path: '/admin/companies/' , name: 'companiesAdminIndex',component: CompaniesAdmin },
    { path: '/admin/companies/view/:id' , name: 'companiesAdminView',component: CompaniesAdminView },
    { path: '/admin/companies/add' , name: 'companiesAdminAdd',component: CompaniesAdminAdd },
    { path: '/admin/companies/update/:id' , name: 'companiesAdminUpdate',component: CompaniesAdminUpdate },
    { path: '/admin/companies/delete/:id' , name: 'companiesAdminDelete',component: CompaniesAdminDelete },
]