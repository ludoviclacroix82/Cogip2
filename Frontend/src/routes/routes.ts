// /routes/routes.ts
import Home from '@/views/Home.vue'
import Invoices from '@/views/Invoices.vue'
import Companies from '@/views/Companies.vue'

import Dashboard from '@/views/Admin/Dashboard.vue'


export const routes: { path: string; component: any; name?:string; meta?: any }[] = [
    { path: '/', component: Home },
    { path: '/invoices/', name: 'invoicesIndex',component: Invoices },
    { path: '/companies/', name: 'companiesIndex',component: Companies },
    { path: '/invoices/:ref', name: 'invoicesHome',component: Home },
    { path: '/companies/:id',  name: 'companiesHome',component: Home },
    { path: '/dashboard/',  name: 'dashboardIndex',component: Dashboard }
]