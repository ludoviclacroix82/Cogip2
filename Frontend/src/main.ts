// main.ts
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import { routes } from './routes/routes'
import Keycloak from 'keycloak-js'
import './assets/tailwind.css'

import keycloakConfig from '../keycloak.json'

const initKeycloak = async () => {
    const keycloak = new Keycloak(keycloakConfig)

    try {
        console.log('Initialisation de Keycloak...')
        const authenticated = await keycloak.init({
            onLoad: 'login-required',
            enableLogging: true,
        })
        console.log(`Keycloak initialisé, authentification: ${authenticated ? 'authentifié' : 'non authentifié'}`)

        const app = createApp(App)

        const router = createRouter({
            history: createWebHistory(),
            routes
        })
        console.log(keycloak.tokenParsed.resource_access.account.roles)
        // Ajoutez une garde de navigation pour vérifier l'authentification et les rôles
        router.beforeEach((to, from, next) => {
            if (to.meta.requiresAuth) {
                if (!keycloak.authenticated) {
                    keycloak.login({ redirectUri: window.location.origin + to.fullPath })
                } else if (to.meta.roles && to.meta.roles.length > 0) {
                    const hasRequiredRole =to.meta.roles.some(role => keycloak.tokenParsed.aud.includes(role))

                    console.log(`hasRequiredRole: ${hasRequiredRole} | roles  : ${keycloak.tokenParsed.aud} | meta : ${to.meta.roles}`)
                    if (!hasRequiredRole) {
                        next('/')
                    } else {
                        next()
                    }
                } else {
                    next()
                }
            } else {
                next()
            }
        })

        // Ajoutez Keycloak aux propriétés globales
        app.config.globalProperties.$keycloak = keycloak
        app.use(router).mount('#app')
        console.log(keycloak)

    } catch (error) {
        console.error('Échec de l\'initialisation de Keycloak', error);
    }
}

await initKeycloak()