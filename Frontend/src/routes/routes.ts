// /routes/routes.ts
import Keycloak from 'keycloak-js'
import keycloakConfig from '../../keycloak.json'
const keycloak = new Keycloak(keycloakConfig)

import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Invoices from '@/views/Invoices/Invoices.vue'
import Companies from '@/views/Companies/Companies.vue'

import Dashboard from '@/views/Admin/Dashboard.vue'

// Admin companies CRUD
import CompaniesAdmin from '@/views/Admin/Companies/Companies.vue'
import CompaniesAdminAdd from '@/views/Admin/Companies/Add.vue'
import CompaniesAdminUpdate from '@/views/Admin/Companies/Update.vue'
import CompaniesAdminView from '@/views/Admin/Companies/View.vue'
import CompaniesAdminDelete from '@/views/Admin/Companies/Delete.vue'

export const routes: {
    path: string;
    component: any;
    name?: string;
    meta?: {
        requiresAuth?: boolean;
        roles?: string[];
    };
}[] = [
    { path: '/', component: Home },
    { path: '/login', name: 'Login', component: Login },
    { path: '/invoices/', name: 'invoicesIndex', component: Invoices, meta: { requiresAuth: true } },
    { path: '/companies/', name: 'companiesIndex', component: Companies, meta: { requiresAuth: true } },
    { path: '/invoices/:ref', name: 'invoicesHome', component: Home, meta: { requiresAuth: true } },
    { path: '/companies/:id', name: 'companiesHome', component: Home, meta: { requiresAuth: true } },
    { path: '/admin/dashboard/', name: 'dashboardIndex', component: Dashboard, meta: { requiresAuth: true, roles: ['realm-management'] } },
    { path: '/admin/companies/', name: 'companiesAdminIndex', component: CompaniesAdmin, meta: { requiresAuth: true, roles: ['realm-management'] } },
    { path: '/admin/companies/view/:id', name: 'companiesAdminView', component: CompaniesAdminView, meta: { requiresAuth: true, roles: ['realm-management'] } },
    { path: '/admin/companies/add', name: 'companiesAdminAdd', component: CompaniesAdminAdd, meta: { requiresAuth: true, roles: ['realm-management'] } },
    { path: '/admin/companies/update/:id', name: 'companiesAdminUpdate', component: CompaniesAdminUpdate, meta: { requiresAuth: true, roles: ['realm-management'] } },
    { path: '/admin/companies/delete/:id', name: 'companiesAdminDelete', component: CompaniesAdminDelete, meta: { requiresAuth: true, roles: ['realm-management'] } },
]